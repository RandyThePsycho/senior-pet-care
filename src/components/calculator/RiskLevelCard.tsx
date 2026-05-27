// src/components/calculator/RiskLevelCard.tsx
// 风险等级卡片。色彩柔和，不使用刺眼红色或警报色。

import type { RiskLevel } from '@/types/assessment';
import { getRiskCopy } from '@/lib/scoring';

interface RiskLevelCardProps {
  level: RiskLevel;
  petName: string;
  urgentFlag: boolean;
}

// 每个等级的柔和配色
const LEVEL_STYLES: Record<RiskLevel, string> = {
  stable: 'border-sage-200 bg-sage-50',
  needs_monitoring: 'border-amber-200 bg-amber-50',
  vet_visit: 'border-orange-200 bg-orange-50',
  end_of_life: 'border-navy-200 bg-navy-50',
};

const LEVEL_BADGE: Record<RiskLevel, string> = {
  stable: 'bg-sage-500 text-white',
  needs_monitoring: 'bg-amber-500 text-white',
  vet_visit: 'bg-orange-500 text-white',
  end_of_life: 'bg-navy-500 text-white',
};

export default function RiskLevelCard({
  level,
  petName,
  urgentFlag,
}: RiskLevelCardProps) {
  const copy = getRiskCopy(level, petName);

  return (
    <div className={`rounded-3xl border p-6 ${LEVEL_STYLES[level]}`}>
      <span
        className={`inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${LEVEL_BADGE[level]}`}
      >
        {copy.label}
      </span>
      <h2 className="mt-3 text-2xl font-bold text-navy-800">
        {copy.headline}
      </h2>
      <p className="mt-2 leading-relaxed text-navy-600">{copy.body}</p>

      {urgentFlag && (
        <p className="mt-4 rounded-2xl bg-white/70 px-4 py-3 text-sm font-medium text-navy-700">
          Some of what you&apos;ve described may need prompt attention from your
          vet. If you&apos;re worried, it&apos;s always okay to reach out to
          them sooner.
        </p>
      )}
    </div>
  );
}
