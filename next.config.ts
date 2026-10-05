import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async redirects() {
    return [
      // No standalone pricing page — list prices live on the deck catalog.
      {
        source: "/pricing",
        destination: "/decks",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
