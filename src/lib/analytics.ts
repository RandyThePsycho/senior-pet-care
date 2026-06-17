// src/lib/analytics.ts
// Lightweight launch analytics. Console logging remains the fallback; optional
// Plausible/GA4 forwarding is enabled by env-loaded scripts in the root layout.

import {
  getAttributionSnapshot,
  getAttributionUtm,
} from '@/lib/attribution';

declare global {
  interface Window {
    plausible?: (
      eventName: string,
      options?: { props?: Record<string, unknown> },
    ) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export type AnalyticsEvent =
  // 计算器漏斗
  | 'calculator_started'
  | 'pet_profile_completed'
  | 'scores_completed'
  | 'symptoms_completed'
  | 'calculator_completed'
  // 留资
  | 'email_submitted'
  | 'email_subscribe_started'
  | 'email_subscribe_succeeded'
  | 'email_subscribe_failed'
  // Report / Journal CTA
  | 'pdf_cta_clicked'
  | 'report_cta_shown'
  | 'report_download_clicked'
  | 'journal_cta_shown'
  | 'journal_opened'
  // 复评
  | 'reassessment_clicked'
  | 'reassessment_started'
  | 'reassessment_link_created'
  // 需求收集入口
  | 'situation_intake_submitted'
  // 下一步路由
  | 'product_matcher_cta_clicked'
  | 'end_of_life_cta_clicked';

export function track(
  event: AnalyticsEvent,
  props: Record<string, unknown> = {},
): void {
  const enrichedProps = {
    ...getLaunchAttributionProps(),
    ...props,
  };

  // MVP: 仅打印到控制台
  // eslint-disable-next-line no-console
  console.log('[analytics]', event, enrichedProps);

  if (typeof window === 'undefined') return;

  window.plausible?.(event, { props: enrichedProps });
  window.gtag?.('event', event, enrichedProps);
  sendFunnelEvent(event, enrichedProps);
}

function getLaunchAttributionProps(): Record<string, unknown> {
  if (typeof window === 'undefined') return {};

  const snapshot = getAttributionSnapshot();
  if (!snapshot) return {};

  return {
    first_utm_source: snapshot.first.utmSource,
    first_utm_medium: snapshot.first.utmMedium,
    first_utm_campaign: snapshot.first.utmCampaign,
    first_utm_content: snapshot.first.utmContent,
    last_utm_source: snapshot.last.utmSource,
    last_utm_medium: snapshot.last.utmMedium,
    last_utm_campaign: snapshot.last.utmCampaign,
    last_utm_content: snapshot.last.utmContent,
    last_referrer: snapshot.last.referrer,
  };
}

function sendFunnelEvent(
  event: AnalyticsEvent,
  props: Record<string, unknown>,
): void {
  try {
    const params = new URLSearchParams(window.location.search);
    const attribution = getAttributionUtm();
    const payload = {
      eventName: event,
      path: window.location.pathname,
      referrer: document.referrer || textProp(props.last_referrer),
      utmSource: params.get('utm_source') || attribution.utmSource,
      utmMedium: params.get('utm_medium') || attribution.utmMedium,
      utmCampaign: params.get('utm_campaign') || attribution.utmCampaign,
      utmContent: params.get('utm_content') || attribution.utmContent,
      props,
    };

    void fetch('/api/analytics/funnel-event', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {
      // Best-effort analytics should never affect the assessment flow.
    });
  } catch {
    // Ignore browser/runtime edge cases.
  }
}

function textProp(value: unknown): string | null {
  return typeof value === 'string' && value.trim() ? value : null;
}
