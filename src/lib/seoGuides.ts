import type { Metadata } from 'next';
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from '@/lib/site';

export interface SeoGuide {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  intro: string;
  audience: string;
  lastUpdated: string;
  checklistTitle: string;
  checklist: string[];
  notesTitle: string;
  notes: string[];
  vetQuestions: string[];
  faq: Array<{
    question: string;
    answer: string;
  }>;
  ctaHref?: string;
  ctaLabel?: string;
  nextStepBody?: string;
}

const SHARED_BOUNDARY =
  'This guide is not a diagnosis or veterinary advice. It is a way to organize observations before talking with a licensed veterinarian.';

export const SEO_GUIDES: SeoGuide[] = [
  {
    slug: 'senior-dog-quality-of-life-checklist',
    title: 'Senior Dog Quality of Life Checklist',
    description:
      'A calm senior dog quality-of-life checklist for tracking comfort, appetite, mobility, mood, and good days before a vet conversation.',
    eyebrow: 'Senior dog checklist',
    h1: 'Senior Dog Quality of Life Checklist',
    intro:
      'Older dogs often change slowly. A weekly checklist can make small shifts easier to notice, especially before a vet visit or a 7-day follow-up.',
    audience:
      'For families caring for an older dog who want a simple way to compare this week with last week.',
    lastUpdated: '2026-06-05',
    checklistTitle: 'What to notice this week',
    checklist: [
      'Comfort: signs of soreness, restlessness, panting, or trouble settling.',
      'Appetite: whether meals, treats, and usual interest in food have changed.',
      'Water: drinking much more, much less, or at unusual times.',
      'Bathroom habits: accidents, straining, diarrhea, constipation, or changed routines.',
      'Mobility: stairs, standing up, slipping, walks, car rides, and favorite resting spots.',
      'Mood and interest: greeting, play, attention, hiding, or wanting more quiet.',
      'Good days vs. hard days: whether the week felt mostly steady, mixed, or harder than before.',
    ],
    notesTitle: 'How to make the notes useful',
    notes: [
      'Use the same categories each week so the comparison is consistent.',
      'Write down examples, not just scores: "needed help standing twice" is more useful than "worse".',
      'Bring the pattern to your veterinarian instead of trying to interpret it alone.',
      SHARED_BOUNDARY,
    ],
    vetQuestions: [
      'Which changes are most important for us to track between visits?',
      'What mobility or comfort changes would make you want to see my dog sooner?',
      'Are there weight, appetite, water, or bathroom patterns we should watch closely?',
      'Would a 7-day follow-up note help you understand the trend?',
    ],
    faq: [
      {
        question: 'How often should I check my senior dog quality of life?',
        answer:
          'A weekly check-in is a practical rhythm for many families. If your dog changes suddenly or seems distressed, contact a veterinarian sooner.',
      },
      {
        question: 'Is a quality-of-life checklist a diagnosis?',
        answer:
          'No. A checklist can organize what you notice, but health decisions should be made with a licensed veterinarian.',
      },
    ],
  },
  {
    slug: 'senior-dog-night-waking-log',
    title: 'Senior Dog Night-Waking Log',
    description:
      'A simple senior dog night-waking log for tracking barking, pacing, water, potty needs, caregiver sleep disruption, comfort, and what helps them settle.',
    eyebrow: 'Night-waking log',
    h1: 'Senior Dog Night-Waking Log',
    intro:
      'When an older dog starts waking, barking, pacing, or needing help at night, the details blur quickly, especially when everyone is short on sleep. A short, consistent log can make the next vet conversation clearer.',
    audience:
      'For families whose senior dog has started waking, barking, pacing, seeming unsettled, or needing more overnight support while the caregiver is also losing sleep.',
    lastUpdated: '2026-06-15',
    checklistTitle: 'What to write down overnight',
    checklist: [
      'Time: when the waking, barking, pacing, or whining started and how long it lasted.',
      'Pattern: whether it happened once, several times, or around the same time each night.',
      'Need vs. confusion: whether your dog seemed to need water, potty, comfort, food, light, or help finding a resting spot.',
      'Movement: pacing route, slipping, trouble standing, stairs, circling, or difficulty settling back down.',
      'Comfort signs: panting, trembling, restlessness, licking, guarding, or not wanting to lie down.',
      'Food and water: appetite that day, evening snacks, extra drinking, or overnight water trips.',
      'Caregiver sustainability: how many times you woke up, how fragmented your sleep was, whether anyone can cover a night, and whether the routine is becoming unsafe.',
      'What helped: lights, a calmer room, a potty break, water, a different bed, company, or nothing obvious.',
    ],
    notesTitle: 'How to keep the log useful',
    notes: [
      'Use the same short fields for several nights instead of rewriting the whole story each time.',
      'Separate what you saw from what you think caused it. "Paced kitchen to hallway for 20 minutes" is more useful than guessing.',
      'Include your own sleep and safety limits without shame. That context helps your veterinarian understand the real home routine.',
      'Do not use a 7-day log to delay care if your dog seems suddenly distressed, weak, painful, or very different from normal.',
      SHARED_BOUNDARY,
    ],
    vetQuestions: [
      'Which night-waking details are most useful for you to review?',
      'Should we check pain, vision, hearing, anxiety, bathroom needs, appetite, or cognitive changes?',
      'What options are realistic if both my dog\'s comfort and my ability to keep caring safely are getting worse?',
      'Are there signs that would mean we should contact you sooner than our planned follow-up?',
      'Would a 7-day quality-of-life check-in help us compare this week with next week?',
    ],
    faq: [
      {
        question: 'Is night waking normal for senior dogs?',
        answer:
          'Some older dogs do wake more often, but a new or worsening pattern is worth discussing with a veterinarian. A log can show timing, frequency, and related changes without trying to diagnose the cause.',
      },
      {
        question: 'What should I track if my old dog barks at night?',
        answer:
          'Track the time, duration, pacing or confusion, water or potty needs, appetite, comfort, mobility, light level, and what helped your dog settle.',
      },
      {
        question: 'Should I tell the vet that I am exhausted too?',
        answer:
          'Yes. Broken sleep, stairs, heavy lifting, and lack of backup help can affect what is realistic at home. Sharing that context is not selfish; it helps the veterinarian discuss a plan that considers both your dog\'s comfort and safe caregiving.',
      },
    ],
    ctaHref:
      '/tools/senior-pet-quality-of-life-calculator?guide=senior-dog-night-waking-log&intent=caregiver_sustainability',
    ctaLabel: 'Start a night-waking check-in',
    nextStepBody:
      'Use the overnight notes and your own sleep limits as a starting point, then turn the broader comfort, appetite, mobility, mood, and good-day pattern into a printable quality-of-life report and 7-day follow-up.',
  },
  {
    slug: 'senior-dog-low-appetite-log',
    title: 'Senior Dog Low Appetite Log',
    description:
      'A senior dog low-appetite log for tracking skipped meals, accepted foods, treats, water, stool, energy, weight, and vet follow-up questions.',
    eyebrow: 'Appetite log',
    h1: 'Senior Dog Low Appetite Log',
    intro:
      'A senior dog who starts skipping meals or only accepting favorite foods can leave families guessing. A simple meal log helps turn scattered memories into clearer vet notes.',
    audience:
      'For families whose older dog is eating less, skipping meals, refusing usual food, or becoming more selective than before.',
    lastUpdated: '2026-06-12',
    checklistTitle: 'What to record for each meal',
    checklist: [
      'Time offered: breakfast, dinner, snacks, overnight food, or unusual feeding times.',
      'Food offered: kibble, wet food, broth, treats, cat food, home additions, or a changed diet.',
      'What happened: refused, sniffed and walked away, ate a bite, ate half, or finished the meal.',
      'Amount: a rough estimate is enough, such as none, a few bites, half, most, or all.',
      'Related signs: water, stool, vomiting, drooling, energy, mood, comfort, or bathroom changes.',
      'Setup changes: plate or bowl height, location, texture, temperature, quiet room, or hand feeding.',
      'Weight trend: current weight if you can measure it safely, or whether harness/collar fit seems different.',
    ],
    notesTitle: 'How to discuss appetite changes',
    notes: [
      'Bring the log to your veterinarian instead of deciding alone whether the change is "just age".',
      'List treats and cat food too. They can make the pattern clearer, especially if regular meals are refused.',
      'Ask your vet before starting appetite stimulants, supplements, or major diet changes.',
      SHARED_BOUNDARY,
    ],
    vetQuestions: [
      'Would you like a recheck weight, bloodwork, urinalysis, dental review, or pain/nausea discussion?',
      'Which appetite or water changes would make you want to see my dog sooner?',
      'Is the current food setup comfortable, or should we try a different height, texture, or feeding routine?',
      'What should I track for the next 7 days before we follow up?',
    ],
    faq: [
      {
        question: 'Is low appetite normal in an old dog?',
        answer:
          'Aging can change routines, but new or persistent appetite loss should be discussed with a veterinarian. A meal log helps show what changed and how often it happens.',
      },
      {
        question: 'Should I use an appetite stimulant for my senior dog?',
        answer:
          'Ask your veterinarian. Appetite stimulants may be appropriate in some situations, but the decision should account for your dog\'s exam, health history, and current signs.',
      },
    ],
    ctaHref:
      '/tools/senior-pet-quality-of-life-calculator?guide=senior-dog-low-appetite-log',
    ctaLabel: 'Turn appetite notes into a 7-day check-in',
    nextStepBody:
      'Use the meal log alongside comfort, water, mobility, mood, and good-day notes to create a printable quality-of-life report for the next vet conversation.',
  },
  {
    slug: 'senior-cat-quality-of-life-checklist',
    title: 'Senior Cat Quality of Life Checklist',
    description:
      'A senior cat quality-of-life checklist for tracking appetite, litter box changes, grooming, mobility, hiding, and good days.',
    eyebrow: 'Senior cat checklist',
    h1: 'Senior Cat Quality of Life Checklist',
    intro:
      'Senior cats can hide discomfort or routine changes. A small weekly record can help you see patterns that are easy to miss day by day.',
    audience:
      'For families caring for an older cat and trying to separate normal aging from changes worth discussing with a vet.',
    lastUpdated: '2026-06-05',
    checklistTitle: 'What to notice this week',
    checklist: [
      'Eating: appetite, food preference changes, chewing difficulty, or unfinished meals.',
      'Water: drinking more, drinking less, or visiting the water bowl more often.',
      'Litter box: accidents, straining, changes in stool, urine amount, or box avoidance.',
      'Grooming: mats, greasy coat, reduced grooming, overgrooming, or new sensitivity to touch.',
      'Mobility: jumping, stairs, climbing into boxes, stiffness, or hesitation.',
      'Behavior: hiding, vocalizing, clinginess, irritability, confusion, or changed sleep spots.',
      'Good days vs. hard days: whether the week felt mostly comfortable, mixed, or more difficult.',
    ],
    notesTitle: 'How to make the notes useful',
    notes: [
      'Track the same categories for at least a week before comparing trends.',
      'Include concrete examples, such as "missed the litter box twice" or "stopped jumping to the sofa".',
      'Ask your veterinarian before starting vitamins, supplements, or diet changes.',
      SHARED_BOUNDARY,
    ],
    vetQuestions: [
      'Which senior-cat screening schedule makes sense for my cat?',
      'Should we discuss weight, blood pressure, teeth, bloodwork, or pain signs?',
      'Are these litter box or grooming changes worth checking soon?',
      'What should I keep tracking for the next 7 days?',
    ],
    faq: [
      {
        question: 'What changes matter most for senior cats?',
        answer:
          'Appetite, water, litter box habits, grooming, mobility, hiding, and good vs. hard days are useful categories to track and discuss with a veterinarian.',
      },
      {
        question: 'Should I give my senior cat supplements?',
        answer:
          'Ask your veterinarian before starting supplements. Some are unnecessary, and some may not fit your cat\'s health history or medications.',
      },
    ],
  },
  {
    slug: 'older-pet-vet-visit-notes',
    title: 'What to Track Before a Vet Visit for an Older Pet',
    description:
      'A simple vet-visit notes guide for older dogs and cats: what changed, when it changed, what to ask, and how to prepare a clearer conversation.',
    eyebrow: 'Vet visit notes',
    h1: 'What to Track Before a Vet Visit for an Older Pet',
    intro:
      'A short note can make a senior-pet vet visit less blurry. The goal is not to solve the problem yourself. It is to bring clearer examples to the person who can examine your pet.',
    audience:
      'For families who know something has changed but are not sure how to explain it at the appointment.',
    lastUpdated: '2026-06-05',
    checklistTitle: 'What to write down before the visit',
    checklist: [
      'The main change: what feels different compared with your pet\'s normal week.',
      'When it started: the date, the week, or the event you first noticed.',
      'Frequency: whether it happened once, daily, several times, or only in a specific situation.',
      'Comfort and movement: standing, stairs, jumping, slipping, resting, or avoiding touch.',
      'Food, water, and bathroom changes: appetite, drinking, vomiting, stool, urine, and accidents.',
      'Mood and routine: hiding, clinginess, confusion, sleep, play, greeting, or interest in family.',
      'Photos or short notes: simple examples that show the pattern without guessing the cause.',
    ],
    notesTitle: 'How to keep the conversation focused',
    notes: [
      'Lead with the clearest change and one or two examples.',
      'Bring current medication names, supplements, food, and recent timeline notes.',
      'Ask what to monitor for the next 7 days after the visit.',
      SHARED_BOUNDARY,
    ],
    vetQuestions: [
      'Which changes should we prioritize today?',
      'What would you like me to monitor at home for the next week?',
      'Are there signs that should prompt a sooner follow-up?',
      'Would a printed quality-of-life report help our next conversation?',
    ],
    faq: [
      {
        question: 'What should I bring to a senior pet vet visit?',
        answer:
          'Bring a short timeline, current foods and medications, notes about appetite, water, bathroom habits, mobility, behavior, and any specific examples that show what changed.',
      },
      {
        question: 'Should I wait a week before calling the vet?',
        answer:
          'No. If your pet seems suddenly worse, distressed, or you are worried, contact a veterinarian. A 7-day note is for tracking non-urgent trends, not delaying care.',
      },
    ],
  },
];

export function getSeoGuide(slug: string): SeoGuide {
  const guide = SEO_GUIDES.find((item) => item.slug === slug);

  if (!guide) {
    throw new Error(`Unknown SEO guide: ${slug}`);
  }

  return guide;
}

export function buildGuideMetadata(guide: SeoGuide): Metadata {
  const path = `/guides/${guide.slug}`;

  return {
    title: `${guide.title} | Senior Pet Care`,
    description: guide.description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: path,
      siteName: SITE_NAME,
      type: 'article',
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 800,
          alt: 'A senior pet resting in soft natural light',
        },
      ],
    },
  };
}

export function buildGuideJsonLd(guide: SeoGuide) {
  const url = `${SITE_URL}/guides/${guide.slug}`;

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: guide.title,
      description: guide.description,
      datePublished: guide.lastUpdated,
      dateModified: guide.lastUpdated,
      author: {
        '@type': 'Organization',
        name: SITE_NAME,
      },
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
      },
      mainEntityOfPage: url,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Senior Pet Care',
          item: SITE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: guide.title,
          item: url,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: guide.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
  ];
}
