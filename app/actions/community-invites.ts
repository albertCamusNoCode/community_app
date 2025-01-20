import { createClient } from '@/lib/supabase/server';
import { nanoid } from 'nanoid';
import { redirect } from 'next/navigation';
import { Database } from '@/lib/supabase/supabase-types';

const INVITE_EXPIRY_DAYS = 7;

type InviteStatus = Database['public']['Enums']['invite_status'];
type CommunityInvite = Database['public']['Tables']['community_invites']['Row'];

/**
 * Generate a unique invite link for a community
 */
export async function generateInviteLink(communityId: string): Promise<string> {
  const supabase = await createClient();
  
  // Generate a unique token
  const token = nanoid(32);
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + INVITE_EXPIRY_DAYS);

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');

  try {
    const { error } = await supabase
      .from('community_invites')
      .insert({
        community_id: communityId,
        invite_token: token,
        expires_at: expiresAt.toISOString(),
        inviter_id: user.id,
        status: 'pending',
      });

    if (error) throw error;

    // Use window.location for client-side URL generation
    const baseUrl = typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}` : '';

    return `${baseUrl}/invite/${token}`;
  } catch (error) {
    console.error('Error generating invite link:', error);
    throw new Error('Failed to generate invite link. Please try again.');
  }
}

/**
 * Send email invitations to join a community
 */
export async function sendEmailInvites(communityId: string, emails: string[]): Promise<void> {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + INVITE_EXPIRY_DAYS);

  // Create invites for each email
  const invites = emails.map(email => ({
    community_id: communityId,
    email,
    invite_token: nanoid(32),
    expires_at: expiresAt.toISOString(),
    inviter_id: user.id,
    status: 'pending' as const,
  }));

  const { error } = await supabase
    .from('community_invites')
    .insert(invites);

  if (error) throw error;

  // TODO: Integrate with your email service provider to send invitation emails
  // This would typically involve calling an API or using a service like SendGrid
}

/**
 * Validate an invite token
 */
export async function validateInvite(token: string): Promise<{ 
  valid: boolean;
  invite?: CommunityInvite;
  communityName?: string;
  inviterName?: string;
}> {
  const supabase = await createClient();

  // Get the invite and related data
  const { data: invite, error } = await supabase
    .from('community_invites')
    .select(`
      *,
      communities (name),
      profiles:inviter_id (full_name)
    `)
    .eq('invite_token', token)
    .eq('status', 'pending')
    .gt('expires_at', new Date().toISOString())
    .single();

  if (error || !invite) {
    return { valid: false };
  }

  return {
    valid: true,
    invite: invite as CommunityInvite,
    communityName: (invite.communities as any).name,
    inviterName: (invite.profiles as any).full_name,
  };
}

/**
 * Accept an invite and join the community
 */
export async function acceptInvite(token: string): Promise<void> {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }

  // Start a transaction
  const { data: invite, error: inviteError } = await supabase
    .from('community_invites')
    .select('community_id, status')
    .eq('invite_token', token)
    .single();

  if (inviteError || !invite) {
    throw new Error('Invalid or expired invite');
  }

  if (invite.status !== 'pending') {
    throw new Error('Invite is no longer valid');
  }

  // Update invite status
  const { error: updateError } = await supabase
    .from('community_invites')
    .update({ status: 'accepted' })
    .eq('invite_token', token);

  if (updateError) throw updateError;

  // Add user to community
  const { error: memberError } = await supabase
    .from('community_members')
    .insert({
      community_id: invite.community_id,
      user_id: user.id,
      role: 'member',
    });

  if (memberError) throw memberError;

  // Redirect to the community page
  redirect(`/dashboard/communities/${invite.community_id}`);
}

/**
 * List all pending invites for a community
 */
export async function listCommunityInvites(communityId: string): Promise<CommunityInvite[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('community_invites')
    .select('*')
    .eq('community_id', communityId)
    .eq('status', 'pending')
    .order('created_at', { ascending: false });

  if (error) throw error;

  return data as CommunityInvite[];
}

/**
 * Cancel a pending invite
 */
export async function cancelInvite(inviteId: string): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase
    .from('community_invites')
    .update({ status: 'cancelled' })
    .eq('id', inviteId);

  if (error) throw error;
}
