'use client';

import { FormEvent, useState } from 'react';
import CTAButton from '@/components/common/CTAButton';
import MedicalDisclaimer from '@/components/common/MedicalDisclaimer';
import { track } from '@/lib/analytics';
import {
  getAttributionSnapshot,
  getAttributionSource,
} from '@/lib/attribution';

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

const STUCK_POINTS = [
  {
    value: 'whether_to_call_vet',
    label: 'I am not sure whether to call the vet',
  },
  { value: 'what_to_track', label: 'I do not know what to track day to day' },
  { value: 'what_to_ask', label: 'I do not know what to ask my vet' },
  { value: 'home_setup', label: 'I am unsure how to make home care easier' },
  { value: 'family_decision', label: 'I need help talking with family' },
  {
    value: 'hard_decisions',
    label: 'I am facing a hard quality-of-life decision',
  },
] as const;

const HELP_NEEDS = [
  {
    value: 'quality_of_life_tracker',
    label: 'A simple quality-of-life tracker',
  },
  { value: 'vet_question_list', label: 'A question list for my vet' },
  { value: 'printable_plan', label: 'A printable care plan or checklist' },
  { value: 'home_care_ideas', label: 'Home-care ideas I can discuss with my vet' },
  { value: 'product_guidance', label: 'Help choosing safer senior-pet supplies' },
  { value: 'end_of_life_support', label: 'Gentle end-of-life planning support' },
  {
    value: 'emotional_support',
    label: 'Reassurance that I am thinking clearly',
  },
  { value: 'other', label: 'Something else' },
] as const;

export default function ShareSituationForm() {
  const [petType, setPetType] = useState('dog');
  const [petAge, setPetAge] = useState('');
  const [concerns, setConcerns] = useState<string[]>([]);
  const [stuckPoints, setStuckPoints] = useState<string[]>([]);
  const [helpNeeds, setHelpNeeds] = useState<string[]>([]);
  const [whatWouldHelp, setWhatWouldHelp] = useState('');
  const [freeText, setFreeText] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function toggleConcern(value: string) {
    setConcerns((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    );
  }

  function toggleStuckPoint(value: string) {
    setStuckPoints((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    );
  }

  function toggleHelpNeed(value: string) {
    setHelpNeeds((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const attribution = getAttributionSnapshot();
    const payload = {
      pet_type: petType,
      pet_age: petAge.trim() || null,
      main_concern: concerns,
      stuck_points: stuckPoints,
      needed_help: helpNeeds,
      what_would_help: whatWouldHelp.trim() || null,
      free_text: freeText.trim(),
      email: email.trim() || null,
      source: getAttributionSource('share_your_situation'),
      attribution,
    };

    setError('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/need-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        persisted?: boolean;
        submissionId?: string;
      };

      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Submission failed');
      }

      track('situation_intake_submitted', {
        petType: payload.pet_type,
        concernCount: payload.main_concern.length,
        stuckPointCount: payload.stuck_points.length,
        helpNeedCount: payload.needed_help.length,
        hasOpenNeed: Boolean(payload.what_would_help),
        hasEmail: Boolean(payload.email),
        source: payload.source,
        persisted: Boolean(data.persisted),
        submissionId: data.submissionId,
      });

      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Could not save your note right now. Please try again.',
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-sage-200 bg-sage-50 p-6 shadow-sm shadow-sage-700/10">
        <p className="font-display text-3xl leading-tight text-navy-800">
          Thank you for sharing.
        </p>
        <p className="mt-4 leading-7 text-navy-600">
          We can&apos;t provide medical advice, but your note helps us
          understand what senior pet families need most and what resources
          should come next. If you&apos;re worried about sudden pain, breathing
          changes, collapse, or severe distress, please contact a licensed
          veterinarian or emergency clinic.
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
          What are you noticing?
        </legend>
        <p className="mt-1 text-sm leading-6 text-navy-500">
          Choose any concerns that fit your pet&apos;s situation.
        </p>
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

      <fieldset>
        <legend className="text-sm font-semibold text-navy-700">
          Where do you feel most stuck?
        </legend>
        <p className="mt-1 text-sm leading-6 text-navy-500">
          This helps us understand the pain point behind the concern.
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {STUCK_POINTS.map((item) => (
            <label
              key={item.value}
              className={`flex cursor-pointer gap-3 rounded-lg border px-4 py-3 text-sm transition ${
                stuckPoints.includes(item.value)
                  ? 'border-sage-300 bg-sage-50 text-navy-800'
                  : 'border-navy-100 bg-white text-navy-600 hover:bg-cream-100'
              }`}
            >
              <input
                type="checkbox"
                name="stuck_points"
                value={item.value}
                checked={stuckPoints.includes(item.value)}
                onChange={() => toggleStuckPoint(item.value)}
                className="mt-1 accent-sage-600"
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-semibold text-navy-700">
          What kind of help would you actually use?
        </legend>
        <p className="mt-1 text-sm leading-6 text-navy-500">
          Choose any resources that would make caring for your pet easier.
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {HELP_NEEDS.map((item) => (
            <label
              key={item.value}
              className={`flex cursor-pointer gap-3 rounded-lg border px-4 py-3 text-sm transition ${
                helpNeeds.includes(item.value)
                  ? 'border-sage-300 bg-sage-50 text-navy-800'
                  : 'border-navy-100 bg-white text-navy-600 hover:bg-cream-100'
              }`}
            >
              <input
                type="checkbox"
                name="needed_help"
                value={item.value}
                checked={helpNeeds.includes(item.value)}
                onChange={() => toggleHelpNeed(item.value)}
                className="mt-1 accent-sage-600"
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="block">
        <span className="text-sm font-semibold text-navy-700">
          If we could make one thing easier, what would it be?
        </span>
        <textarea
          value={whatWouldHelp}
          onChange={(event) => setWhatWouldHelp(event.target.value)}
          rows={4}
          placeholder="For example: I need help knowing what to track, what to ask my vet, or what changes at home would be safest."
          className="mt-2 w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-navy-700 focus:border-sage-500 focus:outline-none focus:ring-2 focus:ring-sage-300"
        />
      </label>

      <label className="block">
        <span className="text-sm font-semibold text-navy-700">
          What has been happening with your pet lately?
        </span>
        <textarea
          value={freeText}
          onChange={(event) => setFreeText(event.target.value)}
          rows={6}
          placeholder="Share any recent changes, patterns, or moments that made you worry."
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
          disabled={submitting}
          placeholder="Email me if you create resources that match this need"
          className="mt-2 w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-navy-700 focus:border-sage-500 focus:outline-none focus:ring-2 focus:ring-sage-300"
        />
      </label>

      <div className="rounded-lg bg-cream-100 p-4">
        <MedicalDisclaimer />
      </div>

      {error && (
        <p className="rounded-lg bg-orange-50 px-4 py-3 text-sm font-medium text-clay-600">
          {error}
        </p>
      )}

      <CTAButton type="submit" fullWidth disabled={submitting}>
        {submitting ? 'Sharing...' : 'Share what would help'}
      </CTAButton>
    </form>
  );
}
