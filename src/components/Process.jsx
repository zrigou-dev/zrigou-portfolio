import { SplitWords } from "@/components/Split";

export default function Process({ t }) {
  return (
    <section id="process" className="border-t border-line section-y">
      <div className="shell grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow mb-3 md:mb-4">{t.process.eyebrow}</p>
            <h2 data-words className="section-title">
              <SplitWords text={t.process.title} />
            </h2>
          </div>
        </div>

        <ol data-stagger className="border-t border-line lg:col-span-8">
          {t.process.steps.map((step, index) => (
            <li key={step.title} className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-line py-6 md:grid-cols-[4.5rem_1fr] md:py-9">
              <span className="font-mono text-sm text-accent md:pt-2">0{index + 1}</span>
              <div>
                <h3 className="font-display text-2xl font-semibold tracking-tight md:text-4xl">{step.title}</h3>
                <p className="mt-2 max-w-xl text-pretty text-[0.95rem] leading-relaxed text-ink-soft md:mt-3 md:text-lg">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
