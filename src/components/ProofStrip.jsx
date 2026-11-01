const NAMES = ["SNCF", "OUIGO", "BARNES International", "Ministry of Industry and Commerce", "Junior & Cie", "Clinoly", "Masroufi", "Inspectra"];

export default function ProofStrip() {
  const row = (hidden) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {NAMES.map((name) => (
        <li key={name} className="flex items-center whitespace-nowrap font-display text-2xl font-semibold tracking-tight text-muted md:text-3xl">
          {name}
          <span className="mx-8 text-base text-accent md:mx-12" aria-hidden="true">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label="Selected clients and products" className="marquee overflow-hidden border-y border-line py-6">
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}
