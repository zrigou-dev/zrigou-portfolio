"use client";
import { useEffect, useState } from "react";
import { FiArrowUpRight, FiDownload } from "react-icons/fi";

// Keeps the main action of a case study (download or visit) within thumb reach once the top of the page has scrolled away.
export default function StickyCta({ targetId, href, label, detail, download = false }) {
  const [pastTop, setPastTop] = useState(false);
  const [atFooter, setAtFooter] = useState(false);
  const show = pastTop && !atFooter;

  useEffect(() => {
    const target = document.getElementById(targetId);
    const footer = document.querySelector("footer");
    const observers = [];
    if (target) {
      const top = new IntersectionObserver(([entry]) => setPastTop(!entry.isIntersecting && entry.boundingClientRect.top < 0));
      top.observe(target);
      observers.push(top);
    }
    // The bar covers the footer's last lines, so it steps aside once the footer is on screen instead of reserving blank space.
    if (footer) {
      const bottom = new IntersectionObserver(([entry]) => setAtFooter(entry.isIntersecting));
      bottom.observe(footer);
      observers.push(bottom);
    }
    return () => observers.forEach((observer) => observer.disconnect());
  }, [targetId]);

  return (
    <>
      <div
        inert={!show}
        className={`fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 transition-[transform,opacity] duration-500 ease-out-expo md:hidden ${
          show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0"
        }`}
      >
        <a
          href={href}
          {...(download ? { download: true } : { target: "_blank", rel: "noopener noreferrer" })}
          className="btn btn-primary w-full shadow-[0_12px_40px_-8px_rgb(0_0_0/0.6)]"
        >
          {download ? <FiDownload aria-hidden="true" /> : null}
          {label}
          {detail ? <span className="font-normal opacity-70">{detail}</span> : null}
          {download ? null : <FiArrowUpRight className="rtl:-scale-x-100" aria-hidden="true" />}
        </a>
      </div>
    </>
  );
}
