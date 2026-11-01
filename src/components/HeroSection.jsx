import Link from "next/link";
import { FiArrowDown, FiArrowUpRight } from "react-icons/fi";
import ZelligeCanvas from "@/components/ZelligeCanvas";
import { flagshipProjects } from "@/data/projects";
import { site } from "@/data/site";

export default function HeroSection() {
  return (
    <section className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden pt-28">
      <ZelligeCanvas />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-bg from-45% to-transparent lg:h-2/3 lg:from-20%" />

      <div className="shell relative pb-8 md:pb-10">
        <div className="hero-fade mb-6 flex flex-wrap items-center gap-x-6 gap-y-2" style={{ "--i": 0 }}>
          <p className="flex items-center gap-2.5 rounded-full border border-line bg-bg/70 px-3.5 py-1.5 text-sm font-medium backdrop-blur">
            <span className="status-dot size-2 rounded-full bg-zellige" aria-hidden="true" />
            Open to new projects
          </p>
          <p className="eyebrow">
            {site.city}, {site.country}
          </p>
        </div>

        <h1 className="font-display text-[clamp(4rem,min(16.6vw,25svh),17rem)] font-extrabold leading-[0.9] tracking-[-0.022em]">
          <span className="hero-line" style={{ "--i": 0 }}>
            <span>Mohamed</span>
          </span>
          <span className="hero-line" style={{ "--i": 1 }}>
            <span className="text-right">Zrigou</span>
          </span>
          <span className="sr-only">, full-stack web and mobile developer in {site.city}, {site.country}</span>
        </h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="hero-fade lg:col-span-7" style={{ "--i": 2 }}>
            <p className="max-w-2xl text-pretty text-lg leading-relaxed text-ink-soft md:text-xl">
              Full-stack developer with 5+ years building web and mobile products in React, Next.js and React Native.
              I founded a clinic SaaS, built a private finance app, and work on platforms for SNCF, BARNES and a
              Moroccan ministry.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="#work" className="btn btn-primary">
                See the work <FiArrowDown aria-hidden="true" />
              </Link>
              <Link href="#contact" className="btn btn-ghost bg-bg/60 backdrop-blur">
                Get in touch
              </Link>
            </div>
          </div>

          <div className="hero-fade lg:col-span-5" style={{ "--i": 3 }}>
            <p className="eyebrow mb-2">Products I built</p>
            <ul className="divide-y divide-line border-y border-line">
              {flagshipProjects.map((project) => (
                <li key={project.id}>
                  <Link
                    href={`/projects/${project.id}`}
                    className="group flex items-center justify-between gap-4 py-2.5 transition-[padding] duration-300 hover:pl-2"
                  >
                    <span className="font-medium">{project.title}</span>
                    <span className="flex items-center gap-2 text-sm text-muted transition-colors group-hover:text-ink">
                      {project.category}
                      <FiArrowUpRight aria-hidden="true" />
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
