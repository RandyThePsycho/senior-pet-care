// src/components/common/AttributionCapture.tsx
'use client';

import { useEffect } from 'react';
import { captureAttributionFromLocation } from '@/lib/attribution';

export default function AttributionCapture() {
  useEffect(() => {
    captureAttributionFromLocation();
    sendPageViewEvent();
  }, []);

  return null;
}

function sendPageViewEvent(): void {
  const path = `${window.location.pathname}${window.location.search}`;
  if (isPrivatePath(path)) return;

  const dedupeKey = `spc_pageview_sent:${path}`;
  if (window.sessionStorage.getItem(dedupeKey)) return;
  window.sessionStorage.setItem(dedupeKey, '1');

  const params = new URLSearchParams(window.location.search);
  const payload = {
    path: window.location.pathname,
    referrer: document.referrer || null,
    utmSource: params.get('utm_source'),
    utmMedium: params.get('utm_medium'),
    utmCampaign: params.get('utm_campaign'),
    utmContent: params.get('utm_content'),
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
