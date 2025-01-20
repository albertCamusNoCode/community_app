'use client';

import { Button } from "@/components/ui/button";
import { acceptInvite } from "@/app/actions/community-invites";
import { useRouter } from "next/navigation";
import { toast } from "@/app/actions/use-toast";
import { useState } from "react";

interface AcceptInviteButtonProps {
  token: string;
  communityName: string;
}

export function AcceptInviteButton({ token, communityName }: AcceptInviteButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleAcceptInvite = async () => {
    try {
      setIsLoading(true);
      await acceptInvite(token);
      toast({
        title: "Success!",
        description: `You have joined ${communityName}`,
      });
      router.push("/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to accept invite. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      className="w-full" 
      onClick={handleAcceptInvite}
      disabled={isLoading}
    >
      {isLoading ? "Accepting..." : "Accept Invite"}
    </Button>
  );
}
