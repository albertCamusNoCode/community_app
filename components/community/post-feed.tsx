"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MessageSquare, ThumbsUp, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Post {
  id: string;
  author: {
    name: string;
    image: string;
    joinDate: string;
  };
  content: string;
  likes: number;
  comments: number;
  liked: boolean;
}

export default function PostFeed({ communityId }: { communityId: string }) {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      author: {
        name: "Lisa Jones",
        image: "https://api.dicebear.com/6.x/initials/svg?seed=LJ",
        joinDate: "Mar 12th",
      },
      content: `Hello from Bali! I am a creator in the health & wellness space and I am super excited to join the community!

Many of you might know me from my journey in the health and wellness sphere, where I've passionately shared tips, personal stories, and all things travel and health. I'm thrilled to join this amazing community that aligns with my shared values and aspirations. I'm so excited to venture into this new chapter with all of you, ensuring we uplift, inspire, and learn from one another. Let's thrive together!`,
      likes: 34,
      comments: 7,
      liked: false,
    },
  ]);

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.liked ? post.likes - 1 : post.likes + 1,
            liked: !post.liked,
          };
        }
        return post;
      }),
    );
  };

  return (
    <div className="space-y-6" data-oid="4hljfez">
      {posts.map((post) => (
        <Card key={post.id} data-oid="0ztwqk6">
          <CardHeader
            className="flex flex-row items-start space-x-4 space-y-0"
            data-oid="m-9z_ge"
          >
            <Avatar className="w-10 h-10" data-oid="2mzs22s">
              <AvatarImage
                src={post.author.image}
                alt={post.author.name}
                data-oid="edcq5v9"
              />

              <AvatarFallback data-oid="832dm72">
                {post.author.name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1" data-oid="82pf94s">
              <div
                className="flex items-center justify-between"
                data-oid="i.zces0"
              >
                <div data-oid="itfp9om">
                  <h3 className="font-semibold" data-oid="61sd:x7">
                    {post.author.name}
                  </h3>
                  <p className="text-sm text-gray-500" data-oid="o1yal74">
                    {post.author.joinDate}
                  </p>
                </div>
                <DropdownMenu data-oid="bc.fse9">
                  <DropdownMenuTrigger asChild data-oid="bc-hd76">
                    <Button variant="ghost" size="sm" data-oid="blky5ex">
                      <MoreHorizontal className="h-4 w-4" data-oid="zi3706k" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" data-oid="y0epeke">
                    <DropdownMenuItem data-oid="gtcy995">
                      Report
                    </DropdownMenuItem>
                    <DropdownMenuItem data-oid="j40gc5b">
                      Copy link
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          <CardContent data-oid="jmno2u2">
            <p className="whitespace-pre-wrap mb-4" data-oid="5-iv7a3">
              {post.content}
            </p>
            <div className="flex items-center space-x-4" data-oid="f6lrx7b">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleLike(post.id)}
                className={post.liked ? "text-purple-600" : ""}
                data-oid="k9oxqs9"
              >
                <ThumbsUp className="w-4 h-4 mr-1" data-oid="gfqavgj" />
                {post.likes}
              </Button>
              <Button variant="ghost" size="sm" data-oid="oijab51">
                <MessageSquare className="w-4 h-4 mr-1" data-oid="woffwmr" />
                {post.comments}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
