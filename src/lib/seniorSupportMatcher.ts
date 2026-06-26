import type { PetType, Condition } from '@/types/pet';

export type SeniorSupportConcern =
  | 'mobility_slipping'
  | 'night_waking_restless'
  | 'digestive_sensitivity'
  | 'appetite_change'
  | 'accidents_hygiene'
  | 'caregiver_sleep_loss'
  | 'vet_conversation_unclear';

export type SupportCategoryKind = 'supplement' | 'home_setup' | 'tracking';

export interface SeniorSupportConcernOption {
  key: SeniorSupportConcern;
  label: string;
  description: string;
}

export interface SeniorSupportCategory {
  key: string;
  title: string;
  kind: SupportCategoryKind;
  summary: string;
  suitableFor: string[];
  notSuitableFor: string[];
  whatToLookFor: string[];
  priceRange: string;
  vetQuestion: string;
}

export interface SeniorSupportMatcherInput {
  petType: PetType | 'other';
  concerns: SeniorSupportConcern[];
  conditions: Condition[];
}

export interface SeniorSupportMatcherResult {
  categories: SeniorSupportCategory[];
  vetFirstReasons: string[];
}

export const SENIOR_SUPPORT_CONCERNS: SeniorSupportConcernOption[] = [
  {
    key: 'mobility_slipping',
    label: 'Slipping, stiffness, or trouble getting up',
    description:
      'The worry is whether a home setup or joint-support product could make daily movement safer.',
  },
  {
    key: 'night_waking_restless',
    label: 'Night waking, pacing, or hard-to-settle evenings',
    description:
      'The worry is whether the pattern is routine, discomfort, confusion, or caregiver sleep collapse.',
  },
  {
    key: 'digestive_sensitivity',
    label: 'Loose stool, sensitive stomach, or food changes',
    description:
      'The worry is whether a digestive-support category is worth discussing before changing products.',
  },
  {
    key: 'appetite_change',
    label: 'Lower appetite or skipped meals',
    description:
      'The worry is choosing random appetite products before understanding the pattern.',
  },
  {
    key: 'accidents_hygiene',
    label: 'Accidents, cleanup, or bathroom access problems',
    description:
      'The worry is keeping dignity and hygiene manageable without making the home unsafe.',
  },
  {
    key: 'caregiver_sleep_loss',
    label: 'Caregiver sleep loss or constant checking',
    description:
      'The worry is whether support tools can reduce overnight uncertainty without ignoring health changes.',
  },
  {
    key: 'vet_conversation_unclear',
    label: 'Not sure what to ask the vet',
    description:
      'The worry is buying first and only later realizing the key question was never asked.',
  },
];

