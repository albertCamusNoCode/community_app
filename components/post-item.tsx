'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Heart, MessageCircle } from 'lucide-react'

interface Post {
  id: string
  author: string
  content: string
  likes: number
  comments: number
}

export default function PostItem({ post }: { post: Post }) {
  const [likes, setLikes] = useState(post.likes)
  const [liked, setLiked] = useState(false)

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1)
      setLiked(false)
    } else {
      setLikes(likes + 1)
      setLiked(true)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${post.author}`} />
            <AvatarFallback>{post.author[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{post.author}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p>{post.content}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" size="sm" onClick={handleLike}>
          <Heart className={`w-5 h-5 mr-1 ${liked ? 'fill-current text-red-500' : ''}`} />
          {likes}
        </Button>
        <Button variant="ghost" size="sm">
          <MessageCircle className="w-5 h-5 mr-1" />
          {post.comments}
        </Button>
      </CardFooter>
    </Card>
  )
}

