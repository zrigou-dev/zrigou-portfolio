import { locales } from "@/i18n/config";
import { ogSize, siteOgImage } from "@/lib/og";

export const alt = "Mohamed Zrigou, full-stack web and mobile developer";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// The card is set in Latin script (name and role) for every language, so one design serves all three locales.
export default function Image() {
  return siteOgImage();
}
