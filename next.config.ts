import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname
  },
  output: "export",
  distDir: "out",
  images: { unoptimized: true },
  basePath: "/minghanminghan.github.io",
  assetPrefix: "/minghanminghan.github.io/",
};

export default nextConfig;
