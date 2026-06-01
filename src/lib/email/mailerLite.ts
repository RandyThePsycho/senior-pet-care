// src/lib/email/mailerLite.ts
// Minimal MailerLite subscriber sync for Phase 3.
// This helper is server-side only; do not import it from client components.

export type MailerLiteStatus = 'skipped' | 'succeeded' | 'failed';

export interface MailerLiteSubscriberInput {
  email: string;
  petName: string;
  petType: string;
  riskLevel: string;
  totalScore: number;
  petId: string;
  assessmentId: string;
  reportUrl: string;
  journalUrl: string;
  reassessmentUrl: string;
  nextReassessmentDate: string;
  lowDimensions: string[];
  tags: string[];
}

export interface MailerLiteSyncResult {
  provider: 'mailerlite';
  status: MailerLiteStatus;
  groupId?: string;
  subscriberId?: string;
  error?: string;
}

const MAILERLITE_SUBSCRIBERS_URL =
  'https://connect.mailerlite.com/api/subscribers';
const MAILERLITE_TIMEOUT_MS = 8000;

export function isMailerLiteConfigured(): boolean {
  return Boolean(
    process.env.MAILERLITE_API_KEY && process.env.MAILERLITE_GROUP_ID,
  );
}

function toDateOnly(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value.slice(0, 10);
  return date.toISOString().slice(0, 10);
}

function asCsv(values: string[]): string {
  return values.filter(Boolean).join(',');
}

export async function upsertMailerLiteSubscriber(
  input: MailerLiteSubscriberInput,
): Promise<MailerLiteSyncResult> {
  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupId = process.env.MAILERLITE_GROUP_ID;

  if (!apiKey || !groupId) {
    return {
      provider: 'mailerlite',
      status: 'skipped',
      error: 'MailerLite is not configured.',
    };
  }

  let timeout: ReturnType<typeof setTimeout> | null = null;
  try {
    const controller = new AbortController();
    timeout = setTimeout(() => controller.abort(), MAILERLITE_TIMEOUT_MS);

    const response = await fetch(MAILERLITE_SUBSCRIBERS_URL, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: input.email,
        fields: {
          pet_name: input.petName,
          pet_type: input.petType,
          risk_level: input.riskLevel,
          total_score: input.totalScore,
          pet_id: input.petId,
          assessment_id: input.assessmentId,
          report_url: input.reportUrl,
          journal_url: input.journalUrl,
          reassessment_url: input.reassessmentUrl,
          next_reassessment_date: toDateOnly(input.nextReassessmentDate),
          low_dimensions: asCsv(input.lowDimensions),
          tags: asCsv(input.tags),
        },
        groups: [groupId],
      }),
    });
    if (timeout) clearTimeout(timeout);
    timeout = null;

    const payload = (await response.json().catch(() => null)) as {
      data?: { id?: string };
      message?: string;
      error?: string;
    } | null;

    if (!response.ok) {
      return {
        provider: 'mailerlite',
        status: 'failed',
        groupId,
        error:
          payload?.message ??
          payload?.error ??
          `MailerLite request failed with status ${response.status}.`,
      };
    }

    return {
      provider: 'mailerlite',
      status: 'succeeded',
      groupId,
      subscriberId: payload?.data?.id,
    };
  } catch (err) {
    if (timeout) clearTimeout(timeout);
    return {
      provider: 'mailerlite',
      status: 'failed',
      groupId,
      error: err instanceof Error ? err.message : 'Unknown MailerLite error.',
    };
  }
}
