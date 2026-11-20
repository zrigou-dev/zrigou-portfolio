import { defaultLocale, localizePath, locales } from "@/i18n/config";

/** Canonical + hreflang alternates for one page. `path` is the unprefixed path, e.g. "/projects/sakina". */
export function alternatesFor(locale, path = "/") {
  return {
    canonical: localizePath(locale, path),
    languages: {
      ...Object.fromEntries(locales.map((code) => [code, localizePath(code, path)])),
      "x-default": localizePath(defaultLocale, path),
    },
  };
}
