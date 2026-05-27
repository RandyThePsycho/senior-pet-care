// src/components/calculator/PetProfileStep.tsx
'use client';

import { useState } from 'react';
import type {
  Condition,
  PetProfile,
  PetSize,
  PetType,
  WeightUnit,
} from '@/types/pet';
import { CONDITION_OPTIONS, SIZE_OPTIONS } from '@/types/pet';
import CTAButton from '@/components/common/CTAButton';

interface PetProfileStepProps {
  value: PetProfile;
  onChange: (value: PetProfile) => void;
  onNext: () => void;
}

export default function PetProfileStep({
  value,
  onChange,
  onNext,
}: PetProfileStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  function update<K extends keyof PetProfile>(key: K, v: PetProfile[K]) {
    onChange({ ...value, [key]: v });
  }

  function toggleCondition(c: Condition) {
    const exists = value.conditions.includes(c);
    const next = exists
      ? value.conditions.filter((x) => x !== c)
      : [...value.conditions, c];
    update('conditions', next);
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!value.petType) e.petType = 'Please choose dog or cat.';
    if (value.age === null || Number.isNaN(value.age) || value.age <= 0)
      e.age = 'Please enter an age in years.';
    if (
      value.weight === null ||
      Number.isNaN(value.weight) ||
      value.weight <= 0
    )
      e.weight = 'Please enter a weight.';
    if (value.petType === 'dog' && !value.size)
      e.size = 'Please choose a size.';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleNext() {
    if (validate()) onNext();
  }

  const labelClass = 'block text-sm font-semibold text-navy-700 mb-2';
  const inputClass =
    'w-full rounded-2xl border border-navy-200 bg-white px-4 py-3 text-navy-700 focus:border-sage-500 focus:outline-none focus:ring-2 focus:ring-sage-300';
  const errClass = 'mt-1 text-sm text-clay-600';

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-navy-800">
          Tell us about your pet
        </h2>
        <p className="mt-1 text-navy-500">
          A few details help us make your results more relevant.
        </p>
      </div>

      {/* Pet name (optional) */}
      <div>
        <label htmlFor="petName" className={labelClass}>
          Your pet&apos;s name <span className="font-normal text-navy-400">(optional)</span>
        </label>
        <input
          id="petName"
          type="text"
          maxLength={40}
          value={value.petName}
          onChange={(e) => update('petName', e.target.value)}
          placeholder="e.g. Bella"
          className={inputClass}
        />
      </div>

      {/* Pet type */}
      <div>
        <span className={labelClass}>Is your companion a dog or a cat?</span>
        <div className="grid grid-cols-2 gap-3">
          {(['dog', 'cat'] as PetType[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => update('petType', t)}
              className={`rounded-2xl border px-4 py-4 text-base font-semibold capitalize transition-colors ${
                value.petType === t
                  ? 'border-sage-500 bg-sage-50 text-sage-700'
                  : 'border-navy-200 bg-white text-navy-600 hover:bg-cream-100'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        {errors.petType && <p className={errClass}>{errors.petType}</p>}
      </div>

      {/* Age */}
      <div>
        <label htmlFor="age" className={labelClass}>
          Age (years)
        </label>
        <input
          id="age"
          type="number"
          min={0}
          max={30}
          step={0.5}
          value={value.age ?? ''}
          onChange={(e) =>
            update('age', e.target.value === '' ? null : Number(e.target.value))
          }
          placeholder="e.g. 12"
          className={inputClass}
        />
        {errors.age && <p className={errClass}>{errors.age}</p>}
      </div>

      {/* Weight + unit */}
      <div>
        <label htmlFor="weight" className={labelClass}>
          Weight
        </label>
        <div className="flex gap-3">
          <input
            id="weight"
            type="number"
            min={0}
            step={0.1}
            value={value.weight ?? ''}
            onChange={(e) =>
              update(
                'weight',
                e.target.value === '' ? null : Number(e.target.value),
              )
            }
            placeholder="e.g. 65"
            className={`${inputClass} flex-1`}
          />
          <div className="flex overflow-hidden rounded-2xl border border-navy-200">
            {(['lb', 'kg'] as WeightUnit[]).map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => update('weightUnit', u)}
                className={`px-4 py-3 text-sm font-semibold uppercase transition-colors ${
                  value.weightUnit === u
                    ? 'bg-sage-500 text-white'
                    : 'bg-white text-navy-500 hover:bg-cream-100'
                }`}
              >
                {u}
              </button>
            ))}
          </div>
        </div>
        {errors.weight && <p className={errClass}>{errors.weight}</p>}
      </div>

      {/* Size (dog required) */}
      {value.petType === 'dog' && (
        <div>
          <span className={labelClass}>Size</span>
          <div className="flex flex-wrap gap-2">
            {SIZE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => update('size', opt.value as PetSize)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  value.size === opt.value
                    ? 'border-sage-500 bg-sage-50 text-sage-700'
                    : 'border-navy-200 bg-white text-navy-600 hover:bg-cream-100'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {errors.size && <p className={errClass}>{errors.size}</p>}
        </div>
      )}

      {/* Conditions (multi) */}
      <div>
        <span className={labelClass}>
          Has your vet mentioned any of these?{' '}
          <span className="font-normal text-navy-400">(select all that apply)</span>
        </span>
        <div className="flex flex-wrap gap-2">
          {CONDITION_OPTIONS.map((opt) => {
            const active = value.conditions.includes(opt.value);
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => toggleCondition(opt.value)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? 'border-sage-500 bg-sage-50 text-sage-700'
                    : 'border-navy-200 bg-white text-navy-600 hover:bg-cream-100'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-2">
        <CTAButton onClick={handleNext} fullWidth>
          Continue
        </CTAButton>
      </div>
    </div>
  );
}
