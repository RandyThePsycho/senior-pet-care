// src/components/common/FAQSection.tsx

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Does a low score mean I should euthanize my pet?',
    answer:
      'No. A low score is not a decision by itself. It is a signal to slow down, write down what you are noticing, and talk with a licensed veterinarian about comfort, quality of life, and options.',
  },
  {
    question: 'How often should I reassess my senior pet?',
    answer:
      'We suggest reassessing in 7 days so you can notice patterns without reacting to one difficult day. If your pet changes suddenly, contact a veterinarian sooner.',
  },
  {
    question: 'Is this a veterinary diagnosis?',
    answer:
      'No. This tool is for education and organization only. It does not diagnose, treat, or replace professional veterinary advice.',
  },
  {
    question: "What if my pet's pain or breathing changes suddenly?",
    answer:
      'If you notice sudden pain, breathing changes, collapse, severe distress, or rapid decline, contact a licensed veterinarian or emergency clinic.',
  },
  {
    question: 'Can I print the report for my vet?',
    answer:
      'Yes. After submitting your email, you can open a printable report with the score sheet, symptoms noted, vet questions, and a 7-day tracker.',
  },
  {
    question: "What happens when I share my pet's situation?",
    answer:
      'That form is not a medical consultation, and it does not guarantee a reply. It helps us understand what senior pet families need most, so we can improve future resources.',
  },
];

export default function FAQSection() {
  return (
    <section className="rounded-lg border border-navy-100 bg-white/88 p-6 shadow-sm shadow-navy-800/5">
      <p className="text-sm font-semibold tracking-[0.14em] text-sage-700">
        FAQ
      </p>
      <h2 className="mt-3 font-display text-3xl leading-tight text-navy-800">
        Questions senior pet parents often ask
      </h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {FAQ_ITEMS.map((item) => (
          <article key={item.question} className="rounded-lg bg-cream-100 p-5">
            <h3 className="font-semibold leading-6 text-navy-800">
              {item.question}
            </h3>
            <p className="mt-2 text-sm leading-6 text-navy-600">
              {item.answer}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
