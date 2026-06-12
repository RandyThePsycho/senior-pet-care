-- Persist privacy-safe funnel events for Feature A growth analysis.
-- No emails, pet IDs, report/journal tokens, or private URLs are stored here.

create table if not exists funnel_events (
  id            uuid primary key default gen_random_uuid(),
  event_name    text not null,
  path          text not null,
  referrer      text,
  utm_source    text,
  utm_medium    text,
  utm_campaign  text,
  utm_content   text,
  metadata      jsonb not null default '{}'::jsonb,
  created_at    timestamptz not null default now()
);

alter table funnel_events enable row level security;

create index if not exists funnel_events_created_at_idx
  on funnel_events(created_at desc);
create index if not exists funnel_events_event_name_idx
  on funnel_events(event_name);
create index if not exists funnel_events_utm_source_idx
  on funnel_events(utm_source);
create index if not exists funnel_events_utm_content_idx
  on funnel_events(utm_content);
