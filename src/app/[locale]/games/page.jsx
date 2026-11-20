import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import GameArcade from "@/components/games/GameArcade";
import Header from "@/components/Header";
import { isLocale, localizePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { alternatesFor } from "@/i18n/seo";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { meta } = getDictionary(locale);
  const url = localizePath(locale, "/games");
  return {
    title: meta.gamesTitle,
    description: meta.gamesDescription,
    alternates: alternatesFor(locale, "/games"),
    openGraph: { url, images: `${localizePath(locale)}/opengraph-image`.replace("//", "/") },
    twitter: { card: "summary_large_image" },
  };
}

export default async function GamesPage({ params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <>
      <Header />
      <main id="main" className="shell min-h-svh pb-20 pt-28 md:pt-40">
        <p className="eyebrow mb-3 md:mb-4">{t.games.eyebrow}</p>
        <h1 className="section-title max-w-3xl">{t.games.title}</h1>
        <GameArcade />
      </main>
      <Footer locale={locale} t={t} />
    </>
  );
}
