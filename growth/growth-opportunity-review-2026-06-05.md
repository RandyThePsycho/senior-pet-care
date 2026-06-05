# Growth Opportunity Review - 2026-06-05

## Summary

The internal dashboard is useful only as a minimal measurement instrument. It
should not become the product focus while traffic is near zero.

Keep only:

- pageview attribution
- email/report/journal/reassessment conversion signals
- source classification
- basic recent samples with no PII

Do not add more dashboard features until there is meaningful traffic.

## Next.js 14 vs 15/16

For the current product stage, upgrading from Next 14 is not a growth lever.

- Next 15 changes caching defaults and request APIs, and requires React 19.
- Next 16 changes caching more deeply through Cache Components and introduces
  `proxy.ts` as the clearer successor to `middleware.ts`.
- The reason to upgrade would be security and maintenance, not acquisition.
- Because the project currently has almost no traffic, migration work should
  not outrank growth execution unless the security risk becomes unacceptable.

Decision for now: keep Next 14 live as approved, record the advisory risk, and
return to the major-version upgrade after the first real acquisition signal.

## What Successful Patterns Suggest

### 1. Quality-of-life tool plus resource center

Lap of Love is the closest category pattern: quality-of-life assessment,
printable scale, daily assessment, hospice resources, pet-loss support, and a
newsletter/resource center.

Implication: PawCheckin should not be framed as a generic pet site. It should
become a specific observation and vet-prep loop around senior-pet quality of
life.

### 2. E-E-A-T content matters in pet health

A 2024-2025 pet-health SEO recovery case showed that articles associated with
complete veterinary author/reviewer bios were more resilient during core
updates than weaker author pages.

Implication: for medical-adjacent SEO, publish slowly, with disclaimers,
sources, reviewer/consulted-vet plan if available, and no diagnosis claims.

### 3. Pinterest is a visual search channel, not normal social

Pinterest officially recommends vertical, high-quality Pins with title,
description, link, relevant boards, keywords, and ongoing review of Pin stats.
Pins can resurface seasonally.

Implication: use Pinterest for printable checklists, vet-visit notes, weekly
tracker templates, and senior-cat/senior-dog home setup visuals. Low posting
frequency is fine; repeated same-link spam is not.

### 4. YouTube and Facebook have broad adult reach

Pew 2025 shows YouTube and Facebook remain the most widely used U.S. adult
platforms. TikTok, Instagram, WhatsApp, and Reddit grew from 2021 to 2025.

Implication: short video and Facebook groups/pages should be added, but with a
help-first posture and no medical diagnosis. For older pet parents, Facebook
groups and YouTube Shorts are more likely to matter than X.

### 5. Reddit can work but hidden seeding is dangerous

Recent Reddit marketing backlash shows that disguised promotional seeding can
damage trust when communities notice it.

Implication: keep Reddit replies no-link by default; disclose affiliation when
linking; use Reddit primarily for customer language, not traffic volume.

## Recommended Platform Priority

### Tier 1: Do Now

1. Google/Bing SEO pages built from actual community language.
2. Pinterest checklist/tracker Pins.
3. Reddit/Quora no-link or disclosed-link answers for high-intent questions.
4. Facebook senior dog/cat groups, with non-link research prompts first.
5. YouTube Shorts using calm checklist scripts.

### Tier 2: Test Carefully

1. TikTok / Instagram Reels: short "what changed this week?" videos.
2. Threads / X: useful, low-frequency posts; do not rely on them for traffic.
3. Vet/hospice/rescue partner outreach.
4. Newsletter swaps with senior-pet, hospice, rescue, or caregiver newsletters.

### Tier 3: Defer

1. Paid ads.
2. Influencer campaigns.
3. Affiliate/product pushes.
4. Feature B/C promotion.

## 7-Day Execution Plan

1. Finish minimal measurement setup:
   - Vercel env `INTERNAL_DASHBOARD_TOKEN`
   - Supabase `page_events` migration
2. Publish 3 narrow SEO pages:
   - senior dog quality of life checklist
   - senior cat quality of life checklist
   - what to track before a vet visit for an older pet
3. Publish 5 Pinterest Pins:
   - quality-of-life checklist
   - 7-day check-in
   - vet-visit notes
   - senior cat home setup
   - senior dog mobility notes
4. Add 1 YouTube Short script/day for 5 days; publish manually if account is ready.
5. Post 2 Facebook group research prompts only if group rules allow non-promotional questions.
6. Continue 1-2 Reddit/Quora helpful replies/day max, no repeated copy.
7. Review only three metrics:
   - UTM pageviews
   - email/report starts
   - 7-day reassessment starts

## Execution Update

First SEO guide batch implemented locally:

- `/guides/senior-dog-quality-of-life-checklist`
- `/guides/senior-cat-quality-of-life-checklist`
- `/guides/older-pet-vet-visit-notes`

These are narrow acquisition pages that send users into the calculator rather
than expanding into a generic pet-content site.

## Sources

- Next.js 15 release: https://nextjs.org/blog/next-15
- Next.js 16 release: https://nextjs.org/blog/next-16
- Next.js 15 upgrade guide: https://nextjs.org/docs/app/guides/upgrading/version-15
- Lap of Love quality-of-life assessment: https://www.lapoflove.com/quality-of-life-assessment
- Lap of Love quality-of-life resources: https://info.lapoflove.com/Quality
- Pew Americans' Social Media Use 2025: https://www.pewresearch.org/internet/2025/11/20/americans-social-media-use-2025/
- Pinterest Pin performance and distribution: https://help.pinterest.com/en/business/article/pin-performance-and-distribution
- Pinterest creating Pins guide: https://help.pinterest.com/en/guide/guide-to-creating-pins
- Pet-health E-E-A-T case study: https://www.greenlanemarketing.com/case-studies/boosting-site-authority
- Reddit astroturfing backlash caution: https://www.pcgamer.com/games/game-marketing-company-takes-down-blog-post-bragging-about-how-good-it-is-at-astroturfing-reddit-after-reddit-finds-the-post/
