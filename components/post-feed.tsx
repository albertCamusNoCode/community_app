'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { MessageSquare, ThumbsUp, MoreHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface Post {
  id: string
  author: {
    name: string
    image: string
    joinDate: string
  }
  content: string
  likes: number
  comments: number
  liked: boolean
}

export default function PostFeed({ communityId }: { communityId: string }) {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: {
        name: 'Lisa Jones',
        image: 'https://api.dicebear.com/6.x/initials/svg?seed=LJ',
        joinDate: 'Mar 12th'
      },
      content: `Hello from Bali! I am a creator in the health & wellness space and I am super excited to join the community!

Many of you might know me from my journey in the health and wellness sphere, where I've passionately shared tips, personal stories, and all things travel and health. I'm thrilled to join this amazing community that aligns with my shared values and aspirations. I'm so excited to venture into this new chapter with all of you, ensuring we uplift, inspire, and learn from one another. Let's thrive together!`,
      likes: 34,
      comments: 7,
      liked: false
    }
  ])

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
          liked: !post.liked
        }
      }
      return post
    }))
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Card key={post.id}>
          <CardHeader className="flex flex-row items-start space-x-4 space-y-0">
            <Avatar className="w-10 h-10">
              <AvatarImage src={post.author.image} alt={post.author.name} />
              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{post.author.name}</h3>
                  <p className="text-sm text-gray-500">{post.author.joinDate}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Report</DropdownMenuItem>
                    <DropdownMenuItem>Copy link</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap mb-4">{post.content}</p>
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleLike(post.id)}
                className={post.liked ? 'text-purple-600' : ''}
              >
                <ThumbsUp className="w-4 h-4 mr-1" />
                {post.likes}
              </Button>
              <Button variant="ghost" size="sm">
                <MessageSquare className="w-4 h-4 mr-1" />
                {post.comments}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

