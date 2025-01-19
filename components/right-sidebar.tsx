import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

export function RightSidebar() {
  return (
    <div
      className="hidden xl:flex xl:flex-col xl:w-80 xl:fixed xl:right-0 xl:top-0 xl:bottom-0 xl:z-50 bg-white border-l"
      data-oid="7xzbln2"
    >
      <div
        className="flex flex-col flex-grow p-4 overflow-y-auto"
        data-oid="f1bxu.d"
      >
        <Card className="mb-6" data-oid="db0r4n-">
          <CardHeader data-oid="pnct.pz">
            <CardTitle className="text-lg" data-oid="o2r9rdd">
              Upcoming events
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4" data-oid="zc70sn5">
            {upcomingEvents.map((event, index) => (
              <div
                key={index}
                className="flex items-start space-x-4"
                data-oid=".n_phfp"
              >
                <div
                  className="text-center bg-gray-100 px-3 py-1 rounded"
                  data-oid="3d1a17x"
                >
                  <div className="text-lg font-semibold" data-oid="-h9103i">
                    {event.date}
                  </div>
                  <div className="text-xs text-gray-500" data-oid="i7b8yka">
                    {event.month}
                  </div>
                </div>
                <div className="flex-1" data-oid="--8i75r">
                  <p className="text-sm font-medium" data-oid="fdotxfw">
                    {event.title}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card data-oid="63u3kr5">
          <CardHeader data-oid="nb8om7b">
            <CardTitle className="text-lg" data-oid="ma1ulo3">
              Trending posts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4" data-oid="0iz8ja4">
            {trendingPosts.map((post) => (
              <div
                key={post.id}
                className="flex items-start space-x-3"
                data-oid="4ipnl.p"
              >
                <Avatar className="w-8 h-8" data-oid="99iqkiz">
                  <AvatarImage
                    src={post.author.image}
                    alt={post.author.name}
                    data-oid="r40128r"
                  />

                  <AvatarFallback data-oid="nt6s8d6">
                    {post.author.name[0]}
                  </AvatarFallback>
                </Avatar>
                <p className="text-sm font-medium" data-oid="cmg-teu">
                  {post.title}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
