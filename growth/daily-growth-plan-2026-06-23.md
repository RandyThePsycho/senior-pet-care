# Daily Growth Plan - Senior Pet Care

Start date: 2026-06-23

## North Star

Feature A remains the focus:

assessment -> email capture -> printable report -> 7-day reassessment -> journal

Primary operating metric: 7-day reassessment rate.

Current blocking metric: qualified attributed page_events from high-intent
external placements.

2026-06-23 reset: traffic is too weak to justify more scattered posting. Daily
growth work now prioritizes durable acquisition assets and monetization intent,
not raw social activity.

## Daily Cadence

Run one bounded block per day. Default time: 12:35 CST.

1. Stability gate, 5 minutes
   - Confirm no leftover local dev servers on ports 3000-3020.
   - Confirm no `net-watchdog`, `growth-utm-read`, or log streaming loops.
   - Check WorkBuddy/Codex logs only for unusual growth, not as a long-running
     watcher.

2. Measurement gate, 10 minutes
   - Read Supabase for the last 24 hours.
   - Read active UTM targets from the registry.
   - Count page_events, funnel_events, email_events, assessments,
     reassessments, and need_submissions.
   - Do not post or email during measurement.

3. Diagnosis gate, 10 minutes
   - Classify the current bottleneck before choosing the action:
     exposure, trust/profile, click/offer, landing match, activation,
     completion, retention, or monetization-intent.
   - Use `growth/growth-decision-system-2026-06-25.md`.
   - State which skill/playbook supports the chosen action.
   - Do not treat a completed action as progress unless the expected signal and
     failure interpretation are defined.
   - Write a pre-action rationale before doing anything external: why this
     action now, expected signal, deadline for judging it, downside risk, and
     the targeted modification if it fails.

4. Asset build, 45-90 minutes
   - Ship or improve one high-intent guide/tool page in the caregiver-capacity
     cluster.
   - Add direct first-screen calculator handoff with `guide` and `intent`.
   - Strengthen internal links to related guides and the calculator.
   - Submit sitemap/IndexNow after meaningful page batches.

5. Candidate search, 15 minutes
   - Look for 3-5 high-intent prompts:
     - senior dog waking at night and caregiver exhausted
     - old dog wakes asking for food
     - senior dog medication makes them wobbly at night
     - old dog not eating except treats or cat food
     - senior cat weight loss, appetite, water, litter box, grooming change
   - Exclude emergency, grief-only, diagnosis-seeking, minor-user, and
     treatment-instruction threads.

6. Action, 15-25 minutes
   - Do not automatically default to another reply. Choose reply, standalone
     discussion post, durable asset, partner target, profile/tool-hub
     distribution, or no-action based on the diagnosed failure stage.
   - Execute at most one no-link community reply per day unless the user
     explicitly expands the limit and the diagnosis justifies it.
   - Use a link only when rules allow it, the thread asks for a tool/checklist,
     and the reply has clear standalone value.
   - Prefer direct guide URLs with UTM over homepage links.
   - Do not count no-link replies as acquisition unless they produce profile or
     page events.
   - After the action, record benefits, costs, risks, whether the expected
     signal appeared, and why it did or did not work.

7. Monetization intent, 15-30 minutes
   - Improve or test one ethical monetization signal: product-guidance interest,
     paid pack interest, partner/sponsor fit, or email lifecycle conversion.
   - Do not add product recommendations in end-of-life contexts.
   - Do not add payment code until an offer is reviewed and approved.

8. Record and set next gate, 10 minutes
   - Update `growth/growth-log.csv`.
   - Update `growth/growth-dashboard.md`.
   - Schedule or note the next read only for a specific placement and signal.
   - If the result is zero-signal, record the failure reason and a targeted
     modification. Do not repeat the same tactic after two zero-signal reads
     unless that modification has been made.

## Daily Limits

- Partner email: max 0 by default until mailbox security is clean and a fresh
  target list is reviewed.
- X linked posts: paused until a stronger distribution hypothesis exists.
- Reddit/X no-link replies: max 1 high-intent reply per day.
- Pinterest: do not republish the same pin; new assets need a new angle and UTM.
- Quora: max 1 answer per high-intent question, no duplicated angle.

## Current Focus

2026-06-25 evening:

1. Done: built and deployed `/tools` as the free tools hub for profile,
   community, partner, and search traffic.
2. Done: aligned partner kit, X profile, Quora profile text, Pinterest pin, and
   one Quora answer toward `/tools` with separate UTM content values.
3. Done: deleted the bad X link-only post after the composer dropped the
   value-first copy. Do not retry X publishing through DOM injection.
4. Done: published one Pinterest `/tools` pin:
   `utm_content=free_tools_hub_20260625`.
5. Done: published one high-intent Quora answer:
   `utm_content=free_tools_hub_answer_20260625`.
6. Next read: check Pinterest and Quora UTM content values, `/tools`
   page_events, `guide=tools-hub&intent=free_tools_quality_of_life`
   `calculator_started`, and downstream events.
7. If both active `/tools` placements remain at 0 visits, classify the failure
   as exposure/trust and improve source quality or profile credibility. Do not
   edit `/tools` CTA yet.
8. If `/tools` visits appear but no calculator starts, classify the failure as
   landing match or click/offer and improve the `/tools` first-screen promise,
   trust proof, and calculator handoff.
9. If calculator starts appear but no completions or emails, classify the
   failure as activation/completion and improve the calculator start screen,
   scoring friction, report preview, and email value exchange.
10. No more Reddit replies on 2026-06-25 unless the user explicitly overrides
    and the thread is high-intent, non-emergency, and safe for no-link support.
