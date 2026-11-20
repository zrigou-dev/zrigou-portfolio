import { notFound } from "next/navigation";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/HeroSection";
import JsonLd from "@/components/JsonLd";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import ProofStrip from "@/components/ProofStrip";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import WhyHire from "@/components/WhyHire";
import { getClientProjects, getFlagshipProjects, getProjects, getSiteContent } from "@/i18n/content";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { profilePageSchema } from "@/lib/schema";

export default async function Home({ params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = getDictionary(locale);
  const content = getSiteContent(locale);
  const flagships = getFlagshipProjects(locale);
  const clients = getClientProjects(locale);

  return (
    <>
      <JsonLd data={profilePageSchema(locale, t)} />
      <Header />
      <main id="main">
        <Hero locale={locale} t={t} flagships={flagships} />
        <ProofStrip t={t} />
        <Portfolio locale={locale} t={t} flagships={flagships} clients={clients} />
        <About t={t} />
        <WhyHire locale={locale} t={t} projects={getProjects(locale)} />
        <Process t={t} />
        <Services t={t} services={content.services} />
        <Skills t={t} groups={content.skillGroups} />
        <Contact t={t} />
      </main>
      <Footer locale={locale} t={t} />
    </>
  );
}
