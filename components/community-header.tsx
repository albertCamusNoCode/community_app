'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
import Link from 'next/link'

interface Community {
  id: string
  name: string
  description: string
  memberCount: number
  userRole: 'creator' | 'member' | 'none'
}

export default function CommunityHeader({ community }: { community: Community }) {
  const [userRole, setUserRole] = useState(community.userRole)

  const handleJoin = async () => {
    // TODO: Implement actual join logic
    setUserRole('member')
  }

  const handleLeave = async () => {
    // TODO: Implement actual leave logic
    setUserRole('none')
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <h1 className="text-3xl font-bold">{community.name}</h1>
        {userRole === 'creator' && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link href={`/communities/${community.id}/edit`}>Edit Community</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={`/communities/${community.id}/members`}>Manage Members</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <p className="text-gray-600">{community.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">{community.memberCount} members</span>
        {userRole === 'none' ? (
          <Button onClick={handleJoin}>Join Community</Button>
        ) : (
          <div className="flex items-center space-x-2">
            <Badge variant={userRole === 'creator' ? 'default' : 'secondary'}>
              {userRole === 'creator' ? 'Creator' : 'Member'}
            </Badge>
            {userRole === 'member' && (
              <Button variant="outline" onClick={handleLeave}>Leave Community</Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

