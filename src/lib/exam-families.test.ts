import { describe, expect, it } from "vitest";
import { getAllMockExams } from "./mock-exams/configs";
import { availableDecks, getDeckBySlug } from "./decks";
import { shouldIndexDeck, shouldIndexMockExam } from "./seo";
import {
  EXAM_FAMILIES,
  expectedDeckMemberHub,
  getExamFamilyForMock,
  getFamilyHubLinkForDeck,
  getFamilyHubLinkForMock,
  getRelatedForDeck,
  getRelatedForMock,
  type RelatedLink,
} from "./exam-families";
import { getMockExamConfig } from "./mock-exams/configs";

const FINRA_MOCK_SLUGS = [
  "sie-full-mock",
  "sie-quick-diagnostic",
  "series-6-readiness-check",
  "series-7-readiness-check",
  "series-63-readiness-check",
  "series-65-readiness-check",
  "series-66-readiness-check",
  "series-79-readiness-check",
  "series-99-readiness-check",
] as const;

function anchorsOf(links: RelatedLink[]): string[] {
  return links.map((l) => l.anchor);
}

function hrefsOf(links: RelatedLink[]): string[] {
  return links.map((l) => l.href);
}

describe("EXAM_FAMILIES", () => {
  it("defines 32 families", () => {
    expect(EXAM_FAMILIES).toHaveLength(32);
    expect(new Set(EXAM_FAMILIES.map((f) => f.id)).size).toBe(32);
    for (const family of EXAM_FAMILIES) {
      expect(family.hubHref.startsWith("/")).toBe(true);
      expect(family.members.length).toBeGreaterThan(0);
    }
  });

  it("matches hubHref to every member vertical or category hub when the family is unanimous", () => {
    for (const family of EXAM_FAMILIES) {
      const mockVerticals = new Set(
        family.members
          .map((m) => m.mock)
          .filter(Boolean)
          .map((slug) => getMockExamConfig(slug!)!.verticalId),
      );
      const deckHubs = new Set(
        family.members
          .map((m) => m.deck)
          .filter(Boolean)
          .map((slug) => family.deckHubHref ?? expectedDeckMemberHub(slug!)),
      );

      if (mockVerticals.size === 1 && deckHubs.size === 0) {
        expect(family.hubHref, family.id).toBe(
          `/mock-exams/v/${[...mockVerticals][0]}`,
        );
      }
      if (deckHubs.size === 1 && mockVerticals.size === 0) {
        expect(family.hubHref, family.id).toBe([...deckHubs][0]);
      }
      if (mockVerticals.size === 1 && deckHubs.size === 1) {
        const mockHub = `/mock-exams/v/${[...mockVerticals][0]}`;
        const deckHub = [...deckHubs][0];
        if (mockHub === deckHub) {
          expect(family.hubHref, family.id).toBe(mockHub);
        } else {
          expect(family.mockHubHref ?? family.hubHref, family.id).toBe(mockHub);
          if (family.deckHubHref) {
            expect(family.deckHubHref, family.id).toBe(deckHub);
          }
        }
      }
    }
  });

  it("aligns every family member hub CTA with its vertical or category hub", () => {
    for (const family of EXAM_FAMILIES) {
      for (const member of family.members) {
        if (member.mock && shouldIndexMockExam(member.mock)) {
          const config = getMockExamConfig(member.mock);
          expect(config, member.mock).toBeDefined();
          const link = getFamilyHubLinkForMock(member.mock);
          expect(link?.href, `${family.id} mock ${member.mock}`).toBe(
            `/mock-exams/v/${config!.verticalId}`,
          );
        }
        if (member.deck) {
          const deck = getDeckBySlug(member.deck);
          if (!deck || !shouldIndexDeck(deck)) {
            continue;
          }
          const link = getFamilyHubLinkForDeck(member.deck);
          const expected = family.deckHubHref ?? expectedDeckMemberHub(member.deck);
          expect(link?.href, `${family.id} deck ${member.deck}`).toBe(expected);
        }
      }
    }
  });

  it("uses single mockHubHref when every mock member shares one vertical", () => {
    for (const family of EXAM_FAMILIES) {
      const mocks = family.members.map((m) => m.mock).filter(Boolean) as string[];
      if (mocks.length === 0) {
        continue;
      }
      const verticals = new Set(
        mocks.map((slug) => getMockExamConfig(slug)!.verticalId),
      );
      if (verticals.size !== 1) {
        continue;
      }
      const mockHub = family.mockHubHref ?? family.hubHref;
      expect(mockHub, family.id).toBe(`/mock-exams/v/${[...verticals][0]}`);
    }
  });

  it("uses single deckHubHref when every deck member shares one category hub", () => {
    for (const family of EXAM_FAMILIES) {
      const decks = family.members.map((m) => m.deck).filter(Boolean) as string[];
      if (decks.length === 0) {
        continue;
      }
      const hubs = new Set(
        decks.map((slug) => family.deckHubHref ?? expectedDeckMemberHub(slug)),
      );
      if (hubs.size !== 1 || !family.deckHubHref) {
        continue;
      }
      expect(family.deckHubHref, family.id).toBe([...hubs][0]);
    }
  });

  it("uses finance mock hub and finance deck hub for finance-credentials", () => {
    expect(getFamilyHubLinkForMock("cfa-level-1-readiness-check")?.href).toBe(
      "/mock-exams/v/finance",
    );
    expect(getFamilyHubLinkForDeck("cfa-level-1-anki-deck")?.href).toBe("/finance-anki-decks");
    expect(getFamilyHubLinkForDeck("pmp-anki-deck")?.href).toBe("/mock-exams/v/building");
    expect(getFamilyHubLinkForMock("pmp-readiness-check")?.href).toBe("/mock-exams/v/building");
    expect(getFamilyHubLinkForMock("ardms-spi-readiness-check")?.href).toBe("/mock-exams/v/imaging");
  });
});

