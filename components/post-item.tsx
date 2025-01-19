"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle } from "lucide-react";

interface Post {
  id: string;
  author: string;
  content: string;
  likes: number;
  comments: number;
}

export default function PostItem({ post }: { post: Post }) {
  const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
      setLiked(false);
    } else {
      setLikes(likes + 1);
      setLiked(true);
    }
  };

  return (
    <Card data-oid="e-s7c9g">
      <CardHeader data-oid="xdswtdz">
        <div className="flex items-center space-x-4" data-oid="ichc.-:">
          <Avatar data-oid="qi6bwdi">
            <AvatarImage
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${post.author}`}
              data-oid="hu8ixhx"
            />

            <AvatarFallback data-oid="uuanm1v">{post.author[0]}</AvatarFallback>
          </Avatar>
          <div data-oid="v:fi3ve">
            <p className="font-semibold" data-oid="tcu3eka">
              {post.author}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent data-oid="5x4cv2n">
        <p data-oid="15yqh6s">{post.content}</p>
      </CardContent>
      <CardFooter className="flex justify-between" data-oid="oduj_u5">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLike}
          data-oid="gv_3rvb"
        >
          <Heart
            className={`w-5 h-5 mr-1 ${liked ? "fill-current text-red-500" : ""}`}
            data-oid="mrbs1:w"
          />

          {likes}
        </Button>
        <Button variant="ghost" size="sm" data-oid="elmt96h">
          <MessageCircle className="w-5 h-5 mr-1" data-oid="cqyq_n4" />
          {post.comments}
        </Button>
      </CardFooter>
    </Card>
  );
}
