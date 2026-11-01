import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="shell flex min-h-[80svh] flex-col justify-center pb-16 pt-32">
        <p className="eyebrow mb-4">Error 404</p>
        <h1 className="font-display text-[clamp(3.5rem,13vw,12rem)] font-extrabold leading-[0.9] tracking-[-0.02em]">
          Lost the page.
        </h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
          This address does not lead anywhere. The work is still here, though.
        </p>
        <Link href="/" className="btn btn-primary mt-8 self-start">
          <FiArrowLeft aria-hidden="true" /> Back to home
        </Link>
      </main>
      <Footer />
    </>
  );
}
