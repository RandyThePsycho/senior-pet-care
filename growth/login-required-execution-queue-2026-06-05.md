# Login-Required Execution Queue - 2026-06-05

Use this queue after the user has logged into the relevant service in Chrome.
Do not attempt logged-in actions until the user confirms the account is ready.

## 1. Vercel

Goal:
Enable the private dashboard.

Status:
Completed on 2026-06-05.

User login needed:
Vercel dashboard.

Action:

- Add `INTERNAL_DASHBOARD_TOKEN` in Production env.
- Redeploy current production deployment.
- Verify `https://pawcheckin.com/internal/dashboard?token=YOUR_TOKEN`.

Success:

- Dashboard is no longer disabled.
- The page is private behind the token.
- Verified live after redeploy.

## 2. Supabase

Goal:
Enable first-party pageview storage.

Status:
Completed on 2026-06-05.

User login needed:
Supabase project dashboard.

Action:

- Open SQL Editor.
- Run `supabase/migrations/20260605_add_page_events.sql`.
- Reload a public UTM URL.
- Check dashboard `Pageview attribution`.

Success:

- `/api/analytics/page-view` returns `{"ok":true,"persisted":true}` for a public path.
- Dashboard shows recent pageviews.
- `page_events` has row level security enabled.

## 3. Google Search Console

Goal:
Get the new SEO guide URLs discovered.

Status:
Sitemap re-submitted on 2026-06-05. URL Inspection requests remain pending.

User login needed:
Google Search Console.

Action:

- Add/verify `pawcheckin.com` if not already verified.
- Submit sitemap: `https://pawcheckin.com/sitemap.xml`.
- Use URL Inspection for:
  - `https://pawcheckin.com/guides/senior-dog-quality-of-life-checklist`
  - `https://pawcheckin.com/guides/senior-cat-quality-of-life-checklist`
  - `https://pawcheckin.com/guides/older-pet-vet-visit-notes`

Success:

- Sitemap submitted.
- Indexing requested for the 3 guide URLs.

Current result:

- `https://pawcheckin.com/sitemap.xml` was re-submitted successfully.
- Direct URL Inspection deep link returned a Google 404.
- The top inspection input did not reliably accept automated URL submission in
  the current UI state.

## 4. Bing Webmaster Tools

Goal:
Get the same guide URLs into Bing.

Status:
Completed on 2026-06-05.

User login needed:
Bing Webmaster Tools.

Action:

- Add/verify `pawcheckin.com` or import from Google Search Console.
- Submit `https://pawcheckin.com/sitemap.xml`.
- Submit the 3 guide URLs.

Success:

- Sitemap accepted.
- URLs submitted.

Current result:

- `https://pawcheckin.com/sitemap.xml` was re-submitted; Bing shows Processing.
- Submitted:
  - `https://pawcheckin.com/guides/senior-dog-quality-of-life-checklist`
  - `https://pawcheckin.com/guides/senior-cat-quality-of-life-checklist`
  - `https://pawcheckin.com/guides/older-pet-vet-visit-notes`
  - `https://pawcheckin.com/partners/senior-pet-check-in-kit`
- Bing showed 4 URLs submitted today and quota left 96.

## 5. Pinterest

Goal:
Publish prepared checklist/tracker pins without repeated failed attempts.

Status:
Blocked by macOS accessibility permission for file-picker automation.

User login needed:
Pinterest account in Chrome.

Action:

- Publish Pin 2 if the saving-state issue is gone.
- Publish Pin 4: Senior Cat Quality-of-Life Checklist.
- Publish Pin 5: Senior Dog Mobility Notes.
- Use `docs/pinterest-pin-pack.md` for title, description, alt text, board, and UTM destination.

Success:

- Pins are live.
- Each pin uses one distinct guide or calculator UTM destination.

Current result:

- Create page loads without the earlier reCAPTCHA/service warning.
- `osascript/System Events` still cannot operate the system file picker.
- Save-from-URL did not expose a usable image-entry flow in the current
  Pinterest page state.
- Enable accessibility access for `osascript` or the terminal process before
  retrying local image upload.

## 6. Facebook Groups

Goal:
Ask non-promotional research questions in relevant senior dog/cat groups.

User login needed:
Facebook account in Chrome.

Action:

- Read group rules first.
- Use `growth/short-video-and-facebook-prompts-2026-06-05.md`.
- Post only if non-promotional discussion prompts are allowed.
- Do not include links unless someone asks and rules allow it.

Success:

- One or two research prompts posted.
- Any replies are logged in `growth/needs-intake-log.csv`.

## 7. YouTube / TikTok / Instagram

Goal:
Publish one short video script as the first visual traffic test.

User login needed:
The chosen short-video account in Chrome.

Action:

- Use Script 1 or Script 2 from
  `growth/short-video-and-facebook-prompts-2026-06-05.md`.
- Use no diagnosis/treatment wording.
- Link to the matching guide page if the platform profile/video allows a link.

Success:

- First short video published.
- URL and observed views are logged.

## 8. Partner Outreach Sender Account

Goal:
Start the trust-based referral track without guessing the sender identity.

User login needed:
Email account, contact-form sender details, or social account approved for DMs.

Action:

- Use `growth/partner-targets-2026-06-05.md`.
- Send only the first 3 Batch 1 outreach messages.
- Use each target's `utm_content` slug in the partner kit URL.
- Do not mass-message the whole list in one pass.

Success:

- Three outreach attempts are logged in `growth/growth-log.csv`.
- Any partner reply, objection, or wording suggestion is logged for copy and
  SEO improvements.
