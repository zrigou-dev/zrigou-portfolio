import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/HeroSection";
import JsonLd from "@/components/JsonLd";
import Portfolio from "@/components/Portfolio";
import ProofStrip from "@/components/ProofStrip";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import { site } from "@/data/site";
import { profilePageSchema } from "@/lib/schema";

export const metadata = {
  title: { absolute: site.title },
};

export default function Home() {
  return (
    <>
      <JsonLd data={profilePageSchema()} />
      <Header />
      <main id="main">
        <Hero />
        <ProofStrip />
        <Portfolio />
        <About />
        <Services />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
