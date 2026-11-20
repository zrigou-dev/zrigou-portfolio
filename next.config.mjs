const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2678400,
  },
  // English lives at the root; /fr and /ar are real routes. These rewrites serve the English pages
  // from /en/* internally, so existing URLs keep working and no proxy is needed.
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/en" },
        { source: "/games", destination: "/en/games" },
        { source: "/projects/:id", destination: "/en/projects/:id" },
        { source: "/projects/:id/opengraph-image", destination: "/en/projects/:id/opengraph-image" },
        { source: "/opengraph-image", destination: "/en/opengraph-image" },
      ],
      // Anything else (a typo, an old URL) lands on the styled 404 instead of the bare default one.
      fallback: [{ source: "/:path*", destination: "/en/:path*" }],
    };
  },
  async headers() {
    // Next's dev server needs eval, so the CSP only applies to production builds.
    const headers =
      process.env.NODE_ENV === "production"
        ? [...securityHeaders, { key: "Content-Security-Policy", value: contentSecurityPolicy }]
        : securityHeaders;
    return [
      { source: "/:path*", headers },
      {
        source: "/downloads/:path*",
        headers: [{ key: "Content-Disposition", value: "attachment" }],
      },
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
