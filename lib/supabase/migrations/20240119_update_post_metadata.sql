begin;

-- Drop the existing function
drop function if exists get_post_with_metadata(uuid);

-- Create the new function
create function get_post_with_metadata(post_id uuid)
returns table (
  id uuid,
  community_id uuid,
  user_id uuid,
  title text,
  content text,
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  is_pinned boolean,
  is_locked boolean,
  parent_id uuid,
  author json,
  reactions_count json,
  current_user_reactions json,
  replies_count bigint
)
language sql
stable
as $$
  with base_counts as (
    select 
      post_id,
      reaction_type,
      count(*) as count
    from post_reactions
    where post_id = $1
    group by post_id, reaction_type
  ),
  reaction_counts as (
    select 
      post_id,
      jsonb_object_agg(
        reaction_type,
        count
      ) as counts
    from base_counts
    group by post_id
  ),
  user_reactions as (
    select 
      post_id,
      array_agg(reaction_type)::text[] as reactions
    from post_reactions
    where post_id = $1 and user_id = auth.uid()
    group by post_id
  )
  select 
    p.*,
    json_build_object(
      'id', u.id,
      'email', u.email,
      'created_at', u.created_at
    ) as author,
    coalesce(rc.counts::json, '{}'::json) as reactions_count,
    coalesce(to_json(ur.reactions), '[]'::json) as current_user_reactions,
    (
      select count(*)
      from posts replies
      where replies.parent_id = p.id
    ) as replies_count
  from posts p
  left join auth.users u on p.user_id = u.id
  left join reaction_counts rc on p.id = rc.post_id
  left join user_reactions ur on p.id = ur.post_id
  where p.id = $1;
$$;

commit;