"use client";
import { useTheme } from "@/components/useTheme";
import { FiMoon, FiSun } from "react-icons/fi";
import { useI18n } from "@/i18n/I18nProvider";

export default function ThemeToggle({ className = "" }) {
  const { t } = useI18n();
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? t.common.switchToLight : t.common.switchToDark}
      className={`grid size-11 place-items-center rounded-full text-ink-soft transition-colors hover:bg-surface-2 hover:text-ink ${className}`}
    >
      {isDark ? <FiSun className="size-[18px]" aria-hidden="true" /> : <FiMoon className="size-[18px]" aria-hidden="true" />}
    </button>
  );
}
