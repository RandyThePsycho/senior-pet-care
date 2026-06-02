// src/components/calculator/ScoreResultCard.tsx
// 总分卡片

interface ScoreResultCardProps {
  total: number; // 0–70
}

export default function ScoreResultCard({ total }: ScoreResultCardProps) {
  const pct = Math.round((total / 70) * 100);
  return (
    <div className="rounded-lg border border-navy-100 bg-white p-6 text-center shadow-soft">
      <p className="text-sm font-medium uppercase tracking-wide text-navy-400">
        Quality of life score
      </p>
      <p className="mt-2 text-6xl font-bold tabular-nums text-navy-800">
        {total}
        <span className="text-2xl font-medium text-navy-400"> / 70</span>
      </p>
      <div
        className="mt-4 h-2 w-full overflow-hidden rounded-full bg-cream-200"
        role="progressbar"
        aria-valuenow={total}
        aria-valuemin={0}
        aria-valuemax={70}
      >
        <div
          className="h-full rounded-full bg-sage-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
