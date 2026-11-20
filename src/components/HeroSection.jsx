import Link from "next/link";
import { FiArrowDown, FiArrowUpRight } from "react-icons/fi";
import ZelligeCanvas from "@/components/ZelligeCanvas";
import { localizePath } from "@/i18n/config";

export default function HeroSection({ locale, t, flagships }) {
  return (
    <section className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden pt-24 md:pt-28">
      <ZelligeCanvas />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-bg from-45% to-transparent lg:h-2/3 lg:from-20%" />

      <div className="shell relative pb-7 md:pb-10">
        <div className="hero-fade mb-5 flex flex-wrap items-center gap-x-5 gap-y-2 md:mb-6" style={{ "--i": 0 }}>
          <p className="flex items-center gap-2 rounded-full border border-line bg-bg/70 px-3 py-1.5 text-[0.8rem] font-medium backdrop-blur md:text-sm">
            <span className="status-dot size-2 rounded-full bg-zellige" aria-hidden="true" />
            {t.hero.status}
          </p>
          <p className="eyebrow">
            {t.common.city}, {t.common.country}
          </p>
        </div>

        <h1 lang="en" className="font-display text-[clamp(3.25rem,min(15.5vw,21svh),11.5rem)] font-extrabold leading-[0.92] tracking-[-0.03em]">
          <span className="hero-line" style={{ "--i": 0 }}>
            <span>Mohamed</span>
          </span>
          <span className="hero-line" style={{ "--i": 1 }}>
            <span className="md:text-end">Zrigou</span>
          </span>
          <span lang={locale} className="sr-only">{t.hero.nameSuffix}</span>
        </h1>

        <div className="mt-6 grid gap-8 md:mt-8 lg:grid-cols-12 lg:items-end">
          <div className="hero-fade lg:col-span-7" style={{ "--i": 2 }}>
            <p className="lead max-w-xl md:max-w-2xl md:text-xl">{t.hero.intro}</p>
            <div className="mt-6 grid grid-cols-2 gap-2.5 sm:flex sm:gap-3">
              <Link href="#work" className="btn btn-primary">
                {t.hero.seeWork} <FiArrowDown aria-hidden="true" />
              </Link>
              <Link href="#contact" className="btn btn-ghost bg-bg/60 backdrop-blur">
                {t.hero.getInTouch}
              </Link>
            </div>
          </div>

          <div className="hero-fade hidden lg:col-span-5 lg:block" style={{ "--i": 3 }}>
            <p className="eyebrow mb-2">{t.hero.productsBuilt}</p>
            <ul className="divide-y divide-line border-y border-line">
              {flagships.map((project) => (
                <li key={project.id}>
                  <Link
                    href={localizePath(locale, `/projects/${project.id}`)}
                    className="group flex items-center justify-between gap-4 py-2.5 transition-[padding] duration-300 hover:pl-2"
                  >
                    <span lang="en" className="font-medium">{project.title}</span>
                    <span className="flex items-center gap-2 text-sm text-muted transition-colors group-hover:text-ink">
                      {project.category}
                      <FiArrowUpRight className="rtl:-scale-x-100" aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
