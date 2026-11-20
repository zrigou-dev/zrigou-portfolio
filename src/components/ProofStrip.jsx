const NAMES = ["SNCF", "OUIGO", "BARNES International", "Ministry of Industry and Commerce", "Junior & Cie", "Clinoly", "Masroufi", "Sakina", "Inspectra"];

export default function ProofStrip({ t }) {
  const row = (hidden) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {NAMES.map((name) => (
        <li key={name} className="flex items-center whitespace-nowrap font-display text-lg font-semibold tracking-tight text-muted md:text-3xl">
          {name}
          <span className="mx-6 text-sm text-accent md:mx-12 md:text-base" aria-hidden="true">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label={t.proof.label} dir="ltr" className="marquee overflow-hidden border-y border-line py-4 md:py-6">
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}