export const SENIOR_SUPPORT_CATEGORIES: SeniorSupportCategory[] = [
  {
    key: 'joint_support_supplement',
    title: 'Joint-support supplement category',
    kind: 'supplement',
    summary:
      'A non-drug support category often considered for gradual stiffness or mobility routines.',
    suitableFor: [
      'Gradual stiffness, slower rising, or reduced willingness to use stairs.',
      'Families who want a vet conversation before picking a joint product.',
    ],
    notSuitableFor: [
      'Sudden pain, new limping, collapse, or distress that needs veterinary attention first.',
      'Pets with complex conditions or medications unless a licensed veterinarian approves the ingredients.',
    ],
    whatToLookFor: [
      'Clear active ingredients and per-serving amounts.',
      'Batch testing, quality program participation, and a real manufacturer address.',
      'Claims framed as support, not treatment or disease prevention.',
    ],
    priceRange: '$18-45 monthly typical category range',
    vetQuestion:
      'Would a joint-support supplement be appropriate with my pet’s current conditions and medications?',
  },
  {
    key: 'omega_3_support',
    title: 'Omega-3 support category',
    kind: 'supplement',
    summary:
      'A supplement category some families discuss for skin, coat, joint, or general senior support.',
    suitableFor: [
      'Senior pets whose family wants a broad supportive supplement to discuss with a vet.',
      'Pets with dry skin, coat changes, or mobility concerns where supplement safety needs review.',
    ],
    notSuitableFor: [
      'Pets with pancreatitis history, bleeding concerns, prescription diets, or medication interactions unless a vet approves.',
      'Any situation where the product claims to treat a diagnosed disease.',
    ],
    whatToLookFor: [
      'EPA/DHA amounts listed clearly rather than only total oil.',
      'Freshness, storage guidance, and contaminant testing language.',
      'Pet-specific dosing guidance that still defers health decisions to a vet.',
    ],
    priceRange: '$15-40 monthly typical category range',
    vetQuestion:
      'Is an omega-3 product safe for my pet’s diet, weight, and medication list?',
  },
  {
    key: 'digestive_support',
    title: 'Digestive-support category',
    kind: 'supplement',
    summary:
      'A probiotic or digestive-support category to consider only after clarifying appetite, stool, and hydration changes.',
    suitableFor: [
      'Mild recurring digestive sensitivity where the family is organizing notes for a vet conversation.',
      'Pets whose diet has changed and whose caregiver needs a structured shortlist.',
    ],
    notSuitableFor: [
      'Vomiting, blood, severe diarrhea, dehydration signs, rapid weight loss, or refusal to eat.',
      'Pets with known digestive disease unless a veterinarian recommends a category.',
    ],
    whatToLookFor: [
      'Strain or ingredient transparency rather than vague wellness language.',
      'Storage instructions and expiration dates.',
      'No promises to cure disease or replace veterinary care.',
    ],
    priceRange: '$20-55 monthly typical category range',
    vetQuestion:
      'Given the appetite and stool pattern, should we consider a digestive-support product or investigate first?',
  },
  {
    key: 'calming_support',
    title: 'Calming-support category',
    kind: 'supplement',
    summary:
      'A non-drug calming category that may be discussed for evening restlessness after pain, potty needs, and cognitive changes are considered.',
    suitableFor: [
      'Restless evenings where the family is already tracking timing, triggers, and routine changes.',
      'Caregivers who need a vet-safe shortlist before buying calming chews at random.',
    ],
    notSuitableFor: [
      'New confusion, distress, heavy panting, collapse, or rapid breathing.',
      'Pets taking sedatives, pain medication, seizure medication, or heart medication unless a vet approves.',
    ],
    whatToLookFor: [
      'Plain ingredient list and conservative serving guidance.',
      'No disease, dementia, pain, or behavior-treatment claims.',
      'A plan to stop and ask a vet if the pet seems worse.',
    ],
    priceRange: '$15-50 monthly typical category range',
    vetQuestion:
      'Before trying a calming product, what health causes should we rule out for night waking or pacing?',
  },
  {
    key: 'orthopedic_bed',
    title: 'Orthopedic bed or washable comfort setup',
    kind: 'home_setup',
    summary:
      'A home-support category for rest, pressure comfort, and easier cleanup without making a medical claim.',
    suitableFor: [
      'Senior pets who spend more time resting or have trouble getting comfortable.',
      'Families balancing comfort, accidents, and washable surfaces.',
    ],
    notSuitableFor: [
      'Pets who cannot rise, seem painful, or have pressure sores without veterinary guidance.',
      'Beds so tall or soft that getting in and out becomes harder.',
    ],
    whatToLookFor: [
      'Low entry height, stable foam, washable cover, and waterproof liner.',
      'Correct size so the pet can lie fully stretched out.',
      'Return policy in case the pet avoids the surface.',
    ],
    priceRange: '$35-160 one-time typical category range',
    vetQuestion:
      'Would a lower-entry or firmer resting surface make daily movement safer for my pet?',
  },
  {
    key: 'non_slip_rugs',
    title: 'Non-slip rugs or traction path',
    kind: 'home_setup',
    summary:
      'A simple environment-support category for slipping, stairs, turns, and nighttime bathroom paths.',
    suitableFor: [
      'Pets slipping on hard floors or hesitating in high-traffic areas.',
      'Families who need an immediate, non-supplement support option.',
    ],
    notSuitableFor: [
      'Situations where weakness, pain, or falling is new or rapidly worsening.',
      'Loose rugs that slide, bunch up, or create a tripping hazard.',
    ],
    whatToLookFor: [
      'Low-profile washable runners with non-slip backing.',
      'Coverage where the pet turns, stands up, eats, or walks to potty areas.',
      'Stable edges that do not curl.',
    ],
    priceRange: '$20-120 one-time typical category range',
    vetQuestion:
      'Could better traction reduce slipping while we also evaluate pain or weakness?',
  },
  {
    key: 'ramp_or_stairs',
    title: 'Ramp, stairs, or lifting-support category',
    kind: 'home_setup',
    summary:
      'A support category for car, couch, bed, or stair access when jumping or lifting has become risky.',
    suitableFor: [
      'Pets avoiding jumps or needing repeated lifting.',
      'Caregivers whose own back or sleep is being affected by lifting routines.',
    ],
    notSuitableFor: [
      'Pets who are unstable, painful, or unable to use the support safely.',
      'Steep ramps or narrow stairs that create more fear or slipping.',
    ],
    whatToLookFor: [
      'Stable weight rating, non-slip surface, gentle slope, and enough width.',
      'A setup that fits the actual doorway, car, bed, or couch height.',
      'Training time rather than forcing use immediately.',
    ],
    priceRange: '$45-220 one-time typical category range',
    vetQuestion:
      'Is a ramp, stairs, harness, or activity restriction safest for the movement problem we are seeing?',
  },
  {
    key: 'waterproof_washable_bed',
    title: 'Waterproof washable bedding',
    kind: 'home_setup',
    summary:
      'A dignity-and-cleanup support category for accidents, leakage, and caregiver capacity.',
    suitableFor: [
      'Recurring accidents where the family needs a calmer cleanup routine.',
      'Pets who need dry resting areas while the cause is discussed with a vet.',
    ],
    notSuitableFor: [
      'Sudden incontinence, straining, blood, pain, or signs of urinary distress.',
      'Products that trap moisture against skin or are hard to wash often.',
    ],
    whatToLookFor: [
      'Waterproof liner, removable washable cover, and quick-dry backup layers.',
      'Low entry height and a non-slip base.',
      'Enough duplicates to avoid middle-of-the-night laundry panic.',
    ],
    priceRange: '$25-120 one-time typical category range',
    vetQuestion:
      'What accident pattern should I track before deciding this is only a cleanup problem?',
  },
  {
    key: 'pet_camera',
    title: 'Monitoring camera or overnight routine aid',
    kind: 'home_setup',
    summary:
      'A caregiver-capacity category for families losing sleep from repeated checking.',
    suitableFor: [
      'Caregivers who keep waking to check whether a senior pet is pacing, settled, or stuck.',
      'Families who need pattern evidence instead of relying on exhausted memory.',
    ],
    notSuitableFor: [
      'Emergencies, distress, collapse, breathing changes, or situations needing direct supervision.',
      'Replacing a vet visit when the pattern is new or worsening.',
    ],
    whatToLookFor: [
      'Reliable night vision, motion clips, and simple export or screenshots.',
      'Privacy controls and no complicated subscription requirement.',
      'A plan for what you will record and what you will ignore.',
    ],
    priceRange: '$25-80 one-time typical category range',
    vetQuestion:
      'Would short overnight clips help us understand pacing, potty needs, or sleep disruption?',
  },
  {
    key: 'vet_prep_report',
    title: 'Vet-prep report and 7-day support plan',
    kind: 'tracking',
    summary:
      'A paid-support validation category: organize the pattern, shortlist safe product categories, and prepare vet questions.',
    suitableFor: [
      'Families who feel stuck between buying products and booking another vet conversation.',
      'Caregivers who need a printable summary instead of scattered notes.',
    ],
    notSuitableFor: [
      'Emergency symptoms or decisions that need immediate veterinary care.',
      'Anyone expecting diagnosis, treatment, or a guaranteed product outcome.',
    ],
    whatToLookFor: [
      'A clear 7-day timeline of the pattern.',
      'Questions for a licensed veterinarian before buying supplements.',
      'A shortlist of support categories with why-not boundaries.',
    ],
    priceRange: '$7-19 one-time early-access validation range',
    vetQuestion:
      'Which details would make our next conversation more useful than “I think my pet is worse”?',
  },
];

