// Content-Security-Policy is set per request in middleware.ts (nonce-based).

const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=(), browsing-topics=()",
  },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Vercel sends "*" by default; limit cross-origin reads to this site.
  { key: "Access-Control-Allow-Origin", value: "https://myominthu.com" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    // Old v0 site had separate pages; keep their links working.
    return [
      { source: "/about", destination: "/#experience", permanent: true },
      { source: "/services", destination: "/#services", permanent: true },
    ];
  },
};

export default nextConfig;
