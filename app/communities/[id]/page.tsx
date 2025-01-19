import { notFound } from 'next/navigation'
import CommunityHeader from '@/components/community-header'
import PostList from '@/components/post-list'

interface Community {
  id: string
  name: string
  description: string
  memberCount: number
  userRole: 'creator' | 'member' | 'none'
}

async function getCommunity(id: string): Promise<Community | null> {
  // TODO: Implement actual data fetching
  return {
    id,
    name: 'Sample Community',
    description: 'This is a sample community description.',
    memberCount: 1000,
    userRole: 'member', // This should be determined based on the authenticated user
  }
}

async function getPosts(communityId: string) {
  // TODO: Implement actual data fetching
  const posts = [
    { id: '1', author: 'John Doe', content: 'Hello, community!', likes: 5, comments: 2 },
    { id: '2', author: 'Jane Smith', content: 'Excited to be here!', likes: 3, comments: 1 },
    // Add more sample posts as needed
  ]
  return posts
}

export default async function CommunityPage({ params }: { params: { id: string } }) {
  const community = await getCommunity(params.id)
  
  if (!community) {
    notFound()
  }

  const posts = await getPosts(params.id)

  return (
    <div className="space-y-6">
      <CommunityHeader community={community} />
      <PostList posts={posts} />
    </div>
  )
}

