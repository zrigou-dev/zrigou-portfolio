import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { FiArrowUpRight, FiPhone } from "react-icons/fi";
import CopyEmail from "@/components/CopyEmail";
import { site } from "@/data/site";

const channels = [
  { label: "WhatsApp", detail: site.phoneDisplay, href: site.whatsapp, Icon: FaWhatsapp, external: true },
  { label: "Phone", detail: site.phoneDisplay, href: `tel:${site.phone}`, Icon: FiPhone },
  { label: "LinkedIn", detail: "mohamed-zrigou", href: site.linkedin, Icon: FaLinkedinIn, external: true },
  { label: "GitHub", detail: "zrigou-dev", href: site.github, Icon: FaGithub, external: true },
];

export default function Contact() {
  return (
    <section id="contact" className="border-t border-line py-24 md:py-36">
      <div className="shell">
        <p className="eyebrow mb-6">Contact</p>
        <h2 data-reveal className="font-display text-[clamp(3rem,11vw,10.5rem)] font-extrabold leading-[0.95] tracking-[-0.02em]">
          Have a project? <span className="block text-accent">Let&apos;s talk.</span>
        </h2>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <div data-reveal className="lg:col-span-6">
            <p className="max-w-lg text-pretty text-lg leading-relaxed text-ink-soft">
              Tell me what you are building and where it needs to go. I work with teams and founders on web, mobile
              and browser products.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={`mailto:${site.email}`} className="btn btn-primary min-w-0 max-w-full">
                <span className="truncate">{site.email}</span>
              </a>
              <CopyEmail />
            </div>
          </div>

          <ul data-reveal style={{ "--d": 2 }} className="border-t border-line lg:col-span-5 lg:col-start-8">
            {channels.map(({ label, detail, href, Icon, external }) => (
              <li key={label} className="border-b border-line">
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-4 py-4 transition-[padding] duration-300 hover:pl-2"
                >
                  <Icon className="size-5 text-muted transition-colors group-hover:text-accent" aria-hidden="true" />
                  <span className="font-medium">{label}</span>
                  <span className="ml-auto truncate text-sm text-muted">{detail}</span>
                  <FiArrowUpRight className="size-4 shrink-0 text-muted" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
