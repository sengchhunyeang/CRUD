-- Run this in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.

create table if not exists public.items (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  description text not null default '',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Keep updated_at current on every update.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists items_set_updated_at on public.items;
create trigger items_set_updated_at
  before update on public.items
  for each row execute function public.set_updated_at();

-- The app connects with the publishable key (the "anon" role), so RLS policies must allow it.
-- WARNING: these policies let anyone who has the publishable key read and modify every item.
-- Fine for learning; add Supabase Auth and per-user policies before using real data.
alter table public.items enable row level security;

drop policy if exists "Public read items" on public.items;
create policy "Public read items" on public.items
  for select to anon, authenticated using (true);

drop policy if exists "Public insert items" on public.items;
create policy "Public insert items" on public.items
  for insert to anon, authenticated with check (true);

drop policy if exists "Public update items" on public.items;
create policy "Public update items" on public.items
  for update to anon, authenticated using (true) with check (true);

drop policy if exists "Public delete items" on public.items;
create policy "Public delete items" on public.items
  for delete to anon, authenticated using (true);
