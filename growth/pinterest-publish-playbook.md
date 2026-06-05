# Pinterest Publish Playbook

## Current Goal

Publish low-risk, search-style checklist Pins for Feature A:

assessment -> email capture -> printable report -> 7-day reassessment -> journal.

## Policy Notes

Pinterest's official guidance frames Pins as content saved to boards. The
project should keep Pins useful, non-repetitive, and non-deceptive. Avoid spammy
keyword stuffing, misleading redirects, unsafe links, or repeated near-identical
Pins.

For PawCheckin:

- Use one direct `pawcheckin.com` destination URL with UTM.
- Do not use URL shorteners.
- Do not imply diagnosis, treatment, prognosis, or urgent medical guidance.
- Do not promote Product Matcher or product recommendations from end-of-life
  contexts.
- Spread Pins over time instead of bulk-posting duplicates.

## Working Browser Path

Use Chrome logged-in session, not the Codex in-app browser.

Create page:

`https://www.pinterest.com/pin-creation-tool/`

Observed flow:

1. Upload the asset.
2. Wait for `Changes stored!`.
3. Fill title.
4. Fill description.
5. Fill destination link.
6. Open `Choose a board`.
7. Select `Senior Pet Care Checklists`.
8. Publish.
9. Verify the board page is no longer `0 Pins`.

## Asset Notes

Pinterest accepts PNG, but the create page recommends high-quality JPG files
under 20 MB. A JPEG copy was generated successfully:

`public/growth/pinterest/jpg/senior-pet-quality-of-life-checklist.jpg`

Observed file:

- 1000 x 1500
- JPEG
- 215 KB

## Pin 1 Prepared Metadata

Title:

Senior Pet Quality-of-Life Checklist

Description:

A gentle checklist for organizing senior pet observations before a vet visit:
comfort, appetite, water, mobility, bathroom changes, mood, and good days vs.
hard days. Not medical advice.

Destination:

`https://pawcheckin.com/tools/senior-pet-quality-of-life-calculator?utm_source=pinterest&utm_medium=pin&utm_campaign=feature_a_quality_life&utm_content=quality_of_life_checklist`

Board:

Senior Pet Care Checklists

## Current Finding

Upload, title, description, link, and board selection all work in Chrome.

The remaining blocker is the final `Publish` step. Programmatic DOM clicks did
not complete publishing. A foreground human click on the visible `Publish`
button is likely required.

Current board state:

`https://www.pinterest.com/b0962039409/senior-pet-care-checklists/`

Still needs verification after publish.

## Manual One-Click Recovery

If the Chrome tab is open at `https://www.pinterest.com/pin-creation-tool/` and
the draft shows:

- Title filled
- Description filled
- Link filled
- Board = `Senior Pet Care Checklists`
- `Publish` button visible

Then manually click `Publish` once. After that, verify the board page and log the
Pin URL in `growth/growth-log.csv`.

## Do Not

- Do not keep retrying if Pinterest shows a reCAPTCHA service warning.
- Do not create repeated duplicate Pins in one burst.
- Do not use generic shortened links.
- Do not publish end-of-life or product-related Pins until the Feature A loop
  attribution is measurable.
