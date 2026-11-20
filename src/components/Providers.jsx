"use client";
import { I18nProvider } from "@/i18n/I18nProvider";

export default function Providers({ locale, t, children }) {
  return (
    <I18nProvider locale={locale} t={t}>
      {children}
    </I18nProvider>
  );
}
