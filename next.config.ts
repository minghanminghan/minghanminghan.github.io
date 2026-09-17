import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname
  },
  // output: "export",
  // distDir: "out",
  images: { unoptimized: true },
  // The jev demo is its own Vercel project. This serves it in place at
  // /jev-demo instead of redirecting to its own host, so the demo lives on
  // this domain. The other project sets `basePath: "/jev-demo"`, which is what
  // keeps its /_next/* asset URLs inside this rule.
  async rewrites() {
    return [
      {
        source: "/jev-demo",
        destination: "https://jev-demo-mu.vercel.app/jev-demo"
      },
      {
        source: "/jev-demo/:path*",
        destination: "https://jev-demo-mu.vercel.app/jev-demo/:path*"
      }
    ];
  },
  async redirects() {
    return [
      {
        source: "/projects/ascii-art",
        destination: "/ascii-art.html",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
