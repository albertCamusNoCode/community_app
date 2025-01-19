import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Community {
  id: string;
  name: string;
  memberCount: number;
  role: "creator" | "member";
}

async function getMyCommunities(): Promise<Community[]> {
  // TODO: Implement actual data fetching
  return [
    { id: "1", name: "Tech Enthusiasts", memberCount: 1000, role: "creator" },
    { id: "2", name: "Book Club", memberCount: 500, role: "member" },
    { id: "3", name: "Fitness Fanatics", memberCount: 750, role: "member" },
  ];
}

export default async function MyCommunities() {
  const communities = await getMyCommunities();

  return (
    <div className="space-y-6" data-oid="bbd5y80">
      <h1 className="text-3xl font-bold" data-oid="oxk8y20">
        My Communities
      </h1>
      {communities.length === 0 ? (
        <p className="text-center text-gray-500" data-oid=":ih:-0g">
          You haven't joined or created any communities yet.
        </p>
      ) : (
        <div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          data-oid="_802rjy"
        >
          {communities.map((community) => (
            <Card
              key={community.id}
              className="flex flex-col justify-between"
              data-oid="m0coqzm"
            >
              <CardHeader data-oid="11kwieo">
                <div
                  className="flex justify-between items-start"
                  data-oid="z0audfv"
                >
                  <CardTitle className="text-lg" data-oid="pfb_ps4">
                    {community.name}
                  </CardTitle>
                  <Badge
                    variant={
                      community.role === "creator" ? "default" : "secondary"
                    }
                    data-oid="90lk9ow"
                  >
                    {community.role === "creator" ? "Creator" : "Member"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent data-oid="b:b.p7k">
                <p className="text-sm text-gray-500 mb-4" data-oid="qa_:02f">
                  {community.memberCount} members
                </p>
                <Button asChild className="w-full" data-oid="lwm3fvr">
                  <Link
                    href={`/dashboard/communities/${community.id}`}
                    data-oid="2w4b7xw"
                  >
                    View Community
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <div className="flex justify-center mt-8" data-oid="75reb9.">
        <Button asChild data-oid="m.c86pv">
          <Link href="/create-community" data-oid="hlhzgxp">
            Create New Community
          </Link>
        </Button>
      </div>
    </div>
  );
}
