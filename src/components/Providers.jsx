"use client";
import { ThemeProvider } from "next-themes";
import { I18nProvider } from "@/i18n/I18nProvider";

export default function Providers({ locale, t, children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
      <I18nProvider locale={locale} t={t}>
        {children}
      </I18nProvider>
    </ThemeProvider>
  );
}
