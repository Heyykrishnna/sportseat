create extension if not exists "pgcrypto";

create table if not exists public.sports (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.venues (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  address text not null,
  city text not null,
  capacity integer,
  image_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  sport text not null,
  category text not null,
  title text not null,
  subtitle text not null,
  venue text not null,
  event_date date not null,
  start_time time not null,
  duration_minutes integer not null check (duration_minutes > 0),
  rating numeric(3, 1) not null default 0 check (rating >= 0 and rating <= 10),
  votes_count integer not null default 0 check (votes_count >= 0),
  age_rating text not null default 'All Ages',
  seats_left integer not null default 0 check (seats_left >= 0),
  price_standard integer not null check (price_standard >= 0),
  price_premium integer not null check (price_premium >= 0),
  cover_image_url text not null,
  hero_image_url text,
  description text not null,
  highlights text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.event_tags (
  event_id uuid not null references public.events(id) on delete cascade,
  tag text not null,
  primary key (event_id, tag)
);

create table if not exists public.event_gallery (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  image_url text not null,
  sort_order integer not null default 0
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  booking_reference text not null unique default ('SPT-' || upper(substring(md5(random()::text), 1, 10))),
  customer_email text not null,
  event_id uuid not null references public.events(id) on delete restrict,
  seats jsonb not null default '[]'::jsonb,
  total_amount integer not null check (total_amount >= 0),
  status text not null check (status in ('pending', 'confirmed', 'cancelled', 'failed')),
  payment_confirmation_id text,
  created_at timestamptz not null default now()
);

create index if not exists idx_events_event_date on public.events(event_date);
create index if not exists idx_events_sport on public.events(sport);
create index if not exists idx_events_category on public.events(category);
create index if not exists idx_bookings_customer_email on public.bookings(customer_email);
create index if not exists idx_bookings_event_id on public.bookings(event_id);

alter table public.sports enable row level security;
alter table public.venues enable row level security;
alter table public.events enable row level security;
alter table public.event_tags enable row level security;
alter table public.event_gallery enable row level security;
alter table public.bookings enable row level security;

create policy "public read sports"
on public.sports
for select
to public
using (true);

create policy "public read venues"
on public.venues
for select
to public
using (true);

create policy "public read events"
on public.events
for select
to public
using (true);

create policy "public read event tags"
on public.event_tags
for select
to public
using (true);

create policy "public read event gallery"
on public.event_gallery
for select
to public
using (true);
