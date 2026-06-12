export type FunnelEventName =
  | 'calculator_started'
  | 'pet_profile_completed'
  | 'scores_completed'
  | 'symptoms_completed'
  | 'calculator_completed'
  | 'email_submitted'
  | 'email_subscribe_started'
  | 'email_subscribe_succeeded'
  | 'email_subscribe_failed'
  | 'pdf_cta_clicked'
  | 'report_cta_shown'
  | 'report_download_clicked'
  | 'journal_cta_shown'
  | 'journal_opened'
  | 'reassessment_clicked'
  | 'reassessment_started'
  | 'reassessment_link_created'
  | 'situation_intake_submitted'
  | 'product_matcher_cta_clicked'
  | 'end_of_life_cta_clicked';

export interface FunnelEventRow {
  event_name: FunnelEventName;
  path: string;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  metadata: Record<string, MetadataValue>;
}

export type FunnelEventNormalizeResult =
  | {
      ok: true;
      data: FunnelEventRow;
    }
  | {
      ok: false;
      error: 'invalid_event' | 'invalid_path' | 'private_path';
    };

type MetadataValue = string | number | boolean | Array<string | number | boolean>;

interface FunnelEventBody {
  eventName?: unknown;
  path?: unknown;
  referrer?: unknown;
  utmSource?: unknown;
  utmMedium?: unknown;
  utmCampaign?: unknown;
  utmContent?: unknown;
  props?: unknown;
}

const FUNNEL_EVENTS = new Set<FunnelEventName>([
  'calculator_started',
  'pet_profile_completed',
  'scores_completed',
  'symptoms_completed',
  'calculator_completed',
  'email_submitted',
  'email_subscribe_started',
  'email_subscribe_succeeded',
  'email_subscribe_failed',
  'pdf_cta_clicked',
  'report_cta_shown',
  'report_download_clicked',
  'journal_cta_shown',
  'journal_opened',
  'reassessment_clicked',
  'reassessment_started',
  'reassessment_link_created',
  'situation_intake_submitted',
  'product_matcher_cta_clicked',
  'end_of_life_cta_clicked',
]);

const PRIVATE_PATH_PREFIXES = ['/api/', '/internal/', '/journal/', '/reports/'];

const SENSITIVE_METADATA_KEYS = new Set([
  'assessmentid',
  'assessment_id',
  'email',
  'emailaddress',
  'email_address',
  'journalurl',
  'journal_url',
  'petid',
  'pet_id',
  'petname',
  'pet_name',
  'reassessmenturl',
  'reassessment_url',
  'reporturl',
  'report_url',
  'submissionid',
  'submission_id',
  'useremail',
  'user_email',
]);

export function normalizeFunnelEventPayload(
  body: FunnelEventBody,
): FunnelEventNormalizeResult {
  const eventName = normalizeEventName(body.eventName);
  if (!eventName) return { ok: false, error: 'invalid_event' };

  const path = normalizePath(body.path);
  if (!path) return { ok: false, error: 'invalid_path' };
  if (isPrivatePath(path)) return { ok: false, error: 'private_path' };

  return {
    ok: true,
    data: {
      event_name: eventName,
      path,
      referrer: normalizeReferrer(body.referrer),
      utm_source: textOrNull(body.utmSource, 120),
      utm_medium: textOrNull(body.utmMedium, 120),
      utm_campaign: textOrNull(body.utmCampaign, 120),
      utm_content: textOrNull(body.utmContent, 120),
      metadata: sanitizeMetadata(body.props),
    },
  };
}

function normalizeEventName(value: unknown): FunnelEventName | null {
  if (typeof value !== 'string') return null;
  return FUNNEL_EVENTS.has(value as FunnelEventName)
    ? (value as FunnelEventName)
    : null;
}

function normalizePath(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed.startsWith('/') || trimmed.startsWith('//')) return null;
  return trimmed.slice(0, 500);
}

function isPrivatePath(path: string): boolean {
  return PRIVATE_PATH_PREFIXES.some((prefix) => path.startsWith(prefix));
}

function normalizeReferrer(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed) return null;

  try {
    const url = new URL(trimmed);
    return `${url.origin}${url.pathname}`.slice(0, 500);
  } catch {
    return null;
  }
}

function textOrNull(value: unknown, maxLength: number): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, maxLength) : null;
}

function sanitizeMetadata(value: unknown): Record<string, MetadataValue> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};

  const metadata: Record<string, MetadataValue> = {};
  for (const [rawKey, rawValue] of Object.entries(value)) {
    if (Object.keys(metadata).length >= 16) break;

    const key = rawKey.trim();
    if (!key || isSensitiveMetadataKey(key)) continue;

    const sanitizedValue = sanitizeMetadataValue(rawValue);
    if (sanitizedValue === null) continue;

    metadata[key.slice(0, 80)] = sanitizedValue;
  }

  return metadata;
}

function sanitizeMetadataValue(value: unknown): MetadataValue | null {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed || isSensitiveString(trimmed)) return null;
    return trimmed.slice(0, 160);
  }

  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : null;
  }

  if (typeof value === 'boolean') {
    return value;
  }

  if (Array.isArray(value)) {
    const sanitizedValues = value
      .slice(0, 12)
      .map(sanitizeMetadataValue)
      .filter(
        (item): item is string | number | boolean =>
          item !== null && !Array.isArray(item),
      );

    return sanitizedValues.length ? sanitizedValues : null;
  }

  return null;
}

function isSensitiveMetadataKey(key: string): boolean {
  return SENSITIVE_METADATA_KEYS.has(key.toLowerCase());
}

function isSensitiveString(value: string): boolean {
  const lower = value.toLowerCase();
  return (
    /\S+@\S+\.\S+/.test(value) ||
    lower.includes('/journal/') ||
    lower.includes('/reports/') ||
    lower.includes('petid=') ||
    lower.includes('assessmentid=') ||
    lower.includes('reassessmentof=')
  );
}
