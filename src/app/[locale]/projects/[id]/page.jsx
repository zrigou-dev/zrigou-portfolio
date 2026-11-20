import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiArrowUpRight, FiDownload, FiGithub } from "react-icons/fi";
import { BrowserFrame, PanelFrame, PhoneFrame } from "@/components/Devices";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import { SplitWords } from "@/components/Split";
import StickyCta from "@/components/StickyCta";
import { projects as baseProjects } from "@/data/projects";
import { site } from "@/data/site";
import { isLocale, localeMeta, localizePath, locales } from "@/i18n/config";
import { getProjects } from "@/i18n/content";
import { fmt } from "@/i18n/format";
import { getDictionary } from "@/i18n/get-dictionary";
import { alternatesFor } from "@/i18n/seo";
import { breadcrumbSchema, projectSchema } from "@/lib/schema";

export function generateStaticParams() {
  return locales.flatMap((locale) => baseProjects.map((project) => ({ locale, id: project.id })));
}

export async function generateMetadata({ params }) {
  const { locale, id } = await params;
  if (!isLocale(locale)) return {};
  const project = getProjects(locale).find((item) => item.id === id);
  if (!project) return {};

  const title = `${project.title}: ${project.category}`;
  const path = `/projects/${project.id}`;
  const url = localizePath(locale, path);
  return {
    title,
    description: project.description,
    alternates: alternatesFor(locale, path),
    openGraph: {
      type: "article",
      url,
      locale: localeMeta[locale].og,
      title: `${title} | ${site.name}`,
      description: project.description,
    },
    twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description: project.description },
  };
}

function HeroVisual({ project }) {
  if (project.heroShots) {
    const [left, right] = project.heroShots;
    return (
      <div className="mx-auto flex max-w-3xl justify-center gap-2.5 sm:gap-6">
        <PhoneFrame src={left.src} alt={left.alt} sizes="30vw" className="mt-[8%] w-[31%]" />
        <PhoneFrame src={project.image} alt={project.imageAlt} sizes="34vw" priority className="z-10 w-[35%]" />
        <PhoneFrame src={right.src} alt={right.alt} sizes="30vw" className="mt-[8%] w-[31%]" />
      </div>
    );
  }
  if (project.id === "inspectra") {
    return (
      <div className="mx-auto grid max-w-3xl grid-cols-2 gap-3 sm:gap-6">
        <PanelFrame src={project.image} alt={project.imageAlt} sizes="(min-width: 768px) 24rem, 48vw" />
        <PanelFrame src={project.gallery[0].src} alt={project.gallery[0].alt} sizes="(min-width: 768px) 24rem, 48vw" className="mt-[12%]" />
      </div>
    );
  }
  return (
    <BrowserFrame
      src={project.image}
      alt={project.imageAlt}
      width={project.imageWidth}
      height={project.imageHeight}
      address={project.url ? new URL(project.url).hostname.replace("www.", "") : undefined}
      sizes="(min-width: 1472px) 1344px, 94vw"
      priority
    />
  );
}

function ProjectLinks({ project, t }) {
  return (
    <div className="flex flex-wrap items-center gap-2.5 md:gap-3">
      {project.download && (
        <a href={project.download.url} download data-magnetic className="btn btn-light w-full sm:w-auto">
          <FiDownload aria-hidden="true" /> {project.download.label}
          <span className="font-normal opacity-70">{project.download.detail}</span>
        </a>
      )}
      {project.url && (
        <a href={project.url} target="_blank" rel="noopener noreferrer" data-magnetic className="btn btn-light flex-1 sm:flex-none">
          {project.urlLabel} <FiArrowUpRight className="rtl:-scale-x-100" aria-hidden="true" />
        </a>
      )}
      {project.repo && (
        <a href={project.repo} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light flex-1 sm:flex-none">
          <FiGithub aria-hidden="true" /> {t.project.sourceCode}
        </a>
      )}
    </div>
  );
}

