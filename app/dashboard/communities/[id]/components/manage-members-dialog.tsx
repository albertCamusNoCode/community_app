'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MembersList } from './members-list';
import { EmailInviteForm } from './email-invite-form';
import { InviteLinkGenerator } from './invite-link-generator';
import { Users } from 'lucide-react';

interface ManageMembersDialogProps {
  communityId: string;
  communityName: string;
}

export function ManageMembersDialog({
  communityId,
  communityName,
}: ManageMembersDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Users className="h-4 w-4" />
          Manage Members
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Manage Community Members</DialogTitle>
          <DialogDescription>
            Invite new members and manage existing members of {communityName}.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="members" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="email">Email Invites</TabsTrigger>
            <TabsTrigger value="link">Invite Link</TabsTrigger>
          </TabsList>

          <TabsContent value="members" className="mt-4">
            <MembersList communityId={communityId} />
          </TabsContent>

          <TabsContent value="email" className="mt-4">
            <EmailInviteForm 
              communityId={communityId} 
              communityName={communityName} 
            />
          </TabsContent>

          <TabsContent value="link" className="mt-4">
            <InviteLinkGenerator 
              communityId={communityId} 
              communityName={communityName}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
