"use client";
import { useRef, useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";
import { site } from "@/data/site";

export default function CopyEmail() {
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
      aria-label={copied ? "Email address copied" : "Copy email address"}
      className="grid size-12 shrink-0 place-items-center rounded-full border border-line-strong text-ink transition-colors hover:border-ink"
    >
      {copied ? <FiCheck className="size-5 text-zellige" aria-hidden="true" /> : <FiCopy className="size-5" aria-hidden="true" />}
    </button>
  );
}
