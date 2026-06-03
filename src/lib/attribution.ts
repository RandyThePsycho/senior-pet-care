// src/lib/attribution.ts
// Lightweight first/last-touch attribution for organic launch experiments.

export interface AttributionTouch {
  landingPage: string;
  referrer: string | null;
  capturedAt: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
}

export interface AttributionSnapshot {
  first: AttributionTouch;
  last: AttributionTouch;
}

const STORAGE_KEY = 'spc_attribution_v1';

function hasWindow() {
  return typeof window !== 'undefined';
}

function textParam(params: URLSearchParams, key: string): string | undefined {
  const value = params.get(key)?.trim();
  return value ? value.slice(0, 120) : undefined;
}

function cleanReferrer(raw: string): string | null {
  if (!raw) return null;
  try {
    const referrer = new URL(raw);
    if (hasWindow() && referrer.hostname === window.location.hostname) {
      return null;
    }
    return `${referrer.origin}${referrer.pathname}`.slice(0, 300);
  } catch {
    return null;
  }
}

function buildTouch(): AttributionTouch | null {
  if (!hasWindow()) return null;

  const url = new URL(window.location.href);
  const params = url.searchParams;

  return {
    landingPage: `${url.origin}${url.pathname}${url.search}`.slice(0, 500),
    referrer: cleanReferrer(document.referrer),
    capturedAt: new Date().toISOString(),
    utmSource: textParam(params, 'utm_source'),
    utmMedium: textParam(params, 'utm_medium'),
    utmCampaign: textParam(params, 'utm_campaign'),
    utmTerm: textParam(params, 'utm_term'),
    utmContent: textParam(params, 'utm_content'),
  };
}

function parseStored(value: string | null): AttributionSnapshot | null {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value) as Partial<AttributionSnapshot>;
    if (parsed.first?.landingPage && parsed.last?.landingPage) {
      return parsed as AttributionSnapshot;
    }
  } catch {
    return null;
  }
  return null;
}

export function captureAttributionFromLocation(): AttributionSnapshot | null {
  if (!hasWindow()) return null;
  try {
    const touch = buildTouch();
    if (!touch) return null;

    const existing = parseStored(window.localStorage.getItem(STORAGE_KEY));
    const snapshot: AttributionSnapshot = {
      first: existing?.first ?? touch,
      last: touch,
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
    return snapshot;
  } catch {
    return null;
  }
}

export function getAttributionSnapshot(): AttributionSnapshot | null {
  if (!hasWindow()) return null;
  try {
    return parseStored(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

function sourceFromTouch(touch?: AttributionTouch): string | null {
  if (!touch) return null;
  if (touch.utmSource) return touch.utmSource;
  if (touch.referrer) {
    try {
      return new URL(touch.referrer).hostname.replace(/^www\./, '');
    } catch {
      return 'referral';
    }
  }
  return null;
}

function slug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 40);
}

export function getAttributionSource(baseSource: string): string {
  const snapshot = getAttributionSnapshot();
  const channel = sourceFromTouch(snapshot?.last) ?? sourceFromTouch(snapshot?.first);
  if (!channel) return baseSource;
  return `${baseSource}:${slug(channel)}`.slice(0, 80);
}
