# Deploy Readiness - 2026-06-05

## Status

Not ready for production deployment yet.

## Verified Locally

- Clean Next build passed with the workspace runtime node.
- Typecheck passed after the clean build.
- Build output includes:
  - `/api/analytics/page-view`
  - `/internal/dashboard`
  - `/robots.txt`
- Production `https://pawcheckin.com/` returns `200`.

## Current Production Gap

- `https://pawcheckin.com/api/analytics/page-view` returns `404`.
- `https://pawcheckin.com/internal/dashboard?token=invalid` returns `404`.
- Conclusion: the internal dashboard and pageview API are implemented locally but not deployed to production.

## Deployment Capability

- Git remote exists: `https://github.com/RandyThePsycho/senior-pet-care.git`.
- Current branch: `main`.
- No `.vercel/project.json` or `.vercel/repo.json` exists locally.
- Vercel CLI is not installed or authenticated in this shell.
- GitHub CLI is not installed.
- The no-auth Vercel preview fallback uploaded via `deploy-codex.sh` but the POST request did not return a deployment URL within the waiting window, so it was stopped.

## Security Audit

`scripts/dependency-security-audit.mjs` checks `package-lock.json` against the npm advisory bulk endpoint.

Result on 2026-06-05:

- 118 packages checked.
- 1 package with advisories: `next`.
- Current `next` version: `14.2.35`.
- npm registry dist-tag `next-14` is also `14.2.35`, so there is no newer stable Next 14 patch available.
- Several advisories list affected ranges such as `>=13.0.0 <15.5.16`.

Because the project instruction says to stay on Next.js 14 unless explicitly approved, do not upgrade to Next 15/16 automatically.

## Required Before Production

1. Decide whether to accept the current Next 14 security risk temporarily or approve a major upgrade to Next 15.5.16+ / Next 16.
2. Deploy the current code to production through the connected GitHub/Vercel flow.
3. Set production env vars:
   - `INTERNAL_DASHBOARD_TOKEN`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - optional `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
   - optional `NEXT_PUBLIC_GA_MEASUREMENT_ID`
4. Run `supabase/migrations/20260605_add_page_events.sql` in Supabase SQL Editor.
5. Open a public UTM URL and confirm pageviews appear in `/internal/dashboard?token=...`.

## Rollback

If deployment causes problems:

- Revert the deployment in Vercel to the previous successful production deployment.
- Keep the Supabase `page_events` table; it is additive and does not change existing Feature A tables.
