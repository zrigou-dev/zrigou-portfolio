"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiDownload, FiMenu, FiX } from "react-icons/fi";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import { navLinks, site } from "@/data/site";

export default function Header() {
  const pathname = usePathname();
  const menuRef = useRef(null);
  const [activeId, setActiveId] = useState(null);

  // Highlights the section that crosses the middle of the viewport.
  useEffect(() => {
    if (pathname !== "/") return undefined;
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
  }, [pathname]);

  const openMenu = () => menuRef.current?.showModal();
  const closeMenu = () => menuRef.current?.close();

  return (
    <header className="fixed inset-x-0 top-0 z-50 p-3">
      <div className="mx-auto flex max-w-[88rem] items-center justify-between gap-4 rounded-full border border-line bg-bg/75 py-1.5 pl-5 pr-2 backdrop-blur-xl">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const isActive = activeId === link.id;
            return (
              <Link
                key={link.id}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className={`rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
                  isActive ? "bg-surface-2 text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/games"
            aria-current={pathname === "/games" ? "page" : undefined}
            className={`rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
              pathname === "/games" ? "bg-surface-2 text-ink" : "text-muted hover:text-ink"
            }`}
          >
            Play
          </Link>
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <a
            href={site.cv}
            download={site.cvFilename}
            className="hidden min-h-11 items-center gap-2 whitespace-nowrap rounded-full bg-accent-fill px-5 text-sm font-semibold text-on-accent transition-transform duration-300 hover:-translate-y-0.5 sm:inline-flex"
          >
            <FiDownload aria-hidden="true" /> Download CV
          </a>
          <button
            type="button"
            onClick={openMenu}
            aria-label="Open menu"
            aria-haspopup="dialog"
            className="grid size-11 place-items-center rounded-full bg-surface-2 lg:hidden"
          >
            <FiMenu className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div aria-hidden="true" className="scroll-progress fixed inset-x-0 top-0 h-0.5 bg-accent-fill" />

      <dialog
        ref={menuRef}
        aria-label="Menu"
        onClick={(event) => {
          if (event.target === menuRef.current) closeMenu();
        }}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-bg p-3 text-ink backdrop:bg-transparent"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between py-1.5 pl-5 pr-2">
            <Logo />
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close menu"
              className="grid size-11 place-items-center rounded-full bg-surface-2"
            >
              <FiX className="size-5" aria-hidden="true" />
            </button>
          </div>
          <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center gap-1 px-5">
            {[...navLinks, { href: "/games", id: "games", label: "Play" }].map((link) => (
              <Link
                key={link.id}
                href={link.href}
                onClick={closeMenu}
                className="py-2 font-display text-5xl font-bold tracking-tight"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <a href={site.cv} download={site.cvFilename} className="btn btn-primary m-5">
            <FiDownload aria-hidden="true" /> Download CV
          </a>
        </div>
      </dialog>
    </header>
  );
}
