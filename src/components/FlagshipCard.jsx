import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { BrowserFrame, PanelFrame, PhoneFrame } from "@/components/Devices";

const dir = "/images/projects";

function ClinolyVisual() {
  return (
    <div className="flagship-visual relative mx-auto w-[108%] max-w-[46rem] pb-10 lg:pb-0">
      <BrowserFrame
        src={`${dir}/clinoly/dashboard.webp`}
        alt="Clinoly dashboard with today's patients, upcoming appointments and quick actions"
        address="clinoly.com"
        sizes="(min-width: 1024px) 46vw, 96vw"
        className="lift-a"
      />
      <PhoneFrame
        src={`${dir}/clinoly/mobile-waiting-room.webp`}
        alt="Clinoly waiting room on a phone"
        sizes="(min-width: 1024px) 14vw, 26vw"
        className="lift-b absolute -bottom-2 right-[9%] w-[26%] lg:-bottom-16"
      />
    </div>
  );
}

function MasroufiVisual() {
  return (
    <div className="flagship-visual relative mx-auto flex max-w-[42rem] items-start justify-center gap-3 sm:gap-5">
      <PhoneFrame
        src={`${dir}/masroufi/en-reports.webp`}
        alt="Masroufi reports with cash flow and spending comparisons"
        sizes="(min-width: 1024px) 15vw, 30vw"
        className="lift-a mt-[9%] w-[31%]"
        style={{ transform: "rotate(-3deg)", "--r": "-3deg" }}
      />
      <PhoneFrame
        src={`${dir}/masroufi/ar-home.webp`}
        alt="Masroufi home screen in Arabic with a right-to-left layout"
        sizes="(min-width: 1024px) 17vw, 34vw"
        className="lift-b z-10 w-[35%]"
      />
      <PhoneFrame
        src={`${dir}/masroufi/en-dark-home.webp`}
        alt="Masroufi home screen in dark mode"
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
        alt="A website open in Chrome, ready to be audited"
        address="clinoly.com"
        sizes="(min-width: 1024px) 46vw, 96vw"
        className="lift-a"
      />
      <PanelFrame
        src={`${dir}/inspectra/panel.webp`}
        alt="Inspectra side panel with an overall score of 98 and Core Web Vitals"
        sizes="(min-width: 1024px) 16vw, 34vw"
        className="lift-b absolute -top-4 right-[7%] w-[33%] lg:w-[32%]"
      />
    </div>
  );
}

const VISUALS = { clinoly: ClinolyVisual, masroufi: MasroufiVisual, inspectra: InspectraVisual };

export default function FlagshipCard({ project, index }) {
  const Visual = VISUALS[project.id];

  return (
    <article
      style={{ "--n": index, background: `radial-gradient(120% 120% at 100% 0%, ${project.tint}, ${project.tintDeep} 62%)` }}
      className="flagship-card overflow-hidden rounded-[1.75rem] text-white"
    >
      <div className="grid min-h-[34rem] gap-10 p-6 sm:p-10 lg:grid-cols-12 lg:gap-6 lg:p-12">
        <div className="flex flex-col lg:col-span-5">
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-white/70">
            0{index + 1} / {project.category}
          </p>
          <h3 className="mt-5 font-display text-5xl font-bold tracking-[-0.015em] md:text-6xl lg:text-7xl">{project.title}</h3>
          <p className="mt-4 max-w-md text-pretty text-lg leading-relaxed text-white/85">{project.tagline}</p>

          <ul className="mt-6 space-y-2 text-[0.95rem] text-white/85">
            {project.keyPoints.map((point) => (
              <li key={point} className="flex gap-3">
                <span className="mt-[0.6em] h-px w-4 shrink-0 bg-white/60" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3 lg:mt-auto lg:pt-8">
            <Link href={`/projects/${project.id}`} className="btn btn-light" aria-label={`Read the ${project.title} case study`}>
              Case study <FiArrowUpRight aria-hidden="true" />
            </Link>
            {project.url && (
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light">
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
