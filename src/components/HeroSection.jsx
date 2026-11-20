import Link from "next/link";
import { FiArrowDown, FiArrowUpRight } from "react-icons/fi";
import RoleRotator from "@/components/RoleRotator";
import { SplitChars } from "@/components/Split";
import ZelligeCanvas from "@/components/ZelligeCanvas";
import { localizePath } from "@/i18n/config";

export default function HeroSection({ locale, t, flagships }) {
  return (
    <section className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden pt-24 md:pt-28 [@media(max-height:760px)]:md:pt-20">
      <ZelligeCanvas />
      <div aria-hidden="true" className="aurora pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <span />
        <span />
        <span />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-bg from-45% to-transparent lg:h-2/3 lg:from-20%" />

      <div className="shell relative pb-7 md:pb-10 [@media(max-height:760px)]:md:pb-6">
        <div className="hero-fade mb-5 flex flex-wrap items-center gap-x-5 gap-y-2 md:mb-6" style={{ "--i": 0 }}>
          <p className="flex items-center gap-2 rounded-full border border-line bg-bg/70 px-3 py-1.5 text-[0.8rem] font-medium backdrop-blur md:text-sm">
            <span className="status-dot size-2 rounded-full bg-zellige" aria-hidden="true" />
            {t.hero.status}
          </p>
          <p className="eyebrow">
            {t.common.city}, {t.common.country}
          </p>
        </div>

        <h1 lang="en" className="font-display text-[clamp(3rem,min(15.5vw,17svh),11.5rem)] [@media(max-height:760px)]:text-[clamp(2.75rem,min(15.5vw,14svh),9rem)] font-extrabold leading-[0.92] tracking-[-0.03em]">
          <span className="sr-only">Mohamed Zrigou</span>
          <span className="hero-line" aria-hidden="true">
            <span className="hero-static">
              <SplitChars text="Mohamed" />
            </span>
          </span>
          <span className="hero-line" aria-hidden="true">
            <span className="hero-static block md:text-end">
              <SplitChars text="Zrigou" start={7} />
            </span>
          </span>
          <span lang={locale} className="sr-only">{t.hero.nameSuffix}</span>
        </h1>

        <RoleRotator prefix={t.hero.rolePrefix} roles={t.hero.roles} />

        <div className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-8 md:mt-8 [@media(max-height:760px)]:md:mt-4 lg:grid-cols-12 lg:items-end">
          <div className="hero-fade lg:col-span-7" style={{ "--i": 3 }}>
            <p className="lead max-w-xl md:max-w-2xl md:text-xl [@media(max-height:760px)]:md:text-base">{t.hero.intro}</p>
            <div className="mt-6 grid grid-cols-2 gap-2.5 sm:flex sm:gap-3">
              <Link href="#work" data-magnetic className="btn btn-primary">
                {t.hero.seeWork} <FiArrowDown aria-hidden="true" />
              </Link>
              <Link href="#contact" data-magnetic className="btn btn-ghost bg-bg/60 backdrop-blur">
                {t.hero.getInTouch}
              </Link>
            </div>
          </div>

          <div className="hero-fade lg:hidden" style={{ "--i": 4 }}>
          <p className="eyebrow mb-2.5">{t.hero.productsBuilt}</p>
          <ul className="-mx-[clamp(1.25rem,4vw,3.5rem)] flex gap-2 overflow-x-auto px-[clamp(1.25rem,4vw,3.5rem)] pb-1 [scrollbar-width:none]">
            {flagships.map((project) => (
              <li key={project.id} className="shrink-0">
                <Link
                  href={localizePath(locale, `/projects/${project.id}`)}
                  className="flex min-h-10 items-center gap-1.5 rounded-full border border-line bg-bg/70 py-2 ps-3.5 pe-3 text-sm font-medium backdrop-blur transition-colors active:bg-surface-2"
                >
                  <span lang="en">{project.title}</span>
                  <FiArrowUpRight className="size-3.5 text-muted rtl:-scale-x-100" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-fade hidden lg:col-span-5 lg:block" style={{ "--i": 4 }}>
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
