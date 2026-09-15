-- Kapp schema. Run once in the Supabase SQL editor.
--
-- Isolation is the point of this file. CLAUDE.md §2: "exactly one student's
-- documents per request. Never two. The three users are classmates applying to
-- overlapping schools." Application code can have bugs, so isolation is
-- enforced in the database with row-level security: every policy below is
-- `auth.uid() = user_id`, so a user physically cannot read another user's rows
-- even if a server route asks for them.

-- ---------------------------------------------------------------- profiles
create table if not exists public.profiles (
  id          uuid primary key references auth.users on delete cascade,
  display_name text not null default '',
  created_at  timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "own profile" on public.profiles;
create policy "own profile" on public.profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

-- Create a profile row automatically on signup.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- --------------------------------------------------------------- documents
-- One student's uploaded material. classification mirrors master-prompt.md §1.
-- Postgres has no CREATE TYPE IF NOT EXISTS, so guard it.
do $$ begin
  create type public.doc_classification
    as enum ('current', 'historical', 'prospective', 'private');
exception when duplicate_object then null;
end $$;

create table if not exists public.documents (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references auth.users on delete cascade,
  title          text not null,
  classification public.doc_classification not null,
  body           text not null,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index if not exists documents_user_idx on public.documents (user_id, created_at);

alter table public.documents enable row level security;

drop policy if exists "own documents" on public.documents;
create policy "own documents" on public.documents
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ----------------------------------------------------------- conversations
create table if not exists public.conversations (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users on delete cascade,
  title      text not null default 'Untitled',
  created_at timestamptz not null default now()
);

create index if not exists conversations_user_idx on public.conversations (user_id, created_at desc);

alter table public.conversations enable row level security;

drop policy if exists "own conversations" on public.conversations;
create policy "own conversations" on public.conversations
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------------------------------------------------------------- messages
create table if not exists public.messages (
  id              uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations on delete cascade,
  user_id         uuid not null references auth.users on delete cascade,
  role            text not null check (role in ('user', 'assistant')),
  content         text not null,
  -- Citations and usage for an assistant turn, as returned by the API.
  meta            jsonb,
  created_at      timestamptz not null default now()
);

create index if not exists messages_conversation_idx on public.messages (conversation_id, created_at);

alter table public.messages enable row level security;

drop policy if exists "own messages" on public.messages;
create policy "own messages" on public.messages
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- updated_at maintenance
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

drop trigger if exists documents_touch on public.documents;
create trigger documents_touch before update on public.documents
  for each row execute function public.touch_updated_at();
