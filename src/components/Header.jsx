"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { FiArrowUpRight, FiDownload, FiMenu, FiX } from "react-icons/fi";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import { navLinks, site } from "@/data/site";
import { localizePath, stripLocale } from "@/i18n/config";
import { useI18n } from "@/i18n/I18nProvider";

export default function Header() {
  const { locale, t } = useI18n();
  const pathname = usePathname();
  const route = stripLocale(pathname);
  const isHome = route === "/";
  const links = [...navLinks.map((link) => ({ ...link, label: t.nav[link.id] })), { href: "/games", id: "games", label: t.nav.play }];
  const menuRef = useRef(null);
  const [activeId, setActiveId] = useState(null);
  const [tucked, setTucked] = useState(false);

  // Tucks away while reading down the page, returns as soon as you scroll up or reach the top.
  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const delta = y - last;
      if (y < 90 || delta < -6) setTucked(false);
      else if (delta > 6) setTucked(true);
      if (Math.abs(delta) > 6) last = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Highlights the section that crosses the middle of the viewport.
  useEffect(() => {
    if (!isHome) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    for (const link of navLinks) {
      const section = document.getElementById(link.id);
      if (section) observer.observe(section);
    }
    return () => {
      observer.disconnect();
      setActiveId(null);
    };
  }, [isHome]);

  const openMenu = () => menuRef.current?.showModal();
  const closeMenu = () => menuRef.current?.close();

  return (
    <header onFocusCapture={() => setTucked(false)} className="pointer-events-none fixed inset-x-0 top-0 z-50 p-2.5 sm:p-3">
      <div className={`site-header pointer-events-auto mx-auto flex max-w-[88rem] items-center justify-between gap-4 rounded-full border border-line bg-bg/80 py-1 ps-4 pe-1 shadow-[0_8px_30px_-12px_rgb(0_0_0/0.35)] backdrop-blur-xl sm:py-1.5 sm:ps-5 sm:pe-2 ${tucked ? "is-tucked" : ""}`}>
        <Logo />

        <nav aria-label={t.common.primaryNav} className="hidden items-center gap-0.5 lg:flex xl:gap-1">
          {links.map((link) => {
            const isActive = link.id === "games" ? route === "/games" : activeId === link.id;
            return (
              <Link
                key={link.id}
                href={localizePath(locale, link.href)}
                aria-current={isActive ? (link.id === "games" ? "page" : "true") : undefined}
                className={`rounded-full px-3.5 py-2.5 text-sm font-medium transition-colors xl:px-4 ${
                  isActive ? "bg-surface-2 text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1 sm:gap-1.5">
          <LanguageSwitcher />
          <ThemeToggle />
          <a
            href={site.cv}
            download={site.cvFilename}
            className="hidden min-h-11 items-center gap-2 whitespace-nowrap rounded-full bg-accent-fill px-5 text-sm font-semibold text-on-accent transition-transform duration-300 hover:-translate-y-0.5 sm:inline-flex lg:hidden xl:inline-flex"
          >
            <FiDownload aria-hidden="true" /> {t.common.downloadCv}
          </a>
          <button
            type="button"
            onClick={openMenu}
            aria-label={t.common.openMenu}
            aria-haspopup="dialog"
            className="grid size-11 place-items-center rounded-full bg-surface-2 transition-transform active:scale-95 lg:hidden"
          >
            <FiMenu className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div aria-hidden="true" className="scroll-progress fixed inset-x-0 top-0 h-0.5 bg-accent-fill" />

      <dialog
        ref={menuRef}
        aria-label={t.common.menu}
        onClick={(event) => {
          if (event.target === menuRef.current) closeMenu();
        }}
        className="menu-sheet pointer-events-auto m-0 h-dvh max-h-none w-full max-w-none bg-bg p-2.5 text-ink backdrop:bg-transparent"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between py-1 ps-4 pe-1">
            <Logo />
            <button
              type="button"
              onClick={closeMenu}
              aria-label={t.common.closeMenu}
              className="grid size-11 place-items-center rounded-full bg-surface-2 transition-transform active:scale-95"
            >
              <FiX className="size-5" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label={t.common.mobileNav} className="mt-6 flex-1 overflow-y-auto px-4">
            <ul className="border-t border-line">
              {links.map((link, index) => (
                <li key={link.id} className="menu-item border-b border-line" style={{ "--i": index }}>
                  <Link href={localizePath(locale, link.href)} onClick={closeMenu} className="group flex items-center gap-4 py-4 active:bg-surface/60">
                    <span className="w-6 font-mono text-xs text-muted">0{index + 1}</span>
                    <span className="font-display text-[1.75rem] font-semibold leading-none tracking-tight">{link.label}</span>
                    <FiArrowUpRight className="ms-auto size-5 text-muted rtl:-scale-x-100" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="menu-item space-y-4 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4" style={{ "--i": 7 }}>
            <a href={site.cv} download={site.cvFilename} className="btn btn-primary w-full">
              <FiDownload aria-hidden="true" /> {t.common.downloadCv}
            </a>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted">{t.common.city}, {t.common.country}</p>
              <ul className="flex gap-2">
                {[
                  { href: site.github, label: "GitHub", Icon: FaGithub },
                  { href: site.linkedin, label: "LinkedIn", Icon: FaLinkedinIn },
                  { href: site.whatsapp, label: "WhatsApp", Icon: FaWhatsapp },
                ].map(({ href, label, Icon }) => (
                  <li key={label}>
                    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="grid size-11 place-items-center rounded-full border border-line text-ink-soft active:bg-surface-2">
                      <Icon className="size-[1.05rem]" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </dialog>
    </header>
  );
}
