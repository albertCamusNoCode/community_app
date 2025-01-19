import PostItem from "@/components/post-item";

interface Post {
  id: string;
  author: string;
  content: string;
  likes: number;
  comments: number;
}

export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <div className="space-y-6" data-oid="7r:q2p-">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} data-oid="nl_tz3d" />
      ))}
    </div>
  );
}
