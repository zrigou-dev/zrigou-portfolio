export default function About({ t, experience }) {
  const words = t.about.statement.split(" ");

  return (
    <section id="about" className="border-t border-line section-y">
      <div className="shell">
        <p className="eyebrow mb-5 md:mb-8">{t.about.eyebrow}</p>
        <p className="statement font-display text-[clamp(1.5rem,1rem+2.6vw,3.25rem)] font-semibold leading-[1.18] tracking-[-0.02em]">
          {words.map((word, index) => (
            <span key={`${word}-${index}`} className="reveal-word" style={{ "--p": index / words.length }}>
              {word}{" "}
            </span>
          ))}
        </p>

        <div className="mt-12 grid gap-12 md:mt-20 lg:grid-cols-12">
          <div data-reveal className="lg:col-span-12">
            <h3 className="eyebrow mb-3 md:mb-4">{t.about.experience}</h3>
            <ol className="border-t border-line">
              {experience.map((job) => (
                <li key={job.company} className="grid gap-2 border-b border-line py-5 sm:grid-cols-[10rem_1fr] sm:gap-6 sm:py-6">
                  <p className="font-mono text-xs text-muted sm:text-sm">{job.period}</p>
                  <div>
                    <p lang="en" className="font-display text-xl font-semibold tracking-tight md:text-2xl">{job.company}</p>
                    <p className="mt-0.5 text-sm text-muted">{job.role}</p>
                    <ul className="mt-3 max-w-3xl space-y-1.5 text-[0.95rem] leading-relaxed text-ink-soft md:text-base">
                      {job.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
              <li className="grid gap-2 border-b border-line py-5 sm:grid-cols-[10rem_1fr] sm:gap-6 sm:py-6">
                <p className="font-mono text-xs text-muted sm:text-sm">{t.about.founderLabel}</p>
                <div>
                  <p lang="en" className="font-display text-xl font-semibold tracking-tight md:text-2xl">{t.about.founderCompany}</p>
                  <p className="mt-0.5 text-sm text-muted">{t.about.founderRole}</p>
                  <p className="mt-3 max-w-3xl text-[0.95rem] leading-relaxed text-ink-soft md:text-base">
                    {t.about.founderText}
                  </p>
                </div>
              </li>
            </ol>
          </div>

        </div>
      </div>
    </section>
  );
}
