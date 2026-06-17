import { NextResponse } from 'next/server';
import {
  shouldSkipAnalyticsPersistence,
  shouldSkipSyntheticAnalyticsSource,
} from '@/lib/analyticsRequest';
import { normalizePageViewPayload } from '@/lib/pageViewEvent';
import { getServerSupabase, isSupabaseConfigured } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: 'invalid_json' },
      { status: 400 },
    );
  }

  const normalized = normalizePageViewPayload(
    body && typeof body === 'object' ? body : {},
  );

  if (!normalized.ok) {
    return NextResponse.json({
      ok: true,
      persisted: false,
      skipped: normalized.error,
    });
  }

  if (shouldSkipAnalyticsPersistence(request)) {
    return NextResponse.json({
      ok: true,
      persisted: false,
      skipped: 'local_analytics_request',
    });
  }

  if (
    shouldSkipSyntheticAnalyticsSource({
      utmSource: normalized.data.utm_source,
      utmCampaign: normalized.data.utm_campaign,
    })
  ) {
    return NextResponse.json({
      ok: true,
      persisted: false,
      skipped: 'synthetic_analytics_request',
    });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({
      ok: true,
      persisted: false,
      skipped: 'supabase_not_configured',
    });
  }

  try {
    const supabase = getServerSupabase();
    const { error } = await supabase.from('page_events').insert(normalized.data);

    if (error) {
      // Keep pageview tracking best-effort; missing migrations should not affect users.
      // eslint-disable-next-line no-console
      console.warn('[analytics/page-view] skipped', error.message);
      return NextResponse.json({
        ok: true,
        persisted: false,
        skipped: 'page_events_unavailable',
      });
    }

    return NextResponse.json({ ok: true, persisted: true });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('[analytics/page-view] skipped', err);
    return NextResponse.json({
      ok: true,
      persisted: false,
      skipped: 'server_error',
    });
  }
}
