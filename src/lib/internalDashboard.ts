type CountMap = Record<string, number>;
type SignalSourceType = 'real' | 'test' | 'unattributed';

export interface DashboardAssessmentRow {
  created_at: string | null;
  risk_level: string | null;
  low_dimensions: unknown;
  reassessment_of: string | null;
}

export interface DashboardEmailEventRow {
  created_at: string | null;
  event_type: string | null;
  provider: string | null;
  payload: unknown;
}

export interface DashboardNeedSubmissionRow {
  created_at: string | null;
  pet_type: string | null;
  main_concern: unknown;
  stuck_points: unknown;
  needed_help: unknown;
  source: string | null;
}

export interface DashboardPageEventRow {
  created_at: string | null;
  path: string | null;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
}

export interface DashboardFunnelEventRow {
  created_at: string | null;
  event_name: string | null;
  path: string | null;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  metadata: unknown;
}

export interface DashboardInput {
  usersCount: number;
  petsCount: number;
  assessmentsCount?: number;
  emailEventsCount?: number;
  subscribeEventsCount?: number;
  mailerLiteSucceededCount?: number;
  needSubmissionsCount?: number;
  reassessmentsCount?: number;
  pageViewsCount?: number;
  funnelEventsCount?: number;
  assessments: DashboardAssessmentRow[];
  emailEvents: DashboardEmailEventRow[];
  needSubmissions: DashboardNeedSubmissionRow[];
  pageEvents?: DashboardPageEventRow[];
  funnelEvents?: DashboardFunnelEventRow[];
  analytics: {
    plausibleConfigured: boolean;
    ga4Configured: boolean;
  };
}

export interface DashboardSummary {
  analytics: DashboardInput['analytics'];
  totals: {
    users: number;
    pets: number;
    assessments: number;
    emailEvents: number;
    subscribeEvents: number;
    mailerLiteSucceeded: number;
    needSubmissions: number;
    reassessments: number;
    pageViews: number;
    funnelEvents: number;
  };
  riskCounts: CountMap;
  lowDimensionCounts: CountMap;
  needConcernCounts: CountMap;
  stuckPointCounts: CountMap;
  needHelpCounts: CountMap;
  sourceCounts: CountMap;
  realSourceCounts: CountMap;
  testSourceCounts: CountMap;
  signalQuality: Record<SignalSourceType, number>;
  pageViewSourceCounts: CountMap;
  pageViewQuality: Record<SignalSourceType, number>;
  funnelEventCounts: CountMap;
  funnelEventSourceCounts: CountMap;
  funnelEventQuality: Record<SignalSourceType, number>;
  recentPageViews: Array<{
    createdAt: string | null;
    path: string | null;
    source: string | null;
    sourceType: SignalSourceType;
    campaign: string | null;
    content: string | null;
  }>;
  recentFunnelEvents: Array<{
    createdAt: string | null;
    eventName: string | null;
    path: string | null;
    source: string | null;
    sourceType: SignalSourceType;
    campaign: string | null;
    content: string | null;
    guide: string | null;
    intent: string | null;
    riskLevel: string | null;
    totalScore: number | null;
  }>;
  recentEmailEvents: Array<{
    createdAt: string | null;
    eventType: string | null;
    provider: string | null;
    source: string | null;
    sourceType: SignalSourceType;
    utmSource: string | null;
    riskLevel: string | null;
  }>;
  recentNeedSubmissions: Array<{
    createdAt: string | null;
    petType: string | null;
    source: string | null;
    mainConcern: string[];
    stuckPoints: string[];
    neededHelp: string[];
  }>;
}

const DIMENSIONS = new Set([
  'hurt',
  'hunger',
  'hydration',
  'hygiene',
  'happiness',
  'mobility',
  'more_good_days',
]);

const KNOWN_RISK_LEVELS = new Set([
  'stable',
  'needs_monitoring',
  'vet_visit',
  'end_of_life',
]);

