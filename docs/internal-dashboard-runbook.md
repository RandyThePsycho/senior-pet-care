# Internal Dashboard Runbook

## Purpose

Use this runbook to make the private launch dashboard usable in production and
to start storing first-party pageview attribution.

The dashboard is for aggregate launch signals only. It must not expose emails,
pet names, report URLs, journal URLs, IP addresses, or medical interpretation.

## 1. Production Environment

Set these server-side environment variables in the hosting provider:

- `INTERNAL_DASHBOARD_TOKEN`
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Optional external analytics:

- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`

Do not expose `SUPABASE_SERVICE_ROLE_KEY` in client code.

## 2. Supabase Migration

Run this file in Supabase SQL Editor:

`supabase/migrations/20260605_add_page_events.sql`

It creates the `page_events` table and indexes. The table stores only:

- public page path
- referrer origin/path
- UTM source, medium, campaign, and content
- created timestamp

The table should have row level security enabled. The app writes and reads it
from server-side code with the Supabase service role key.

Private paths are skipped by the app:

- `/api/`
- `/internal/`
- `/journal/`
- `/reports/`

## 3. Verification

After deployment and migration:

1. Open a public UTM URL, such as:

   `https://pawcheckin.com/tools/senior-pet-quality-of-life-calculator?utm_source=x&utm_medium=social&utm_campaign=feature_a_quality_life&utm_content=manual_check`

2. Open the private dashboard:

   `/internal/dashboard?token=YOUR_TOKEN`

3. Confirm:

   - `Pageview attribution` shows at least one pageview.
   - `Recent pageviews` includes the UTM source.
   - `Query notes` no longer reports `page_events` missing.

## Current Production Status - 2026-06-05

- `https://pawcheckin.com/` returns `200`.
- `https://pawcheckin.com/api/analytics/page-view` exists and accepts `POST`.
- `INTERNAL_DASHBOARD_TOKEN` is configured in Vercel production.
- `supabase/migrations/20260605_add_page_events.sql` has been run in Supabase.
- Supabase enabled row level security for `page_events`.
- `https://pawcheckin.com/api/analytics/page-view` returned
  `{"ok":true,"persisted":true}` for the live pageview check.
- `https://pawcheckin.com/dashboard/YOUR_TOKEN` renders the launch dashboard
  and no longer shows `Dashboard disabled`.

## If The Dashboard Shows No Data

Use this order to diagnose it:

1. If the page says `Dashboard disabled`, Vercel production is missing
   `INTERNAL_DASHBOARD_TOKEN`.
2. If the page loads but `Pageview attribution` is empty and `Query notes`
   mentions `page_events`, the Supabase migration has not been applied.
3. If the page loads and `page_events` exists but counts are still zero, open a
   public UTM URL once, wait a few seconds, then reload the dashboard.
4. If conversion counts exist but pageviews are zero, the calculator funnel may
   have test/mock rows while first-party pageview tracking is not yet storing
   live rows.

Current production state on 2026-06-05:

- The shortcut route is live:
  `https://pawcheckin.com/dashboard/YOUR_TOKEN`
- It can show data after using the private token saved locally in `.env.local`.

## How To View The Internal Dashboard Yourself

1. Find the private URL in local `.env.local`:

   `INTERNAL_DASHBOARD_URL`

   Or find the private token:

   `INTERNAL_DASHBOARD_TOKEN`

2. Open the private dashboard URL. Do not open this literal placeholder:

   `https://pawcheckin.com/dashboard/YOUR_TOKEN`

   Replace `YOUR_TOKEN` with the real token from `.env.local`, or use
   `INTERNAL_DASHBOARD_URL` directly.

   This redirects to the private dashboard route:

   `https://pawcheckin.com/internal/dashboard?token=YOUR_TOKEN`

Do not share this URL publicly. Anyone with the token URL can view the private
aggregate dashboard.

To manually test pageviews, open a public UTM URL once and reload the
dashboard:

`https://pawcheckin.com/guides/senior-dog-quality-of-life-checklist?utm_source=manual&utm_medium=test&utm_campaign=dashboard_check&utm_content=first_pageview`

## 4. Reading The Dashboard

- Pageviews answer: did someone click through?
- Conversion events answer: did someone submit email or complete a funnel step?
- Need submissions answer: what users say they need.
- Reassessments answer: whether Feature A is retaining users after 7 days.

Do not judge channel performance from pageviews alone.
