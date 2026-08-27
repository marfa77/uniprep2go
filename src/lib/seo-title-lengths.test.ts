import type { Metadata } from "next";
import { describe, expect, it } from "vitest";
import { getAllBlogPosts } from "./blog";
import { gaivotaEpisodePageTitle, gaivotaEpisodes, gaivotaHubPageTitle } from "./gaivota-comics";
import { getAllMockExams } from "./mock-exams/configs";
import { buildMockSeoTitle } from "./mock-exams/seo";
import { MOCK_VERTICALS } from "./mock-exams/taxonomy";
import {
  fitSeoTitle,
  leafPageTitle,
  SERP_TITLE_ABSOLUTE_MAX,
  SEO_TITLE_MAX,
  SEO_TITLE_TEMPLATE_SUFFIX,
  templatePageTitle,
} from "./seo";

function absoluteTitle(title: Metadata["title"]): string {
  if (typeof title === "string") {
    return title;
  }
  if (title && typeof title === "object" && "absolute" in title && typeof title.absolute === "string") {
    return title.absolute;
  }
  return "";
}

function renderedTemplateTitle(title: string): string {
  return `${templatePageTitle(title)}${SEO_TITLE_TEMPLATE_SUFFIX}`;
}

describe("SERP title lengths", () => {
  it("keeps absolute leaf titles within SERP_TITLE_ABSOLUTE_MAX", () => {
    const leafTitles: Metadata["title"][] = [
      leafPageTitle("Exam Prep Guides | Citizenship, SIE, ServSafe"),
      leafPageTitle("Free Mock Exams 2026 | SIE, CFA, FRM, ServSafe & More"),
      leafPageTitle("Language Exam Anki Decks | CIPLE, DELE, DELF, NT2"),
      leafPageTitle("Anki Starter Kit | Use Prep2Go Deck in 15 Min"),
      leafPageTitle("Cursor Rules for Indie Hackers | .mdc Ship Kit"),
      gaivotaHubPageTitle(),
      ...gaivotaEpisodes.map((episode) => gaivotaEpisodePageTitle(episode.id)),
    ];

    for (const title of leafTitles) {
      const rendered = absoluteTitle(title);
      expect(rendered.length, rendered).toBeLessThanOrEqual(SERP_TITLE_ABSOLUTE_MAX);
    }
  });

  it("keeps template titles within SERP limit after layout suffix", () => {
    for (const title of ["Contact", "Privacy Policy", "Terms of Service"]) {
      expect(renderedTemplateTitle(title).length).toBeLessThanOrEqual(SERP_TITLE_ABSOLUTE_MAX);
    }
  });

  it("keeps mock, blog post, and vertical SEO titles within limits", () => {
    for (const mock of getAllMockExams()) {
      expect(buildMockSeoTitle(mock).length).toBeLessThanOrEqual(SERP_TITLE_ABSOLUTE_MAX);
    }

    for (const post of getAllBlogPosts()) {
      expect(fitSeoTitle(post.titleTag, SERP_TITLE_ABSOLUTE_MAX).length).toBeLessThanOrEqual(
        SERP_TITLE_ABSOLUTE_MAX,
      );
    }

    for (const vertical of MOCK_VERTICALS) {
      expect(
        fitSeoTitle(vertical.seoTitle, SERP_TITLE_ABSOLUTE_MAX).length,
      ).toBeLessThanOrEqual(SERP_TITLE_ABSOLUTE_MAX);
    }
  });

  it("documents template-part budget before layout suffix", () => {
    expect(SEO_TITLE_MAX).toBeLessThan(SERP_TITLE_ABSOLUTE_MAX);
    expect(SEO_TITLE_TEMPLATE_SUFFIX).toBe(" | UniPrep2Go");
  });
});
