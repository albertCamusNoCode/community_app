'use server';

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { getUser } from "@/app/actions/auth";
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

  // Get communities with members
  const { data: communities, error } = await supabase
    .from('communities')
    .select(`
      *,
      members:community_members (
        role,
        user_id
      )
    `)
    .in('id', communityIds);

  if (error) {
    throw new Error(error.message);
  }

  // Get creator profiles
  const creatorIds = communities
    .map(community => community.creator_id)
    .filter((id): id is string => id !== null);

  const { data: creators } = await supabase
    .from('profiles')
    .select('*')
    .in('id', creatorIds);

  // Map creators to their communities
  const creatorsMap = creators?.reduce<Record<string, any>>((acc, creator) => {
    acc[creator.id] = creator;
    return acc;
  }, {}) ?? {};

  return communities.map((community: any) => ({
    ...community,
    creator: community.creator_id ? creatorsMap[community.creator_id] : null,
    userRole: community.members?.find((m: any) => m.user_id === user.id)?.role,
    member_count: community.members?.length,
  }));
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

  // Get the community with its members
  const { data: community, error } = await supabase
    .from('communities')
    .select(`
      *,
      members:community_members (
        role,
        user_id
      )
    `)
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  // Get creator profile if it exists
  let creator = null;
  if (community.creator_id) {
    const { data: creatorData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', community.creator_id)
      .single();
    creator = creatorData;
  }

  return {
    ...community,
    creator,
    userRole: community.members?.find((m: any) => m.user_id === user.id)?.role,
    member_count: community.members?.length,
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
      role: 'member',
    },
  ]);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/dashboard/communities');
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

  revalidatePath('/dashboard/communities');
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

  // Check if the current user is an admin
  const { data: currentMember, error: memberError } = await supabase
    .from('community_members')
    .select('role')
    .eq('community_id', communityId)
    .eq('user_id', user.id)
    .single();

  if (memberError || currentMember.role !== 'admin') {
    throw new Error('Unauthorized');
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
