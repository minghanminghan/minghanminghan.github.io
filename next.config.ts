import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production"
const repoName = "minghanminghan.github.io"

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname
  },
  output: "export",
  distDir: "out",
  images: { unoptimized: true },
  basePath: isProd ? `/${repoName}` : "",
};

export default nextConfig;
