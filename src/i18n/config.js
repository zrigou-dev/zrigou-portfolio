export const locales = ["en", "fr", "ar"];
export const defaultLocale = "en";

export const localeMeta = {
  en: { label: "English", short: "EN", dir: "ltr", og: "en_US", numbering: "en-GB" },
  fr: { label: "Français", short: "FR", dir: "ltr", og: "fr_FR", numbering: "fr-FR" },
  // Western digits (0-9) are the norm in Morocco, so Arabic keeps them.
  ar: { label: "العربية", short: "عربي", dir: "rtl", og: "ar_MA", numbering: "ar-MA-u-nu-latn" },
};

export const isLocale = (value) => locales.includes(value);

/** "/projects/x" -> "/fr/projects/x". English stays unprefixed so existing URLs keep working. */
export function localizePath(locale, path = "/") {
  if (locale === defaultLocale) return path;
  if (path === "/") return `/${locale}`;
  if (path.startsWith("/#")) return `/${locale}${path.slice(1)}`;
  return `/${locale}${path}`;
}

/** Removes a leading locale segment from a pathname. */
export function stripLocale(pathname) {
  const [, first, ...rest] = pathname.split("/");
  if (locales.includes(first) && first !== defaultLocale) return `/${rest.join("/")}`;
  return pathname || "/";
}
