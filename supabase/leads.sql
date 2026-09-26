-- Landing page leads: a write-only drop box, same pattern as the detailer
-- app's `waitlist` table (updated-DODDetailer/supabase/waitlist.sql).
--
-- The landing page inserts with the public anon key. Nobody can read rows
-- back through the API; you read them in the Supabase dashboard (Table
-- Editor > leads) or from a server with the service_role key.
--
-- Run once: Supabase > SQL Editor > New query > paste > Run.

create extension if not exists pgcrypto;

create table if not exists public.leads (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),

  name             text not null check (char_length(name) between 1 and 120),
  phone            text not null check (phone ~ '^[0-9]{10}$'),
  zip              text not null check (zip ~ '^[0-9]{5}$'),
  service          text not null check (service in ('interior', 'full_detail', 'paint_correction', 'ceramic_coating', 'not_sure')),
  vehicle_size     text not null check (vehicle_size in ('sedan', 'suv', 'truck', 'three_row')),
  quoted_price     integer check (quoted_price between 0 and 5000),
  city             text check (char_length(city) <= 40),

  sms_consent      boolean not null default false,
  marketing_opt_in boolean not null default false,

  -- Which ad brought them in
  utm_source       text check (char_length(utm_source) <= 200),
  utm_medium       text check (char_length(utm_medium) <= 200),
  utm_campaign     text check (char_length(utm_campaign) <= 200),
  utm_content      text check (char_length(utm_content) <= 200),
  utm_term         text check (char_length(utm_term) <= 200),
  fbclid           text check (char_length(fbclid) <= 500),
  page_url         text check (char_length(page_url) <= 500),

  -- Your follow-up, edited in the dashboard
  status           text not null default 'new' check (status in ('new', 'texted', 'booked', 'lost')),
  notes            text
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);

alter table public.leads enable row level security;

-- Anyone may add a lead, but only as a fresh one with no notes.
drop policy if exists "leads insert only" on public.leads;
create policy "leads insert only" on public.leads
  for insert to anon, authenticated
  with check (status = 'new' and notes is null);

-- No select, update or delete policies: the anon key can't read or change
-- anything. The dashboard and the service_role key bypass RLS.
