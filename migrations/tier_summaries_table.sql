-- Create tier_summaries table to store calculation parameters and results
create table public.tier_summaries (
  id uuid not null default gen_random_uuid(),
  created_at timestamp with time zone not null default now(),
  tier_id uuid not null,
  project_id uuid not null,
  user_id uuid not null,
  input_tokens integer not null default 1000000,
  output_tokens integer not null default 1000000,
  image_count integer not null default 100,
  video_seconds integer not null default 45,
  text_margin_percentage integer not null default 0,
  image_margin_percentage integer not null default 0,
  video_margin_percentage integer not null default 0,
  text_use_expensive_model boolean not null default true,
  image_use_expensive_model boolean not null default true,
  video_use_expensive_model boolean not null default true,
  operational_overhead_percentage integer not null default 20,
  constraint tier_summaries_pkey primary key (id),
  constraint tier_summaries_tier_id_fkey foreign key (tier_id) references tiers (id) on delete cascade,
  constraint tier_summaries_project_id_fkey foreign key (project_id) references projects (id) on delete cascade,
  constraint tier_summaries_user_id_fkey foreign key (user_id) references auth.users (id) on delete cascade,
  constraint tier_summaries_tier_id_unique unique (tier_id)
);

-- Add RLS policies for tier_summaries table
alter table public.tier_summaries enable row level security;

-- Policy for selecting tier summaries (users can only see their own tier summaries)
create policy "Users can view their own tier summaries"
  on public.tier_summaries for select
  using (auth.uid() = user_id);

-- Policy for inserting tier summaries (users can only insert their own tier summaries)
create policy "Users can insert their own tier summaries"
  on public.tier_summaries for insert
  with check (auth.uid() = user_id);

-- Policy for updating tier summaries (users can only update their own tier summaries)
create policy "Users can update their own tier summaries"
  on public.tier_summaries for update
  using (auth.uid() = user_id);

-- Policy for deleting tier summaries (users can only delete their own tier summaries)
create policy "Users can delete their own tier summaries"
  on public.tier_summaries for delete
  using (auth.uid() = user_id);