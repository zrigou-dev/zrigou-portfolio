import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { BrowserFrame, PanelFrame, PhoneFrame } from "@/components/Devices";
import { localizePath } from "@/i18n/config";
import { fmt } from "@/i18n/format";

const dir = "/images/projects";

function ClinolyVisual() {
  return (
    <div className="flagship-visual relative mx-auto w-[108%] max-w-[46rem] pb-10 lg:pb-0">
      <BrowserFrame
        src={`${dir}/clinoly/dashboard.webp`}
        alt=""
        address="clinoly.com"
        sizes="(min-width: 1024px) 46vw, 96vw"
        className="lift-a"
      />
      <PhoneFrame
        src={`${dir}/clinoly/mobile-waiting-room.webp`}
        alt=""
        sizes="(min-width: 1024px) 14vw, 26vw"
        className="lift-b absolute -bottom-2 end-[9%] w-[26%] lg:-bottom-16"
      />
    </div>
  );
}

function MasroufiVisual() {
  return (
    <div className="flagship-visual relative mx-auto flex max-w-[42rem] items-start justify-center gap-3 sm:gap-5">
      <PhoneFrame
        src={`${dir}/masroufi/en-reports.webp`}
        alt=""
        sizes="(min-width: 1024px) 15vw, 30vw"
        className="lift-a mt-[9%] w-[31%]"
        style={{ transform: "rotate(-3deg)", "--r": "-3deg" }}
      />
      <PhoneFrame
        src={`${dir}/masroufi/ar-home.webp`}
        alt=""
        sizes="(min-width: 1024px) 17vw, 34vw"
        className="lift-b z-10 w-[35%]"
      />
      <PhoneFrame
        src={`${dir}/masroufi/en-dark-home.webp`}
        alt=""
        sizes="(min-width: 1024px) 15vw, 30vw"
        className="lift-a mt-[9%] w-[31%]"
        style={{ transform: "rotate(3deg)", "--r": "3deg" }}
      />
    </div>
  );
}

function SakinaVisual() {
  return (
    <div className="flagship-visual relative mx-auto flex max-w-[42rem] items-start justify-center gap-3 sm:gap-5">
      <PhoneFrame
        src={`${dir}/sakina/prayer-ar.webp`}
        alt=""
        sizes="(min-width: 1024px) 15vw, 30vw"
        className="lift-a mt-[9%] w-[31%]"
        style={{ transform: "rotate(-3deg)", "--r": "-3deg" }}
      />
      <PhoneFrame
        src={`${dir}/sakina/home-en.webp`}
        alt=""
        sizes="(min-width: 1024px) 17vw, 34vw"
        className="lift-b z-10 w-[35%]"
      />
      <PhoneFrame
        src={`${dir}/sakina/dark-prayer.webp`}
        alt=""
        sizes="(min-width: 1024px) 15vw, 30vw"
        className="lift-a mt-[9%] w-[31%]"
        style={{ transform: "rotate(3deg)", "--r": "3deg" }}
      />
    </div>
  );
}

function InspectraVisual() {
  return (
    <div className="flagship-visual relative mx-auto w-[108%] max-w-[46rem] pb-6 lg:pb-0">
      <BrowserFrame
        src={`${dir}/clinoly/landing.webp`}
        alt=""
        address="clinoly.com"
        sizes="(min-width: 1024px) 46vw, 96vw"
        className="lift-a"
      />
      <PanelFrame
        src={`${dir}/inspectra/panel.webp`}
        alt=""
        sizes="(min-width: 1024px) 16vw, 34vw"
        className="lift-b absolute -top-4 end-[7%] w-[33%] lg:w-[32%]"
      />
    </div>
  );
}

const VISUALS = { clinoly: ClinolyVisual, masroufi: MasroufiVisual, sakina: SakinaVisual, inspectra: InspectraVisual };

export default function FlagshipCard({ project, index, locale, t }) {
  const Visual = VISUALS[project.id];

  return (
    <article
      style={{ "--n": index, background: `radial-gradient(120% 120% at 100% 0%, ${project.tint}, ${project.tintDeep} 62%)` }}
      className="flagship-card overflow-hidden rounded-[1.5rem] text-white shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08)] md:rounded-[1.75rem]"
    >
      <div className="grid gap-8 p-5 sm:p-8 lg:min-h-[34rem] lg:grid-cols-12 lg:gap-6 lg:p-12">
        <div className="flex flex-col lg:col-span-5">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-white/70">
            0{index + 1} / {project.category}
          </p>
          <h3 lang="en" className="mt-3 font-display text-[2.5rem] font-bold leading-none tracking-[-0.03em] md:mt-5 md:text-5xl lg:text-6xl">{project.title}</h3>
          <p className="mt-3 max-w-md text-pretty text-base leading-relaxed text-white/85 md:mt-4 md:text-lg">{project.tagline}</p>

          <ul className="mt-5 space-y-1.5 text-[0.875rem] leading-snug text-white/85 md:mt-6 md:space-y-2 md:text-[0.95rem]">
            {project.keyPoints.map((point) => (
              <li key={point} className="flex gap-3">
                <span className="mt-[0.6em] h-px w-4 shrink-0 bg-white/60" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-2.5 md:mt-8 md:gap-3 lg:mt-auto lg:pt-8">
            <Link href={localizePath(locale, `/projects/${project.id}`)} className="btn btn-light flex-1 sm:flex-none" aria-label={fmt(t.portfolio.readCaseStudy, { title: project.title })}>
              {t.portfolio.caseStudy} <FiArrowUpRight className="rtl:-scale-x-100" aria-hidden="true" />
            </Link>
            {project.url && (
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light flex-1 sm:flex-none">
                {project.urlLabel}
              </a>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center lg:col-span-7">
          <Visual />
        </div>
      </div>
    </article>
  );
}
