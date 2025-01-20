'use client';

import { notFound } from "next/navigation";
import { validateInvite, acceptInvite } from "@/app/actions/community-invites";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "@/app/actions/use-toast";

export default async function InvitePage({
  params,
}: {
  params: { token: string };
}) {
  const router = useRouter();
  const { valid, communityName, inviterName } = await validateInvite(params.token);

  if (!valid) {
    notFound();
  }

  const handleAcceptInvite = async () => {
    try {
      await acceptInvite(params.token);
      toast({
        title: "Welcome to the community!",
        description: `You have successfully joined ${communityName}.`,
      });
      router.push('/dashboard');
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to join community",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Join {communityName}</CardTitle>
          <CardDescription>
            You have been invited by {inviterName} to join {communityName}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            Click the button below to accept the invitation and join the community.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={handleAcceptInvite} size="lg">
            Accept Invitation
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
