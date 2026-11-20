"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeMeta, localizePath, locales, stripLocale } from "@/i18n/config";
import { useI18n } from "@/i18n/I18nProvider";

// Links, not buttons: each language is a real URL, so it can be shared, bookmarked and crawled.
export default function LanguageSwitcher({ className = "" }) {
  const { locale, t } = useI18n();
  const pathname = stripLocale(usePathname());

  return (
    <nav aria-label={t.common.language} dir="ltr" className={`flex items-center rounded-full border border-line p-0.5 ${className}`}>
      {locales.map((code) => {
        const active = code === locale;
        return (
          <Link
            key={code}
            href={localizePath(code, pathname)}
            lang={code}
            hrefLang={code}
            aria-current={active ? "true" : undefined}
            scroll={false}
            className={`grid h-8 min-w-8 place-items-center rounded-full px-2 text-[0.6875rem] font-semibold leading-none transition-colors sm:h-9 sm:min-w-9 sm:text-xs ${
              active ? "bg-accent-fill text-on-accent" : "text-muted hover:text-ink"
            }`}
          >
            {localeMeta[code].short}
          </Link>
        );
      })}
    </nav>
  );
}
