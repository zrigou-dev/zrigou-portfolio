"use client";
import { useEffect, useState } from "react";
import { site } from "@/data/site";

const formatter = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: site.timeZone });

export default function LocalTime() {
  const [time, setTime] = useState(null);

  useEffect(() => {
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const interval = setInterval(tick, 20000);
    return () => clearInterval(interval);
  }, []);

  return <span className="inline-block min-w-[2.6rem] tabular-nums">{time ?? "--:--"}</span>;
}
