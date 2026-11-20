import { site } from "@/data/site";
import { FiDownload, FiMail } from "react-icons/fi";

export default function About({ t }) {
  const words = t.about.statement.split(" ");

  return (
    <section id="about" className="border-t border-line section-y">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <p className="eyebrow mb-5 md:mb-8">{t.about.eyebrow}</p>
          <p className="statement font-display text-[clamp(1.5rem,1rem+2vw,2.75rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
            {words.map((word, index) => (
              <span key={`${word}-${index}`} className="reveal-word" style={{ "--p": index / words.length }}>
                {word}{" "}
              </span>
            ))}
          </p>
        </div>

        {/* The thirty-second read: everything a recruiter needs before deciding to look closer. */}
        <aside data-reveal className="lg:col-span-5 lg:self-start">
          <div data-spotlight className="overflow-hidden rounded-2xl border border-line bg-surface/60 p-5 md:p-7 lg:sticky lg:top-28">
            <h3 className="eyebrow mb-3 md:mb-4">{t.about.glanceTitle}</h3>
            <dl className="divide-y divide-line">
              {t.about.glance.map((row) => (
                <div key={row.label} className="grid gap-0.5 py-3 sm:grid-cols-[7.5rem_1fr] sm:gap-4">
                  <dt className="text-[0.8125rem] text-muted md:text-sm">{row.label}</dt>
                  <dd className="text-[0.95rem] leading-snug">{row.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 flex flex-wrap gap-2.5 md:mt-6">
              <a href={site.cv} download={site.cvFilename} data-magnetic className="btn btn-primary flex-1 sm:flex-none">
                <FiDownload aria-hidden="true" /> {t.common.downloadCv}
              </a>
              <a href={`mailto:${site.email}`} className="btn btn-ghost flex-1 sm:flex-none">
                <FiMail aria-hidden="true" /> {t.about.emailMe}
              </a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
