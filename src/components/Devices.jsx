import Image from "next/image";

export function BrowserFrame({ src, alt, address, width = 1680, height = 1050, sizes, priority = false, className = "" }) {
  return (
    <figure className={`device-browser m-0 overflow-hidden rounded-xl border border-white/10 bg-[#1b1e26] ${className}`}>
      <div className="flex items-center gap-1.5 px-3 py-2.5" aria-hidden="true">
        <span className="size-2.5 rounded-full bg-white/20" />
        <span className="size-2.5 rounded-full bg-white/20" />
        <span className="size-2.5 rounded-full bg-white/20" />
        {address && (
          <span className="mx-auto truncate rounded-full bg-white/10 px-4 py-0.5 font-mono text-[0.68rem] text-white/70">{address}</span>
        )}
      </div>
      <Image src={src} alt={alt} width={width} height={height} sizes={sizes} priority={priority} className="block h-auto w-full" />
    </figure>
  );
}

export function PhoneFrame({ src, alt, sizes, width = 640, height = 1385, priority = false, className = "", style }) {
  return (
    <figure style={style} className={`device-phone m-0 rounded-[2rem] border border-white/15 bg-[#0d0e12] p-[5px] ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        className="block h-auto w-full rounded-[1.7rem]"
      />
    </figure>
  );
}

export function PanelFrame({ src, alt, sizes, width = 640, height = 1280, className = "", style }) {
  return (
    <figure style={style} className={`device-panel m-0 overflow-hidden rounded-2xl border border-white/15 bg-white ${className}`}>
      <Image src={src} alt={alt} width={width} height={height} sizes={sizes} className="block h-auto w-full" />
    </figure>
  );
}
