import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import PostFeed from '@/components/community/post-feed'

interface Community {
  id: string
  name: string
  description: string
  memberCount: number
  userRole: 'creator' | 'member' | 'none'
  heroImage: string
}

async function getCommunity(id: string): Promise<Community | null> {
  // TODO: Implement actual data fetching
  return {
    id,
    name: 'ModernMind™',
    description: 'A community for mindful living and personal growth',
    memberCount: 1000,
    userRole: 'member',
    heroImage: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-oxBQXCffWRgCXJuvwqgF4RdDzCu15e.png'
  }
}

export default async function CommunityPage({ params }: { params: { id: string } }) {
  const community = await getCommunity(params.id)
  
  if (!community) {
    notFound()
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <Card className="mb-6 overflow-hidden">
        <div className="relative h-[300px]">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${community.heroImage})` }}
          />
          <div className="absolute inset-0 bg-purple-500/20" />
          <div className="absolute inset-0 flex flex-col justify-center items-start p-8 text-white">
            <div className="bg-purple-500 px-4 py-1 rounded-full text-sm mb-4">
              Welcome
            </div>
            <h1 className="text-4xl font-bold mb-2">
              Your journey<br />begins today
            </h1>
          </div>
        </div>
      </Card>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Latest Posts</h2>
        <Button>New post</Button>
      </div>

      <PostFeed communityId={params.id} />
    </div>
  )
}

