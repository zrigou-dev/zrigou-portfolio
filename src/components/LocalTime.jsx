"use client";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { localeMeta } from "@/i18n/config";
import { useI18n } from "@/i18n/I18nProvider";

export default function LocalTime() {
  const { locale } = useI18n();
  const [time, setTime] = useState(null);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat(localeMeta[locale].numbering, { hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone: site.timeZone });
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const interval = setInterval(tick, 20000);
    return () => clearInterval(interval);
  }, [locale]);

  return <span dir="ltr" className="inline-block min-w-[2.6rem] tabular-nums">{time ?? "--:--"}</span>;
}
