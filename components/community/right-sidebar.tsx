import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface Event {
  date: string
  month: string
  title: string
}

interface TrendingPost {
  id: string
  title: string
  author: {
    name: string
    image: string
  }
}

const upcomingEvents: Event[] = [
  { date: '7', month: 'MAR', title: 'Weekly Q&A: Building healthy habits' },
  { date: '9', month: 'MAR', title: 'Mindfulness w/ surprise special guest' },
  { date: '14', month: 'MAR', title: 'Weekly Coaching Session Live call' },
  { date: '21', month: 'MAR', title: 'Foundations of healthy sustainable relationships' },
]

const trendingPosts: TrendingPost[] = [
  {
    id: '1',
    title: 'How to incorporate mindfulness techniques in a thriving business?',
    author: {
      name: 'David Chen',
      image: 'https://api.dicebear.com/6.x/initials/svg?seed=DC'
    }
  },
  {
    id: '2',
    title: 'Has anyone else noticed a surge in inspiration since starting their practice?',
    author: {
      name: 'Sarah Miller',
      image: 'https://api.dicebear.com/6.x/initials/svg?seed=SM'
    }
  },
  {
    id: '3',
    title: 'How do you juggle daily meditation with a hectic schedule?',
    author: {
      name: 'Rachel Kim',
      image: 'https://api.dicebear.com/6.x/initials/svg?seed=RK'
    }
  }
]

export function RightSidebar() {
  return (
    <div className="hidden xl:flex xl:flex-col xl:w-80 xl:fixed xl:right-0 xl:inset-y-0 bg-white border-l">
      <div className="flex flex-col flex-grow p-4 overflow-y-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Upcoming events</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="text-center bg-gray-100 px-3 py-1 rounded">
                  <div className="text-lg font-semibold">{event.date}</div>
                  <div className="text-xs text-gray-500">{event.month}</div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{event.title}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Trending posts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {trendingPosts.map((post) => (
              <div key={post.id} className="flex items-start space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={post.author.image} alt={post.author.name} />
                  <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                </Avatar>
                <p className="text-sm font-medium">{post.title}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

