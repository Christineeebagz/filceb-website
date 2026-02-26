import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Comment out or remove the custom loader for production build
  images: {
    // Remove the custom loader for Vercel deployment
    // loader: "custom",
    // loaderFile: "./lib/imageLoader.ts",

    // Use default Next.js image optimization
    domains: ["ik.imagekit.io"], // Add your image domains here
    formats: ["image/avif", "image/webp"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Add this for Vercel deployment
  output: "standalone",
};

export default nextConfig;
