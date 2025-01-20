'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/app/actions/use-toast';
import { sendEmailInvites } from '@/app/actions/community-invites';
import { Mail, Plus, X } from 'lucide-react';

interface EmailInviteFormProps {
  communityId: string;
  communityName: string;
}

export function EmailInviteForm({
  communityId,
  communityName,
}: EmailInviteFormProps) {
  const [emails, setEmails] = useState<string[]>(['']);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailChange = (index: number, value: string) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  const addEmailField = () => {
    setEmails([...emails, '']);
  };

  const removeEmailField = (index: number) => {
    if (emails.length === 1) return;
    const newEmails = emails.filter((_, i) => i !== index);
    setEmails(newEmails);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Filter out empty emails and validate format
      const validEmails = emails.filter((email) => {
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (email && !isValid) {
          toast({
            title: 'Invalid email format',
            description: `${email} is not a valid email address.`,
            variant: 'destructive',
          });
        }
        return email && isValid;
      });

      if (validEmails.length === 0) {
        toast({
          title: 'No valid emails',
          description: 'Please enter at least one valid email address.',
          variant: 'destructive',
        });
        return;
      }

      await sendEmailInvites(communityId, validEmails);

      toast({
        title: 'Invites sent successfully',
        description: `Invitations have been sent to ${validEmails.length} email${
          validEmails.length === 1 ? '' : 's'
        }.`,
      });

      // Reset form
      setEmails(['']);
    } catch (error) {
      toast({
        title: 'Error sending invites',
        description: 'There was an error sending the invitations. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4">
        {emails.map((email, index) => (
          <div key={index} className="flex gap-2">
            <Input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => handleEmailChange(index, e.target.value)}
              disabled={isSubmitting}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeEmailField(index)}
              disabled={emails.length === 1 || isSubmitting}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full gap-2"
        onClick={addEmailField}
        disabled={isSubmitting}
      >
        <Plus className="h-4 w-4" />
        Add Another Email
      </Button>

      <Button
        type="submit"
        className="w-full gap-2"
        disabled={isSubmitting}
      >
        <Mail className="h-4 w-4" />
        Send Invites
      </Button>
    </form>
  );
}
