import { NextResponse } from 'next/server';
import { shouldSkipAnalyticsPersistence } from '@/lib/analyticsRequest';
import { normalizeFunnelEventPayload } from '@/lib/funnelEvent';
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

  const normalized = normalizeFunnelEventPayload(
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

  if (!isSupabaseConfigured()) {
    return NextResponse.json({
      ok: true,
      persisted: false,
      skipped: 'supabase_not_configured',
    });
  }

  try {
    const supabase = getServerSupabase();
    const { error } = await supabase
      .from('funnel_events')
      .insert(normalized.data);

    if (error) {
      // Analytics is best-effort; a missing migration should not block users.
      // eslint-disable-next-line no-console
      console.warn('[analytics/funnel-event] skipped', error.message);
      return NextResponse.json({
        ok: true,
        persisted: false,
        skipped: 'funnel_events_unavailable',
      });
    }

    return NextResponse.json({ ok: true, persisted: true });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('[analytics/funnel-event] skipped', err);
    return NextResponse.json({
      ok: true,
      persisted: false,
      skipped: 'server_error',
    });
  }
}
