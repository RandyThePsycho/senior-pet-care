# Internal Dashboard Plan

## Purpose

Turn Feature A assessment data, user situation submissions, low dimensions,
report opens, journal returns, and reassessment behavior into an internal
decision dashboard.

The dashboard should help decide what to build next for Feature B and Feature C
based on real senior pet parent demand, not assumptions.

This document is planning only. No admin dashboard, auth, database table, or
private route is implemented in this pass.

## 1. Feature A Funnel

Track the assessment-to-reassessment loop:

- `calculator_started`
- `calculator_completed`
- `email_submitted`
- `report_opened`
- `journal_opened`
- `reassessment_clicked`
- `reassessment_completed`

Primary metric:

- 7-day reassessment rate

## 2. Low Dimension Distribution

Track which HHHHHMM dimensions most often score low:

- `hurt`
- `hunger`
- `hydration`
- `hygiene`
- `happiness`
- `mobility`
- `more_good_days`

Usage:

- If `low_mobility` is common, prioritize mobility support content and future
  Feature B product categories.
- If `low_hygiene` is common, prioritize incontinence, cleanup routines, and
  low-entry litter box resources.
- If `happiness` and `more_good_days` are often low, prioritize gentle
  end-of-life resources and vet conversation support.

## 3. User Need Intake

From `/share-your-situation`, track:

- `main_concern` distribution
- repeated themes in `free_text`
- `pet_type` distribution
- end-of-life worry submissions
- product confusion submissions
- vet conversation help submissions

This intake is not medical consultation. It is for understanding unmet needs
and improving resources.

## 4. Feature B Monetization Signals

Use repeated user needs to decide Product Matcher priority later:

- mobility demand
- incontinence demand
- senior cat setup demand
- dementia / night anxiety demand
- large senior dog support demand

Feature B should not be built until these signals show which categories matter
most.

## 5. Feature C Local Demand Signals

Use submissions and end-of-life interactions to decide local resource priority:

- city / state names users mention
- end-of-life worry submissions
- hospice / euthanasia related needs
- checklist interest

Feature C Directory should start with a small number of high-demand locations,
not a broad directory.

## 6. Minimal Implementation Path

### Phase 1

- Use analytics and local/mock events.
- Keep `/share-your-situation` as a mock intake form.
- Do not build a real dashboard.

### Phase 2

- Store assessments and need submissions in Supabase.
- Add a `need_submissions` table only after the intake copy and fields are
  validated.

### Phase 3

- Build an internal read-only dashboard at `/internal/dashboard`.
- Protect it with an environment variable or simple admin secret.
- Keep it out of sitemap and public navigation.

## Guardrails

- Do not expose private pet journal links publicly.
- Do not present intake submissions as veterinary advice.
- Do not use end-of-life submissions for product recommendations.
- Do not build Feature B or Feature C from assumptions alone.
