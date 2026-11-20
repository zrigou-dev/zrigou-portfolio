import { notFound } from "next/navigation";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Effects from "@/components/Effects";
import JsonLd from "@/components/JsonLd";
import Providers from "@/components/Providers";
import RevealObserver from "@/components/RevealObserver";
import { site } from "@/data/site";
import { isLocale, localeMeta, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { alternatesFor } from "@/i18n/seo";
import { personSchema, websiteSchema } from "@/lib/schema";
import "../globals.css";

// Runs before first paint so the page never flashes the wrong theme. Dark is the default.
// React warns when it has to create an executable <script> on the client, which would happen if this layout were
// remounted by a client-side navigation. The language switcher therefore uses real page loads (see LanguageSwitcher),
// so this script only ever arrives in server-rendered HTML.
const themeScript = `try{var t=localStorage.getItem("theme");document.documentElement.classList.toggle("dark",t!=="light")}catch(e){document.documentElement.classList.add("dark")}`;

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], preload: false });
const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"] });

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

  return (
    <html lang={locale} dir={localeMeta[locale].dir} data-scroll-behavior="smooth" suppressHydrationWarning className={fonts.join(" ")}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
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
        <Effects />
        <Analytics />
      </body>
    </html>
  );
}
