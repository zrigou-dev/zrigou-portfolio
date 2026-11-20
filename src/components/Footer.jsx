import Link from "next/link";
import LocalTime from "@/components/LocalTime";
import { navLinks, site } from "@/data/site";
import { localizePath } from "@/i18n/config";

export default function Footer({ locale, t }) {
  return (
    <footer className="overflow-hidden border-t border-line pt-10 md:pt-14">
      <div className="shell">
        <div className="relative z-40 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 sm:gap-10">
          <div className="col-span-2 sm:col-span-1">
            <p className="eyebrow mb-3">{t.footer.basedIn}</p>
            <p className="leading-relaxed text-ink-soft">
              {t.common.city}, {t.common.country}
              <br />
              {t.footer.localTime} <LocalTime />
            </p>
          </div>
          <nav aria-label="Footer">
            <p className="eyebrow mb-3">{t.footer.navigate}</p>
            <ul className="grid gap-y-0.5">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <Link href={localizePath(locale, link.href)} className="link-underline inline-block py-1 text-ink-soft hover:text-ink">
                    {t.nav[link.id]}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={localizePath(locale, "/games")} className="link-underline inline-block py-1 text-ink-soft hover:text-ink">
                  {t.nav.play}
                </Link>
              </li>
            </ul>
          </nav>
          <div>
            <p className="eyebrow mb-3">{t.footer.elsewhere}</p>
            <ul className="space-y-1">
              <li>
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="link-underline inline-block py-1 text-ink-soft hover:text-ink">
                  {t.contact.linkedin}
                </a>
              </li>
              <li>
                <a href={site.github} target="_blank" rel="noopener noreferrer" className="link-underline inline-block py-1 text-ink-soft hover:text-ink">
                  {t.contact.github}
                </a>
              </li>
              <li>
                <a href={site.cv} download={site.cvFilename} className="link-underline inline-block py-1 text-ink-soft hover:text-ink">
                  {t.common.downloadCv}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-10 flex flex-wrap justify-between gap-x-4 gap-y-1 text-xs text-muted md:mt-12 md:text-sm">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span>{t.footer.built}</span>
        </p>
      </div>
      <div aria-hidden="true" className="footer-wordmark" />
    </footer>
  );
}
