# Senior Pet Care Project Instructions

## Project positioning

This project is a decision-support platform for senior pet parents.

It is not:
- a generic pet content site
- a generic ecommerce site
- a veterinary diagnosis platform

It helps users:
- assess senior pet quality of life
- track changes over time
- prepare questions for their vet
- match supportive senior-safe products
- find gentle end-of-life resources

## Current priority

Do not build the full site yet.

Current priority:
Feature A: Interactive HHHHHMM Quality of Life Calculator.

The key funnel is:

assessment -> email capture -> printable report -> 7-day reassessment -> My Senior Pet Care Journal

The core metric is:

7-day re-assessment rate

## Engineering stack

Use:
- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- React hooks
- Supabase later
- MailerLite or ConvertKit later
- Plausible or GA4 later

Do not add unless explicitly requested:
- next-auth
- stripe
- prisma
- puppeteer
- redux
- zustand
- large UI libraries
- CMS
- complex auth

## Medical and ethical guardrails

The calculator is not a diagnosis.
Always include medical disclaimers.
Always recommend consulting a licensed veterinarian for health decisions.

End-of-life pages and end_of_life results must:
- be gentle
- avoid urgency
- avoid salesy language
- avoid product recommendations
- only show supportive resources and vet conversation guidance

## Build commands

Use:
- npm install
- npm run typecheck
- npm run build
- npm run dev

If npm is unavailable, diagnose Node/npm installation before changing the project.
