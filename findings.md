# Senior Pet Care Growth Findings

## Confirmed Project Context
- The project is a decision-support platform for senior pet parents.
- Feature A is the priority: assessment -> email capture -> printable report -> 7-day reassessment -> journal.
- The core metric is 7-day reassessment rate, not raw traffic.
- Medical copy must stay observational and must recommend consulting a licensed veterinarian for health decisions.
- End-of-life content must be gentle, non-commercial, and free of product recommendations.

## Reddit Rules From Local SOP
- Prefer comments answering real questions before standalone posts.
- Use no more than one relevant link, only when directly helpful.
- Disclose affiliation plainly when linking Senior Pet Care / PawCheckin.
- Avoid repeated links, repeated titles, cross-post floods, mass replies, and drive-by promotion.

## Recovered Cross-Channel Growth Plan
- Priority is not Reddit-only. The recovered plan ranks channels as: Google/Bing SEO, Reddit, Quora, Pinterest, YouTube Shorts, TikTok, Instagram Reels, Facebook Groups, X/Threads, LinkedIn, partner referrals, and newsletter swaps.
- Week 1 cadence is deliberately conservative: 5 Reddit no-link comments, 3 X/Threads educational posts with only 1 linked post, 2 Quora answers, 2 Facebook research questions, and 3 Pinterest pins.
- The immediate non-Reddit next action from the prior plan is an X/Threads educational post with no link.
- Quora should be used for durable answer traffic with one relevant disclosed link only when the answer is complete and the question directly fits.
- Pinterest should use checklist/report/tracker discovery assets with UTM links because links are native to the format.
- Facebook Groups should begin with non-link research questions unless group rules explicitly allow resources.
- Partner channels should target mobile vets, hospice providers, rescues, and senior-pet newsletters after the first organic signals are measured.
- Additional recovered ChatGPT planning context frames the business flywheel as A -> B -> C: Feature A captures and retains users through email/report/7-day reassessment, Feature B later monetizes product-support needs, and Feature C later builds trusted local/end-of-life resource depth.
- Current execution must still keep Feature A first. Feature B/C signals should be logged, not built or promoted prematurely.
- The recovered matrix-growth prompt requires `growth/growth-log.csv` and `growth/needs-intake-log.csv`, UTM links, daily platform rule checks, and promotion only to live 200-status pages.

## Standing Publishing Rule From User
- User approved direct posting/replying without asking each time when the action is platform-rule-conscious, low-risk, and unlikely to create spam/limit risk.
- Operational interpretation: use low frequency, no repeated copy, no mass replies, no hidden affiliation, no diagnostic claims, and no links unless allowed/relevant/disclosed.
- Platform limits cannot be guaranteed, so execution should optimize for conservative cadence rather than promises of zero throttling.

## Completed Community Replies
- r/seniordogs / "The concept of good and bad days": no-link reply about shifting baselines and concrete tracking.
- r/seniordogs / "Tips for Senior Dog Mobility": no-link reply about tracking routine quality after wheelchair adoption.
- r/SeniorCats / "Is adopting a 12 year old cat a bad idea?": no-link reply about first-weeks baseline, shelter/vet records, and senior-cat adoption expectations.
- r/CatAdvice / "What should I be doing for my cats as they grow older?": no-link reply about senior-cat baseline tracking, vet screening, home setup, and asking a vet before supplements.

## Completed Non-Reddit Social Posts
- X / `@RandythePsycho`: no-link educational post about simple senior-pet notes before a vet visit.
- Threads / `@cetrolcen`: no-link educational post about tracking older dog/cat patterns before a vet visit.

## Platform Rule Checks
- X official rules prohibit platform manipulation/spam, including bulk high-volume unsolicited replies, unrelated hashtag use, and repeated identical or near-identical posts.
- Instagram/Threads community guidance warns against repetitive comments/content and repeated commercial contact without consent.
- Current execution therefore uses low frequency, no links, no hashtags, non-identical wording, and no mass replies.
- Pinterest guidance allows adding links to pins but warns against misleading links, repetitive/irrelevant content, suspicious redirects, and unapproved automation.

## Site Readiness
- `https://pawcheckin.com/` returned 200.
- `https://pawcheckin.com/tools/senior-pet-quality-of-life-calculator` returned 200.
- `https://pawcheckin.com/share-your-situation` returned 200.
- `https://pawcheckin.com/end-of-life/checklist` returned 200.

## Current Blockers
- Pinterest is not logged in in local Chrome. The page prompts for sign-up/birthdate, so do not create or register the account automatically.
- Production currently returns `404` for `/api/analytics/page-view` and `/internal/dashboard`, so local dashboard/pageview changes still need deployment before live traffic can be measured.
- The live Supabase database still needs the `page_events` migration before first-party pageviews can persist after deployment.
- Vercel CLI and GitHub CLI are not available in the local shell, and no `.vercel` binding exists.
- The no-auth Vercel preview fallback did not return a deployment URL during the waiting window.
- npm advisory API reports advisories for `next@14.2.35`; npm registry currently reports `next-14` as `14.2.35`, so there is no safer stable Next 14 patch available.

## Environment Notes
- Default shell has Codex bundled `node` but no `npm`.
- Typecheck/build can run with `/Users/wu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node`.
- `node node_modules/typescript/bin/tsc --noEmit` and `node node_modules/next/dist/bin/next build` passed using the workspace runtime.

## Open Questions
- Need check the first 24-hour Reddit outcomes: removals, replies asking for a tool/link, repeated language, and attributable PawCheckin visits.
- Need Pinterest account login before publishing the prepared pins.
