// src/components/common/TrustNote.tsx
// Trust language without inventing reviewer credentials.

export default function TrustNote() {
  return (
    <section className="rounded-lg border border-navy-100 bg-white/88 p-6 shadow-sm shadow-navy-800/5">
      <p className="text-sm font-semibold tracking-[0.14em] text-sage-700">
        VET-INFORMED, NOT VET-DIAGNOSED
      </p>
      <h2 className="mt-3 font-display text-3xl leading-tight text-navy-800">
        Built to organize observations before the vet visit.
      </h2>
      <p className="mt-4 max-w-3xl leading-7 text-navy-600">
        This tool is designed to help you organize observations before speaking
        with a licensed veterinarian. It is not a diagnosis, and it should not
        replace professional veterinary advice.
      </p>
      <div className="mt-5 grid gap-3 text-sm text-navy-500 sm:grid-cols-2">
        <p className="rounded-lg bg-cream-100 px-4 py-3">
          Reviewed status:{' '}
          <span className="font-semibold text-navy-700">
            Editorial review pending
          </span>
        </p>
        <p className="rounded-lg bg-cream-100 px-4 py-3">
          Last updated:{' '}
          <span className="font-semibold text-navy-700">2026</span>
        </p>
      </div>
    </section>
  );
}
