// src/app/api/need-submissions/route.ts
// Share Situation 需求采集接口。
// 只保存用户描述的需求与痛点；不做诊断、不承诺回复、不触发邮件自动化。

import { NextResponse } from 'next/server';
import { getServerSupabase, isSupabaseConfigured } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PET_TYPES = new Set(['dog', 'cat', 'other']);

interface NeedSubmissionBody {
  pet_type?: unknown;
  pet_age?: unknown;
  main_concern?: unknown;
  stuck_points?: unknown;
  needed_help?: unknown;
  what_would_help?: unknown;
  free_text?: unknown;
  email?: unknown;
  source?: unknown;
}

function mockId(prefix: string): string {
  const rand = Math.random().toString(36).slice(2, 10);
  return `${prefix}_${Date.now().toString(36)}${rand}`;
}

function textOrNull(value: unknown, maxLength: number): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, maxLength);
}

function textArray(value: unknown, maxItems = 16): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === 'string')
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, maxItems)
    .map((item) => item.slice(0, 100));
}

function normalizeBody(body: NeedSubmissionBody) {
  const petType =
    typeof body.pet_type === 'string' && PET_TYPES.has(body.pet_type)
      ? body.pet_type
      : 'dog';

  const email = textOrNull(body.email, 254);
  if (email && !EMAIL_RE.test(email)) {
    return {
      ok: false as const,
      error: 'Please enter a valid email address.',
    };
  }

  return {
    ok: true as const,
    data: {
      pet_type: petType,
      pet_age: textOrNull(body.pet_age, 32),
      main_concern: textArray(body.main_concern),
      stuck_points: textArray(body.stuck_points),
      needed_help: textArray(body.needed_help),
      what_would_help: textOrNull(body.what_would_help, 1200),
      free_text: textOrNull(body.free_text, 2000),
      email,
      source: textOrNull(body.source, 80) ?? 'share_your_situation',
    },
  };
}

export async function POST(request: Request) {
  let body: NeedSubmissionBody;
  try {
    body = (await request.json()) as NeedSubmissionBody;
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid JSON body.' },
      { status: 400 },
    );
  }

  const normalized = normalizeBody(body);
  if (!normalized.ok) {
    return NextResponse.json(
      { ok: false, error: normalized.error },
      { status: 422 },
    );
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({
      ok: true,
      submissionId: mockId('need'),
      persisted: false,
    });
  }

  try {
    const supabase = getServerSupabase();
    const { data, error } = await supabase
      .from('need_submissions')
      .insert(normalized.data)
      .select('id')
      .single();

    if (error) throw error;

    return NextResponse.json({
      ok: true,
      submissionId: data?.id,
      persisted: true,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[api/need-submissions] error', err);
    return NextResponse.json(
      {
        ok: false,
        error: 'Could not save your note right now. Please try again.',
      },
      { status: 500 },
    );
  }
}
