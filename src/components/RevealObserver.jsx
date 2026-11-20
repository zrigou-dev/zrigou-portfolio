"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

// One observer for the whole page, so sections can stay server components and just add data-reveal.
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    document.querySelectorAll("[data-reveal]:not(.is-in), [data-words]:not(.is-in), [data-stagger]:not(.is-in)").forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
