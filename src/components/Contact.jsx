import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { FiArrowUpRight, FiPhone } from "react-icons/fi";
import CopyEmail from "@/components/CopyEmail";
import { SplitWords } from "@/components/Split";
import { FiDownload } from "react-icons/fi";
import { site } from "@/data/site";

export default function Contact({ t }) {
  const channels = [
    { label: t.contact.whatsapp, detail: site.phoneDisplay, href: site.whatsapp, Icon: FaWhatsapp, external: true },
    { label: t.contact.phone, detail: site.phoneDisplay, href: `tel:${site.phone}`, Icon: FiPhone },
    { label: t.contact.linkedin, detail: "mohamed-zrigou", href: site.linkedin, Icon: FaLinkedinIn, external: true },
    { label: t.contact.github, detail: "zrigou-dev", href: site.github, Icon: FaGithub, external: true },
  ];

  return (
    <section id="contact" className="border-t border-line section-y pb-12 md:pb-16">
      <div className="shell">
        <p className="eyebrow mb-4 md:mb-6">{t.contact.eyebrow}</p>
        <h2 data-words className="font-display text-[clamp(2.5rem,1rem+8vw,7.5rem)] font-extrabold leading-[0.98] tracking-[-0.03em]">
          <SplitWords text={t.contact.title1} /> <span className="block text-accent"><SplitWords text={t.contact.title2} start={4} /></span>
        </h2>

        <div className="mt-8 grid gap-8 md:mt-12 md:gap-10 lg:grid-cols-12">
          <div data-reveal className="lg:col-span-6">
            <p className="lead max-w-lg">{t.contact.text}</p>
            <div className="mt-5 flex items-center gap-2.5 md:mt-6 md:gap-3">
              <a href={`mailto:${site.email}`} data-magnetic className="btn btn-primary min-w-0 flex-1 sm:flex-none">
                <span dir="ltr" className="truncate">{site.email}</span>
              </a>
              <CopyEmail />
            </div>
            <a href={site.cv} download={site.cvFilename} className="btn btn-ghost mt-3 w-full sm:w-auto">
              <FiDownload aria-hidden="true" /> {t.common.downloadCv}
            </a>
          </div>

          <ul data-stagger className="border-t border-line lg:col-span-5 lg:col-start-8">
            {channels.map(({ label, detail, href, Icon, external }) => (
              <li key={label} className="border-b border-line">
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex min-h-14 items-center gap-4 py-3.5 transition-[padding] duration-300 hover:ps-2"
                >
                  <Icon className="size-5 text-muted transition-colors group-hover:text-accent" aria-hidden="true" />
                  <span className="font-medium">{label}</span>
                  <span dir="ltr" className="ms-auto truncate text-sm text-muted">{detail}</span>
                  <FiArrowUpRight className="size-4 shrink-0 text-muted rtl:-scale-x-100" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
