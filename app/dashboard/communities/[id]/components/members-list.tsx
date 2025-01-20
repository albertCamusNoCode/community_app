'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Database } from '@/lib/supabase/supabase-types';

type Profile = Database['public']['Tables']['profiles']['Row'];
type CommunityMember = Database['public']['Tables']['community_members']['Row'];

interface MemberWithProfile extends Omit<CommunityMember, 'community_id' | 'created_at'> {
  profiles: Pick<Profile, 'id' | 'name' | 'avatar_url' | 'email'>;
}

export function MembersList({ communityId }: { communityId: string }) {
  const [members, setMembers] = useState<MemberWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchMembers = async () => {
      const { data, error } = await supabase
        .from('community_members')
        .select(`
          user_id,
          role,
          profiles:user_id (
            id,
            name,
            avatar_url,
            email
          )
        `)
        .eq('community_id', communityId);

      if (!error && data) {
        setMembers(data as unknown as MemberWithProfile[]);
      }
      setLoading(false);
    };

    const channel = supabase
      .channel('members_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'community_members',
          filter: `community_id=eq.${communityId}`,
        },
        () => {
          fetchMembers();
        }
      )
      .subscribe();

    fetchMembers();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [communityId, supabase]);

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Member</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.map((member) => (
          <TableRow key={member.user_id}>
            <TableCell className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={member.profiles.avatar_url || undefined} />
                <AvatarFallback>
                  {member.profiles.name?.charAt(0) || '?'}
                </AvatarFallback>
              </Avatar>
              {member.profiles.name}
            </TableCell>
            <TableCell>{member.profiles.email}</TableCell>
            <TableCell>
              <Badge variant={member.role === 'admin' ? 'default' : 'secondary'}>
                {member.role}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
