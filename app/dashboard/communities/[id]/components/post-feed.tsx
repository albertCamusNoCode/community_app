"use client";

import { useEffect } from "react";
import { PostWithMetadata } from "@/app/actions/post";
import { PostCard } from "./post-card";
import { getPosts } from "@/app/actions/post";
import { usePostFeed } from "./post-feed-context";

interface PostFeedProps {
  communityId: string;
}

export default function PostFeed({ communityId }: PostFeedProps) {
  const { posts, setPosts } = usePostFeed();

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const posts = await getPosts(communityId);
        setPosts(posts);
      } catch (error) {
        console.error('Failed to load posts:', error);
      }
    };

    loadPosts();
  }, [communityId, setPosts]);

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export { PostFeed };
