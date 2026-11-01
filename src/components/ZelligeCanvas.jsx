"use client";
import { useEffect, useRef } from "react";

const CELL_DESKTOP = 76;
const CELL_MOBILE = 56;
const FRAME_MS = 1000 / 40;

// An eight-pointed star: tips on a circle of radius 1, with the inner vertices where the two squares cross.
function createStarPath() {
  const path = new Path2D();
  const inner = Math.cos(Math.PI / 4) / Math.cos(Math.PI / 8);
  for (let i = 0; i < 16; i += 1) {
    const angle = (i * Math.PI) / 8;
    const radius = i % 2 === 0 ? 1 : inner;
    path[i === 0 ? "moveTo" : "lineTo"](Math.cos(angle) * radius, Math.sin(angle) * radius);
  }
  path.closePath();
  return path;
}

// Moroccan zellige star-and-cross tiling. Stars wake near the pointer and ambient light drifts across the wall.
export default function ZelligeCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const hero = canvas.parentElement;
    const star = createStarPath();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let cell = CELL_DESKTOP;
    let stars = [];
    let colors = {};
    let frame = 0;
    let lastFrame = 0;
    let visible = true;
    const pointer = { x: -9999, y: -9999, active: false };
    const ripples = [];

    const readColors = () => {
      const styles = getComputedStyle(document.documentElement);
      colors = {
        line: styles.getPropertyValue("--line").trim(),
        accent: styles.getPropertyValue("--accent-fill").trim(),
        zellige: styles.getPropertyValue("--zellige").trim(),
      };
    };

    const resize = () => {
      const rect = hero.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      cell = width < 640 ? CELL_MOBILE : CELL_DESKTOP;
      stars = [];
      for (let row = 0; row * cell <= height + cell; row += 1) {
        for (let column = 0; column * cell <= width + cell; column += 1) {
          stars.push({ x: column * cell, y: row * cell, glow: 0, hue: (column + row * 2) % 5 === 0 });
        }
      }
    };

    const draw = (time) => {
      const ratio = canvas.width / width;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);
      context.lineWidth = 1;
      const reach = cell * 2.6;
      const radius = cell / 2;

      for (let i = ripples.length - 1; i >= 0; i -= 1) {
        ripples[i].r += cell * 0.5;
        if (ripples[i].r > Math.max(width, height) * 1.2) ripples.splice(i, 1);
      }

      for (const item of stars) {
        const wave = Math.sin(item.x * 0.006 + item.y * 0.009 + time * 0.0005);
        let target = Math.max(0, wave - 0.86) * 1.5;

        if (pointer.active) {
          const distance = Math.hypot(item.x - pointer.x, item.y - pointer.y);
          target = Math.max(target, 1 - distance / reach);
        }
        for (const ripple of ripples) {
          const band = Math.abs(Math.hypot(item.x - ripple.x, item.y - ripple.y) - ripple.r);
          target = Math.max(target, 1 - band / (cell * 1.4));
        }

        item.glow += (target - item.glow) * (target > item.glow ? 0.28 : 0.045);
        const glow = item.glow < 0.01 ? 0 : item.glow;
        const rotation = glow * (Math.PI / 4);
        const cos = Math.cos(rotation) * radius;
        const sin = Math.sin(rotation) * radius;
        context.setTransform(cos * ratio, sin * ratio, -sin * ratio, cos * ratio, item.x * ratio, item.y * ratio);

        if (glow > 0) {
          context.globalAlpha = Math.min(glow, 1) * 0.92;
          context.fillStyle = item.hue ? colors.zellige : colors.accent;
          context.fill(star);
        }
        context.globalAlpha = 1;
        context.strokeStyle = colors.line;
        context.lineWidth = 1 / radius;
        context.stroke(star);
      }
      context.globalAlpha = 1;
    };

    const loop = (time) => {
      frame = requestAnimationFrame(loop);
      if (!visible || time - lastFrame < FRAME_MS) return;
      lastFrame = time;
      draw(time);
    };

    const onPointerMove = (event) => {
      if (event.pointerType === "touch") return;
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };
    const onPointerDown = (event) => {
      if (reduceMotion || ripples.length > 2) return;
      const rect = canvas.getBoundingClientRect();
      ripples.push({ x: event.clientX - rect.left, y: event.clientY - rect.top, r: 0 });
    };

    const start = () => {
      readColors();
      resize();
      if (reduceMotion) {
        draw(0);
        return;
      }
      frame = requestAnimationFrame(loop);
    };

    const themeObserver = new MutationObserver(() => {
      readColors();
      if (reduceMotion) draw(0);
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    visibilityObserver.observe(hero);

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw(0);
    });
    resizeObserver.observe(hero);

    hero.addEventListener("pointermove", onPointerMove, { passive: true });
    hero.addEventListener("pointerleave", onPointerLeave);
    hero.addEventListener("pointerdown", onPointerDown, { passive: true });

    // Decorative work waits until the page has painted and settled.
    const idle = window.requestIdleCallback ? requestIdleCallback(start, { timeout: 900 }) : setTimeout(start, 200);

    return () => {
      if (window.cancelIdleCallback) cancelIdleCallback(idle);
      else clearTimeout(idle);
      cancelAnimationFrame(frame);
      themeObserver.disconnect();
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      hero.removeEventListener("pointermove", onPointerMove);
      hero.removeEventListener("pointerleave", onPointerLeave);
      hero.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="zellige-canvas absolute inset-0 h-full w-full" />;
}
