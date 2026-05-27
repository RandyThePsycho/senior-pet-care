// src/components/common/MedicalDisclaimer.tsx
// 医疗免责声明，全站复用。临终语境用更柔和的措辞。

interface MedicalDisclaimerProps {
  context?: 'default' | 'end_of_life';
}

export default function MedicalDisclaimer({
  context = 'default',
}: MedicalDisclaimerProps) {
  const text =
    context === 'end_of_life'
      ? 'This page is for informational and emotional support only. It is not veterinary or medical advice, and it does not replace a conversation with a licensed veterinarian about decisions for your pet.'
      : 'This tool is for educational purposes only. It is not a veterinary diagnosis and does not replace professional veterinary advice. Quality-of-life scales are a starting point for observation and conversation, not a medical assessment. Always consult a licensed veterinarian about your pet’s health.';

  return (
    <p className="rounded-2xl bg-cream-100 px-4 py-3 text-sm leading-relaxed text-navy-500">
      <span className="font-semibold text-navy-600">Please note: </span>
      {text}
    </p>
  );
}
