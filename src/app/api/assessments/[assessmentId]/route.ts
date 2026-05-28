// src/app/api/assessments/[assessmentId]/route.ts
// GET by assessmentId：查询 assessment + pet + user，返回 AssessmentSnapshot。
// Supabase 未配置或记录不存在 -> 404（前端回退 localStorage）。

import { NextResponse } from 'next/server';
import { getServerSupabase, isSupabaseConfigured } from '@/lib/supabase/server';
import {
  rowsToSnapshot,
  type AssessmentRow,
  type PetRow,
  type UserRow,
} from '@/lib/supabase/mappers';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const NO_STORE = {
  'Cache-Control': 'no-store, max-age=0',
};

export async function GET(
  _request: Request,
  { params }: { params: { assessmentId: string } },
) {
  const { assessmentId } = params;

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { ok: false, error: 'not_found' },
      { status: 404, headers: NO_STORE },
    );
  }

  try {
    const supabase = getServerSupabase();

    const { data: a } = await supabase
      .from('assessments')
      .select(
        'id, pet_id, user_id, total_score, risk_level, scores, symptoms, low_dimensions, urgent_flag, tags, vet_questions, reassessment_of, next_reassessment_at, created_at',
      )
      .eq('id', assessmentId)
      .maybeSingle();

    if (!a) {
      return NextResponse.json(
        { ok: false, error: 'not_found' },
        { status: 404, headers: NO_STORE },
      );
    }

    const { data: pet } = await supabase
      .from('pets')
      .select('id, user_id, name, pet_type, age, weight, weight_unit, size, conditions')
      .eq('id', a.pet_id)
      .maybeSingle();

    if (!pet) {
      return NextResponse.json(
        { ok: false, error: 'not_found' },
        { status: 404, headers: NO_STORE },
      );
    }

    let user: UserRow | null = null;
    if (a.user_id) {
      const { data: u } = await supabase
        .from('users')
        .select('id, email, source')
        .eq('id', a.user_id)
        .maybeSingle();
      user = (u as UserRow) ?? null;
    }

    const snapshot = rowsToSnapshot({
      assessment: a as AssessmentRow,
      pet: pet as PetRow,
      user,
    });

    return NextResponse.json({ ok: true, snapshot }, { headers: NO_STORE });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[api/assessments] error', err);
    return NextResponse.json(
      { ok: false, error: 'server_error' },
      { status: 500, headers: NO_STORE },
    );
  }
}
