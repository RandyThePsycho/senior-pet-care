// src/lib/assessmentStorage.ts
// 轻量 localStorage mock storage helper（不引入状态管理库）。
// 用于在无后端的 MVP 阶段，让 Report 页和 Journal 页能读到留资时保存的评估快照。
// 全程 client-only 防护（typeof window 检查），可安全在 SSR 环境下被 import。

import type { AssessmentSnapshot } from '@/types/assessment';

const SNAPSHOT_PREFIX = 'spc:assessment:'; // + assessmentId
const PET_INDEX_PREFIX = 'spc:petJournal:'; // + petId -> assessmentId[]

function hasWindow(): boolean {
  // 某些浏览器在隐私模式下，访问 window.localStorage 本身就会抛错，
  // 因此用 try/catch 包裹，禁用时安全返回 false。
  try {
    return typeof window !== 'undefined' && !!window.localStorage;
  } catch {
    return false;
  }
}

// 保存一次评估快照，并把 assessmentId 追加到该 petId 的历史索引
export function saveAssessmentSnapshot(snapshot: AssessmentSnapshot): void {
  if (!hasWindow()) return;
  try {
    window.localStorage.setItem(
      `${SNAPSHOT_PREFIX}${snapshot.assessmentId}`,
      JSON.stringify(snapshot),
    );

    const indexKey = `${PET_INDEX_PREFIX}${snapshot.petId}`;
    const existingRaw = window.localStorage.getItem(indexKey);
    const ids: string[] = existingRaw ? (JSON.parse(existingRaw) as string[]) : [];
    if (!ids.includes(snapshot.assessmentId)) {
      ids.push(snapshot.assessmentId);
      window.localStorage.setItem(indexKey, JSON.stringify(ids));
    }
  } catch {
    // 存储失败（隐私模式 / 配额）静默忽略，不阻塞流程
  }
}

// 按 assessmentId 读取单次快照；找不到返回 null
export function getAssessmentSnapshot(
  assessmentId: string,
): AssessmentSnapshot | null {
  if (!hasWindow()) return null;
  try {
    const raw = window.localStorage.getItem(
      `${SNAPSHOT_PREFIX}${assessmentId}`,
    );
    return raw ? (JSON.parse(raw) as AssessmentSnapshot) : null;
  } catch {
    return null;
  }
}

// 按 petId 读取该宠物的全部快照（按时间升序），找不到返回 []
export function getPetJournal(petId: string): AssessmentSnapshot[] {
  if (!hasWindow()) return [];
  try {
    const indexKey = `${PET_INDEX_PREFIX}${petId}`;
    const raw = window.localStorage.getItem(indexKey);
    const ids: string[] = raw ? (JSON.parse(raw) as string[]) : [];
    const snapshots = ids
      .map((id) => getAssessmentSnapshot(id))
      .filter((s): s is AssessmentSnapshot => s !== null);
    snapshots.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );
    return snapshots;
  } catch {
    return [];
  }
}
