'use client';

import { PostWithMetadata } from '@/actions/post';
import { createContext, useContext, useState } from 'react';

interface PostFeedContextType {
  posts: PostWithMetadata[];
  setPosts: (posts: PostWithMetadata[]) => void;
  addPost: (post: PostWithMetadata) => void;
  updatePost: (updatedPost: PostWithMetadata) => void;
}

const PostFeedContext = createContext<PostFeedContextType | undefined>(undefined);

interface PostFeedProviderProps {
  children: React.ReactNode;
  initialPosts: PostWithMetadata[];
}

export function PostFeedProvider({ children, initialPosts }: PostFeedProviderProps) {
  const [posts, setPosts] = useState<PostWithMetadata[]>(initialPosts);

  const addPost = (post: PostWithMetadata) => {
    setPosts(prevPosts => [post, ...prevPosts]);
  };

  const updatePost = (updatedPost: PostWithMetadata) => {
    setPosts(currentPosts => 
      currentPosts.map(post => 
        post.id === updatedPost.id ? updatedPost : post
      )
    );
  };

  return (
    <PostFeedContext.Provider value={{ posts, setPosts, addPost, updatePost }}>
      {children}
    </PostFeedContext.Provider>
  );
}

export function usePostFeed() {
  const context = useContext(PostFeedContext);
  if (context === undefined) {
    throw new Error('usePostFeed must be used within a PostFeedProvider');
  }
  return context;
}
