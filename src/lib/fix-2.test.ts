import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { getBlogPostBySlug } from "./blog";
import { getDeckBySlug } from "./decks";
import { buildDeckSeoTitle } from "./deck-seo";
import { getMockExamConfig } from "./mock-exams/configs";

describe("Fix pass 2 (24 Nov 2026)", () => {
  it("RD deck title year token, Sweden meta, Denmark H1", () => {
    expect(buildDeckSeoTitle(getDeckBySlug("rd-exam-anki-deck")! as never)).toContain("RD Exam Anki Deck 2027");
    expect(getBlogPostBySlug("sweden-medborgarskapsprov-2026-new-test")!.metaDescription).not.toMatch(/introduces a citizenship test in August 2026|Nobody knows/);
    expect(getBlogPostBySlug("denmark-indfoedsretsproeven-47-percent-pass-rate")!.title).toBe("Denmark Indfødsretsprøven: Format, Pass Rules and How to Prepare");
  });
  it("no unverified ServSafe 2020-handbook claim and no deck prices in niche explainers", () => {
    expect(getMockExamConfig("servsafe-manager-mock")!.officialSourceNote).not.toContain("2020 Examinee Handbook");
    for (const f of ["src/lib/exam-facts.ts", "src/lib/deck-money-page-content.ts"]) expect(readFileSync(f, "utf8")).not.toContain("2020 Examinee Handbook");
    expect(readFileSync("src/lib/mock-exams/niche-exam-explainers.ts", "utf8")).not.toContain("$9.99");
  });
});
