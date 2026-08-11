import { describe, expect, it } from "vitest";
import sitemap from "../app/sitemap";
import robots from "../app/robots";
import { availableDecks } from "./decks";
import { gaivotaEpisodes, gaivotaSeries } from "./gaivota-comics";
import {
  getGoogleSitemapBlogSlugs,
  getGoogleSitemapComicPaths,
  getGoogleSitemapMockSlugs,
  getGoogleSitemapVerticalPaths,
  GOOGLE_SITEMAP_INTENT_SLUGS,
} from "./google-sitemap-allowlist";
import { shouldIndexMockExam } from "./seo";
import { absoluteUrl, siteConfig } from "./site";

describe("google sitemap allowlist", () => {
  it("keeps all for-sale decks, indexable mocks, comics, and vertical hubs", () => {
    const urls = sitemap().map((entry) => entry.url);
    const unique = new Set(urls);

    expect(unique.size).toBe(urls.length);
    expect(urls.length).toBeGreaterThanOrEqual(280);
    expect(urls.length).toBeLessThanOrEqual(310);

    for (const deck of availableDecks) {
      expect(urls).toContain(absoluteUrl(`/decks/${deck.slug}`));
    }
    expect(urls.filter((url) => url.includes("/decks/")).length).toBe(availableDecks.length);

    const mockSlugs = getGoogleSitemapMockSlugs();
    expect(mockSlugs.length).toBeGreaterThan(100);
    for (const slug of mockSlugs) {
      expect(shouldIndexMockExam(slug)).toBe(true);
      expect(urls).toContain(absoluteUrl(`/mock-exams/${slug}`));
    }

    for (const path of getGoogleSitemapVerticalPaths()) {
      expect(urls).toContain(absoluteUrl(path));
    }
    expect(getGoogleSitemapVerticalPaths().length).toBeGreaterThanOrEqual(20);

    expect(urls).toContain(absoluteUrl(gaivotaSeries.hubPath));
    for (const episode of gaivotaEpisodes) {
      if (!episode.pagePath) continue;
      expect(urls).toContain(absoluteUrl(episode.pagePath));
    }
    expect(getGoogleSitemapComicPaths().length).toBe(1 + gaivotaEpisodes.filter((ep) => ep.pagePath).length);

    for (const slug of GOOGLE_SITEMAP_INTENT_SLUGS) {
      expect(urls).toContain(absoluteUrl(`/${slug}`));
    }
    expect(urls).not.toContain(absoluteUrl("/cursor-rules-for-indie-hackers"));

    for (const slug of getGoogleSitemapBlogSlugs()) {
      expect(urls).toContain(absoluteUrl(`/blog/${slug}`));
    }

    expect(urls).toContain(absoluteUrl("/anki-starter-kit"));
    expect(urls).toContain(absoluteUrl("/how-to-import-cfa-anki-deck"));
    expect(urls).toContain(absoluteUrl("/cfa-level-1-anki-deck-vs-curriculum"));
  });

  it("excludes legal, contact, and llms catalogs from Google sitemap", () => {
    const urls = sitemap().map((entry) => entry.url);

    for (const path of [
      "/privacy",
      "/terms",
      "/cookies",
      "/contact",
      "/llms.txt",
      "/llms-full.txt",
    ]) {
      expect(urls).not.toContain(absoluteUrl(path));
      expect(urls).not.toContain(`${siteConfig.url}${path}`);
    }

    // Citizenship blog posts stay live but out of Google sitemap noise.
    expect(urls).not.toContain(absoluteUrl("/blog/portugal-nationality-test"));
    expect(urls).not.toContain(absoluteUrl("/blog/us-naturalization-civics"));
  });

  it("lists only sitemap.xml in robots and blocks Googlebot llm UTM duplicates", () => {
    const config = robots();
    expect(config.sitemap).toEqual([`${siteConfig.url}/sitemap.xml`]);
    expect(config.sitemap).not.toContain(`${siteConfig.url}/llms.txt`);
    expect(config.sitemap).not.toContain(`${siteConfig.url}/llms-full.txt`);
    expect(config.sitemap).not.toContain(`${siteConfig.url}/llm-sitemap.xml`);

    const googleRule = Array.isArray(config.rules)
      ? config.rules.find((rule) => rule.userAgent === "Googlebot")
      : undefined;
    expect(googleRule?.allow).toBe("/");
    expect(googleRule?.disallow).toEqual(["/*?utm_source=llm"]);
  });
});
