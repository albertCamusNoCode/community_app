"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { PostWithMetadata, ReactionType, ReportReason } from "@/types/post";
import { User } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { isValidUUID } from "@/lib/utils";

export async function getCurrentUser(): Promise<User | null> {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user;
}

export async function createPost(formData: FormData) {
  const supabase = await createClient();
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const communityId = formData.get("communityId") as string;

  if (!isValidUUID(communityId)) {
    throw new Error("Invalid community ID format");
  }

  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const { data: post, error } = await supabase
    .from("posts")
    .insert({
      title,
      content,
      community_id: communityId,
      user_id: user.id,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/dashboard/communities/${communityId}`);
  return post;
}

export async function getPosts(communityId: string) {
  if (!isValidUUID(communityId)) {
    throw new Error("Invalid community ID format");
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .rpc('get_posts_by_community', { target_community_id: communityId })
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data as PostWithMetadata[];
}

export async function getPost(postId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .rpc('get_post_with_metadata', { post_id: postId })
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as PostWithMetadata;
}

export async function addReaction(postId: string, reactionType: ReactionType) {
  const supabase = await createClient();
  
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const { data: post, error: postError } = await supabase
    .from("posts")
    .select("community_id")
    .eq("id", postId)
    .single();

  if (postError) {
    throw new Error(postError.message);
  }

  // Verify user is a member of the community
  const { data: membership, error: membershipError } = await supabase
    .from("community_members")
    .select()
    .eq("community_id", post.community_id)
    .eq("user_id", user.id)
    .single();

  if (membershipError || !membership) {
    throw new Error("You must be a member of the community to react to posts");
  }

  // Check if reaction already exists
  const { data: existingReaction } = await supabase
    .from("post_reactions")
    .select()
    .eq("post_id", postId)
    .eq("user_id", user.id)
    .eq("reaction_type", reactionType)
    .single();

  if (existingReaction) {
    // If reaction already exists, remove it (toggle behavior)
    const { error } = await supabase
      .from("post_reactions")
      .delete()
      .eq("post_id", postId)
      .eq("user_id", user.id)
      .eq("reaction_type", reactionType);

    if (error) {
      throw new Error(error.message);
    }
  } else {
    // If reaction doesn't exist, add it
    const { error } = await supabase
      .from("post_reactions")
      .insert({
        post_id: postId,
        user_id: user.id,
        reaction_type: reactionType,
      });

    if (error) {
      throw new Error(error.message);
    }
  }

  revalidatePath(`/dashboard/communities/${post.community_id}`);
}

export async function removeReaction(postId: string, reactionType?: ReactionType) {
  const supabase = await createClient();
  
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const { data: post, error: postError } = await supabase
    .from("posts")
    .select("community_id")
    .eq("id", postId)
    .single();

  if (postError) {
    throw new Error(postError.message);
  }

  const query = supabase
    .from("post_reactions")
    .delete()
    .eq("post_id", postId)
    .eq("user_id", user.id);

  // If reactionType is provided, only remove that specific reaction
  if (reactionType) {
    query.eq("reaction_type", reactionType);
  }

  const { error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/dashboard/communities/${post.community_id}`);
}

export async function reportPost(
  postId: string,
  reason: ReportReason,
  description?: string
) {
  const supabase = await createClient();
  
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const { error } = await supabase
    .from("post_reports")
    .insert({
      post_id: postId,
      reporter_id: user.id,
      reason,
      description,
    });

  if (error) {
    throw new Error(error.message);
  }
}

export async function createReply(formData: FormData) {
  const supabase = await createClient();
  const content = formData.get("content") as string;
  const parentId = formData.get("parentId") as string;

  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const { data: parentPost, error: parentError } = await supabase
    .from("posts")
    .select("community_id")
    .eq("id", parentId)
    .single();

  if (parentError) {
    throw new Error(parentError.message);
  }

  const { data: reply, error } = await supabase
    .from("posts")
    .insert({
      content,
      parent_id: parentId,
      community_id: parentPost.community_id,
      user_id: user.id,
      title: "", // Replies don't have titles
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/dashboard/communities/${parentPost.community_id}`);
  return reply;
}
