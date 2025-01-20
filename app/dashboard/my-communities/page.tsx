import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CommunityGrid } from "./components/community-grid";
import { getMyCommunities } from "@/actions/community";

export default async function MyCommunities() {
  const communities = await getMyCommunities();

  return (
    <div className="space-y-6" data-oid="bbd5y80">
      <div className="flex justify-between items-center" data-oid="oxk8y20">
        <h1 className="text-3xl font-bold">My Communities</h1>
        <Button asChild data-oid="m.c86pv">
          <Link href="/dashboard/create-community" data-oid="hlhzgxp">
            Create New Community
          </Link>
        </Button>
      </div>
      
      {communities.length === 0 ? (
        <div className="text-center py-12" data-oid=":ih:-0g">
          <p className="text-gray-500 mb-4">
            You haven't joined or created any communities yet.
          </p>
          <p className="text-sm text-gray-400">
            Join a community to connect with others or create your own!
          </p>
        </div>
      ) : (
        <CommunityGrid communities={communities} />
      )}
    </div>
  );
}
