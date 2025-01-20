'use server'

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { getUser } from "./auth";

export type Reply = {
  id: string;
  content: string;
  post_id: string;
  author_id: string;
  parent_reply_id: string | null;
  created_at: string;
  updated_at: string;
  author: {
    id: string;
    name: string | null;
    email: string | null;
    avatar_url: string | null;
  };
  replies?: Reply[];
};

export async function createReply(
  postId: string,
  content: string,
  parentReplyId?: string
): Promise<Reply> {
  const supabase = await createClient();
  const user = await getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  const { data: reply, error } = await supabase
    .from("replies")
    .insert({
      content,
      post_id: postId,
      author_id: user.id,
      parent_reply_id: parentReplyId || null,
    })
    .select(`
      *,
      author:profiles!replies_author_id_fkey (
        id,
        name,
        email,
        avatar_url
      )
    `)
    .single();

  if (error) {
    throw error;
  }

  revalidatePath(`/dashboard/communities/${postId}`);
  return reply;
}

export async function getReplies(postId: string): Promise<Reply[]> {
  const supabase = await createClient();

  const { data: replies, error } = await supabase
    .from("replies")
    .select(`
      *,
      author:profiles!replies_author_id_fkey (
        id,
        name,
        email,
        avatar_url
      )
    `)
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  if (error) {
    throw error;
  }

  // Organize replies into a tree structure
  const replyMap = new Map<string, Reply>();
  const topLevelReplies: Reply[] = [];

  // First pass: Create a map of all replies
  replies.forEach(reply => {
    replyMap.set(reply.id, { ...reply, replies: [] });
  });

  // Second pass: Build the tree structure
  replies.forEach(reply => {
    const replyWithReplies = replyMap.get(reply.id)!;
    if (reply.parent_reply_id) {
      const parent = replyMap.get(reply.parent_reply_id);
      if (parent) {
        parent.replies = parent.replies || [];
        parent.replies.push(replyWithReplies);
      }
    } else {
      topLevelReplies.push(replyWithReplies);
    }
  });

  return topLevelReplies;
}

export async function updateReply(
  replyId: string,
  content: string
): Promise<Reply> {
  const supabase = await createClient();
  const user = await getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  const { data: reply, error } = await supabase
    .from("replies")
    .update({ content, updated_at: new Date().toISOString() })
    .eq("id", replyId)
    .eq("author_id", user.id)
    .select(`
      *,
      author:profiles!replies_author_id_fkey (
        id,
        name,
        email,
        avatar_url
      )
    `)
    .single();

  if (error) {
    throw error;
  }

  revalidatePath(`/dashboard/communities/${reply.post_id}`);
  return reply;
}

export async function deleteReply(replyId: string): Promise<void> {
  const supabase = await createClient();
  const user = await getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  // First get the reply to get the post_id for revalidation
  const { data: reply, error: fetchError } = await supabase
    .from("replies")
    .select("post_id")
    .eq("id", replyId)
    .single();

  if (fetchError) {
    throw fetchError;
  }

  const { error } = await supabase
    .from("replies")
    .delete()
    .eq("id", replyId)
    .eq("author_id", user.id);

  if (error) {
    throw error;
  }

  revalidatePath(`/dashboard/communities/${reply.post_id}`);
}
