"use client";
import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "theme";

// The theme lives in one place, the "dark" class on <html>. An inline script in the layout sets it before first paint
// (see themeScript), and this hook reads and changes it. No provider, and no <script> rendered from a client component.
function subscribe(onChange) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  window.addEventListener("storage", onChange);
  return () => {
    observer.disconnect();
    window.removeEventListener("storage", onChange);
  };
}

const getSnapshot = () => (document.documentElement.classList.contains("dark") ? "dark" : "light");
const getServerSnapshot = () => "dark";

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setTheme = useCallback((next) => {
    // Switch without animating every colour at once, which looks like a flash.
    const style = document.createElement("style");
    style.textContent = "*,*::before,*::after{transition:none!important}";
    document.head.appendChild(style);
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Private mode or blocked storage: the choice still applies for this visit.
    }
    window.getComputedStyle(document.body).opacity;
    setTimeout(() => style.remove(), 1);
  }, []);

  return { theme, setTheme };
}
