'use server';

import { notFound } from "next/navigation";
import { validateInvite } from "@/app/actions/community-invites";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { AcceptInviteButton } from "./accept-invite-button";

export default async function InvitePage(props: any) {
  // Ensure we handle the token as a Promise
  const token = await Promise.resolve(props.params.token);
  const validationResult = await validateInvite(token);

  if (!validationResult.valid || !validationResult.communityName) {
    notFound();
  }

  // After validation, we know these values exist
  const inviteData = {
    communityName: validationResult.communityName,
    inviterName: validationResult.inviterName || 'Someone'
  };

  return (
    <div className="container flex items-center justify-center min-h-screen">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Community Invite
          </CardTitle>
          <CardDescription>
            You've been invited to join {inviteData.communityName}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {inviteData.inviterName} has invited you to join their community
          </p>
        </CardContent>
        <CardFooter>
          <AcceptInviteButton token={token} communityName={inviteData.communityName} />
        </CardFooter>
      </Card>
    </div>
  );
}