export function buildDashboardSummary(input: DashboardInput): DashboardSummary {
  const riskCounts: CountMap = {};
  const lowDimensionCounts: CountMap = {};
  const needConcernCounts: CountMap = {};
  const stuckPointCounts: CountMap = {};
  const needHelpCounts: CountMap = {};
  const sourceCounts: CountMap = {};
  const realSourceCounts: CountMap = {};
  const testSourceCounts: CountMap = {};
  const pageViewSourceCounts: CountMap = {};
  const funnelEventCounts: CountMap = {};
  const funnelEventSourceCounts: CountMap = {};
  const signalQuality: Record<SignalSourceType, number> = {
    real: 0,
    test: 0,
    unattributed: 0,
  };
  const pageViewQuality: Record<SignalSourceType, number> = {
    real: 0,
    test: 0,
    unattributed: 0,
  };
  const funnelEventQuality: Record<SignalSourceType, number> = {
    real: 0,
    test: 0,
    unattributed: 0,
  };

  for (const assessment of input.assessments) {
    const riskLevel = KNOWN_RISK_LEVELS.has(assessment.risk_level ?? '')
      ? assessment.risk_level
      : 'unknown';
    increment(riskCounts, riskLevel ?? 'unknown');

    for (const dimension of asStringArray(assessment.low_dimensions)) {
      if (DIMENSIONS.has(dimension)) increment(lowDimensionCounts, dimension);
    }
  }

  for (const event of input.emailEvents) {
    if (event.event_type !== 'subscribe') continue;
    const source = getEventSource(event.payload);
    recordSourceSignal({
      source,
      signalQuality,
      sourceCounts,
      realSourceCounts,
      testSourceCounts,
    });
  }

  for (const submission of input.needSubmissions) {
    recordSourceSignal({
      source: submission.source,
      signalQuality,
      sourceCounts,
      realSourceCounts,
      testSourceCounts,
    });
    for (const concern of asStringArray(submission.main_concern)) {
      increment(needConcernCounts, concern);
    }
    for (const stuckPoint of asStringArray(submission.stuck_points)) {
      increment(stuckPointCounts, stuckPoint);
    }
    for (const neededHelp of asStringArray(submission.needed_help)) {
      increment(needHelpCounts, neededHelp);
    }
  }

  const pageEvents = input.pageEvents ?? [];
  for (const event of pageEvents) {
    const source = getPageViewSource(event);
    const sourceType = classifySource(source);
    pageViewQuality[sourceType] += 1;
    if (source && sourceType === 'real') increment(pageViewSourceCounts, source);
  }

  const funnelEvents = input.funnelEvents ?? [];
  for (const event of funnelEvents) {
    if (event.event_name) increment(funnelEventCounts, event.event_name);

    const source = getFunnelEventSource(event);
    const sourceType = classifySource(source);
    funnelEventQuality[sourceType] += 1;
    if (source && sourceType === 'real') increment(funnelEventSourceCounts, source);
  }

  return {
    analytics: input.analytics,
    totals: {
      users: input.usersCount,
      pets: input.petsCount,
      assessments: input.assessmentsCount ?? input.assessments.length,
      emailEvents: input.emailEventsCount ?? input.emailEvents.length,
      subscribeEvents:
        input.subscribeEventsCount ??
        input.emailEvents.filter((event) => event.event_type === 'subscribe').length,
      mailerLiteSucceeded:
        input.mailerLiteSucceededCount ??
        input.emailEvents.filter(
          (event) => event.event_type === 'mailerlite_subscribe_succeeded',
        ).length,
      needSubmissions:
        input.needSubmissionsCount ?? input.needSubmissions.length,
      reassessments:
        input.reassessmentsCount ??
        input.assessments.filter((assessment) =>
          Boolean(assessment.reassessment_of),
        ).length,
      pageViews: input.pageViewsCount ?? pageEvents.length,
      funnelEvents: input.funnelEventsCount ?? funnelEvents.length,
    },
    riskCounts,
    lowDimensionCounts,
    needConcernCounts,
    stuckPointCounts,
    needHelpCounts,
    sourceCounts,
    realSourceCounts,
    testSourceCounts,
    signalQuality,
    pageViewSourceCounts,
    pageViewQuality,
    funnelEventCounts,
    funnelEventSourceCounts,
    funnelEventQuality,
    recentPageViews: pageEvents.slice(0, 12).map((event) => {
      const source = getPageViewSource(event);
      return {
        createdAt: event.created_at,
        path: event.path,
        source,
        sourceType: classifySource(source),
        campaign: stringOrNull(event.utm_campaign),
        content: stringOrNull(event.utm_content),
      };
    }),
    recentFunnelEvents: funnelEvents.slice(0, 12).map((event) => {
      const source = getFunnelEventSource(event);
      return {
        createdAt: event.created_at,
        eventName: event.event_name,
        path: event.path,
        source,
        sourceType: classifySource(source),
        campaign: stringOrNull(event.utm_campaign),
        content: stringOrNull(event.utm_content),
        guide: getMetadataString(event.metadata, 'guide'),
        intent: getMetadataString(event.metadata, 'intent'),
        riskLevel: getMetadataString(event.metadata, 'riskLevel'),
        totalScore: getMetadataNumber(event.metadata, 'totalScore'),
      };
    }),
    recentEmailEvents: input.emailEvents.slice(0, 12).map((event) => ({
      createdAt: event.created_at,
      eventType: event.event_type,
      provider: event.provider,
      source: getEventSource(event.payload),
      sourceType: classifySource(getEventSource(event.payload)),
      utmSource: getEventUtmSource(event.payload),
      riskLevel: getEventRiskLevel(event.payload),
    })),
    recentNeedSubmissions: input.needSubmissions.slice(0, 12).map((submission) => ({
      createdAt: submission.created_at,
      petType: submission.pet_type,
      source: submission.source,
      mainConcern: asStringArray(submission.main_concern),
      stuckPoints: asStringArray(submission.stuck_points),
      neededHelp: asStringArray(submission.needed_help),
    })),
  };
}

