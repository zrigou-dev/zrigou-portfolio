export const locales = ["en", "fr"];
export const defaultLocale = "en";

export const localeMeta = {
  en: { label: "English", short: "EN", dir: "ltr", og: "en_US", numbering: "en-GB" },
  fr: { label: "Français", short: "FR", dir: "ltr", og: "fr_FR", numbering: "fr-FR" },
};

export const isLocale = (value) => locales.includes(value);

/** "/projects/x" -> "/fr/projects/x". English stays unprefixed so existing URLs keep working. */
export function localizePath(locale, path = "/") {
  if (locale === defaultLocale) return path;
  if (path === "/") return `/${locale}`;
  if (path.startsWith("/#")) return `/${locale}${path.slice(1)}`;
  return `/${locale}${path}`;
}

/**
 * Removes a leading locale segment from a pathname, the default one included. English is served at the root through
 * a rewrite, so while rendering on the server usePathname() reports the internal "/en/..." path instead of "/...".
 */
export function stripLocale(pathname) {
  const [, first, ...rest] = pathname.split("/");
  if (locales.includes(first)) return `/${rest.join("/")}`;
  return pathname || "/";
}
