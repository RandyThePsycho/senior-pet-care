# UI Redesign Research - 2026-06-26

## Scope

Goal: improve layout, typography, spacing, and visual trust for PawCheckin's
senior-pet audience without changing existing product functionality or adding
heavy UI dependencies.

Method: GitHub REST Search API and repository API, sorted by stars, with recent
activity checks using `pushed_at`. Main recency filter used for search queries:
`pushed:>=2025-06-26`.

## Relevant GitHub resources

| Project | Stars at research time | Recent push | Why it matters | What to borrow |
|---|---:|---|---|---|
| [shadcn-ui/ui](https://github.com/shadcn-ui/ui) | 117,483 | 2026-06-26 | Copy-owned accessible components with Tailwind and Radix patterns. | Own the component code, keep tokens close to app code, strong focus states, simple composable primitives. |
| [tailwindlabs/tailwindcss](https://github.com/tailwindlabs/tailwindcss) | 95,759 | 2026-06-26 | Current utility-first baseline already used by the app. | Strengthen the existing Tailwind token system rather than adding a large component library. |
| [bradtraversy/design-resources-for-developers](https://github.com/bradtraversy/design-resources-for-developers) | 66,221 | 2026-05-24 | Broad design and UI resource index. | Use as a source for landing-page structure, visual hierarchy, and asset references, not as code. |
| [chakra-ui/chakra-ui](https://github.com/chakra-ui/chakra-ui) | 40,478 | 2026-06-26 | Mature accessible component-system thinking. | Borrow spacing discipline, visible states, and semantic component boundaries without importing Chakra. |
| [tailwindlabs/headlessui](https://github.com/tailwindlabs/headlessui) | 28,639 | 2026-04-13 | Accessible unstyled component patterns for Tailwind apps. | Keep controls semantic, keyboard-friendly, and visually styled through local Tailwind classes. |
| [magicuidesign/magicui](https://github.com/magicuidesign/magicui) | 21,364 | 2026-06-03 | Modern copy-paste animated React/Tailwind components. | Borrow restrained micro-interactions and soft reveal treatment; avoid heavy motion for this audience. |
| [radix-ui/primitives](https://github.com/radix-ui/primitives) | 19,014 | 2026-06-16 | Accessibility-first primitives and design-system foundation. | Treat focus management, labels, and interaction states as first-class design, even without adding Radix. |
| [cruip/tailwind-landing-page-template](https://github.com/cruip/tailwind-landing-page-template) | 4,461 | 2025-12-12 | Tailwind/React/Next landing-page structure. | Borrow clearer section cadence, constrained copy width, and conversion-first hero rhythm. |

Additional search notes:

- GitHub search for `aceternity ui pushed:>=2025-06-26` found mostly derivative
  repos, such as `arihantcodes/spectrum-ui` with 994 stars. Use Aceternity-style
  ideas only as aesthetic references: spotlight surfaces, animated borders,
  richer background depth.
- `moumen-soliman/uitripled` appeared in `shadcn blocks landing page` search
  with 1,252 stars and recent activity. Its useful lesson is block-level
  composition, but importing block packs would be overkill for this codebase.
- `HugoBlox/kit` appeared in Tailwind block searches with 9,541 stars. Its
  relevance is modular page sections, but the app should not migrate to a
  content/site-builder model.

## Audience-specific design direction

Direction: calm field notebook for worried senior-pet families.

The interface should feel like a clear care record, not a generic SaaS splash
page and not a veterinary diagnosis tool.

Principles:

1. Large readable text.
   - Body copy should move toward 18px with relaxed line height.
   - Small text remains only for labels, metadata, and compact navigation.
2. Warm trust palette.
   - Keep cream, sage, navy, and clay.
   - Increase contrast for core text and controls.
   - Avoid purple/blue AI gradients, saturated colors, and busy decoration.
3. Clear hierarchy.
   - One dominant action per page.
   - Use asymmetric layouts and section bands instead of equal-card grids
     everywhere.
4. Accessibility.
   - Add skip link and stronger global focus-visible styling.
   - Preserve semantic `main`, `nav`, `section`, `article`, `aside`.
   - Keep WCAG AA contrast in primary text and controls.
5. Calmer depth.
   - Use subtle paper texture, warm surfaces, tinted shadows, and left-rule
     callouts.
   - Use motion only for hover/active states and avoid flashy animation.

## Existing app diagnosis

Stack:

- Next.js 14 App Router
- React 18
- TypeScript
- Tailwind CSS 3.4
- No large UI component library

Current strengths:

- Warm palette already exists.
- Medical disclaimer is reusable and present in important pages.
- The app already uses semantic page sections and Tailwind tokens.
- There is no redundant UI dependency to remove.

Current layout issues:

- Many sections use equal-height/equal-weight white cards, creating a generic
  card grid feel.
- Homepage, tools page, and guide pages use several `text-sm` blocks for
  important explanatory content, which is too small for the stated audience.
- Navigation and CTA styling is consistent but visually modest; primary paths
  need stronger hierarchy.
- Page rhythm is compact in places. Senior-pet caregivers benefit from more
  breathing room and clearer section separation.

## Implementation plan

Batch 1: research and design direction.

- Add this research document.
- No runtime code changes.

Batch 2: global visual system.

- Add skip link and global focus-visible styling.
- Strengthen typography defaults and surface tokens.
- Add reusable CSS component classes for paper cards, soft panels, and section
  rhythm without adding dependencies.

Batch 3: homepage and tools hub layout.

- Rework hero and tool sections from repeated small cards into stronger
  editorial bands and asymmetric grids.
- Increase important body copy to 18px or larger.
- Keep existing links, content, analytics, and product paths.

Batch 4: guide/calculator shell polish.

- Improve guide readability with wider text, stronger callout hierarchy, and
  calmer CTA placement.
- Improve calculator shell readability without changing calculator logic.

Verification:

- Run targeted script tests if affected.
- Run `npm run typecheck`.
- Run `npm run build`.
- Verify desktop and mobile layout in browser screenshots, especially 390px
  width for text overflow and CTA wrapping.