function getPageViewSource(event: DashboardPageEventRow): string | null {
  if (event.utm_source) return event.utm_source;
  if (!event.referrer) return null;

  try {
    return new URL(event.referrer).hostname.replace(/^www\./, '');
  } catch {
    return 'referral';
  }
}

function getFunnelEventSource(event: DashboardFunnelEventRow): string | null {
  return getPageViewSource(event);
}

function increment(map: CountMap, key: string): void {
  map[key] = (map[key] ?? 0) + 1;
}

function recordSourceSignal(args: {
  source: string | null;
  signalQuality: Record<SignalSourceType, number>;
  sourceCounts: CountMap;
  realSourceCounts: CountMap;
  testSourceCounts: CountMap;
}): void {
  const { source, signalQuality, sourceCounts, realSourceCounts, testSourceCounts } =
    args;
  const sourceType = classifySource(source);
  signalQuality[sourceType] += 1;

  if (!source) return;

  increment(sourceCounts, source);
  if (sourceType === 'real') increment(realSourceCounts, source);
  if (sourceType === 'test') increment(testSourceCounts, source);
}

function classifySource(source: string | null): SignalSourceType {
  if (!source) return 'unattributed';

  const normalized = source.toLowerCase();
  if (
    normalized === 'calculator_result' ||
    normalized === 'share_your_situation' ||
    normalized === 'email_capture' ||
    normalized === 'unknown' ||
    normalized === 'direct'
  ) {
    return 'unattributed';
  }

  if (
    normalized.includes('smoke') ||
    normalized.includes('test') ||
    normalized.includes('codex') ||
    normalized.includes('phase') ||
    normalized.includes('debug') ||
    normalized.includes('mock') ||
    normalized.includes('seed')
  ) {
    return 'test';
  }

  return 'real';
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === 'string')
    : [];
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function getEventSource(payload: unknown): string | null {
  const data = asRecord(payload);
  if (!data) return null;

  const directSource = stringOrNull(data.source);
  if (directSource) return directSource;

  const reassessmentSource = stringOrNull(data.reassessment_source);
  if (reassessmentSource) return reassessmentSource;

  return getEventUtmSource(payload);
}

function getEventUtmSource(payload: unknown): string | null {
  const data = asRecord(payload);
  const attribution = asRecord(data?.attribution);
  const last = asRecord(attribution?.last);
  const first = asRecord(attribution?.first);

  return (
    stringOrNull(last?.utmSource) ??
    stringOrNull(last?.utm_source) ??
    stringOrNull(first?.utmSource) ??
    stringOrNull(first?.utm_source)
  );
}

function getEventRiskLevel(payload: unknown): string | null {
  const data = asRecord(payload);
  return stringOrNull(data?.risk_level);
}

function getMetadataString(metadata: unknown, key: string): string | null {
  const data = asRecord(metadata);
  return stringOrNull(data?.[key]);
}

function getMetadataNumber(metadata: unknown, key: string): number | null {
  const data = asRecord(metadata);
  const value = data?.[key];
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function stringOrNull(value: unknown): string | null {
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}
