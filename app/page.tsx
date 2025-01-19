import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="space-y-6 text-center">
      <h1 className="text-4xl font-bold">Welcome to Community App</h1>
      <p className="text-xl">Connect, share, and grow with your community</p>
      <div className="flex justify-center">
        <Button variant="outline" asChild>
          <Link href="/create-community">Create a Community</Link>
        </Button>
      </div>
    </div>
  )
}

