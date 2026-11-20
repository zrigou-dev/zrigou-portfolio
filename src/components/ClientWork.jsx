"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { localizePath } from "@/i18n/config";
import { useI18n } from "@/i18n/I18nProvider";

// Desktop rows show a preview that trails the cursor. Touch screens get the thumbnail inline instead.
export default function ClientWork({ projects: clientProjects }) {
  const { locale } = useI18n();
  const previewRef = useRef(null);
  const [activeId, setActiveId] = useState(null);

  const movePreview = (event) => {
    const preview = previewRef.current;
    if (!preview) return;
    const y = Math.min(event.clientY - 110, window.innerHeight - 280);
    const x = Math.min(event.clientX + 28, window.innerWidth - 440);
    preview.style.transform = `translate3d(${x}px, ${Math.max(y, 90)}px, 0)`;
  };

  return (
    <div onPointerMove={movePreview} onPointerLeave={() => setActiveId(null)}>
      <ul className="border-t border-line">
        {clientProjects.map((project) => (
          <li key={project.id} className="border-b border-line" onPointerEnter={() => setActiveId(project.id)}>
            <Link
              href={localizePath(locale, `/projects/${project.id}`)}
              className="group grid grid-cols-[5rem_1fr_auto] items-center gap-3.5 py-3.5 md:grid-cols-12 md:gap-6 md:py-6"
            >
              <span className="relative block aspect-[16/10] overflow-hidden rounded-lg border border-line md:hidden">
                <Image src={project.image} alt="" fill sizes="80px" className="object-cover object-top" />
              </span>
              <span className="min-w-0 md:col-span-6">
                <span lang={project.titleLang ?? "en"} className="block font-display text-[1.05rem] font-semibold leading-snug tracking-tight transition-transform duration-500 ease-out-expo group-hover:md:translate-x-3 rtl:group-hover:md:-translate-x-3 md:text-3xl">
                  {project.title}
                </span>
                <span className="mt-0.5 block text-sm text-muted md:hidden">{project.category}</span>
              </span>
              <span className="hidden text-sm text-muted md:col-span-2 md:block">{project.category}</span>
              <span className="hidden truncate font-mono text-xs text-muted md:col-span-3 md:block">
                {project.technologies?.slice(0, 3).join(" · ")}
              </span>
              <FiArrowUpRight
                className="size-5 justify-self-end text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </li>
        ))}
      </ul>

      <div ref={previewRef} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-40 hidden [@media(hover:hover)]:lg:block">
        <div
          className={`relative h-[16rem] w-[25rem] overflow-hidden rounded-xl border border-line-strong shadow-2xl transition-[opacity,transform] duration-300 ${
            activeId ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          {clientProjects.map((project) =>
            activeId === project.id ? (
              <Image key={project.id} src={project.image} alt="" fill sizes="400px" className="object-cover object-top" />
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}
