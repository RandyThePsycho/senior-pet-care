// src/components/calculator/CalculatorProgress.tsx
// 三步进度指示

interface CalculatorProgressProps {
  step: number; // 1-based 当前步
  total: number;
}

const STEP_LABELS = ['Pet profile', 'Quality of life', 'Symptoms'];

export default function CalculatorProgress({
  step,
  total,
}: CalculatorProgressProps) {
  return (
    <div className="mb-8 rounded-lg bg-cream-50/80 p-4">
      <div className="mb-3 flex items-center justify-between gap-4">
        <p className="text-sm font-semibold tracking-[0.12em] text-navy-500">
          Step {step} of {total}
        </p>
        <p className="text-sm font-medium text-navy-500">
          {STEP_LABELS[step - 1] ?? ''}
        </p>
      </div>
      <div className="flex gap-2" aria-hidden="true">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full transition-colors duration-300 ${
              i < step ? 'bg-sage-500' : 'bg-cream-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
