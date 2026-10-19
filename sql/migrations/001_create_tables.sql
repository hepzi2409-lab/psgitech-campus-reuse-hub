-- 001_create_tables.sql

-- NOTE: Apply these in your Supabase SQL editor or migration pipeline. Review before running.

create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique not null,
  full_name text,
  avatar_url text,
  role text,
  created_at timestamptz default now()
);

create table if not exists reuse_items (
  id uuid primary key default gen_random_uuid(),
  owner uuid references profiles(user_id) on delete set null,
  title text not null,
  description text,
  condition text,
  location geometry,
  images text[],
  is_available boolean default true,
  created_at timestamptz default now()
);

create table if not exists item_requests (
  id uuid primary key default gen_random_uuid(),
  item_id uuid references reuse_items(id) on delete cascade,
  requester uuid not null,
  message text,
  status text default 'open',
  created_at timestamptz default now()
);

create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  recipient uuid not null,
  payload jsonb,
  read boolean default false,
  created_at timestamptz default now()
);
