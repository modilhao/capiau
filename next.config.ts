import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    optimizePackageImports: ["gsap", "@bsmnt/scrollytelling"],
  },
};

export default nextConfig;
