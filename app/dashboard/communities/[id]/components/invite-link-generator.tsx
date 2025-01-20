'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/app/actions/use-toast';
import { generateInviteLink } from '@/app/actions/community-invites';
import { Copy, Link, RefreshCw } from 'lucide-react';

interface InviteLinkGeneratorProps {
  communityId: string;
  communityName: string;
}

export function InviteLinkGenerator({
  communityId,
  communityName,
}: InviteLinkGeneratorProps) {
  const [inviteLink, setInviteLink] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateNewLink = async () => {
    setIsGenerating(true);
    try {
      const link = await generateInviteLink(communityId);
      setInviteLink(link);
    } catch (error) {
      toast({
        title: 'Error generating invite link',
        description: 'There was an error generating the invite link. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      toast({
        title: 'Link copied',
        description: 'The invite link has been copied to your clipboard.',
      });
    } catch (error) {
      toast({
        title: 'Error copying link',
        description: 'There was an error copying the link. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={inviteLink}
          placeholder="Generate an invite link"
          readOnly
        />
        <Button
          variant="outline"
          size="icon"
          onClick={copyToClipboard}
          disabled={!inviteLink || isGenerating}
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>

      <Button
        onClick={generateNewLink}
        disabled={isGenerating}
        className="w-full gap-2"
      >
        {isGenerating ? (
          <RefreshCw className="h-4 w-4 animate-spin" />
        ) : (
          <Link className="h-4 w-4" />
        )}
        Generate New Invite Link
      </Button>

      <p className="text-sm text-muted-foreground">
        This link will expire in 7 days. You can generate a new link at any time.
      </p>
    </div>
  );
}
