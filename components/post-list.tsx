import PostItem from '@/components/post-item'

interface Post {
  id: string
  author: string
  content: string
  likes: number
  comments: number
}

export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  )
}

