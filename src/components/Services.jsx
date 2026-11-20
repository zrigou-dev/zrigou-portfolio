import { SplitWords } from "@/components/Split";

export default function Services({ t, services }) {
  return (
    <section id="services" className="border-t border-line section-y">
      <div className="shell">
        <div data-reveal className="mb-8 md:mb-14">
          <p className="eyebrow mb-3 md:mb-4">{t.services.eyebrow}</p>
          <h2 data-words className="section-title"><SplitWords text={t.services.title} /></h2>
        </div>

        <div data-stagger className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:rounded-3xl md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <article
              key={service.title}
              data-spotlight
              className="group flex flex-col bg-bg p-5 md:min-h-72 transition-colors duration-500 md:p-8 [@media(hover:hover)]:hover:bg-surface"
            >
              <p className="font-mono text-xs text-muted">0{index + 1}</p>
              <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent md:mt-10 md:text-3xl">
                {service.title}
              </h3>
              <p className="mt-2 text-pretty text-[0.95rem] leading-relaxed text-ink-soft md:mt-3 md:text-base">{service.description}</p>
              <ul className="mt-auto flex flex-wrap gap-1.5 pt-5 md:gap-2 md:pt-6">
                {service.tags.map((tag) => (
                  <li key={tag} className="tag">
                    {tag}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
