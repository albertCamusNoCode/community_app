import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Community {
  id: string
  name: string
  memberCount: number
  role: 'creator' | 'member'
}

async function getMyCommunities(): Promise<Community[]> {
  // TODO: Implement actual data fetching
  return [
    { id: '1', name: 'Tech Enthusiasts', memberCount: 1000, role: 'creator' },
    { id: '2', name: 'Book Club', memberCount: 500, role: 'member' },
    { id: '3', name: 'Fitness Fanatics', memberCount: 750, role: 'member' },
  ]
}

export default async function MyCommunities() {
  const communities = await getMyCommunities()

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Communities</h1>
      {communities.length === 0 ? (
        <p className="text-center text-gray-500">You haven't joined or created any communities yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {communities.map((community) => (
            <Card key={community.id} className="flex flex-col justify-between">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{community.name}</CardTitle>
                  <Badge variant={community.role === 'creator' ? 'default' : 'secondary'}>
                    {community.role === 'creator' ? 'Creator' : 'Member'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-4">{community.memberCount} members</p>
                <Button asChild className="w-full">
                  <Link href={`/communities/${community.id}`}>View Community</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <div className="flex justify-center mt-8">
        <Button asChild>
          <Link href="/create-community">Create New Community</Link>
        </Button>
      </div>
    </div>
  )
}

