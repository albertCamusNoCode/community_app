import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { Community } from "@/actions/community";

export function CommunityGrid({ communities }: { communities: Community[] }) {
  if (communities.length === 0) {
    return (
      <p className="text-center text-gray-500">
        You haven't joined or created any communities yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {communities.map((community) => (
        <Link key={community.id} href={`/dashboard/communities/${community.id}`}>
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={community.image_url || undefined} />
                  <AvatarFallback>{community.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{community.name}</CardTitle>
                  <CardDescription>
                    {(community.member_count || 0).toLocaleString()} members
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {community.description}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
