# Partner 72h Read Runbook - 2026-06-17

Use after 2026-06-18 11:16 CST.

## Goal

Decide whether to send a single gentle follow-up to partners from the
2026-06-15 micro-outreach batch.

Do not use this read to justify a new cold email batch. The decision is only:

- follow up with Paws For Seniors,
- optionally follow up with Senior Cat Action Network,
- keep This Ole Dog Rescue on hold,
- or stop partner email until the landing/calculator path is fixed.

## Targets

Read these target contents:

```text
paws_for_seniors_20260615
this_ole_dog_rescue_20260615
senior_cat_action_network_20260615
```

Primary window:

```text
since 2026-06-15T03:16:00Z
```

This corresponds to the 2026-06-15 11:16 CST post-send baseline.

## Supabase Checks

Preferred command from the project root:

```bash
/Users/wu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/partner-72h-read.mjs
```

The script is read-only. It uses `.env.local`, does not print Supabase keys,
excludes local synthetic analytics rows, checks direct UTM columns plus funnel
metadata fallback, and rechecks the public partner calculator trust note.

Page events:

```sql
select created_at, path, referrer, utm_source, utm_medium, utm_campaign, utm_content
from page_events
where created_at >= '2026-06-15T03:16:00Z'
  and utm_content in (
    'paws_for_seniors_20260615',
    'this_ole_dog_rescue_20260615',
    'senior_cat_action_network_20260615'
  )
order by created_at desc;
```

Funnel events, direct columns:

```sql
select created_at, event_name, path, referrer, utm_source, utm_medium, utm_campaign, utm_content, metadata
from funnel_events
where created_at >= '2026-06-15T03:16:00Z'
  and utm_content in (
    'paws_for_seniors_20260615',
    'this_ole_dog_rescue_20260615',
    'senior_cat_action_network_20260615'
  )
order by created_at desc;
```

Funnel events, metadata fallback:

```sql
select created_at, event_name, path, referrer, utm_source, utm_medium, utm_campaign, utm_content, metadata
from funnel_events
where created_at >= '2026-06-15T03:16:00Z'
  and (
    metadata->>'first_utm_content' in (
      'paws_for_seniors_20260615',
      'this_ole_dog_rescue_20260615',
      'senior_cat_action_network_20260615'
    )
    or metadata->>'last_utm_content' in (
      'paws_for_seniors_20260615',
      'this_ole_dog_rescue_20260615',
      'senior_cat_action_network_20260615'
    )
  )
order by created_at desc;
```

Downstream counts:

```sql
select count(*) as email_events_since_baseline
from email_events
where created_at >= '2026-06-15T03:16:00Z';

select count(*) as assessments_since_baseline
from assessments
where created_at >= '2026-06-15T03:16:00Z';

select count(*) as reassessments_since_baseline
from assessments
where created_at >= '2026-06-15T03:16:00Z'
  and reassessment_of is not null;

select count(*) as need_submissions_since_baseline
from need_submissions
where created_at >= '2026-06-15T03:16:00Z';
```

## 126 Inbox Checks

Search or visually inspect for:

- `pawsforseniors.org`
- `thisoledogrescue.org`
- `seniorcatnetwork.org`
- `Postmaster`
- `Delivery Status`
- `Undelivered`
- `退信`

Do not count the inbox as checked unless the visible message list or search
results can be seen. If automation can only open the mailbox shell, mark email
status as unverified.

## Decision Rules

Paws For Seniors:

- If no reply/bounce and at least one click or calculator start remains after
  cleanup, send exactly one gentle follow-up.
- If a reply exists, answer manually and do not use the draft.
- If a bounce exists, mark invalid and do not resend.

Senior Cat Action Network:

- If no reply/bounce and the only signal is one page event, follow up only after
  the Paws decision is complete.
- If Paws follow-up is blocked by deployment or deliverability concerns, keep
  SCAN on hold too.

This Ole Dog Rescue:

- Do not follow up unless a late target click appears before the read.
- Keep hospice/end-of-life-adjacent outreach especially conservative.

## Deployment Gate

Before sending any follow-up, confirm that public `pawcheckin.com` is serving
the partner calculator trust note. If the Vercel deployment remains pending,
do not send the follow-up yet; partner traffic would still land on the older
calculator entry.

Status as of 2026-06-17 14:47 CST: this gate is satisfied. Static verification
found `partner_kit`, `Shared by a senior-pet organization or community`, and
`does not receive your answers` in the public `pawcheckin.com` calculator
bundle. Recheck before sending if another deployment occurs.

## Output To Record

Update:

- `growth/growth-log.csv`
- `growth/growth-dashboard.md`
- `growth/partner-72h-followup-plan-2026-06-17.md`

Include:

- exact check time in CST,
- target page_event counts,
- direct and metadata-derived funnel counts,
- email reply/bounce status,
- deployment status,
- send/hold decision for each partner.

## Pre-Window Dry Run

2026-06-17 17:18 CST dry run:

- 72h window open: no.
- Public deployment gate: pass. Found `partner_kit`, `Shared by a senior-pet
  organization or community`, and `does not receive your answers`.
- Paws For Seniors: 1 page event, 1 metadata-derived funnel signal, eligible
  for one gentle follow-up only if the 126 inbox has no reply or bounce after
  the 72h window opens.
- This Ole Dog Rescue: 0 page events, 0 funnel signals, hold.
- Senior Cat Action Network: 1 page event, 0 funnel signals, consider only
  after the Paws decision.
- Downstream since baseline: 0 email events, 0 assessments, 0 reassessments,
  0 need submissions.