const CATEGORY_BY_KEY = new Map(
  SENIOR_SUPPORT_CATEGORIES.map((category) => [category.key, category]),
);

const CONCERN_CATEGORY_KEYS: Record<SeniorSupportConcern, string[]> = {
  mobility_slipping: [
    'non_slip_rugs',
    'orthopedic_bed',
    'ramp_or_stairs',
    'joint_support_supplement',
    'omega_3_support',
    'vet_prep_report',
  ],
  night_waking_restless: [
    'calming_support',
    'pet_camera',
    'orthopedic_bed',
    'vet_prep_report',
  ],
  digestive_sensitivity: [
    'digestive_support',
    'omega_3_support',
    'vet_prep_report',
  ],
  appetite_change: ['vet_prep_report', 'digestive_support'],
  accidents_hygiene: [
    'waterproof_washable_bed',
    'non_slip_rugs',
    'vet_prep_report',
  ],
  caregiver_sleep_loss: [
    'pet_camera',
    'waterproof_washable_bed',
    'calming_support',
    'vet_prep_report',
  ],
  vet_conversation_unclear: ['vet_prep_report'],
};

const CONDITION_CATEGORY_KEYS: Partial<Record<Condition, string[]>> = {
  arthritis: ['joint_support_supplement', 'omega_3_support', 'non_slip_rugs'],
  mobility_loss: ['non_slip_rugs', 'ramp_or_stairs', 'orthopedic_bed'],
  incontinence: ['waterproof_washable_bed'],
  dementia: ['pet_camera', 'calming_support', 'vet_prep_report'],
  chronic_pain: ['vet_prep_report'],
  kidney_disease: ['vet_prep_report'],
  heart_disease: ['vet_prep_report'],
  cancer: ['vet_prep_report'],
};

