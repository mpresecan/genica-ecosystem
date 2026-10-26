import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@genica/ui"],
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/pipeline", destination: "/how-it-works", permanent: true },
      { source: "/agents", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
