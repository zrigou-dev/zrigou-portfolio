"use client";
import { useRef, useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";
import { site } from "@/data/site";
import { useI18n } from "@/i18n/I18nProvider";

export default function CopyEmail() {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? t.contact.emailCopied : t.contact.copyEmail}
      className="grid size-11 shrink-0 md:size-12 place-items-center rounded-full border border-line-strong text-ink transition-colors hover:border-ink"
    >
      {copied ? <FiCheck className="size-5 text-zellige" aria-hidden="true" /> : <FiCopy className="size-5" aria-hidden="true" />}
    </button>
  );
}
