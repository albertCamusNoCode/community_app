import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TrendingPost } from "../types";

export function TrendingPosts({ posts }: { posts: TrendingPost[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Trending posts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="flex items-start space-x-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={post.author.image} alt={post.author.name} />
              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
            </Avatar>
            <p className="text-sm font-medium">{post.title}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
