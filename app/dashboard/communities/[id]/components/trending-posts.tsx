import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PostWithMetadata } from "@/app/actions/post";

interface TrendingPost extends Pick<PostWithMetadata, 'id' | 'title' | 'content' | 'author'> {}

export function TrendingPosts({ posts }: { posts: TrendingPost[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Trending posts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {posts.map((post) => {
          const authorName = post.author.name || post.author.email?.split('@')[0] || 'Anonymous';
          const postTitle = post.title || post.content.slice(0, 50) + '...';
          
          return (
            <div key={post.id} className="flex items-start space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src={post.author.avatar_url || ''} alt={authorName} />
                <AvatarFallback>{authorName[0]?.toUpperCase()}</AvatarFallback>
              </Avatar>
              <p className="text-sm font-medium">{postTitle}</p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
