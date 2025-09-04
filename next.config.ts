import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname
  },
  // output: "export",
  // distDir: "out",
  images: { unoptimized: true },
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
