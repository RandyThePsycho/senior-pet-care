export interface PageViewEventRow {
  path: string;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
}

export type PageViewNormalizeResult =
  | {
      ok: true;
      data: PageViewEventRow;
    }
  | {
      ok: false;
      error: 'invalid_path' | 'private_path';
    };

interface PageViewBody {
  path?: unknown;
  referrer?: unknown;
  utmSource?: unknown;
  utmMedium?: unknown;
  utmCampaign?: unknown;
  utmContent?: unknown;
}

const PRIVATE_PATH_PREFIXES = ['/api/', '/internal/', '/journal/', '/reports/'];

export function normalizePageViewPayload(
  body: PageViewBody,
): PageViewNormalizeResult {
  const path = normalizePath(body.path);
  if (!path) return { ok: false, error: 'invalid_path' };
  if (isPrivatePath(path)) return { ok: false, error: 'private_path' };

  return {
    ok: true,
    data: {
      path,
      referrer: normalizeReferrer(body.referrer),
      utm_source: textOrNull(body.utmSource, 120),
      utm_medium: textOrNull(body.utmMedium, 120),
      utm_campaign: textOrNull(body.utmCampaign, 120),
      utm_content: textOrNull(body.utmContent, 120),
    },
  };
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
