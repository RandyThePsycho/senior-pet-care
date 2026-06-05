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
- `https://pawcheckin.com/api/analytics/page-view` returns `404`.
- `https://pawcheckin.com/internal/dashboard?token=invalid` returns `404`.

This means the dashboard and pageview API exist locally but have not been
deployed to production yet.

Local deployment checks passed with the workspace runtime node, but production
deployment is currently blocked by missing Vercel CLI/auth locally and by a
Next.js security decision: `next@14.2.35` is the latest stable Next 14 tag, yet
npm advisories still affect it. Upgrading beyond Next 14 requires explicit
approval because the project instructions currently specify Next.js 14.

## 4. Reading The Dashboard

- Pageviews answer: did someone click through?
- Conversion events answer: did someone submit email or complete a funnel step?
- Need submissions answer: what users say they need.
- Reassessments answer: whether Feature A is retaining users after 7 days.

Do not judge channel performance from pageviews alone.
