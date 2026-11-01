import Link from "next/link";

export function LogoMark({ className = "" }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M16 0l4.6 4.9 6.7-.2-.2 6.7L32 16l-4.9 4.6.2 6.7-6.7-.2L16 32l-4.6-4.9-6.7.2.2-6.7L0 16l4.9-4.6-.2-6.7 6.7.2z"
      />
      <path fill="var(--logo-cut, var(--bg))" d="M10 9.5h12.4v2.6l-8.3 7.5h8.5v2.9H9.6v-2.7l8.2-7.4H10z" />
    </svg>
  );
}

export default function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label="Mohamed Zrigou, home">
      <LogoMark className="size-8 text-accent-fill transition-transform duration-700 ease-out-expo group-hover:rotate-45" />
      <span className="font-display text-lg font-bold tracking-tight">Zrigou</span>
    </Link>
  );
}
