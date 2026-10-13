import type { NextConfig } from "next";
import path from "node:path";
import {
  RETIRED_LANGUAGE_DECK_REDIRECTS,
  buildRetiredLanguageDeckRedirects,
} from "./src/lib/retired-language-decks";

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
      // Language-exam decks moved to Prep2Go — 301 every per-deck URL to the matching landing.
      ...buildRetiredLanguageDeckRedirects(),
      // Gaivota comics are sold on Prep2Go (Lemon) — same paths there.
      {
        source: "/comics/gaivota-em-portugal",
        destination: "https://www.prep2go.study/comics/gaivota-em-portugal",
        permanent: true,
      },
      {
        source: "/comics/gaivota-em-portugal/:path*",
        destination: "https://www.prep2go.study/comics/gaivota-em-portugal/:path*",
        permanent: true,
      },
      {
        source: "/ciple-a2-anki-deck-for-portuguese-citizenship",
        destination: RETIRED_LANGUAGE_DECK_REDIRECTS["ciple-a2-european-portuguese-anki-deck"],
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
