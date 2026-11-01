import { services } from "@/data/site";

export default function Services() {
  return (
    <section id="services" className="border-t border-line py-24 md:py-36">
      <div className="shell">
        <div data-reveal className="mb-12 md:mb-16">
          <p className="eyebrow mb-4">Services</p>
          <h2 className="section-title">What I can build for you.</h2>
        </div>

        <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <article
              key={service.title}
              data-reveal
              style={{ "--d": index % 3 }}
              className="group flex min-h-72 flex-col bg-bg p-6 transition-colors duration-500 hover:bg-surface md:p-8"
            >
              <p className="font-mono text-xs text-muted">0{index + 1}</p>
              <h3 className="mt-10 font-display text-3xl font-semibold tracking-tight transition-colors group-hover:text-accent">
                {service.title}
              </h3>
              <p className="mt-3 text-pretty leading-relaxed text-ink-soft">{service.description}</p>
              <ul className="mt-auto flex flex-wrap gap-2 pt-6">
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
