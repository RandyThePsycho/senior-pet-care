// src/components/common/AttributionCapture.tsx
'use client';

import { useEffect } from 'react';
import {
  captureAttributionFromLocation,
  getAttributionUtm,
  type AttributionSnapshot,
} from '@/lib/attribution';

export default function AttributionCapture() {
  useEffect(() => {
    const snapshot = captureAttributionFromLocation();
    sendPageViewEvent(snapshot);
  }, []);

  return null;
}

function sendPageViewEvent(snapshot: AttributionSnapshot | null): void {
  const path = `${window.location.pathname}${window.location.search}`;
  if (isPrivatePath(path)) return;

  const dedupeKey = `spc_pageview_sent:${path}`;
  if (window.sessionStorage.getItem(dedupeKey)) return;
  window.sessionStorage.setItem(dedupeKey, '1');

  const params = new URLSearchParams(window.location.search);
  const attribution = getAttributionUtm(snapshot);
  const payload = {
    path: window.location.pathname,
    referrer: document.referrer || null,
    utmSource: params.get('utm_source') || attribution.utmSource,
    utmMedium: params.get('utm_medium') || attribution.utmMedium,
    utmCampaign: params.get('utm_campaign') || attribution.utmCampaign,
    utmContent: params.get('utm_content') || attribution.utmContent,
  };

  window
    .fetch('/api/analytics/page-view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    })
    .catch(() => {
      window.sessionStorage.removeItem(dedupeKey);
    });
}

function isPrivatePath(path: string): boolean {
  return ['/api/', '/internal/', '/journal/', '/reports/'].some((prefix) =>
    path.startsWith(prefix),
  );
}
