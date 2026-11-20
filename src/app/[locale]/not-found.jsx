"use client";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { localizePath } from "@/i18n/config";
import { useI18n } from "@/i18n/I18nProvider";

// not-found files get no params, but they render inside the locale layout, so the provider already knows the locale.
export default function NotFound() {
  const { locale, t } = useI18n();

  return (
    <>
      <Header />
      <main id="main" className="shell flex min-h-[80svh] flex-col justify-center pb-16 pt-28 md:pt-32">
        <p className="eyebrow mb-3 md:mb-4">{t.notFound.eyebrow}</p>
        <h1 className="font-display text-[clamp(2.75rem,1rem+10vw,9rem)] font-extrabold leading-[1] tracking-[-0.03em]">
          {t.notFound.title}
        </h1>
        <p className="lead mt-5 max-w-md md:mt-6">{t.notFound.text}</p>
        <Link href={localizePath(locale)} className="btn btn-primary mt-7 self-start md:mt-8">
          <FiArrowLeft className="rtl:-scale-x-100" aria-hidden="true" /> {t.notFound.back}
        </Link>
      </main>
      <Footer locale={locale} t={t} />
    </>
  );
}
