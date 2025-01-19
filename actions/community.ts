"use server";

import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "./post";
import { revalidatePath } from "next/cache";
import { isValidUUID } from "@/lib/utils";

export interface Community {
  id: string;
  name: string;
  description: string;
  image_url: string;
  created_at: string;
  updated_at: string;
  creator_id: string;
  member_count: number;
  creator: {
    id: string;
    email: string;
    created_at: string;
  };
}

export async function getCommunity(id: string): Promise<any> {
  if (!isValidUUID(id)) {
    throw new Error("Invalid community ID format");
  }

  const supabase = await createClient();
  const { data: community, error } = await supabase
    .from("communities")
    .select(`
      id,
      name,
      description,
      image_url as heroImage,
      (
        SELECT COUNT(*)
        FROM community_members cm
        WHERE cm.community_id = communities.id
      ) as memberCount,
      (
        SELECT role
        FROM community_members cm
        WHERE cm.community_id = communities.id
          AND cm.user_id = auth.uid()
      ) as userRole
    `)
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  if (!community) {
    return null;
  }

  return {
    ...community,
    userRole: community.userRole || "none"
  };
}

export async function createCommunity(formData: FormData) {
  const supabase = await createClient();
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const imageUrl = formData.get("imageUrl") as string;

  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const { data: community, error: communityError } = await supabase
    .from("communities")
    .insert({
      name,
      description,
      image_url: imageUrl,
      creator_id: user.id,
    })
    .select()
    .single();

  if (communityError) {
    throw new Error(communityError.message);
  }

  // Add creator as admin
  const { error: memberError } = await supabase
    .from("community_members")
    .insert({
      community_id: community.id,
      user_id: user.id,
      role: "admin",
    });

  if (memberError) {
    throw new Error(memberError.message);
  }

  revalidatePath("/dashboard/my-communities");
  return community;
}

export async function joinCommunity(communityId: string) {
  const supabase = await createClient();
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const { error } = await supabase
    .from("community_members")
    .insert({
      community_id: communityId,
      user_id: user.id,
    });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/dashboard/communities/${communityId}`);
}

export async function leaveCommunity(communityId: string) {
  const supabase = await createClient();
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const { error } = await supabase
    .from("community_members")
    .delete()
    .match({ community_id: communityId, user_id: user.id });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/dashboard/communities/${communityId}`);
}

export async function updateCommunityRole(communityId: string, userId: string, role: 'member' | 'moderator' | 'admin') {
  const supabase = await createClient();
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Unauthorized");
  }

  const { error } = await supabase
    .from("community_members")
    .update({ role })
    .match({ community_id: communityId, user_id: userId });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/dashboard/communities/${communityId}`);
}

export async function getMyCommunities(): Promise<Community[]> {
  const supabase = await createClient();
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const { data, error } = await supabase
    .from("communities")
    .select(`
      id,
      name,
      description,
      image_url,
      created_at,
      updated_at,
      creator_id,
      member_count:community_members(count),
      creator:creator_id(
        id,
        email,
        created_at
      )
    `)
    .in('id', supabase.from('community_members').select('community_id').eq('user_id', user.id));

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
