import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/actions/post";
import { CommunityHeader } from "./components/header";
import { EventsCard } from "./components/events-card";
import { TrendingPosts } from "./components/trending-posts";
import { PostForm } from "./post-form";
import { getCommunity } from "@/actions/community";
import { getPosts } from "@/actions/post";
import PostFeed from "./post-feed";
import { PostFeedProvider } from "./post-feed-context";
import { PostWithMetadata } from "@/actions/post";

export default async function CommunityPage({
  params,
}: {
  params: { id: string };
}) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Unauthorized");
  }

  const communityId = params.id;

  try {
    const [community, posts] = await Promise.all([
      getCommunity(communityId),
      getPosts(communityId),
    ]);

    if (!community) {
      notFound();
    }

    // Mock data for events and trending posts
    const events = [
      { date: "15", month: "Jan", title: "Community Meetup" },
      { date: "22", month: "Jan", title: "Workshop: Getting Started" },
    ];

    const trendingPosts = posts
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 3)
      .map(post => ({
        id: post.id,
        title: post.title || post.content.slice(0, 50) + "...",
        author: {
          name: post.author.name || post.author.email?.split("@")[0] || "Anonymous",
          image: post.author.avatar_url || `/placeholder.svg`
        }
      }));

    return (
      <PostFeedProvider initialPosts={posts}>
        <div className="flex flex-col gap-4">
          <CommunityHeader community={community} />
          <div className="grid grid-cols-1 lg:grid-cols-[1fr,320px] gap-4">
            <div className="flex flex-col gap-4">
              <PostForm 
                communityId={communityId} 
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
                      <path d="M12 5v14" />
                      <path d="M5 12h14" />
                    </svg>
                    New Post
                  </Button>
                }
              />
              <PostFeed communityId={communityId} />
            </div>
            <div className="flex flex-col gap-4">
              <EventsCard events={events} />
              <TrendingPosts posts={trendingPosts} />
            </div>
          </div>
        </div>
      </PostFeedProvider>
    );
  } catch (error) {
    console.error('Error loading community page:', error);
    throw error;
  }
}
