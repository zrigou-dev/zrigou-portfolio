import ClientWork from "@/components/ClientWork";
import FlagshipCard from "@/components/FlagshipCard";
import { SplitWords } from "@/components/Split";
export default function Portfolio({ locale, t, flagships, clients }) {
  return (
    <section id="work" className="section-y">
      <div className="shell">
        <div data-reveal className="mb-8 grid gap-4 md:mb-14 md:gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-3 md:mb-4">{t.portfolio.eyebrow}</p>
            <h2 data-words className="section-title"><SplitWords text={t.portfolio.title} /></h2>
          </div>
          <p className="lead max-w-md lg:col-span-4">{t.portfolio.intro}</p>
        </div>

        {/* Phones: a swipeable row with the next card peeking in. Desktop: stacked cards that pin as you scroll. */}
        <div
          className="-mx-[clamp(1.25rem,4vw,3.5rem)] flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-[clamp(1.25rem,4vw,3.5rem)] px-[clamp(1.25rem,4vw,3.5rem)] pb-2 [scrollbar-width:none] md:gap-4 lg:mx-0 lg:block lg:space-y-6 lg:overflow-visible lg:px-0 lg:pb-0"
          tabIndex={0}
          role="region"
          aria-label={t.portfolio.eyebrow}
        >
          {flagships.map((project, index) => (
            <div
              key={project.id}
              style={{ "--n": index }}
              className="flagship-slot w-[85vw] max-w-[26rem] shrink-0 snap-center md:w-[26rem] lg:w-auto lg:max-w-none"
            >
              <FlagshipCard project={project} index={index} locale={locale} t={t} />
            </div>
          ))}
        </div>

        <div data-reveal className="mb-6 mt-16 md:mb-10 md:mt-32">
          <p className="eyebrow mb-3 md:mb-4">{t.portfolio.clientEyebrow}</p>
          <h2 data-words className="section-title"><SplitWords text={t.portfolio.clientTitle} /></h2>
        </div>
        <ClientWork projects={clients} />
      </div>
    </section>
  );
}
