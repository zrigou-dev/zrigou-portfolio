"use client";
import { usePathname } from "next/navigation";
import { localeMeta, localizePath, locales, stripLocale } from "@/i18n/config";
import { useI18n } from "@/i18n/I18nProvider";

// Plain anchors, not next/link: each language is a real URL that can be shared, bookmarked and crawled, and a full page
// load hands the browser a fresh document with the right lang, direction and fonts. A client-side swap would remount
// the root layout, which makes React 19 re-create its inline theme script and log a warning.
export default function LanguageSwitcher({ className = "" }) {
  const { locale, t } = useI18n();
  const pathname = stripLocale(usePathname());

  return (
    <nav aria-label={t.common.language} dir="ltr" className={`flex items-center rounded-full border border-line p-0.5 ${className}`}>
      {locales.map((code) => {
        const active = code === locale;
        return (
          <a
            key={code}
            href={localizePath(code, pathname)}
            lang={code}
            hrefLang={code}
            aria-current={active ? "true" : undefined}
            className={`grid h-8 min-w-8 place-items-center rounded-full px-2 text-[0.6875rem] font-semibold leading-none transition-colors sm:h-9 sm:min-w-9 sm:text-xs ${
              active ? "bg-accent-fill text-on-accent" : "text-muted hover:text-ink"
            }`}
          >
            {localeMeta[code].short}
          </a>
        );
      })}
    </nav>
  );
}
