"use client";
import { useEffect } from "react";

// Pointer effects for desktop: card spotlights, magnetic buttons and 3D tilt.
// Everything is delegated from the document, so the sections themselves stay plain server components.
// Touch devices and people who prefer reduced motion get none of it.
export default function Effects() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || calm.matches) return undefined;

    let x = 0;
    let y = 0;
    let magnet = null;
    let tilted = null;

    const releaseMagnet = () => {
      if (!magnet) return;
      magnet.style.translate = "";
      magnet = null;
    };

    const releaseTilt = () => {
      if (!tilted) return;
      tilted.classList.remove("is-tilting");
      tilted.style.transform = "";
      tilted = null;
    };

    const onMove = (event) => {
      x = event.clientX;
      y = event.clientY;
      const target = event.target instanceof Element ? event.target : null;
      // Spotlight: expose the pointer position inside the card to its CSS.
      const spot = target?.closest("[data-spotlight]");
      if (spot) {
        const box = spot.getBoundingClientRect();
        spot.style.setProperty("--mx", `${x - box.left}px`);
        spot.style.setProperty("--my", `${y - box.top}px`);
      }

      // Magnetic: the element leans toward the pointer.
      const pull = target?.closest("[data-magnetic]");
      if (pull !== magnet) releaseMagnet();
      if (pull) {
        magnet = pull;
        const box = pull.getBoundingClientRect();
        const dx = x - (box.left + box.width / 2);
        const dy = y - (box.top + box.height / 2);
        pull.style.translate = `${(dx * 0.22).toFixed(1)}px ${(dy * 0.32).toFixed(1)}px`;
      }

      // Tilt: cards turn toward the pointer with a moving glare.
      const card = target?.closest("[data-tilt]");
      if (card !== tilted) releaseTilt();
      if (card) {
        tilted = card;
        const box = card.getBoundingClientRect();
        const px = (x - box.left) / box.width;
        const py = (y - box.top) / box.height;
        card.classList.add("is-tilting");
        card.style.setProperty("--gx", `${(px * 100).toFixed(1)}%`);
        card.style.setProperty("--gy", `${(py * 100).toFixed(1)}%`);
        card.style.transform = `perspective(1200px) rotateX(${((0.5 - py) * 5).toFixed(2)}deg) rotateY(${((px - 0.5) * 7).toFixed(2)}deg)`;
      }
    };

    const onLeaveWindow = () => {
      releaseMagnet();
      releaseTilt();
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeaveWindow);

    return () => {
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeaveWindow);
      releaseMagnet();
      releaseTilt();
    };
  }, []);

  return null;
}
