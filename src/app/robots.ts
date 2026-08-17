import type { MetadataRoute } from "next";
import { siteConfig } from "../lib/site";

const aiCrawlers = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-Web",
  "Anthropic-AI",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "Bytespider",
  "Amazonbot",
  "cohere-ai",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      // Cut UTM catalog duplicates that flooded GSC after llms.txt was listed as Sitemap.
      // AI bots keep full Allow via their own rules below; /llms.txt stays crawlable.
      {
        userAgent: "Googlebot",
        allow: "/",
        // UTM LLM catalog dupes + GEO markdown mirrors (HTML canonicals are the indexable URLs).
        disallow: ["/*?utm_source=llm", "/*.md$"],
      },
      ...aiCrawlers.map((userAgent) => ({
        userAgent,
        allow: "/",
      })),
    ],
    // Only the HTML sitemap. /llms.txt + /llms-full.txt stay linked from GEO surfaces
    // and llm-sitemap.xml — never declare them as Sitemap: again.
    sitemap: [`${siteConfig.url}/sitemap.xml`],
    host: siteConfig.url,
  };
}
