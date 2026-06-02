// src/components/calculator/VetQuestionsList.tsx
// Questions to Ask Your Vet 列表

interface VetQuestionsListProps {
  questions: string[];
}

export default function VetQuestionsList({
  questions,
}: VetQuestionsListProps) {
  if (questions.length === 0) return null;

  return (
    <div className="rounded-lg border border-navy-100 bg-white p-6 shadow-sm shadow-navy-800/5">
      <h3 className="font-display text-2xl leading-tight text-navy-800">
        Questions to ask your vet
      </h3>
      <p className="mt-2 text-sm leading-6 text-navy-500">
        Bring these along to make the most of your next conversation.
      </p>
      <ul className="mt-4 space-y-3">
        {questions.map((q, i) => (
          <li key={i} className="flex gap-3 text-navy-700">
            <span
              aria-hidden="true"
              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-sage-100 text-sm font-semibold tabular-nums text-sage-700"
            >
              {i + 1}
            </span>
            <span className="leading-relaxed">{q}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
