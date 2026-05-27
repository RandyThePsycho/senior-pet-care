// src/components/calculator/ReassessmentReminder.tsx
'use client';

import { useState } from 'react';
import CTAButton from '@/components/common/CTAButton';
import { track } from '@/lib/analytics';

interface ReassessmentReminderProps {
  petName: string;
}

export default function ReassessmentReminder({
  petName,
}: ReassessmentReminderProps) {
  const [done, setDone] = useState(false);
  const safeName = petName.trim() || 'your pet';

  function handleClick() {
    // TODO: 接 ESP automation 或 Supabase scheduled job，
    //   写入 next_reassessment_date = now + 7d，并安排提醒邮件。
    track('reassessment_clicked', {});
    setDone(true);
  }

  return (
    <div className="rounded-3xl border border-navy-100 bg-cream-100 p-6">
      <h3 className="text-xl font-bold text-navy-800">
        Check in again next week
      </h3>
      <p className="mt-1 text-navy-600">
        Small changes matter. We&apos;ll remind you to update {safeName}&apos;s
        score in 7 days.
      </p>
      <div className="mt-4">
        {done ? (
          <p className="rounded-2xl bg-white px-4 py-3 text-sm font-medium text-sage-700">
            Reminder set. We&apos;ll check in with you next week.
          </p>
        ) : (
          <CTAButton variant="secondary" onClick={handleClick}>
            Set a 7-day reminder
          </CTAButton>
        )}
      </div>
    </div>
  );
}
