import { notFound } from "next/navigation";
import { Bricolage_Grotesque, Cairo, Geist, Geist_Mono, IBM_Plex_Sans_Arabic } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import JsonLd from "@/components/JsonLd";
import Providers from "@/components/Providers";
import RevealObserver from "@/components/RevealObserver";
import { site } from "@/data/site";
import { isLocale, localeMeta, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { alternatesFor } from "@/i18n/seo";
import { personSchema, websiteSchema } from "@/lib/schema";
import "../globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], preload: false });
const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"] });

// Arabic faces. Only the Arabic page puts their variables on <html>, so English and French never download them.
const arabicSans = IBM_Plex_Sans_Arabic({
  variable: "--font-ar-sans",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  preload: false,
});
const arabicDisplay = Cairo({
  variable: "--font-ar-display",
  subsets: ["arabic"],
  weight: ["600", "700", "800"],
  preload: false,
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { meta } = getDictionary(locale);

  return {
    metadataBase: new URL(site.url),
    title: { default: meta.title, template: `%s | ${site.name}` },
    description: meta.description,
    applicationName: site.name,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    publisher: site.name,
    category: "technology",
    alternates: alternatesFor(locale),
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    openGraph: {
      type: "website",
      locale: localeMeta[locale].og,
      alternateLocale: locales.filter((code) => code !== locale).map((code) => localeMeta[code].og),
      siteName: site.name,
      title: meta.title,
      description: meta.description,
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
  };
}

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0c10" },
    { media: "(prefers-color-scheme: light)", color: "#f5f1e8" },
  ],
};

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = getDictionary(locale);
  const fonts = [geistSans.variable, geistMono.variable, bricolage.variable];
  if (locale === "ar") fonts.push(arabicSans.variable, arabicDisplay.variable);

  return (
    <html lang={locale} dir={localeMeta[locale].dir} suppressHydrationWarning className={fonts.join(" ")}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent-fill focus:px-5 focus:py-3 focus:font-semibold focus:text-on-accent"
        >
          {t.common.skip}
        </a>
        <JsonLd data={[personSchema(locale, t), websiteSchema(locale, t)]} />
        <Providers locale={locale} t={t}>
          {children}
        </Providers>
        <RevealObserver />
        <Analytics />
      </body>
    </html>
  );
}
