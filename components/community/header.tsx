"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";

interface Community {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  userRole: "creator" | "member" | "none";
}

export function CommunityHeader({ community }: { community: Community }) {
  const [userRole, setUserRole] = useState(community.userRole);

  const handleJoin = async () => {
    // TODO: Implement actual join logic
    setUserRole("member");
  };

  const handleLeave = async () => {
    // TODO: Implement actual leave logic
    setUserRole("none");
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{community.name}</h1>
          <p className="text-muted-foreground mt-1">{community.description}</p>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="secondary">{community.memberCount} members</Badge>
            {userRole === "none" ? (
              <Button size="sm" onClick={handleJoin}>
                Join Community
              </Button>
            ) : userRole === "member" ? (
              <Button size="sm" variant="outline" onClick={handleLeave}>
                Leave Community
              </Button>
            ) : null}
          </div>
        </div>
        {userRole === "creator" && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit Community</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Delete Community
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}
