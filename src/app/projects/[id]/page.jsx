import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiArrowUpRight, FiDownload, FiGithub } from "react-icons/fi";
import { BrowserFrame, PanelFrame, PhoneFrame } from "@/components/Devices";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { breadcrumbSchema, projectSchema } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const project = projects.find((item) => item.id === id);
  if (!project) return {};

  const title = `${project.title}: ${project.category}`;
  const url = `/projects/${project.id}`;
  return {
    title,
    description: project.description,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title: `${title} | ${site.name}`, description: project.description },
    twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description: project.description },
  };
}

function HeroVisual({ project }) {
  if (project.id === "masroufi") {
    return (
      <div className="mx-auto flex max-w-3xl justify-center gap-3 sm:gap-6">
        <PhoneFrame src={project.gallery[0].src} alt={project.gallery[0].alt} sizes="30vw" className="mt-[8%] w-[31%]" />
        <PhoneFrame src={project.image} alt={project.imageAlt} sizes="34vw" priority className="z-10 w-[35%]" />
        <PhoneFrame src="/images/projects/masroufi/ar-home.webp" alt="Masroufi home screen in Arabic" sizes="30vw" className="mt-[8%] w-[31%]" />
      </div>
    );
  }
  if (project.id === "inspectra") {
    return (
      <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:gap-6">
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

function ProjectLinks({ project }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {project.download && (
        <a href={project.download.url} download className="btn btn-light">
          <FiDownload aria-hidden="true" /> {project.download.label}
          <span className="font-normal opacity-70">{project.download.detail}</span>
        </a>
      )}
      {project.url && (
        <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn btn-light">
          {project.urlLabel} <FiArrowUpRight aria-hidden="true" />
        </a>
      )}
      {project.repo && (
        <a href={project.repo} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light">
          <FiGithub aria-hidden="true" /> Source code
        </a>
      )}
    </div>
  );
}

function Gallery({ project }) {
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
      tabIndex={0}
      role="region"
      aria-label={`${project.title} screens`}
      className="gallery-rail -mx-[clamp(1.25rem,4vw,3.5rem)] flex snap-x gap-5 overflow-x-auto px-[clamp(1.25rem,4vw,3.5rem)] pb-5"
    >
      {project.gallery.map((shot) => (
        <figure key={shot.src} className="m-0 w-[15.5rem] shrink-0 snap-center md:w-72">
          <Frame src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} sizes="(min-width: 768px) 18rem, 15.5rem" />
          <figcaption className="mt-3 text-sm text-muted">{shot.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}

export default async function ProjectDetails({ params }) {
  const { id } = await params;
  const index = projects.findIndex((item) => item.id === id);
  if (index === -1) notFound();

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <JsonLd
        data={[
          projectSchema(project),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: project.title, path: `/projects/${project.id}` },
          ]),
        ]}
      />
      <Header />
      <main id="main">
        <section
          className="relative overflow-hidden pb-14 pt-32 text-white md:pb-20 md:pt-40"
          style={{ background: `radial-gradient(110% 110% at 100% 0%, ${project.tint ?? "#2a2d38"}, ${project.tintDeep ?? "#13151b"} 62%)` }}
        >
          <div className="shell">
            <Link href="/#work" className="group inline-flex items-center gap-2 py-2 text-sm text-white/80 hover:text-white">
              <FiArrowLeft className="transition-transform group-hover:-translate-x-1" aria-hidden="true" /> All work
            </Link>
            <p className="mt-8 font-mono text-xs uppercase tracking-[0.08em] text-white/70">{project.category}</p>
            <h1 className="hero-fade mt-3 font-display text-[clamp(3rem,9.5vw,8.5rem)] font-extrabold leading-[0.98] tracking-[-0.02em] text-balance">
              {project.title}
            </h1>
            <p className="mt-5 max-w-3xl text-pretty text-xl leading-relaxed text-white/90 md:text-2xl">{project.tagline}</p>
            <div className="mt-8">
              <ProjectLinks project={project} />
              {project.download && (
                <p className="mt-4 max-w-md text-sm leading-relaxed text-white/75">
                  Android only. When you open the file, Android asks you to allow installs from this source.
                </p>
              )}
            </div>
            <div className="mt-12 md:mt-16">
              <HeroVisual project={project} />
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="shell grid gap-10 lg:grid-cols-12">
            <dl className="grid content-start gap-5 sm:grid-cols-3 lg:col-span-4 lg:grid-cols-1">
              <div>
                <dt className="eyebrow mb-1">Role</dt>
                <dd>{project.role}</dd>
              </div>
              <div>
                <dt className="eyebrow mb-1">Platform</dt>
                <dd>{project.platform}</dd>
              </div>
              <div>
                <dt className="eyebrow mb-1">Type</dt>
                <dd>{project.category}</dd>
              </div>
            </dl>
            <div className="lg:col-span-8">
              <h2 className="eyebrow mb-4">Overview</h2>
              <p className="text-pretty font-display text-2xl font-medium leading-snug tracking-tight md:text-4xl">{project.summary}</p>
              <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink-soft">{project.context}</p>
              {project.technologies && (
                <>
                  <h2 className="eyebrow mb-3 mt-10">Built with</h2>
                  <ul className="flex flex-wrap gap-2">
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
          <section className="border-t border-line py-16 md:py-24">
            <div className="shell">
              <h2 data-reveal className="section-title mb-10 md:mb-14">What it does</h2>
              <ol className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
                {project.highlights.map((item, position) => (
                  <li key={item.title} className="bg-bg p-6 md:p-8">
                    <p className="font-mono text-xs text-muted">0{position + 1}</p>
                    <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight">{item.title}</h3>
                    <p className="mt-2 text-pretty leading-relaxed text-ink-soft">{item.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {project.gallery && (
          <section className="overflow-hidden border-t border-line py-16 md:py-24">
            <div className="shell">
              <h2 data-reveal className="section-title mb-10 md:mb-14">Inside the product</h2>
              <Gallery project={project} />
            </div>
          </section>
        )}

        {project.engineering && (
          <section className="border-t border-line py-16 md:py-24">
            <div className="shell grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <h2 data-reveal className="section-title lg:sticky lg:top-28">How it is built</h2>
              </div>
              <ul className="border-t border-line lg:col-span-8">
                {project.engineering.map((item) => (
                  <li key={item.title} data-reveal className="border-b border-line py-6">
                    <h3 className="font-display text-2xl font-semibold tracking-tight">{item.title}</h3>
                    <p className="mt-2 max-w-2xl text-pretty leading-relaxed text-ink-soft">{item.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section className="border-t border-line">
          <Link href={`/projects/${next.id}`} className="shell group block py-16 md:py-24">
            <p className="eyebrow mb-4">Next project</p>
            <p className="flex items-center justify-between gap-6 font-display text-[clamp(2.5rem,8vw,7.5rem)] font-extrabold leading-none tracking-[-0.02em]">
              <span className="transition-colors group-hover:text-accent">{next.title}</span>
              <FiArrowUpRight className="size-[0.8em] shrink-0 transition-transform duration-500 ease-out-expo group-hover:-translate-y-2 group-hover:translate-x-2" aria-hidden="true" />
            </p>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
