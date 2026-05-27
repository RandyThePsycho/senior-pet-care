// src/lib/analytics.ts
// MVP 埋点：用 console.log 模拟。
// TODO: 后续接 Plausible 自定义事件或 GA4。
//   - Plausible:  window.plausible?.(event, { props })
//   - GA4:        window.gtag?.('event', event, props)

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
  // 下一步路由
  | 'product_matcher_cta_clicked'
  | 'end_of_life_cta_clicked';

export function track(
  event: AnalyticsEvent,
  props: Record<string, unknown> = {},
): void {
  // MVP: 仅打印到控制台
  // eslint-disable-next-line no-console
  console.log('[analytics]', event, props);

  // TODO: 接入真实分析工具，例如：
  // if (typeof window !== 'undefined') {
  //   (window as any).plausible?.(event, { props });
  //   (window as any).gtag?.('event', event, props);
  // }
}
