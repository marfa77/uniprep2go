import { describe, expect, it } from "vitest";
import { mockAccessSuffixFor, withMockAccessDisclosure } from "./mock-access-faq";
import { decks } from "../decks";
import { buildMockExamFaqs } from "./seo";
import { getMockExamConfig } from "./configs";

describe("mock access FAQ disclosure", () => {
  it("appends the one-free-mock rule to 'is there a free practice test' answers only", () => {
    const [free, other, done] = withMockAccessDisclosure([
      { question: "Is there a free PMP practice test?", answer: "Yes — take the 60-question check." },
      { question: "Is this free practice test the official NHA CPT exam?", answer: "No." },
      { question: "Is there a free GRE practice test?", answer: "Yes. Your first UniPrep2Go mock is free." },
    ]);
    expect(free.answer).toBe(`Yes — take the 60-question check. ${mockAccessSuffixFor("PMP")}`);
    expect(free.answer).toContain("including this PMP one, is free");
    expect(other.answer).toBe("No.");
    expect(done.answer).toBe("Yes. Your first UniPrep2Go mock is free.");
  });

  it("covers every catalog deck FAQ that promises a free practice test", () => {
    const offenders = decks.flatMap((deck) =>
      deck.faqs
        .filter((faq) => /^is there a free .*practice test/i.test(faq.question))
        .filter((faq) => !/first (UniPrep2Go )?(timed )?mock\b[^.;]{0,60}\bfree|first mock free/i.test(faq.answer))
        .map((faq) => `${deck.slug}: ${faq.question}`),
    );
    expect(offenders).toEqual([]);
  });

  it("states the rule in mock page FAQs", () => {
    const faqs = buildMockExamFaqs(getMockExamConfig("series-63-readiness-check")!);
    const free = faqs.find((faq) => /^Is there a free/i.test(faq.question));
    expect(free?.answer).toMatch(/first UniPrep2Go mock is free/);
    expect(faqs.some((faq) => /How many free attempts/i.test(faq.question))).toBe(true);
  });
});
