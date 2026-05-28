// src/app/api/journal/[petId]/route.ts
// GET by petId：返回该 pet 的 assessments history（按 created_at 升序），
// 以及 latest（最近一条）。Supabase 未配置或 pet 不存在 -> 返回空 history（前端回退 localStorage）。

import { NextResponse } from 'next/server';
import { getServerSupabase, isSupabaseConfigured } from '@/lib/supabase/server';
import {
  rowsToSnapshot,
  type AssessmentRow,
  type PetRow,
  type UserRow,
} from '@/lib/supabase/mappers';

export async function GET(
  _request: Request,
  { params }: { params: { petId: string } },
) {
  const { petId } = params;

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ ok: true, history: [], latest: null });
  }

  try {
    const supabase = getServerSupabase();

    const { data: pet } = await supabase
      .from('pets')
      .select('id, user_id, name, pet_type, age, weight, weight_unit, size, conditions')
      .eq('id', petId)
      .maybeSingle();

    if (!pet) {
      // 温和处理：pet 不存在时返回空 history，前端显示 empty state
      return NextResponse.json({ ok: true, history: [], latest: null });
    }

    let user: UserRow | null = null;
    if (pet.user_id) {
      const { data: u } = await supabase
        .from('users')
        .select('id, email, source')
        .eq('id', pet.user_id)
        .maybeSingle();
      user = (u as UserRow) ?? null;
    }

    const { data: rows } = await supabase
      .from('assessments')
      .select(
        'id, pet_id, user_id, total_score, risk_level, scores, symptoms, low_dimensions, urgent_flag, tags, vet_questions, reassessment_of, next_reassessment_at, created_at',
      )
      .eq('pet_id', petId)
      .order('created_at', { ascending: true });

    const history = (rows ?? []).map((a) =>
      rowsToSnapshot({
        assessment: a as AssessmentRow,
        pet: pet as PetRow,
        user,
      }),
    );

    const latest = history.length > 0 ? history[history.length - 1] : null;

    return NextResponse.json({ ok: true, history, latest });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[api/journal] error', err);
    return NextResponse.json({ ok: true, history: [], latest: null });
  }
}
