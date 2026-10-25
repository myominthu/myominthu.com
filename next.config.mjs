/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // Old v0 site had separate pages; keep their links working.
    return [
      { source: "/about", destination: "/#experience", permanent: true },
      { source: "/services", destination: "/#services", permanent: true },
    ];
  },
};

export default nextConfig;
