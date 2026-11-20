import Link from "next/link";
import { FiAward, FiBox, FiCheckCircle, FiGlobe, FiShield, FiTarget } from "react-icons/fi";
import { SplitWords } from "@/components/Split";
import { localizePath } from "@/i18n/config";

const ICONS = [FiBox, FiTarget, FiCheckCircle, FiGlobe, FiShield, FiAward];

// Each claim links to the case study that backs it up, so nothing here is asked to be taken on trust.
export default function WhyHire({ locale, t, projects }) {
  const byId = Object.fromEntries(projects.map((project) => [project.id, project]));

  return (
    <section id="why" className="border-t border-line section-y">
      <div className="shell">
        <div data-reveal className="mb-8 grid gap-4 md:mb-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-3 md:mb-4">{t.why.eyebrow}</p>
            <h2 data-words className="section-title">
              <SplitWords text={t.why.title} />
            </h2>
          </div>
          <p className="lead max-w-md lg:col-span-4">{t.why.intro}</p>
        </div>

        <ul data-stagger className="grid gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
          {t.why.items.map((item, index) => {
            const Icon = ICONS[index];
            return (
              <li key={item.title} data-spotlight className="flex flex-col overflow-hidden rounded-2xl border border-line bg-surface/50 p-5 md:p-7">
                <span className="grid size-10 place-items-center rounded-xl bg-accent-fill/15 text-accent">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold leading-snug tracking-tight md:text-2xl">{item.title}</h3>
                <p className="mt-2 text-pretty text-[0.95rem] leading-relaxed text-ink-soft md:text-base">{item.text}</p>
                <div className="mt-auto pt-5">
                  <p className="eyebrow mb-2">{t.why.proofLabel}</p>
                  <ul className="flex flex-wrap gap-1.5">
                    {item.proof.map((id) => (
                      <li key={id}>
                        <Link
                          href={localizePath(locale, `/projects/${id}`)}
                          lang={byId[id].titleLang ?? "en"}
                          className="tag transition-colors hover:border-accent hover:text-accent"
                        >
                          {byId[id].title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
