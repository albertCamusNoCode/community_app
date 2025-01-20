import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getUser } from "@/app/actions/auth";
import { CommunityHeader } from "./components/header";
import { EventsCard } from "@/app/dashboard/events/events-card";
import { TrendingPosts } from "./components/trending-posts";
import { PostForm } from "./components/post-form";
import { getCommunity } from "@/app/actions/community";
import { getPosts } from "@/app/actions/post";
import { getEvents } from "@/app/actions/events";
import PostFeed from "./components/post-feed";
import { PostFeedProvider } from "./components/post-feed-context";
import { PostWithMetadata } from "@/app/actions/post";

export default async function CommunityPage({
  params,
}: {
  params: { id: string };
}) {
  const currentUser = await getUser();
  if (!currentUser) {
    throw new Error("Unauthorized");
  }

  const communityId = await Promise.resolve(params.id);

  try {
    const [community, posts, events] = await Promise.all([
      getCommunity(communityId),
      getPosts(communityId),
      getEvents(communityId),
    ]);

    if (!community) {
      notFound();
    }

    const trendingPosts = posts
      .sort((a, b) => (b.reactions?.length || 0) - (a.reactions?.length || 0))
      .slice(0, 5);

    return (
      <PostFeedProvider initialPosts={posts}>
        <div className="min-h-screen bg-background">
          <CommunityHeader community={community} />
          <div className="container py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <PostForm
                  communityId={communityId}
                  communityName={community.name}
                  currentUser={currentUser}
                  trigger={
                    <Button className="w-full flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
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
        </div>
      </PostFeedProvider>
    );
  } catch (error) {
    console.error('Error loading community page:', error);
    throw error;
  }
}
