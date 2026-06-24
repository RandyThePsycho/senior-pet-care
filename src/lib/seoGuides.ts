import type { Metadata } from 'next';
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from '@/lib/site';

export interface SeoGuide {
  slug: string;
  title: string;
  description: string;
  socialImage?: {
    url: string;
    width: number;
    height: number;
    alt: string;
  };
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
      'A simple senior dog night-waking log for tracking barking, pacing, food requests, medication timing, water, potty needs, caregiver sleep disruption, comfort, and what helps them settle.',
    socialImage: {
      url: '/growth/pinterest/jpg/senior-dog-night-waking-log.jpg',
      width: 1000,
      height: 1500,
      alt: 'Senior dog night-waking log checklist with overnight tracking prompts',
    },
    eyebrow: 'Night-waking log',
    h1: 'Senior Dog Night-Waking Log',
    intro:
      'When an older dog starts waking, barking, pacing, or needing help at night, the details blur quickly, especially when everyone is short on sleep. A short, consistent log can make the next vet conversation clearer.',
    audience:
      'For families whose senior dog has started waking, barking, pacing, asking for food overnight, seeming unsettled, or needing more overnight support while the caregiver is also losing sleep.',
    lastUpdated: '2026-06-18',
    checklistTitle: 'What to write down overnight',
    checklist: [
      'Time: when the waking, barking, pacing, or whining started and how long it lasted.',
      'Pattern: whether it happened once, several times, or around the same time each night.',
      'Need vs. confusion: whether your dog seemed to need water, potty, comfort, food, light, or help finding a resting spot.',
      'Food-driven waking: whether the pattern is tied to breakfast time, treats, food puzzles, overnight snacks, or demanding food after waking.',
      'Movement: pacing route, slipping, trouble standing, stairs, circling, or difficulty settling back down.',
      'Medication effects: when medications were given, whether they helped sleep, and whether your dog became too wobbly or unsafe to move comfortably.',
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
      'Could food-driven waking, medication timing, or wobbliness after medication change what we should try next?',
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
          'Track the time, duration, pacing or confusion, water or potty needs, food requests, medication timing, appetite, comfort, mobility, light level, and what helped your dog settle.',
      },
      {
        question: 'What if my senior dog wakes up mostly asking for food?',
        answer:
          'Write down the time, what food was offered, whether your dog settled after eating, and whether the pattern is shifting earlier. Bring that pattern to your veterinarian instead of assuming it is only behavior or only age.',
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
    slug: 'old-dog-waking-up-at-night-asking-for-food',
    title: 'Old Dog Waking Up at Night Asking for Food',
    description:
      'A simple log for an old dog waking up at night asking for food, with prompts for timing, appetite, medication, water, potty needs, comfort, and caregiver sleep.',
    socialImage: {
      url: '/growth/pinterest/jpg/old-dog-waking-up-at-night-asking-for-food.jpg',
      width: 1000,
      height: 1500,
      alt: 'Old dog waking up at night asking for food tracking checklist',
    },
    eyebrow: 'Food-driven night waking',
    h1: 'Old Dog Waking Up at Night Asking for Food',
    intro:
      'When an older dog starts waking everyone up for breakfast, treats, or food at 2am, the pattern can feel confusing fast. A short log helps separate timing, appetite, comfort, medication, and caregiver sleep details before the next vet conversation.',
    audience:
      'For families whose senior dog wakes overnight, seems food-focused, settles only after eating, or shifts breakfast requests earlier while the caregiver is losing sleep.',
    lastUpdated: '2026-06-23',
    checklistTitle: 'What to record when food is part of the waking',
    checklist: [
      'Wake time: the first time your dog woke, barked, paced, stared, or asked for food.',
      'Food request: whether your dog wanted breakfast, treats, a puzzle, table food, or anything available.',
      'What was offered: type of food, amount, and whether your dog ate normally, gulped it down, or refused it.',
      'Settling pattern: whether eating helped your dog settle, how long it lasted, and whether the waking returned.',
      'Daytime appetite: normal meals, skipped meals, extra hunger, weight changes, nausea signs, or food selectivity.',
      'Water and potty: overnight drinking, urination, stool, accidents, or asking to go outside.',
      'Medication timing: evening medications, supplements, appetite changes, wobbliness, restlessness, or sleep changes after dosing.',
      'Comfort and movement: pacing, panting, trembling, circling, trouble standing, slipping, or not wanting to lie down.',
      'Caregiver sleep: how many times you woke, whether anyone can rotate nights, and whether the routine is becoming unsafe or unsustainable.',
    ],
    notesTitle: 'How to make the pattern easier to discuss',
    notes: [
      'Track three to five nights with the same fields instead of trying to explain every detail from memory.',
      'Write what happened before guessing why. "Woke at 2:10, ate half a cup, settled 40 minutes" is more useful than "being stubborn".',
      'Include food that seems unrelated, such as treats, table scraps, breakfast timing, and skipped meals.',
      'Do not change medications, restrict food, or start supplements without asking your veterinarian.',
      SHARED_BOUNDARY,
    ],
    vetQuestions: [
      'Could the overnight food requests be related to appetite, nausea, pain, cognitive change, medication timing, or another health change?',
      'Which food, water, potty, or weight details would help you decide what to check next?',
      'Should we adjust meal timing, medication timing, or follow-up monitoring, and what should I avoid changing on my own?',
      'What signs would mean I should call sooner than our planned follow-up?',
      'How should I balance my dog settling after food with the fact that nobody is sleeping?',
    ],
    faq: [
      {
        question: 'Why is my old dog waking up at night asking for food?',
        answer:
          'There are many possible reasons, including routine changes, appetite changes, discomfort, medication timing, bathroom needs, or cognitive changes. A log can show the timing and related signs, but a veterinarian should help interpret the pattern.',
      },
      {
        question: 'Should I feed my senior dog every time they wake up?',
        answer:
          'Ask your veterinarian before making a big routine change. In the meantime, track what you offered, whether your dog settled, and whether appetite, water, stool, weight, or comfort changed.',
      },
      {
        question: 'What should I bring to the vet if food requests happen overnight?',
        answer:
          'Bring wake times, food offered, amount eaten, settling time, daytime appetite, water, potty, medications, weight trend, and your own sleep disruption. Those details are easier to use than a general description of "waking all night".',
      },
    ],
    ctaHref:
      '/tools/senior-pet-quality-of-life-calculator?guide=old-dog-waking-up-at-night-asking-for-food&intent=food_driven_night_waking',
    ctaLabel: 'Start a food-driven night check-in',
    nextStepBody:
      'Use the food and sleep log as the starting point, then check comfort, appetite, hydration, mobility, mood, and good-day patterns in a printable quality-of-life report.',
  },
  {
    slug: 'senior-dog-low-appetite-log',
    title: 'Senior Dog Low Appetite Log',
    description:
      'A senior dog low-appetite log for tracking skipped meals, post-dental changes, late-night eating, 24-hour food totals, water, stool, weight, and vet follow-up questions.',
    socialImage: {
      url: '/growth/pinterest/jpg/senior-dog-low-appetite-log.jpg',
      width: 1000,
      height: 1500,
      alt: 'Senior dog low-appetite log checklist with meal tracking prompts',
    },
    eyebrow: 'Appetite log',
    h1: 'Senior Dog Low Appetite Log',
    intro:
      'A senior dog who starts skipping meals, only eats late, or changes appetite after dental work can leave families guessing. A simple meal log helps turn scattered memories into clearer vet notes.',
    audience:
      'For families whose older dog is eating less, skipping breakfast, refusing usual food, changing after tooth extractions, or becoming more selective than before.',
    lastUpdated: '2026-06-24',
    checklistTitle: 'What to record for each meal',
    checklist: [
      'Time offered: breakfast, dinner, snacks, overnight food, or unusual feeding times.',
      'Schedule pattern: whether your dog skips morning food, only eats late, or has late-night eating that is replacing normal meals.',
      'Food offered: kibble, wet food, broth, treats, cat food, home additions, or a changed diet.',
      'What happened: refused, sniffed and walked away, ate a bite, ate half, or finished the meal.',
      'Amount across 24 hours: estimate the total food eaten in the day, not only whether breakfast or dinner was finished.',
      'Mouth comfort: recent dental work, chewing oddly, dropping pieces, pawing at the mouth, lip-smacking, or preferring soaked or softened food.',
      'Related signs: water, stool, vomiting, drooling, nausea signs, energy, mood, comfort, or bathroom changes.',
      'Setup changes: plate or bowl height, location, texture, temperature, quiet room, or hand feeding.',
      'Weight trend: current weight if you can measure it safely, especially for a small dog where small changes can matter, or whether harness/collar fit seems different.',
    ],
    notesTitle: 'How to discuss appetite changes',
    notes: [
      'Bring the log to your veterinarian instead of deciding alone whether the change is "just age".',
      'Separate amount from pattern: "ate enough over 24 hours but only after 9pm" is different from "ate very little all day".',
      'List treats and cat food too. They can make the pattern clearer, especially if regular meals are refused.',
      'Include dental history, recent tooth extractions, kidney trends, GI workups, medications, and any foods that suddenly became easier or harder to eat.',
      'Ask your vet before starting appetite stimulants, supplements, major diet changes, or a new feeding schedule.',
      SHARED_BOUNDARY,
    ],
    vetQuestions: [
      'Is this weight trend acceptable for my dog\'s size, and when should we recheck weight?',
      'Would you like a mouth recheck after dental work, bloodwork, urinalysis, dental review, or pain/nausea discussion?',
      'Which appetite or water changes would make you want to see my dog sooner?',
      'Is the current food setup comfortable, or should we try a different height, texture, or feeding routine?',
      'Could kidney trends, nausea, mouth discomfort, medication effects, or routine changes still matter even if the bigger tests looked okay?',
      'What should I track for the next 7 days before we follow up?',
    ],
    faq: [
      {
        question: 'Is low appetite normal in an old dog?',
        answer:
          'Aging can change routines, but new or persistent appetite loss should be discussed with a veterinarian. A meal log helps show what changed and how often it happens.',
      },
      {
        question: 'What if my senior dog only eats late at night?',
        answer:
          'Track both the total eaten across 24 hours and the timing pattern. Bring notes about skipped breakfast, late-night eating, texture, water, stool, weight, and energy to your veterinarian so they can help interpret the change.',
      },
      {
        question: 'Can dental work change how my senior dog eats?',
        answer:
          'Some dogs may change chewing or food preferences after dental work, but you should not assume the cause. Track chewing, dropped pieces, softened food response, mouth-pawing, drooling, and appetite timing, then ask your veterinarian whether a recheck is needed.',
      },
      {
        question: 'Should I use an appetite stimulant for my senior dog?',
        answer:
          'Ask your veterinarian. Appetite stimulants may be appropriate in some situations, but the decision should account for your dog\'s exam, health history, and current signs.',
      },
    ],
    ctaHref:
      '/tools/senior-pet-quality-of-life-calculator?guide=senior-dog-low-appetite-log&intent=low_appetite_post_dental_timing',
    ctaLabel: 'Start an appetite timing check-in',
    nextStepBody:
      'Use the meal log alongside comfort, water, mobility, mood, and good-day notes to create a printable quality-of-life report and 7-day follow-up for the next vet conversation.',
  },
  {
    slug: 'senior-dog-caregiver-burnout-notes',
    title: 'Senior Dog Caregiver Burnout Notes',
    description:
      'A calm note guide for senior dog caregiver burnout: tracking accidents, barking, pacing, separation anxiety, sitter strain, weight changes, sleep, and vet questions.',
    socialImage: {
      url: '/growth/pinterest/jpg/senior-dog-caregiver-burnout-notes.jpg',
      width: 1000,
      height: 1500,
      alt: 'Senior dog caregiver burnout notes checklist with home-care capacity prompts',
    },
    eyebrow: 'Caregiver capacity notes',
    h1: 'Senior Dog Caregiver Burnout Notes',
    intro:
      'It is possible to love an old dog deeply and still feel exhausted, trapped, guilty, or angry when the daily care routine becomes too much. Short notes can help turn that swirl into a clearer vet conversation about both your dog and what is realistic at home.',
    audience:
      'For families caring for a senior dog whose anxiety, accidents, pacing, barking, toileting changes, grooming difficulty, or need for supervision is overwhelming the caregiver.',
    lastUpdated: '2026-06-23',
    checklistTitle: 'What to capture before the vet conversation',
    checklist: [
      'Care routine: how long your dog can be left alone, what happens when you leave, and how long the barking, pacing, or distress lasts.',
      'Toileting pattern: where accidents happen, how often they happen, whether your dog can still toilet outside, and how much cleanup is involved.',
      'Sleep and supervision: whether anyone is sleeping through the night, whether your dog needs constant watching, and whether the routine is becoming unsafe.',
      'Food, water, and weight: appetite, drinking, weight changes after you travel or leave, and whether your dog eats normally with sitters.',
      'Movement and grooming: slipping, trouble standing, resistance to grooming, difficulty being handled, or reports from groomers and sitters.',
      'Stress reducers: what actually helps, such as shorter absences, a smaller room, a sitter, a predictable potty schedule, light, sound, or company.',
      'Caregiver capacity: which tasks are no longer sustainable, who can help, and what would happen if the current routine continues another week.',
    ],
    notesTitle: 'How to write it without judging yourself',
    notes: [
      'Use concrete examples instead of labels. "Cleaned stool from the floor and coat three times before work" is more useful than "I cannot handle this".',
      'Include sitter, groomer, or family reports. Outside observations can help show whether the pattern happens only with you or across settings.',
      'Name your own limits plainly. Caregiver exhaustion, sleep loss, lifting risk, and cleanup burden are relevant home-care facts.',
      'Ask for a plan that considers your dog\'s comfort and your ability to keep providing care safely.',
      SHARED_BOUNDARY,
    ],
    vetQuestions: [
      'Which behavior, toileting, weight, or sleep changes should we prioritize first?',
      'Could pain, anxiety, cognitive change, GI issues, urinary problems, vision, hearing, or medication effects be contributing?',
      'What should I track for the next 7 days so we can compare the pattern instead of relying on memory?',
      'What options are realistic if I cannot safely continue the current cleanup, supervision, or sleep routine?',
      'Are there signs that mean I should contact you sooner than the planned follow-up?',
    ],
    faq: [
      {
        question: 'Am I a bad person for feeling burnt out by senior dog care?',
        answer:
          'No. Exhaustion and frustration can happen even when you love your dog. Those feelings are worth bringing into the vet conversation because they affect what care is realistic at home.',
      },
      {
        question: 'What should I track if my old dog has accidents in the house?',
        answer:
          'Track when accidents happen, where they happen, stool or urine details, whether your dog had a chance to go outside, cleanup burden, appetite, water, mobility, and whether the pattern changes when someone else watches your dog.',
      },
      {
        question: 'Should I tell the vet that sitters or groomers are struggling too?',
        answer:
          'Yes. Sitter and groomer reports can help show how your dog is coping outside the usual routine and whether handling, anxiety, toileting, or mobility has changed.',
      },
    ],
    ctaHref:
      '/tools/senior-pet-quality-of-life-calculator?guide=senior-dog-caregiver-burnout-notes&intent=caregiver_capacity',
    ctaLabel: 'Turn care notes into a 7-day check-in',
    nextStepBody:
      'Use the home-care notes alongside comfort, appetite, mobility, mood, and good-day patterns to create a printable quality-of-life report and a 7-day follow-up.',
  },
  {
    slug: 'senior-dog-accidents-in-house-caregiver-exhausted',
    title: 'Senior Dog Accidents in the House and Caregiver Exhaustion',
    description:
      'A practical note guide for senior dog accidents in the house, cleanup burden, sleep loss, mobility, appetite, water, and caregiver capacity before a vet conversation.',
    socialImage: {
      url: '/growth/pinterest/jpg/senior-dog-accidents-in-house-caregiver-exhausted.jpg',
      width: 1000,
      height: 1500,
      alt: 'Senior dog accidents in the house caregiver exhaustion checklist',
    },
    eyebrow: 'Accident and cleanup notes',
    h1: 'Senior Dog Accidents in the House and Caregiver Exhaustion',
    intro:
      'House accidents can turn senior dog care from hard into overwhelming, especially when cleanup, laundry, sleep loss, and work schedules collide. Clear notes can help you talk with your veterinarian about the dog in front of you and the care routine you can actually sustain.',
    audience:
      'For caregivers dealing with new or worsening urine, stool, or overnight accidents from a senior dog, especially when cleanup and supervision are exhausting the household.',
    lastUpdated: '2026-06-23',
    checklistTitle: 'What to track about accidents and cleanup',
    checklist: [
      'Timing: when accidents happen, including overnight, after meals, after drinking, after naps, or when left alone.',
      'Type: urine, stool, diarrhea, dribbling, leaking while resting, or accidents while trying to get outside.',
      'Location: bed, crate, hallway, doorway, carpet, stairs, favorite resting spot, or near the exit.',
      'Opportunity: when your dog last went outside and whether they could stand, walk, squat, or signal in time.',
      'Cleanup burden: how many cleanups per day, whether coat or bedding is involved, and whether the routine affects work or sleep.',
      'Water and appetite: drinking more or less, appetite changes, vomiting, stool changes, weight changes, or food switches.',
      'Mobility and pain signs: slipping, trouble standing, stairs, weakness, reluctance to move, panting, trembling, or guarding.',
      'Stress and separation: barking, pacing, accidents when alone, sitter reports, or changes after family schedules shift.',
      'Caregiver capacity: who can help, what is unsafe, and which parts of the routine cannot continue another week without a plan.',
    ],
    notesTitle: 'How to talk about accidents without shame',
    notes: [
      'Use plain facts. "Three urine accidents before noon and one stool cleanup overnight" gives your vet a clearer starting point.',
      'Include what the cleanup is doing to the household. Sleep loss, lifting risk, laundry, stairs, and lack of backup help matter.',
      'Do not assume accidents are only behavior or only age. Bring the pattern to your veterinarian so they can decide what is worth checking.',
      'Avoid starting products, supplements, or major routine changes before asking what fits your dog\'s health history.',
      SHARED_BOUNDARY,
    ],
    vetQuestions: [
      'Which accident details would help you decide whether to check urine, stool, pain, mobility, medication effects, or cognitive changes?',
      'What signs would make this more urgent or worth contacting you sooner?',
      'What can we track for the next 7 days so we know whether the pattern is improving or worsening?',
      'What is realistic if cleanup, sleep loss, or lifting is becoming unsafe for the caregiver?',
      'Are there home-care changes we should avoid until you examine my dog or review the pattern?',
    ],
    faq: [
      {
        question: 'Are house accidents normal for senior dogs?',
        answer:
          'They can become more common with age, but new, frequent, or worsening accidents are worth discussing with a veterinarian. A log helps show timing, type, mobility, water, appetite, and cleanup burden.',
      },
      {
        question: 'What should I track if my old dog is having accidents inside?',
        answer:
          'Track the time, type of accident, location, last potty break, water, appetite, stool, mobility, whether your dog signaled, and how much cleanup was required.',
      },
      {
        question: 'Is caregiver exhaustion relevant to a vet visit?',
        answer:
          'Yes. A plan that ignores cleanup burden, sleep loss, lifting risk, or lack of backup help may not work at home. It is reasonable to tell your veterinarian what is no longer sustainable.',
      },
    ],
    ctaHref:
      '/tools/senior-pet-quality-of-life-calculator?guide=senior-dog-accidents-in-house-caregiver-exhausted&intent=accidents_caregiver_capacity',
    ctaLabel: 'Start an accidents and care-capacity check-in',
    nextStepBody:
      'Use the accident notes with comfort, appetite, hydration, mobility, mood, and good-day ratings to create a printable quality-of-life report and 7-day follow-up.',
  },
  {
    slug: 'senior-dog-mobility-notes',
    title: 'Senior Dog Mobility Notes',
    description:
      'A senior dog mobility notes guide for tracking slipping, stairs, standing, restricted activity, medication effects, caregiver sleep, and vet or neurologist follow-up questions.',
    socialImage: {
      url: '/growth/pinterest/jpg/senior-dog-mobility-notes.jpg',
      width: 1000,
      height: 1500,
      alt: 'Senior dog mobility notes checklist with movement, safety, and caregiver capacity prompts',
    },
    eyebrow: 'Mobility and safe-care notes',
    h1: 'Senior Dog Mobility Notes',
    intro:
      'When a senior dog suddenly needs help standing, slips on normal routes, struggles with stairs, or has a vet-directed restricted activity plan, the whole home routine can change overnight. These notes help you bring clearer patterns to your veterinarian or neurologist without trying to diagnose the cause yourself.',
    audience:
      'For caregivers tracking senior dog mobility changes, including slipping, weakness, stairs, pain signs, medication wobbliness, restricted activity instructions from a vet, or caregiver sleep loss from overnight support.',
    lastUpdated: '2026-06-24',
    checklistTitle: 'What to track about movement and home safety',
    checklist: [
      'Movement pattern: standing up, lying down, turning, stairs, doorways, walks, car rides, favorite resting spots, and slipping.',
      'Timing: when mobility looks best or worst, including after sleep, meals, walks, medication, potty trips, or overnight wakeups.',
      'Body signs: panting, trembling, guarding, yelping, dragging, weakness, wobbliness, restlessness, or reluctance to lie down.',
      'Potty access: whether your dog can get outside, squat, balance, return safely, or avoid pulling and slipping.',
      'Vet-directed restrictions: any restricted activity, crate or room-rest instructions, leash limits, follow-up dates, and what is hard to follow at home.',
      'Medication effects: dose timing, sleepiness, wobbliness, appetite change, GI signs, restlessness, or unsafe movement after medication.',
      'Vision and layout: lighting, shadows, steps, flooring, room changes, cues, or confusion that may affect a dog with reduced sight or hearing.',
      'Caregiver capacity: lifting risk, lost sleep, missed work, lack of backup help, and moments when support becomes unsafe for the caregiver.',
    ],
    notesTitle: 'How to keep mobility notes useful',
    notes: [
      'Write observable examples before naming the problem. "Slipped twice on the hallway turn after evening medication" is more useful than guessing the cause.',
      'If your veterinarian or neurologist gave restricted activity instructions, track what worked, what failed, and what was not realistic at home.',
      'Include caregiver sleep and lifting limits plainly. A plan that requires constant overnight support may not be safe without backup.',
      'Do not change medication timing, activity limits, supplements, ramps, braces, or exercise plans without asking your licensed veterinarian.',
      SHARED_BOUNDARY,
    ],
    vetQuestions: [
      'Which mobility details would help you decide whether to recheck pain, neurologic function, medication effects, or home-safety limits?',
      'If restricted activity was recommended, what should I track before the next appointment or neurologist follow-up?',
      'What signs mean I should contact you sooner than the planned follow-up?',
      'What home-care tasks are unsafe for me to keep doing alone, and what backup plan should we discuss?',
      'Would a 7-day quality-of-life check-in help compare mobility, comfort, appetite, sleep, and good-day patterns?',
    ],
    faq: [
      {
        question: 'What should I track if my senior dog is suddenly slipping or weak?',
        answer:
          'Track when it happens, the surface or route, whether your dog can stand, potty, eat, drink, and settle, medication timing, pain signs, and whether the caregiver can help safely. A veterinarian should interpret the pattern.',
      },
      {
        question: 'Should I mention caregiver sleep loss during a mobility visit?',
        answer:
          'Yes. Overnight support, lifting, potty trips, and supervision affect whether a home plan is realistic and safe. That context can help your veterinarian discuss next steps.',
      },
      {
        question: 'Can these notes replace a neurologist or vet follow-up?',
        answer:
          'No. These notes are only for organizing what you observe. Health decisions, activity restrictions, medication changes, and specialist referrals should come from a licensed veterinarian.',
      },
    ],
    ctaHref:
      '/tools/senior-pet-quality-of-life-calculator?guide=senior-dog-mobility-notes&intent=mobility_caregiver_capacity',
    ctaLabel: 'Start a mobility check-in',
    nextStepBody:
      'Use the mobility notes with comfort, appetite, hydration, mood, sleep, and good-day ratings to create a printable quality-of-life report and 7-day follow-up.',
  },
  {
    slug: 'senior-dog-separation-anxiety-when-left-alone',
    title: 'Senior Dog Separation Anxiety When Left Alone',
    description:
      'A calm observation guide for senior dog separation anxiety when left alone, with prompts for barking, pacing, accidents, appetite, sleep, triggers, and caregiver capacity.',
    eyebrow: 'Separation and supervision notes',
    h1: 'Senior Dog Separation Anxiety When Left Alone',
    intro:
      'When a senior dog cannot be left alone without barking, pacing, accidents, or panic, the whole household can start planning life around the dog. A short pattern log can make the next vet conversation more concrete.',
    audience:
      'For caregivers whose older dog is newly distressed when alone, needs constant supervision, or is making work, sleep, errands, sitters, or family routines feel impossible.',
    lastUpdated: '2026-06-23',
    checklistTitle: 'What to track when leaving your dog alone',
    checklist: [
      'Time alone: how long your dog was left, what time of day, and whether anyone was nearby.',
      'Behavior: barking, whining, pacing, scratching, panting, trembling, hiding, or waiting by the door.',
      'Accidents or damage: urine, stool, bedding, doors, crates, gates, or cleanup required afterward.',
      'Recovery: how long it took your dog to settle after you returned.',
      'Food and water: appetite before and after, treats refused, extra drinking, vomiting, or stool changes.',
      'Sleep and night pattern: whether daytime distress also connects with night waking or caregiver sleep loss.',
      'Triggers and helpers: keys, shoes, car sounds, room setup, sitter visits, company, light, music, or a predictable routine.',
      'Caregiver capacity: what errands, work blocks, or rest periods are no longer possible without a plan.',
    ],
    notesTitle: 'How to make the notes useful',
    notes: [
      'Separate what you saw from what you fear it means. "Barked 35 minutes after I left" is more useful than "cannot cope".',
      'Include sitter, camera, neighbor, or family reports if you have them.',
      'Ask your veterinarian before changing medications, supplements, confinement, or training intensity.',
      SHARED_BOUNDARY,
    ],
    vetQuestions: [
      'Could pain, sensory change, cognitive change, anxiety, medication effects, or bathroom needs be contributing?',
      'Which signs should I track for a week before we decide what to try next?',
      'What should I avoid doing until you review the pattern or examine my dog?',
      'What is realistic if my dog cannot be left alone and I have no reliable backup care?',
    ],
    faq: [
      {
        question: 'Can senior dogs develop separation anxiety later in life?',
        answer:
          'Some older dogs do become more distressed when alone, but the reason is not always simple. Tracking timing, behavior, accidents, appetite, sleep, and recovery can help your veterinarian decide what to consider.',
      },
      {
        question: 'Should I use a camera to track senior dog separation distress?',
        answer:
          'A camera can be useful if it helps you record timing and patterns without guessing. Bring short notes to your veterinarian rather than trying to diagnose the cause yourself.',
      },
    ],
    ctaHref:
      '/tools/senior-pet-quality-of-life-calculator?guide=senior-dog-separation-anxiety-when-left-alone&intent=separation_anxiety_caregiver_capacity',
    ctaLabel: 'Start a separation-support check-in',
    nextStepBody:
      'Use the alone-time notes with comfort, appetite, hydration, mobility, mood, and good-day ratings to create a printable quality-of-life report and 7-day follow-up.',
  },
  {
    slug: 'senior-dog-pacing-at-night-caregiver-cannot-sleep',
    title: 'Senior Dog Pacing at Night and Caregiver Cannot Sleep',
    description:
      'A senior dog night pacing log for tracking timing, route, food, water, potty, medication, comfort, mobility, and caregiver sleep before a vet conversation.',
    eyebrow: 'Night pacing and sleep notes',
    h1: 'Senior Dog Pacing at Night and Caregiver Cannot Sleep',
    intro:
      'Night pacing can turn one hard evening into weeks of broken sleep. A consistent log helps show whether the pattern connects with food, bathroom needs, discomfort, medication timing, mobility, or confusion.',
    audience:
      'For families whose senior dog paces, circles, wanders, or cannot settle at night while the caregiver is also becoming exhausted.',
    lastUpdated: '2026-06-23',
    checklistTitle: 'What to record during night pacing',
    checklist: [
      'Start time and duration: when pacing began, how long it lasted, and whether it repeated.',
      'Route: hallway, kitchen, bedroom, door, stairs, crate, bed, water bowl, or outside door.',
      'Body signs: panting, trembling, stumbling, circling, slipping, weakness, restlessness, or trouble lying down.',
      'Needs: food, water, potty, company, light, temperature change, or help finding a resting spot.',
      'Medication timing: evening doses, effects, wobbliness, restlessness, or sedation that seems unsafe.',
      'What helped: potty break, water, snack, different bed, lights, calm room, company, or nothing obvious.',
      'Caregiver sleep: how often you woke, whether anyone can rotate nights, and whether the routine is becoming unsafe.',
    ],
    notesTitle: 'How to bring it to your veterinarian',
    notes: [
      'Use the same fields for several nights so the pattern is easier to compare.',
      'Include your own sleep limits. Caregiver exhaustion changes what is realistic at home.',
      'Do not use a log to delay care if your dog seems suddenly distressed, weak, painful, or very different.',
      SHARED_BOUNDARY,
    ],
    vetQuestions: [
      'Which night pacing details are most important for you to review?',
      'Could pain, bathroom needs, appetite, cognitive change, vision, hearing, or medication timing be involved?',
      'What signs mean I should contact you sooner than our planned follow-up?',
      'What options are realistic if nobody in the home can sleep safely?',
    ],
    faq: [
      {
        question: 'Why is my senior dog pacing at night?',
        answer:
          'There are many possible reasons, including discomfort, bathroom needs, appetite, sensory changes, medication effects, anxiety, or cognitive changes. A log can organize the pattern for a veterinarian.',
      },
      {
        question: 'What should I track if my old dog paces all night?',
        answer:
          'Track start time, duration, route, body signs, food, water, potty needs, medication timing, what helped, and how much sleep the caregiver lost.',
      },
    ],
    ctaHref:
      '/tools/senior-pet-quality-of-life-calculator?guide=senior-dog-pacing-at-night-caregiver-cannot-sleep&intent=night_pacing_caregiver_sleep',
    ctaLabel: 'Start a night-pacing check-in',
    nextStepBody:
      'Use the night-pacing notes with comfort, appetite, hydration, mobility, mood, and good-day ratings to create a printable quality-of-life report and 7-day follow-up.',
  },
  {
    slug: 'senior-dog-dementia-vet-checklist',
    title: 'Senior Dog Dementia Vet Checklist',
    description:
      'A non-diagnostic senior dog dementia vet checklist for tracking night waking, pacing, accidents, appetite, medication effects, caregiver sleep, and questions for a licensed veterinarian.',
    socialImage: {
      url: '/growth/pinterest/jpg/senior-dog-dementia-vet-checklist.jpg',
      width: 1000,
      height: 1500,
      alt: 'Senior dog dementia vet checklist with night waking, pacing, accidents, medication, and caregiver sleep prompts',
    },
    eyebrow: 'Cognitive-change vet notes',
    h1: 'Senior Dog Dementia Vet Checklist',
    intro:
      'Families often use the word dementia when an older dog starts pacing, waking at night, seeming confused, having accidents, or needing more supervision. This checklist does not diagnose dementia. It helps you bring clearer patterns to a licensed veterinarian.',
    audience:
      'For caregivers worried about possible cognitive changes in a senior dog, especially when night waking, pacing, accidents, food requests, medication effects, or caregiver sleep loss are part of the pattern.',
    lastUpdated: '2026-06-23',
    checklistTitle: 'What to track before asking about cognitive changes',
    checklist: [
      'Timing: when confusion, pacing, staring, barking, or night waking happens and how long it lasts.',
      'Navigation: getting stuck, circling, staring at walls, trouble finding doors, or needing help settling.',
      'Sleep pattern: day sleeping, night waking, food requests, pacing, barking, and how often the caregiver wakes.',
      'Bathroom changes: accidents, asking to go out, forgetting routines, leaking, stool changes, or cleanup burden.',
      'Food and water: appetite shifts, food-driven waking, extra drinking, skipped meals, weight changes, or nausea signs.',
      'Movement and comfort: slipping, trouble standing, pain signs, panting, trembling, restlessness, or reluctance to lie down.',
      'Medication effects: dose timing, sleepiness, wobbliness, restlessness, appetite changes, or unsafe movement after medication.',
      'Sensory context: vision, hearing, lighting, shadows, stairs, noise, room layout, and whether a calmer setup helps.',
      'Caregiver capacity: sleep loss, supervision demands, cleanup, lifting risk, lack of backup help, and what cannot continue safely.',
    ],
    notesTitle: 'How to keep the notes useful and safe',
    notes: [
      'Write what you see before naming the cause. "Paced hallway for 40 minutes at 2:10am" is more useful than "dementia episode".',
      'Track several linked categories together: sleep, appetite, bathroom, mobility, comfort, and medication timing can overlap.',
      'Include videos or short examples if they show a pattern clearly, but avoid overwhelming the appointment with every moment.',
      'Do not start supplements, change medication timing, restrict food, or make major routine changes without asking your veterinarian.',
      SHARED_BOUNDARY,
    ],
    vetQuestions: [
      'Could pain, vision, hearing, urinary or GI issues, medication effects, anxiety, appetite changes, or cognitive changes be contributing?',
      'Which details would help you decide what to examine, test, or monitor next?',
      'What should I track for the next 7 days so we can compare the pattern instead of relying on memory?',
      'Are there signs that mean I should call sooner than our planned follow-up?',
      'What is realistic if night waking, accidents, or supervision needs are making care unsafe for the household?',
    ],
    faq: [
      {
        question: 'How do I know if my senior dog has dementia?',
        answer:
          'You cannot confirm that from a checklist. A veterinarian should evaluate possible causes. Your notes can help show timing, behavior, sleep, bathroom changes, appetite, mobility, comfort, and medication effects.',
      },
      {
        question: 'What should I track if my old dog seems confused at night?',
        answer:
          'Track wake time, pacing route, barking or staring, food and water, potty needs, medication timing, comfort signs, what helped your dog settle, and how much sleep the caregiver lost.',
      },
      {
        question: 'Should caregiver exhaustion be part of a dementia vet visit?',
        answer:
          'Yes. Sleep loss, cleanup burden, supervision needs, lifting risk, and lack of backup help affect what care is realistic at home and are appropriate to discuss with your veterinarian.',
      },
    ],
    ctaHref:
      '/tools/senior-pet-quality-of-life-calculator?guide=senior-dog-dementia-vet-checklist&intent=cognitive_change_caregiver_capacity',
    ctaLabel: 'Start a cognitive-change check-in',
    nextStepBody:
      'Use the cognitive-change notes with comfort, appetite, hydration, mobility, mood, and good-day ratings to create a printable quality-of-life report and 7-day follow-up.',
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
  const socialImage = guide.socialImage ?? {
    url: DEFAULT_OG_IMAGE,
    width: 1200,
    height: 800,
    alt: 'A senior pet resting in soft natural light',
  };

  return {
    title: guide.title,
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
          url: socialImage.url,
          width: socialImage.width,
          height: socialImage.height,
          alt: socialImage.alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.title,
      description: guide.description,
      images: [
        {
          url: socialImage.url,
          alt: socialImage.alt,
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
