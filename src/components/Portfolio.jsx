import ClientWork from "@/components/ClientWork";
import FlagshipCard from "@/components/FlagshipCard";
export default function Portfolio({ locale, t, flagships, clients }) {
  return (
    <section id="work" className="section-y">
      <div className="shell">
        <div data-reveal className="mb-8 grid gap-4 md:mb-14 md:gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-3 md:mb-4">{t.portfolio.eyebrow}</p>
            <h2 className="section-title">{t.portfolio.title}</h2>
          </div>
          <p className="lead max-w-md lg:col-span-4">{t.portfolio.intro}</p>
        </div>

        <div className="space-y-4 md:space-y-6">
          {flagships.map((project, index) => (
            <FlagshipCard key={project.id} project={project} index={index} locale={locale} t={t} />
          ))}
        </div>

        <div data-reveal className="mb-6 mt-16 md:mb-10 md:mt-32">
          <p className="eyebrow mb-3 md:mb-4">{t.portfolio.clientEyebrow}</p>
          <h2 className="section-title">{t.portfolio.clientTitle}</h2>
        </div>
        <ClientWork projects={clients} />
      </div>
    </section>
  );
}
