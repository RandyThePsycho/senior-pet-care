// src/components/common/DataPrivacyNote.tsx
// Plain-language MVP data persistence note. No account-system claims.

interface DataPrivacyNoteProps {
  compact?: boolean;
}

export default function DataPrivacyNote({
  compact = false,
}: DataPrivacyNoteProps) {
  return (
    <div
      className={`rounded-lg border border-navy-100 bg-white/82 shadow-sm shadow-navy-800/5 ${
        compact ? 'px-4 py-3' : 'p-5'
      }`}
    >
      <p className="text-sm font-semibold tracking-[0.14em] text-navy-400">
        NO ACCOUNT REQUIRED
      </p>
      <p className="mt-2 text-sm leading-6 text-navy-600">
        You&apos;ll receive a private report and care journal link by email, so
        you can revisit your pet&apos;s score next week. No account is required
        in this MVP.
      </p>
    </div>
  );
}
