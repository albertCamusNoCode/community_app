create table if not exists public.replies (
  id uuid default gen_random_uuid() primary key,
  content text not null,
  post_id uuid not null references public.posts(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete cascade,
  parent_reply_id uuid references public.replies(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add RLS policies
alter table public.replies enable row level security;

create policy "Users can view all replies"
  on public.replies for select
  using (true);

create policy "Authenticated users can insert replies"
  on public.replies for insert
  with check (auth.role() = 'authenticated');

create policy "Users can update their own replies"
  on public.replies for update
  using (auth.uid() = author_id);

create policy "Users can delete their own replies"
  on public.replies for delete
  using (auth.uid() = author_id);

-- Add indexes
create index replies_post_id_idx on public.replies(post_id);
create index replies_author_id_idx on public.replies(author_id);
create index replies_parent_reply_id_idx on public.replies(parent_reply_id);
