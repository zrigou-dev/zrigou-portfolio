"use client";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

const subscribe = () => () => {};

export default function ThemeToggle({ className = "" }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const isDark = !mounted || resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      className={`grid size-11 place-items-center rounded-full text-ink-soft transition-colors hover:bg-surface-2 hover:text-ink ${className}`}
    >
      {isDark ? <FiSun className="size-[18px]" aria-hidden="true" /> : <FiMoon className="size-[18px]" aria-hidden="true" />}
    </button>
  );
}
