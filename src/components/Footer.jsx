import Link from "next/link";
import LocalTime from "@/components/LocalTime";
import { navLinks, site } from "@/data/site";
import { localizePath } from "@/i18n/config";

const linkClass = "link-underline inline-block py-1 text-sm text-ink-soft hover:text-ink";

// Deliberately compact: the whole footer fits in one short block so the page ends where the content ends.
export default function Footer({ locale, t }) {
  return (
    <footer className="border-t border-line pt-8 pb-[max(0.875rem,env(safe-area-inset-bottom))] md:pt-10">
      <div className="shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-10">
          <div>
            <p lang="en" className="font-display text-xl font-bold tracking-tight">Zrigou</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              {t.common.city}, {t.common.country} · {t.footer.localTime} <LocalTime />
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-5 gap-y-0.5 md:justify-end">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <Link href={localizePath(locale, link.href)} className={linkClass}>
                    {t.nav[link.id]}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={localizePath(locale, "/games")} className={linkClass}>
                  {t.nav.play}
                </Link>
              </li>
              <li>
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {t.contact.linkedin}
                </a>
              </li>
              <li>
                <a href={site.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {t.contact.github}
                </a>
              </li>
              <li>
                <a href={site.cv} download={site.cvFilename} className={linkClass}>
                  {t.common.downloadCv}
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <p className="mt-6 flex flex-wrap justify-between gap-x-4 gap-y-1 border-t border-line pt-4 text-xs text-muted">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span>{t.footer.built}</span>
        </p>
      </div>
    </footer>
  );
}