function Gallery({ project, t }) {
  if (project.gallery[0].kind === "browser") {
    return (
      <div className="grid gap-8 md:grid-cols-2">
        {project.gallery.map((shot) => (
          <figure key={shot.src} data-reveal className="m-0">
            <BrowserFrame src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} sizes="(min-width: 768px) 46vw, 92vw" />
            <figcaption className="mt-3 text-sm text-muted">{shot.caption}</figcaption>
          </figure>
        ))}
      </div>
    );
  }

  const Frame = project.gallery[0].kind === "phone" ? PhoneFrame : PanelFrame;
  return (
    <div
      data-stagger
      tabIndex={0}
      role="region"
      aria-label={fmt(t.project.screens, { title: project.title })}
      className="gallery-rail -mx-[clamp(1.25rem,4vw,3.5rem)] flex snap-x gap-4 overflow-x-auto px-[clamp(1.25rem,4vw,3.5rem)] pb-5 md:gap-5"
    >
      {project.gallery.map((shot) => (
        <figure key={shot.src} className="m-0 w-[13.5rem] shrink-0 snap-center md:w-64">
          <Frame src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} sizes="(min-width: 768px) 16rem, 13.5rem" />
          <figcaption className="mt-3 text-sm text-muted">{shot.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}

export default async function ProjectDetails({ params }) {
  const { locale, id } = await params;
  if (!isLocale(locale)) notFound();

  const projects = getProjects(locale);
  const index = projects.findIndex((item) => item.id === id);
  if (index === -1) notFound();

  const t = getDictionary(locale);
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <JsonLd
        data={[
          projectSchema(project, locale),
          breadcrumbSchema([
            { name: t.nav.work, path: localizePath(locale) },
            { name: project.title, path: localizePath(locale, `/projects/${project.id}`) },
          ]),
        ]}
      />
      <Header />
      <main id="main">
        <section
          className="relative overflow-hidden pb-12 pt-24 text-white md:pb-20 md:pt-40"
          style={{ background: `radial-gradient(110% 110% at 100% 0%, ${project.tint ?? "#2a2d38"}, ${project.tintDeep ?? "#13151b"} 62%)` }}
        >
          <div className="shell">
            <Link href={localizePath(locale, "/#work")} className="group inline-flex items-center gap-2 py-2 text-sm text-white/80 hover:text-white">
              <FiArrowLeft className="transition-transform group-hover:-translate-x-1 rtl:-scale-x-100 rtl:group-hover:translate-x-1" aria-hidden="true" />{" "}
              {t.project.allWork}
            </Link>
            <p className="mt-6 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-white/70 md:mt-8">{project.category}</p>
            <h1
              lang={project.titleLang ?? "en"}
              className="hero-fade mt-2.5 font-display text-[clamp(2.75rem,1rem+8vw,6.5rem)] font-extrabold leading-[1] tracking-[-0.03em] text-balance md:mt-3"
            >
              {project.title}
            </h1>
            <p className="mt-4 max-w-3xl text-pretty text-lg leading-relaxed text-white/90 md:mt-5 md:text-2xl">{project.tagline}</p>
            <div id="project-links" className="mt-7 md:mt-8">
              <ProjectLinks project={project} t={t} />
              {project.download && <p className="mt-3.5 max-w-md text-[0.8125rem] leading-relaxed text-white/75 md:mt-4 md:text-sm">{t.project.androidNote}</p>}
            </div>
            <div className="mt-10 md:mt-16">
              <HeroVisual project={project} />
            </div>
          </div>
        </section>

        <section className="section-y-sm">
          <div className="shell grid gap-8 lg:grid-cols-12 lg:gap-10">
            <dl className="grid grid-cols-2 content-start gap-x-5 gap-y-4 sm:grid-cols-3 lg:col-span-4 lg:grid-cols-1 lg:gap-5">
              <div>
                <dt className="eyebrow mb-1">{t.project.role}</dt>
                <dd className="text-[0.95rem] md:text-base">{project.role}</dd>
              </div>
              <div>
                <dt className="eyebrow mb-1">{t.project.platform}</dt>
                <dd className="text-[0.95rem] md:text-base">{project.platform}</dd>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <dt className="eyebrow mb-1">{t.project.type}</dt>
                <dd className="text-[0.95rem] md:text-base">{project.category}</dd>
              </div>
            </dl>
            <div className="lg:col-span-8">
              <h2 className="eyebrow mb-3 md:mb-4">{t.project.overview}</h2>
              <p className="text-pretty font-display text-xl font-medium leading-snug tracking-tight md:text-3xl lg:text-[2.1rem]">{project.summary}</p>
              <p className="lead mt-5 max-w-2xl md:mt-6">{project.context}</p>
              {project.technologies && (
                <>
                  <h2 className="eyebrow mb-3 mt-8 md:mt-10">{t.project.builtWith}</h2>
                  <ul data-stagger className="flex flex-wrap gap-1.5 md:gap-2">
                    {project.technologies.map((technology) => (
                      <li key={technology} className="tag">
                        {technology}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </section>

        {project.highlights && (
          <section className="section-y-sm border-t border-line">
            <div className="shell">
              <h2 data-words className="section-title mb-8 md:mb-14"><SplitWords text={t.project.whatItDoes} /></h2>
              <ol data-stagger className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 md:rounded-3xl lg:grid-cols-3">
                {project.highlights.map((item, position) => (
                  <li key={item.title} data-spotlight className="bg-bg p-5 md:p-7">
                    <p className="font-mono text-xs text-muted">0{position + 1}</p>
                    <h3 className="mt-4 font-display text-xl font-semibold tracking-tight md:mt-6 md:text-2xl">{item.title}</h3>
                    <p className="mt-2 text-pretty text-[0.95rem] leading-relaxed text-ink-soft md:text-base">{item.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {project.gallery && (
          <section className="section-y-sm overflow-hidden border-t border-line">
            <div className="shell">
              <h2 data-words className="section-title mb-8 md:mb-14"><SplitWords text={t.project.inside} /></h2>
              <Gallery project={project} t={t} />
            </div>
          </section>
        )}

        {project.engineering && (
          <section className="section-y-sm border-t border-line">
            <div className="shell grid gap-8 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-4">
                <h2 data-words className="section-title lg:sticky lg:top-28"><SplitWords text={t.project.howBuilt} /></h2>
              </div>
              <ul data-stagger className="border-t border-line lg:col-span-8">
                {project.engineering.map((item) => (
                  <li key={item.title} className="border-b border-line py-5 md:py-6">
                    <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">{item.title}</h3>
                    <p className="mt-2 max-w-2xl text-pretty text-[0.95rem] leading-relaxed text-ink-soft md:text-base">{item.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section className="border-t border-line">
          <Link href={localizePath(locale, `/projects/${next.id}`)} className="shell group block section-y-sm">
            <p className="eyebrow mb-3 md:mb-4">{t.project.next}</p>
            <p className="flex items-center justify-between gap-6 font-display text-[clamp(2rem,1rem+6vw,5.5rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">
              <span lang={next.titleLang ?? "en"} className="transition-colors group-hover:text-accent">
                {next.title}
              </span>
              <FiArrowUpRight
                className="size-[0.7em] shrink-0 transition-transform duration-500 ease-out-expo group-hover:-translate-y-2 group-hover:translate-x-2 rtl:-scale-x-100 rtl:group-hover:-translate-x-2"
                aria-hidden="true"
              />
            </p>
          </Link>
        </section>
      </main>
      <Footer locale={locale} t={t} />
      {(project.download || project.url) && (
        <StickyCta
          targetId="project-links"
          href={project.download ? project.download.url : project.url}
          label={project.download ? project.download.label : project.urlLabel}
          detail={project.download?.detail}
          download={Boolean(project.download)}
        />
      )}
    </>
  );
}
