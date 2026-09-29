-- Web bookings from index.html: written before the customer is sent to
-- Stripe, so an abandoned checkout still leaves you a lead to text.
-- Insert-only for the anon key, like leads.sql. Run once in the SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.bookings_web (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),
  service          text not null check (service in ('interior', 'full_detail', 'paint_correction', 'ceramic_coating')),
  vehicle_size     text not null check (vehicle_size in ('sedan', 'suv', 'truck', 'three_row')),
  vehicle          text check (char_length(vehicle) <= 80),
  addons           text check (char_length(addons) <= 200),
  asap             boolean not null default false,
  date             date,
  time             text check (time ~ '^[0-9]{1,2}:[0-9]{2}$'),
  address          text check (char_length(address) <= 160),
  city             text check (char_length(city) <= 60),
  zip              text check (zip ~ '^[0-9]{5}$'),
  notes            text check (char_length(notes) <= 200),
  name             text not null check (char_length(name) between 1 and 120),
  phone            text not null check (phone ~ '^[0-9]{10}$'),
  email            text check (char_length(email) <= 160),
  promo            text check (char_length(promo) <= 20),
  quoted_price     integer check (quoted_price between 0 and 5000),
  utm_source       text check (char_length(utm_source) <= 200),
  utm_medium       text check (char_length(utm_medium) <= 200),
  utm_campaign     text check (char_length(utm_campaign) <= 200),
  utm_content      text check (char_length(utm_content) <= 200),
  utm_term         text check (char_length(utm_term) <= 200),
  fbclid           text check (char_length(fbclid) <= 500),
  page_url         text check (char_length(page_url) <= 500),
  status           text not null default 'started' check (status in ('started', 'card_authorized', 'confirmed', 'done', 'lost')),
  notes_internal   text
);

create index if not exists bookings_web_created_at_idx on public.bookings_web (created_at desc);
alter table public.bookings_web enable row level security;
drop policy if exists "bookings_web insert only" on public.bookings_web;
create policy "bookings_web insert only" on public.bookings_web
  for insert to anon, authenticated
  with check (status = 'started' and notes_internal is null);