describe("getRelatedForMock", () => {
  it("returns 4–6 indexable links with no self-links or duplicates for every indexable mock", () => {
    for (const mock of getAllMockExams()) {
      if (!shouldIndexMockExam(mock.slug)) {
        continue;
      }
      const related = getRelatedForMock(mock.slug);
      expect(related.length, mock.slug).toBeGreaterThanOrEqual(4);
      expect(related.length, mock.slug).toBeLessThanOrEqual(6);
      const hrefs = hrefsOf(related);
      expect(new Set(hrefs).size, mock.slug).toBe(hrefs.length);
      expect(hrefs, mock.slug).not.toContain(`/mock-exams/${mock.slug}`);
      for (const href of hrefs) {
        if (href.startsWith("/mock-exams/")) {
          const slug = href.replace("/mock-exams/", "");
          expect(shouldIndexMockExam(slug), `${mock.slug} → ${slug}`).toBe(true);
        } else {
          const slug = href.replace("/decks/", "");
          const deck = getDeckBySlug(slug);
          expect(deck, `${mock.slug} → ${slug}`).toBeDefined();
          expect(shouldIndexDeck(deck!), `${mock.slug} → ${slug}`).toBe(true);
        }
      }
    }
  });

  it("includes SIE full mock on every indexable FINRA family mock page", () => {
    for (const slug of FINRA_MOCK_SLUGS) {
      if (!shouldIndexMockExam(slug)) {
        continue;
      }
      expect(getExamFamilyForMock(slug)?.id).toBe("finra");
      const related = getRelatedForMock(slug);
      if (slug === "sie-full-mock") {
        expect(related.some((l) => l.href.includes("sie-full-mock"))).toBe(false);
        continue;
      }
      expect(related.some((l) => l.href === "/mock-exams/sie-full-mock"), slug).toBe(true);
    }
  });

  it("puts linked deck first when indexable", () => {
    const related = getRelatedForMock("series-7-readiness-check");
    expect(related[0]?.href).toBe("/decks/series-7-anki-deck");
  });

  it("matches related anchor snapshots", () => {
    expect(anchorsOf(getRelatedForMock("sie-full-mock"))).toMatchSnapshot();
    expect(anchorsOf(getRelatedForMock("series-7-readiness-check"))).toMatchSnapshot();
    expect(anchorsOf(getRelatedForMock("cfa-level-1-readiness-check"))).toMatchSnapshot();
    expect(anchorsOf(getRelatedForMock("nclex-rn-readiness-check"))).toMatchSnapshot();
    expect(anchorsOf(getRelatedForMock("leed-green-associate-readiness-check"))).toMatchSnapshot();
  });
});

describe("getRelatedForDeck", () => {
  it("returns 4–6 indexable links with no self-links or duplicates for every indexable deck", () => {
    for (const deck of availableDecks) {
      if (!shouldIndexDeck(deck)) {
        continue;
      }
      const related = getRelatedForDeck(deck.slug);
      expect(related.length, deck.slug).toBeGreaterThanOrEqual(4);
      expect(related.length, deck.slug).toBeLessThanOrEqual(6);
      const hrefs = hrefsOf(related);
      expect(new Set(hrefs).size, deck.slug).toBe(hrefs.length);
      expect(hrefs, deck.slug).not.toContain(`/decks/${deck.slug}`);
      for (const href of hrefs) {
        if (href.startsWith("/decks/")) {
          const slug = href.replace("/decks/", "");
          const target = getDeckBySlug(slug);
          expect(target, `${deck.slug} → ${slug}`).toBeDefined();
          expect(shouldIndexDeck(target!), `${deck.slug} → ${slug}`).toBe(true);
        } else {
          const slug = href.replace("/mock-exams/", "");
          expect(shouldIndexMockExam(slug), `${deck.slug} → ${slug}`).toBe(true);
        }
      }
    }
  });

  it("includes SIE full mock on every indexable FINRA family deck page", () => {
    const finraDecks = [
      "sie-exam-anki-deck",
      "series-6-anki-deck",
      "series-7-anki-deck",
      "series-63-anki-deck",
    ] as const;
    for (const slug of finraDecks) {
      const deck = getDeckBySlug(slug);
      if (!deck || !shouldIndexDeck(deck)) {
        continue;
      }
      const related = getRelatedForDeck(slug);
      expect(related.some((l) => l.href === "/mock-exams/sie-full-mock"), slug).toBe(true);
    }
  });
});