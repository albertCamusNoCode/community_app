import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Manage Communities</CardTitle>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/my-communities">My Communities</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Manage Events</CardTitle>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/events">View Events</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Manage Members</CardTitle>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/members">View Members</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

