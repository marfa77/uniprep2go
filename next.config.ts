import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  outputFileTracingIncludes: {
    "/api/telegram": ["./src/data/admin-bot/knowledge.json"],
  },
  async redirects() {
    return [
      // No standalone pricing page — list prices live on the deck catalog.
      {
        source: "/pricing",
        destination: "/decks",
        permanent: true,
      },
      {
        source: "/decks/ptcb-anki-deck",
        destination: "/decks/ptcb-pharmacy-technician-anki-deck",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
