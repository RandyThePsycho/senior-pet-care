'use client';

import { FormEvent, useState } from 'react';
import CTAButton from '@/components/common/CTAButton';
import MedicalDisclaimer from '@/components/common/MedicalDisclaimer';
import { track } from '@/lib/analytics';

const CONCERNS = [
  { value: 'mobility', label: 'Mobility or trouble standing' },
  { value: 'pain', label: 'Pain or discomfort' },
  { value: 'night_confusion', label: 'Night crying / confusion' },
  { value: 'eating_drinking', label: 'Eating or drinking changes' },
  { value: 'incontinence', label: 'Incontinence / hygiene' },
  { value: 'end_of_life', label: 'End-of-life worries' },
  { value: 'product_confusion', label: 'Product confusion' },
  { value: 'vet_conversation', label: 'Help preparing for a vet conversation' },
  { value: 'other', label: 'Other' },
] as const;

export default function ShareSituationForm() {
  const [petType, setPetType] = useState('dog');
  const [petAge, setPetAge] = useState('');
  const [concerns, setConcerns] = useState<string[]>([]);
  const [freeText, setFreeText] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function toggleConcern(value: string) {
    setConcerns((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const payload = {
      pet_type: petType,
      pet_age: petAge.trim() || null,
      main_concern: concerns,
      free_text: freeText.trim(),
      email: email.trim() || null,
      source: 'share_your_situation',
    };

    track('situation_intake_submitted', {
      petType: payload.pet_type,
      concernCount: payload.main_concern.length,
      hasEmail: Boolean(payload.email),
    });

    // Mock submit only. TODO: Persist to a future need_submissions table for the internal dashboard.
    // eslint-disable-next-line no-console
    console.log('[situation_intake]', payload);

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-sage-200 bg-sage-50 p-6 shadow-sm shadow-sage-700/10">
        <p className="font-display text-3xl leading-tight text-navy-800">
          Thank you for sharing.
        </p>
        <p className="mt-4 leading-7 text-navy-600">
          We can&apos;t provide medical advice, but your note helps us
          understand what senior pet families need most. If you&apos;re worried
          about sudden pain, breathing changes, collapse, or severe distress,
          please contact a licensed veterinarian or emergency clinic.
        </p>
        <div className="mt-6">
          <CTAButton href="/tools/senior-pet-quality-of-life-calculator">
            Check my pet&apos;s quality of life
          </CTAButton>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-navy-700">Pet type</span>
          <select
            value={petType}
            onChange={(event) => setPetType(event.target.value)}
            className="mt-2 w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-navy-700 focus:border-sage-500 focus:outline-none focus:ring-2 focus:ring-sage-300"
          >
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="other">Other</option>
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-navy-700">
            Age <span className="font-normal text-navy-400">(optional)</span>
          </span>
          <input
            type="text"
            value={petAge}
            onChange={(event) => setPetAge(event.target.value)}
            placeholder="e.g. 13"
            className="mt-2 w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-navy-700 focus:border-sage-500 focus:outline-none focus:ring-2 focus:ring-sage-300"
          />
        </label>
      </div>

      <fieldset>
        <legend className="text-sm font-semibold text-navy-700">
          What are you most worried about?
        </legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {CONCERNS.map((concern) => (
            <label
              key={concern.value}
              className={`flex cursor-pointer gap-3 rounded-lg border px-4 py-3 text-sm transition ${
                concerns.includes(concern.value)
                  ? 'border-sage-300 bg-sage-50 text-navy-800'
                  : 'border-navy-100 bg-white text-navy-600 hover:bg-cream-100'
              }`}
            >
              <input
                type="checkbox"
                checked={concerns.includes(concern.value)}
                onChange={() => toggleConcern(concern.value)}
                className="mt-1 accent-sage-600"
              />
              <span>{concern.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="block">
        <span className="text-sm font-semibold text-navy-700">
          What&apos;s been happening with your pet lately?
        </span>
        <textarea
          value={freeText}
          onChange={(event) => setFreeText(event.target.value)}
          rows={7}
          placeholder="What’s been happening with your pet lately?"
          className="mt-2 w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-navy-700 focus:border-sage-500 focus:outline-none focus:ring-2 focus:ring-sage-300"
        />
      </label>

      <label className="block">
        <span className="text-sm font-semibold text-navy-700">
          Email <span className="font-normal text-navy-400">(optional)</span>
        </span>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email me if you create resources for situations like this"
          className="mt-2 w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-navy-700 focus:border-sage-500 focus:outline-none focus:ring-2 focus:ring-sage-300"
        />
      </label>

      <div className="rounded-lg bg-cream-100 p-4">
        <MedicalDisclaimer />
      </div>

      <CTAButton type="submit" fullWidth>
        Share what&apos;s happening
      </CTAButton>
    </form>
  );
}
