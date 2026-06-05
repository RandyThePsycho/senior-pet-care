-- Add first-party pageview tracking for launch attribution.
-- Safe to run multiple times in Supabase SQL Editor.
-- Does not store emails, pet names, report URLs, journal URLs, IPs, or user agents.

create table if not exists page_events (
  id            uuid primary key default gen_random_uuid(),
  path          text not null,
  referrer      text,
  utm_source    text,
  utm_medium    text,
  utm_campaign  text,
  utm_content   text,
  created_at    timestamptz not null default now()
);

create index if not exists page_events_created_at_idx
  on page_events(created_at desc);
create index if not exists page_events_path_idx
  on page_events(path);
create index if not exists page_events_utm_source_idx
  on page_events(utm_source);
