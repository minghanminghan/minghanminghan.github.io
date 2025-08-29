import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname
  },
  // output: "export",
  // distDir: "out",
  images: { unoptimized: true },
};

export default nextConfig;
