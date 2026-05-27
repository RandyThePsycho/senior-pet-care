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
    <div className="mb-8">
      <p className="mb-2 text-sm font-medium text-navy-500">
        Step {step} of {total}
      </p>
      <div className="flex gap-2" aria-hidden="true">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full ${
              i < step ? 'bg-sage-500' : 'bg-cream-200'
            }`}
          />
        ))}
      </div>
      <p className="mt-2 text-sm text-navy-400">
        {STEP_LABELS[step - 1] ?? ''}
      </p>
    </div>
  );
}
