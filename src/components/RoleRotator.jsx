"use client";
import { useEffect, useState } from "react";

// "I build [web apps]": the bracketed part slides through the list. Server render shows the first role, so it reads fine without JS.
export default function RoleRotator({ prefix, roles }) {
  const [index, setIndex] = useState(0);
  const [jump, setJump] = useState(false);
  const total = roles.length;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const timer = setInterval(() => {
      setJump(false);
      setIndex((current) => current + 1);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  // After sliding onto the duplicated first role, snap back to the real one without animating.
  useEffect(() => {
    if (index !== total) return undefined;
    const timer = setTimeout(() => {
      setJump(true);
      setIndex(0);
    }, 720);
    return () => clearTimeout(timer);
  }, [index, total]);

  return (
    <p className="hero-fade mt-5 flex flex-wrap items-baseline gap-x-2.5 font-display text-[1.375rem] font-semibold leading-tight tracking-tight md:mt-6 md:text-4xl [@media(max-height:760px)]:mt-3 [@media(max-height:760px)]:md:mt-3 [@media(max-height:760px)]:md:text-3xl" style={{ "--i": 2 }}>
      <span className="text-ink-soft">{prefix}</span>
      <span className="role-window" aria-hidden="true">
        <span className="role-track" style={{ transform: `translate3d(0, ${(index * -100) / (total + 1)}%, 0)`, transition: jump ? "none" : undefined }}>
          {[...roles, roles[0]].map((role, position) => (
            <span key={position} className="role-item">
              {role}
            </span>
          ))}
        </span>
      </span>
      <span className="sr-only">{roles.join(", ")}</span>
    </p>
  );
}
