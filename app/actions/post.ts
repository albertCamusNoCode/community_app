"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { getUser } from "./auth";
import { Database } from "@/lib/supabase/supabase-types";
import { User } from "@supabase/supabase-js";

type Post = Database['public']['Tables']['posts']['Row'];
type Profile = Database['public']['Tables']['profiles']['Row'];
type PostReaction = Database['public']['Tables']['post_reactions']['Row'];

export type ReactionType = Database['public']['Enums']['reaction_type'];
export type ReportReason = Database['public']['Enums']['report_reason'];

export type PostWithMetadata = Post & {
  author: {
    id: string;
    email: string | null;
    name: string | null;
    avatar_url: string | null;
    created_at: string;
  };
  reactions_count: Record<ReactionType, number>;
  current_user_reactions: ReactionType[];
  replies_count?: number;
};

export async function getCurrentUser(): Promise<User | null> {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user;
}

export async function createPost(communityId: string, title: string, content: string) {
  const supabase = await createClient();
  const user = await getUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const { data: post, error: insertError } = await supabase
    .from('posts')
    .insert([
      {
        title,
        content,
        community_id: communityId,
        user_id: user.id,
      },
    ])
    .select()
    .single();

  if (insertError) {
    throw new Error(insertError.message);
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const postWithAuthor = {
    ...post,
    author: {
      id: user.id,
      email: profile?.email,
      name: profile?.name || profile?.email?.split('@')[0] || 'Anonymous',
      avatar_url: profile?.avatar_url || `https://api.dicebear.com/6.x/initials/svg?seed=${profile?.email}`,
      created_at: profile?.created_at || post.created_at,
    },
    reactions_count: {},
    current_user_reactions: [],
  };

  revalidatePath(`/dashboard/communities/${communityId}`);
  return postWithAuthor;
}

export async function getPosts(communityId: string) {
  const supabase = await createClient();
  const user = await getUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  // First get all posts
  const { data: posts, error: postsError } = await supabase
    .from('posts')
    .select('*')
    .eq('community_id', communityId)
    .order('created_at', { ascending: false });

  if (postsError) {
    throw new Error(postsError.message);
  }

  // Then get profiles for all post authors
  const { data: profiles, error: profilesError } = await supabase
    .from('profiles')
    .select('*')
    .in('id', posts.map(post => post.user_id));

  if (profilesError) {
    throw new Error(profilesError.message);
  }

  // Create a map of profiles for quick lookup
  const profileMap = new Map(profiles.map(profile => [profile.id, profile]));

  // Get reactions for all posts
  const { data: reactions, error: reactionsError } = await supabase
    .from('post_reactions')
    .select('*')
    .in('post_id', posts.map(post => post.id));

  if (reactionsError) {
    throw new Error(reactionsError.message);
  }

  // Process posts with author and reaction data
  const postsWithMetadata = posts.map(post => {
    const profile = profileMap.get(post.user_id);
    const author = {
      id: post.user_id,
      email: profile?.email,
      name: profile?.name || profile?.email?.split('@')[0] || 'Anonymous',
      avatar_url: profile?.avatar_url || `https://api.dicebear.com/6.x/initials/svg?seed=${profile?.email}`,
      created_at: profile?.created_at || post.created_at,
    };
    
    // Count reactions by type
    const postReactions = reactions?.filter(r => r.post_id === post.id) || [];
    const reactions_count = postReactions.reduce((acc, reaction) => {
      acc[reaction.reaction_type] = (acc[reaction.reaction_type] || 0) + 1;
      return acc;
    }, {} as Record<ReactionType, number>);

    // Get current user's reactions
    const current_user_reactions = postReactions
      .filter(r => r.user_id === user.id)
      .map(r => r.reaction_type);

    return {
      ...post,
      author,
      reactions_count,
      current_user_reactions,
    };
  });

  return postsWithMetadata;
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
  
  const user = await getUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  // Check if reaction already exists
  const { data: existingReaction } = await supabase
    .from('post_reactions')
    .select('*')
    .eq('post_id', postId)
    .eq('user_id', user.id)
    .eq('reaction_type', reactionType)
    .single();

  if (existingReaction) {
    // If reaction exists, remove it (toggle behavior)
    return removeReaction(postId, reactionType);
  }

  // Get post to find community ID
  const { data: post } = await supabase
    .from('posts')
    .select('community_id')
    .eq('id', postId)
    .single();

  if (!post) {
    throw new Error('Post not found');
  }

  // Add new reaction
  const { error } = await supabase
    .from('post_reactions')
    .insert([
      {
        post_id: postId,
        user_id: user.id,
        reaction_type: reactionType,
      },
    ]);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/dashboard/communities/${post.community_id}`);
}

export async function removeReaction(postId: string, reactionType?: ReactionType) {
  const supabase = await createClient();
  
  const user = await getUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  // Get post to find community ID
  const { data: post } = await supabase
    .from('posts')
    .select('community_id')
    .eq('id', postId)
    .single();

  if (!post) {
    throw new Error('Post not found');
  }

  const query = supabase
    .from('post_reactions')
    .delete()
    .eq('post_id', postId)
    .eq('user_id', user.id);

  if (reactionType) {
    query.eq('reaction_type', reactionType);
  }

  const { error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/dashboard/communities/${post.community_id}`);
}

export async function reportPost(
  postId: string,
  reason: Database['public']['Enums']['report_reason'],
  description?: string
) {
  const supabase = await createClient();
  
  const user = await getUser();
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

  const user = await getUser();
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
