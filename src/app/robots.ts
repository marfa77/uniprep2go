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
      ...aiCrawlers.map((userAgent) => ({
        userAgent,
        allow: "/",
      })),
    ],
    // Google: HTML sitemap + curated llms entrypoints only.
    // llm-sitemap.xml (*.md, /api/facts) stays linked from /llms.txt — listing it here
    // flooded GSC with "Crawled - currently not indexed" markdown URLs.
    sitemap: [
      `${siteConfig.url}/sitemap.xml`,
      `${siteConfig.url}/llms.txt`,
      `${siteConfig.url}/llms-full.txt`,
    ],
    host: siteConfig.url,
  };
}
