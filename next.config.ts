import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Site 100% estático: gera a pasta out/ no build (Netlify, Vercel ou arrastar e soltar).
  output: "export",
  reactCompiler: true,
  experimental: {
    optimizePackageImports: ["gsap", "@bsmnt/scrollytelling"],
  },
};

export default nextConfig;
