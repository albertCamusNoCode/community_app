import { getPosts } from "@/actions/post";
import { PostCard } from "./post-card";

interface PostFeedProps {
  communityId: string;
}

export async function PostFeed({ communityId }: PostFeedProps) {
  const posts = await getPosts(communityId);

  if (!posts?.length) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No posts yet. Be the first to post!
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