const VET_FIRST_BY_CONCERN: Partial<Record<SeniorSupportConcern, string>> = {
  appetite_change:
    'Lower appetite can be a health signal. Use the shortlist to prepare questions, but do not treat appetite products as the first step.',
  night_waking_restless:
    'Night waking can come from pain, potty needs, confusion, medication timing, or routine disruption. Track timing before buying calming products.',
  digestive_sensitivity:
    'Digestive products should not be used to delay care if there is vomiting, blood, dehydration, severe diarrhea, or rapid weight loss.',
};

const VET_FIRST_BY_CONDITION: Partial<Record<Condition, string>> = {
  kidney_disease:
    'Kidney disease can affect supplement and diet choices. Ask a licensed veterinarian before using joint, omega-3, digestive, or calming products.',
  heart_disease:
    'Heart disease and medications can change product safety. Ask a licensed veterinarian before trying supplements.',
  cancer:
    'Cancer care should stay veterinarian-led. Use this only to organize comfort and product questions.',
  chronic_pain:
    'Chronic pain should not be handled with products alone. Use support categories only alongside veterinary guidance.',
};

export function matchSeniorSupportCategories(
  input: SeniorSupportMatcherInput,
): SeniorSupportMatcherResult {
  const keys = new Set<string>();

  for (const concern of input.concerns) {
    for (const key of CONCERN_CATEGORY_KEYS[concern] ?? []) {
      keys.add(key);
    }
  }

  for (const condition of input.conditions) {
    for (const key of CONDITION_CATEGORY_KEYS[condition] ?? []) {
      keys.add(key);
    }
  }

  if (!keys.size) {
    keys.add('vet_prep_report');
  }

  const vetFirstReasons = [
    ...input.concerns
      .map((concern) => VET_FIRST_BY_CONCERN[concern])
      .filter((reason): reason is string => Boolean(reason)),
    ...input.conditions
      .map((condition) => VET_FIRST_BY_CONDITION[condition])
      .filter((reason): reason is string => Boolean(reason)),
  ];

  const categories = Array.from(keys)
    .map((key) => CATEGORY_BY_KEY.get(key))
    .filter((category): category is SeniorSupportCategory =>
      Boolean(category),
    )
    .slice(0, 6);

  return {
    categories,
    vetFirstReasons: Array.from(new Set(vetFirstReasons)).slice(0, 4),
  };
}

export function getConcernLabels(concerns: SeniorSupportConcern[]): string[] {
  const labels = new Map(
    SENIOR_SUPPORT_CONCERNS.map((concern) => [concern.key, concern.label]),
  );
  return concerns.map((concern) => labels.get(concern) ?? concern);
}
