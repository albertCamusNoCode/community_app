'use server';

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { getUser } from "./auth";
import { Database } from "@/lib/supabase/supabase-types";

type MemberRole = "member" | "moderator" | "admin";

export type Community = Database['public']['Tables']['communities']['Row'] & {
  creator?: {
    id: string;
    email: string | null;
    name: string | null;
    avatar_url: string | null;
    created_at: string;
  };
  userRole?: MemberRole;
  member_count?: number;
};

export async function getMyCommunities(): Promise<Community[]> {
  const supabase = await createClient();
  const user = await getUser();
  if (!user) {
    throw new Error('Unauthorized');
  }

  // First get the communities I'm a member of
  const { data: memberCommunities, error: memberError } = await supabase
    .from('community_members')
    .select('community_id')
    .eq('user_id', user.id);

  if (memberError) {
    throw new Error(memberError.message);
  }

  if (!memberCommunities.length) {
    return [];
  }

  const communityIds = memberCommunities.map(m => m.community_id);

  // Then get the community details
  const { data: communities, error } = await supabase
    .from('communities')
    .select('*')
    .in('id', communityIds);

  if (error) {
    throw new Error(error.message);
  }

  if (!communities) return [];

  // Filter out null creator_ids and fetch creator profiles
  const creatorIds = communities
    .map(c => c.creator_id)
    .filter((id): id is string => id !== null);

  if (creatorIds.length === 0) {
    return communities.map(community => ({
      ...community,
      creator: undefined
    }));
  }

  const { data: creators, error: creatorsError } = await supabase
    .from('profiles')
    .select('*')
    .in('id', creatorIds);

  if (creatorsError) {
    throw new Error(creatorsError.message);
  }

  // Map creators to communities
  const communitiesWithCreators = communities.map(community => ({
    ...community,
    creator: community.creator_id ? creators?.find(c => c.id === community.creator_id) : undefined
  }));

  return communitiesWithCreators;
}

export async function createCommunity(formData: FormData) {
  const supabase = await createClient();
  const user = await getUser();
  if (!user) {
    throw new Error('Unauthorized');
  }

  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const imageUrl = formData.get('imageUrl') as string;

  const { data: community, error } = await supabase
    .from('communities')
    .insert([
      {
        name,
        description,
        image_url: imageUrl,
        creator_id: user.id,
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  // Add creator as admin
  const { error: memberError } = await supabase.from('community_members').insert([
    {
      community_id: community.id,
      user_id: user.id,
      role: 'admin' as const,
    },
  ]);

  if (memberError) {
    throw new Error(memberError.message);
  }

  revalidatePath('/dashboard/communities');
  return community;
}

export async function getCommunity(id: string): Promise<Community> {
  const supabase = await createClient();
  const user = await getUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  // Get community details
  const { data: community, error: communityError } = await supabase
    .from('communities')
    .select('*')
    .eq('id', id)
    .single();

  if (communityError) {
    throw new Error(communityError.message);
  }

  // Get creator profile if creator_id exists
  let creator = null;
  if (community.creator_id) {
    const { data: creatorData, error: creatorError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', community.creator_id)
      .single();

    if (creatorError) {
      throw new Error(creatorError.message);
    }
    creator = creatorData;
  }

  // Get member count
  const { data: memberCount, error: countError } = await supabase
    .rpc('get_community_member_count', { community_id: id });

  if (countError) {
    throw new Error(countError.message);
  }

  // Get user's role in this community
  const { data: memberRole } = await supabase
    .from('community_members')
    .select('role')
    .eq('community_id', id)
    .eq('user_id', user.id)
    .single();

  return {
    ...community,
    creator: creator || undefined,
    member_count: memberCount,
    userRole: memberRole?.role,
  };
}

export async function joinCommunity(communityId: string) {
  const supabase = await createClient();
  const user = await getUser();
  if (!user) {
    throw new Error('Unauthorized');
  }

  const { error } = await supabase.from('community_members').insert([
    {
      community_id: communityId,
      user_id: user.id,
      role: 'member' as const,
    },
  ]);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/dashboard/communities/${communityId}`);
}

export async function leaveCommunity(communityId: string) {
  const supabase = await createClient();
  const user = await getUser();
  if (!user) {
    throw new Error('Unauthorized');
  }

  const { error } = await supabase
    .from('community_members')
    .delete()
    .eq('community_id', communityId)
    .eq('user_id', user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/dashboard/communities/${communityId}`);
}

export async function updateCommunityRole(
  communityId: string,
  userId: string,
  role: MemberRole
) {
  const supabase = await createClient();
  const user = await getUser();
  if (!user) {
    throw new Error('Unauthorized');
  }

  // Check if current user is admin
  const { data: currentUserRole, error: roleError } = await supabase
    .from('community_members')
    .select('role')
    .eq('community_id', communityId)
    .eq('user_id', user.id)
    .single();

  if (roleError || currentUserRole?.role !== 'admin') {
    throw new Error('Unauthorized: Only admins can update roles');
  }

  const { error } = await supabase
    .from('community_members')
    .update({ role })
    .eq('community_id', communityId)
    .eq('user_id', userId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/dashboard/communities/${communityId}`);
}
