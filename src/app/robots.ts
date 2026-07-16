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
    // Point answer-engine / LLM crawlers at citation surfaces (llms.txt + machine sitemaps).
    sitemap: [
      `${siteConfig.url}/sitemap.xml`,
      `${siteConfig.url}/llm-sitemap.xml`,
      `${siteConfig.url}/llms.txt`,
      `${siteConfig.url}/llms-full.txt`,
    ],
    host: siteConfig.url,
  };
}
