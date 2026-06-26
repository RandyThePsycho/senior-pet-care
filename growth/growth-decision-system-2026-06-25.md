# Growth Decision System - 2026-06-25

## Why This Exists

Recent work created activity, but not enough traction. The mistake was treating
actions as progress: replies, emails, guide edits, and posts were logged as
completed, while the system did not force a sharper diagnosis of *why* traffic
stayed weak.

Going forward, PawCheckin growth work must diagnose the failure stage before
choosing the next action.

## Skills and Playbooks Now Adopted

Local project skills:

- `senior-pet-community-growth`: community work, platform rules, no-spam
  boundaries, no-link reply discipline, and customer-language loops.
- `project-manager-planner`: keep work tied to Feature A:
  assessment -> email capture -> printable report -> journal -> 7-day
  reassessment.
- `seo-eeat-reviewer`: medical disclaimers, E-E-A-T, structured SEO, gentle
  end-of-life boundaries.
- `email-automation-planner`: future 7-day reminder and lifecycle loop.
- `meta-skill-manager`: detect when local skills are not enough before guessing.

External playbooks reviewed:

- `coreyhaines31/marketingskills`: relevant categories include
  `product-marketing`, `free-tools`, `lead-magnets`, `programmatic-seo`,
  `analytics`, `cro`, `community-marketing`, `content-strategy`, and `emails`.
- `phuryn/pm-skills`: relevant categories include `pm-marketing-growth`,
  `pm-go-to-market`, `pm-market-research`, `pm-product-discovery`, and
  `pm-data-analytics`.

Applied principles:

- Free tools must solve one real problem, be adjacent to the core product, be
  simple, and create a natural path to the product.
- Lead magnets should address a specific pain point, be quick to consume, and
  lead naturally into the product.
- Programmatic SEO should use a hub-and-spoke structure, avoid orphan pages,
  and prioritize unique useful pages over thin scale.
- Product marketing context must be read before selecting tactics.

## Failure Diagnosis Matrix

| Failure stage | Evidence | What it means | Next action | Do not do |
|---|---|---|---|---|
| Exposure failure | Post/reply visible but no impressions, no replies, no external visits | The channel or placement does not reach enough qualified people | Improve source selection, search durable questions, test higher-intent communities, use SEO/free-tool assets | Do not keep adding the same kind of post |
| Trust/profile failure | No-link replies get no profile clicks; homepage visits unattributed and shallow | People may not understand who is behind the advice or what free resource exists | Improve profile/bio/link target, create a clear `/tools` hub, use consistent founder positioning | Do not assume no-link replies create acquisition |
| Click/offer failure | Placement gets views/replies but no UTM/page events | Copy or offer is not compelling enough to earn a click | Change the promise from generic calculator to specific tool/checklist, use pain-specific URL | Do not blame the landing page yet |
| Landing match failure | Page events happen, but no guide CTA clicks | The page does not quickly match user intent or CTA is weak | Improve first-screen promise, CTA, and internal path | Do not add more traffic before fixing mismatch |
| Activation failure | `guide_checkin_clicked` happens, but no `calculator_started` | Calculator entry may feel too heavy or confusing | Fix calculator first screen, reduce friction, clarify report output | Do not build more guides first |
| Completion failure | Calculator starts but few completions/email submissions | Score flow, email value, or result confidence is weak | Improve scoring UX, report preview, email value exchange | Do not start monetization |
| Retention failure | Email/report works but no 7-day reassessment | Lifecycle reminder or journal value is weak | Improve reminder, journal entry, reassessment link | Do not judge acquisition alone |
| Monetization-intent failure | Assessments happen but no product/pack interest | Offer is unclear or not trusted | Run non-salesy intent capture and offer copy tests | Do not add checkout or product recs |

## Current Classification

As of the 2026-06-25 read:

- Last 24h: 4 `page_events`, all unattributed homepage `/`.
- 0 guide page events.
- 0 `guide_checkin_clicked`.
- 0 `calculator_started`.
- 0 downstream email, assessment, reassessment, or need submissions.
- Recent Reddit replies are visible but have no direct replies and no measurable
  attributed traffic.

This is primarily an exposure/trust/profile failure. It is not yet a landing or
calculator conversion verdict.

## Decision Made Today

The next highest-leverage action is not another community reply. It is a clear
free-tool hub:

- URL: `/tools`
- Purpose: give community/profile/partner/search traffic a specific, credible
  resource center instead of a generic homepage.
- Positioning: free senior pet care tools, not diagnosis.
- Path: focused checklist -> quality-of-life calculator -> printable report ->
  7-day reassessment.
- Measurement: future profile/social/community links should point to `/tools`
  or a pain-specific guide, then measure page events, guide clicks, calculator
  starts, and downstream events.

## Mandatory Action Review Loop

The project owner feedback on 2026-06-26 is now an operating rule: do not keep
executing a weak plan just because it is on the plan. Every growth action needs
a reason, a target signal, and a failure-specific next move.

Before an action, write the pre-action rationale:

1. Why this action now, instead of waiting or choosing another action?
2. Which failure stage does it address?
3. What exact signal should improve, and by when?
4. Why should this action plausibly create that signal?
5. What downside could happen: spam risk, low trust, weak intent, time cost,
   attribution confusion, or medical/ethical risk?

After an action, write the post-action reflection:

1. What was actually done?
2. What benefit did it create: distribution, user insight, profile trust,
   durable asset, measurement clarity, or partner learning?
3. What cost or risk did it create?
4. Did the expected signal appear?
5. If not, what failed: exposure, trust/profile, click/offer, landing match,
   activation, completion, retention, monetization intent, channel delay, or
   measurement?

Failure review is mandatory before repeating a tactic:

- If exposure is zero, change source quality, format, timing, or distribution
  surface. Do not edit landing pages yet.
- If profile visits or page events appear but no click/offer action happens,
  improve the promise, profile trust, and pain-specific URL.
- If guide views appear but no `guide_checkin_clicked`, improve first-screen
  match and CTA.
- If `guide_checkin_clicked` appears but no `calculator_started`, improve
  calculator entry.
- If starts appear but no completions or email capture, improve activation,
  report preview, and value exchange.
- If the same tactic has two consecutive zero-signal reads, pause that tactic
  until a targeted modification is made.
- A completed action is not progress unless it records the expected signal,
  observed result, failure reason, and targeted modification.

## Operating Rule

Before any new external action, answer:

1. Which failure stage are we addressing?
2. What evidence says that is the current bottleneck?
3. Which skill/playbook supports the action?
4. What should happen if the action works?
5. What different diagnosis applies if it fails?
6. What targeted modification will we make if it does not work?

If those answers are unclear, do not post, email, or publish another channel
action. If the last two reads for the same tactic were zero-signal, repeating
that tactic is blocked until the failure reason is named and the tactic is
changed.
