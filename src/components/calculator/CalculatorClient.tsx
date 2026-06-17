// src/components/calculator/CalculatorClient.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import type { PetProfile } from '@/types/pet';
import type {
  AssessmentInput,
  AssessmentResult,
  DimensionScores,
  ReassessmentContext,
  Symptom,
} from '@/types/assessment';
import { DIMENSIONS } from '@/types/assessment';
import { scoreAssessment } from '@/lib/scoring';
import { track } from '@/lib/analytics';
import CalculatorProgress from './CalculatorProgress';
import PetProfileStep from './PetProfileStep';
import HHHHHMMScoreStep from './HHHHHMMScoreStep';
import SymptomsStep from './SymptomsStep';
import ResultView from './ResultView';

const EMPTY_SCORES: DimensionScores = DIMENSIONS.reduce((acc, d) => {
  acc[d] = null;
  return acc;
}, {} as DimensionScores);

const EMPTY_PROFILE: PetProfile = {
  petName: '',
  petType: 'dog',
  age: null,
  weight: null,
  weightUnit: 'lb',
  size: null,
  conditions: [],
};

type CalculatorEntryContext = {
  guide?: string;
  intent?: string;
  entrySource?: 'partner_kit';
};

function readCalculatorEntryContext(
  params: URLSearchParams,
): CalculatorEntryContext {
  const utmSource = params.get('utm_source')?.trim().toLowerCase();
  const utmCampaign = params.get('utm_campaign')?.trim().toLowerCase();
  const isPartnerKitEntry =
    utmSource === 'partner_outreach' ||
    utmSource === 'partner' ||
    utmCampaign === 'senior_pet_checkin_kit';

  return {
    guide: safeContextParam(params.get('guide')),
    intent: safeContextParam(params.get('intent')),
    entrySource: isPartnerKitEntry ? 'partner_kit' : undefined,
  };
}

function safeContextParam(value: string | null): string | undefined {
  if (!value) return undefined;

  const trimmed = value.trim().slice(0, 80);
  return /^[a-z0-9_-]+$/i.test(trimmed) ? trimmed : undefined;
}

export default function CalculatorClient() {
  const [step, setStep] = useState(1); // 1,2,3 = 表单步骤；4 = 结果页
  const [profile, setProfile] = useState<PetProfile>(EMPTY_PROFILE);
  const [scores, setScores] = useState<DimensionScores>(EMPTY_SCORES);
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [finalInput, setFinalInput] = useState<AssessmentInput | null>(null);
  const [reassessmentContext, setReassessmentContext] =
    useState<ReassessmentContext>({});
  const [entryContext, setEntryContext] = useState<CalculatorEntryContext>({});
  const entryContextRef = useRef<CalculatorEntryContext>({});

  // 进入计算器即埋点；若来自复评链接（URL 含 reassessment 参数）解析上下文并额外埋点
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const entryContext = readCalculatorEntryContext(params);
      entryContextRef.current = entryContext;
      setEntryContext(entryContext);
      track('calculator_started', entryContext);

      const petId = params.get('petId') ?? undefined;
      const reassessment = params.get('reassessment') ?? undefined;
      const source = params.get('source') ?? undefined;
      const reassessmentOf = params.get('reassessmentOf') ?? undefined;

      if (reassessment || petId || reassessmentOf) {
        setReassessmentContext({
          existingPetId: petId,
          reassessmentMode: reassessment,
          reassessmentSource: source,
          reassessmentOf,
        });
      }

      if (reassessment) {
        track('reassessment_started', {
          ...entryContext,
          mode: reassessment, // '7d' | 'manual' | ...
          petId,
          source,
          reassessmentOf,
        });
      }

      return;
    }

    track('calculator_started', {});
  }, []);

  function handleProfileNext() {
    track('pet_profile_completed', {
      ...entryContextRef.current,
      petType: profile.petType,
    });
    setStep(2);
  }

  function handleScoresNext() {
    track('scores_completed', entryContextRef.current);
    setStep(3);
  }

  function handleSubmit() {
    track('symptoms_completed', {
      ...entryContextRef.current,
      count: symptoms.length,
    });

    // 此处 scores 已保证全部非 null（Step 2 校验过），安全断言为 number
    const numericScores = DIMENSIONS.reduce((acc, d) => {
      acc[d] = scores[d] as number;
      return acc;
    }, {} as Record<(typeof DIMENSIONS)[number], number>);

    const input: AssessmentInput = {
      profile,
      scores: numericScores,
      symptoms,
      conditions: profile.conditions,
      // previousTotal: undefined  // MVP 无历史记录
    };

    const r = scoreAssessment(input);
    setFinalInput(input);
    setResult(r);
    track('calculator_completed', {
      ...entryContextRef.current,
      totalScore: r.totalScore,
      riskLevel: r.riskLevel,
    });
    setStep(4);

    // 滚动到顶部，方便查看结果
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function handleRestart() {
    setProfile(EMPTY_PROFILE);
    setScores(EMPTY_SCORES);
    setSymptoms([]);
    setResult(null);
    setFinalInput(null);
    setStep(1);
    track('calculator_started', {
      ...entryContextRef.current,
      restarted: true,
    });
  }

  return (
    <div>
      {entryContext.entrySource === 'partner_kit' && step <= 3 && (
        <div className="mb-5 rounded-lg border border-sage-200 bg-sage-50/80 px-4 py-3 text-sm leading-6 text-navy-600">
          <p className="font-semibold text-navy-800">
            Shared by a senior-pet organization or community?
          </p>
          <p className="mt-1">
            This check-in is private to you. The organization that shared the
            link does not receive your answers, and email is optional after you
            see the result if you want the printable report and 7-day journal.
          </p>
        </div>
      )}

      {step <= 3 && <CalculatorProgress step={step} total={3} />}

      {step === 1 && (
        <PetProfileStep
          value={profile}
          onChange={setProfile}
          onNext={handleProfileNext}
        />
      )}

      {step === 2 && (
        <HHHHHMMScoreStep
          value={scores}
          onChange={setScores}
          onBack={() => setStep(1)}
          onNext={handleScoresNext}
        />
      )}

      {step === 3 && (
        <SymptomsStep
          value={symptoms}
          onChange={setSymptoms}
          onBack={() => setStep(2)}
          onSubmit={handleSubmit}
        />
      )}

      {step === 4 && result && finalInput && (
        <ResultView
          input={finalInput}
          result={result}
          onRestart={handleRestart}
          reassessmentContext={reassessmentContext}
        />
      )}
    </div>
  );
}
