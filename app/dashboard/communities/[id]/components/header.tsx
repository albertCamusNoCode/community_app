import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Community } from "@/actions/community";
import { joinCommunity } from "@/actions/community";

async function joinCommunityAction(formData: FormData) {
  "use server";
  const communityId = formData.get("communityId") as string;
  await joinCommunity(communityId);
}

export function CommunityHeader({ community }: { community: Community }) {
  return (
    <Card className="mb-6 overflow-hidden">
      <div className="relative h-[300px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${community.image_url})` }}
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">{community.name}</h1>
          <p className="text-lg opacity-90">{community.description}</p>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm opacity-75">
                {(community.member_count || 0).toLocaleString()} members
              </span>
            </div>
            {!community.userRole && (
              <form action={joinCommunityAction}>
                <input type="hidden" name="communityId" value={community.id} />
                <Button type="submit" variant="secondary">Join Community</Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
