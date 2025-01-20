-- Create enum for invite status
CREATE TYPE invite_status AS ENUM ('pending', 'accepted', 'expired', 'cancelled');

-- Create community_invites table
CREATE TABLE community_invites (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    community_id UUID NOT NULL REFERENCES communities(id) ON DELETE CASCADE,
    email TEXT,
    invite_token TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    status invite_status DEFAULT 'pending',
    inviter_id UUID NOT NULL REFERENCES auth.users(id),
    CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Create index for faster token lookups
CREATE INDEX idx_community_invites_token ON community_invites(invite_token);

-- Create index for listing invites by community
CREATE INDEX idx_community_invites_community ON community_invites(community_id);

-- Create RLS policies
ALTER TABLE community_invites ENABLE ROW LEVEL SECURITY;

-- Policy for inserting invites (only community admins can create invites)
CREATE POLICY "Community admins can create invites"
    ON community_invites FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM community_members
            WHERE community_members.community_id = community_invites.community_id
            AND community_members.user_id = auth.uid()
            AND community_members.role = 'admin'
        )
    );

-- Policy for viewing invites (community admins can view invites)
CREATE POLICY "Community admins can view invites"
    ON community_invites FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM community_members
            WHERE community_members.community_id = community_invites.community_id
            AND community_members.user_id = auth.uid()
            AND community_members.role = 'admin'
        )
        OR
        -- Allow users to view their own invites by email
        (email = (SELECT email FROM public.profiles WHERE id = auth.uid()) AND status = 'pending')
    );

-- Policy for updating invites (community admins can update invites)
CREATE POLICY "Community admins can update invites"
    ON community_invites FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM community_members
            WHERE community_members.community_id = community_invites.community_id
            AND community_members.user_id = auth.uid()
            AND community_members.role = 'admin'
        )
        OR
        -- Allow users to accept their own invites
        (email = (SELECT email FROM public.profiles WHERE id = auth.uid()) AND status = 'pending')
    );

-- Function to clean up expired invites
CREATE OR REPLACE FUNCTION cleanup_expired_invites()
RETURNS trigger AS $$
BEGIN
    UPDATE community_invites
    SET status = 'expired'
    WHERE expires_at < CURRENT_TIMESTAMP
    AND status = 'pending';
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically cleanup expired invites
CREATE TRIGGER cleanup_expired_invites_trigger
    AFTER INSERT OR UPDATE ON community_invites
    EXECUTE FUNCTION cleanup_expired_invites();
