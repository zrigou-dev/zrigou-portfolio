import Link from "next/link";
import LocalTime from "@/components/LocalTime";
import { navLinks, site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="overflow-hidden border-t border-line pt-14">
      <div className="shell">
        <div className="grid gap-10 sm:grid-cols-3 relative z-40">
          <div>
            <p className="eyebrow mb-3">Based in</p>
            <p className="leading-relaxed text-ink-soft">
              {site.city}, {site.country}
              <br />
              Local time <LocalTime />
            </p>
          </div>
          <nav aria-label="Footer">
            <p className="eyebrow mb-3">Navigate</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-1">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <Link href={link.href} className="link-underline inline-block py-1 text-ink-soft hover:text-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/games" className="link-underline inline-block py-1 text-ink-soft hover:text-ink">
                  Play
                </Link>
              </li>
            </ul>
          </nav>
          <div>
            <p className="eyebrow mb-3">Elsewhere</p>
            <ul className="space-y-1">
              <li>
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="link-underline inline-block py-1 text-ink-soft hover:text-ink">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={site.github} target="_blank" rel="noopener noreferrer" className="link-underline inline-block py-1 text-ink-soft hover:text-ink">
                  GitHub
                </a>
              </li>
              <li>
                <a href={site.cv} download={site.cvFilename} className="link-underline inline-block py-1 text-ink-soft hover:text-ink">
                  Download CV
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-12 flex flex-wrap justify-between gap-2 text-sm text-muted">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span>Built with Next.js and Tailwind CSS</span>
        </p>
      </div>
      <div aria-hidden="true" className="footer-wordmark" />
    </footer>
  );
}
