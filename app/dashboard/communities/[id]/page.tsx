import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PostFeed } from "@/components/post/post-feed";
import { PostForm } from "@/components/post/post-form";
import { getCurrentUser } from "@/actions/post";
import { getCommunity } from "@/actions/community";
import Link from "next/link";

interface Event {
  date: string;
  month: string;
  title: string;
}

interface TrendingPost {
  id: string;
  title: string;
  author: {
    name: string;
    image: string;
  };
}

interface Community {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  userRole: "creator" | "member" | "none";
  heroImage: string;
}

const upcomingEvents: Event[] = [
  { date: "7", month: "MAR", title: "Weekly Q&A: Building healthy habits" },
  { date: "9", month: "MAR", title: "Mindfulness w/ surprise special guest" },
  { date: "14", month: "MAR", title: "Weekly Coaching Session Live call" },
  {
    date: "21",
    month: "MAR",
    title: "Foundations of healthy sustainable relationships",
  },
];

const trendingPosts: TrendingPost[] = [
  {
    id: "1",
    title: "How to incorporate mindfulness techniques in a thriving business?",
    author: {
      name: "David Chen",
      image: "https://api.dicebear.com/6.x/initials/svg?seed=DC",
    },
  },
  {
    id: "2",
    title:
      "Has anyone else noticed a surge in inspiration since starting their practice?",
    author: {
      name: "Sarah Miller",
      image: "https://api.dicebear.com/6.x/initials/svg?seed=SM",
    },
  },
  {
    id: "3",
    title: "How do you juggle daily meditation with a hectic schedule?",
    author: {
      name: "Rachel Kim",
      image: "https://api.dicebear.com/6.x/initials/svg?seed=RK",
    },
  },
];

async function getCommunity(id: string): Promise<Community | null> {
  // TODO: Implement actual data fetching
  return {
    id,
    name: "ModernMind™",
    description: "A community for mindful living and personal growth",
    memberCount: 1000,
    userRole: "member",
    heroImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-oxBQXCffWRgCXJuvwqgF4RdDzCu15e.png",
  };
}

export default async function CommunityPage({
  params,
}: {
  params: { id: string };
}) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Unauthorized");
  }

  const community = await getCommunity(params.id);

  if (!community) {
    notFound();
  }

  return (
    <div className="flex w-full max-w-7xl mx-auto">
      <div className="flex-1 px-4 py-6">
        <Card className="mb-6 overflow-hidden">
          <div className="relative h-[300px]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${community.heroImage})` }}
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h1 className="text-3xl font-bold mb-2">{community.name}</h1>
              <p className="text-lg opacity-90">{community.description}</p>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm opacity-75">
                    {community.memberCount.toLocaleString()} members
                  </span>
                </div>
                {community.userRole === "none" && (
                  <Button variant="secondary">Join Community</Button>
                )}
              </div>
            </div>
          </div>
        </Card>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Posts</h2>
          <PostForm
            communityId={community.id}
            communityName={community.name}
            currentUser={currentUser}
            trigger={
              <Button>
                <svg
                  className="mr-2 h-4 w-4"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line x1="12" x2="12" y1="5" y2="19" />
                  <line x1="5" x2="19" y1="12" y2="12" />
                </svg>
                New Post
              </Button>
            }
          />
        </div>

        <PostFeed communityId={community.id} />
      </div>

      {/* Right Sidebar */}
      <div className="hidden xl:flex xl:flex-col xl:w-80 space-y-6 p-6">
        <Card>
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
  );
}
