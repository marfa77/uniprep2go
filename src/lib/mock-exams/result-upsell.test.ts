import { describe, expect, it } from "vitest";
import { getExamFactsProfileForDeck } from "../exam-facts";
import { applyDiagnosticOffer } from "./diagnostic-offer";
import { buildResultUpsell, diagnosticTopicLabel, officialPassLineFromFacts } from "./result-upsell";
import type { MockTopicResult } from "./types";

function topic(label: string, misses: number, total = 6): MockTopicResult {
  return {
    topicId: label,
    label,
    weightPercent: 25,
    targetPercent: 70,
    correct: total - misses,
    total,
    scorePercent: Math.round(((total - misses) / total) * 100),
    status: "on_track",
    missedQuestionIds: Array.from({ length: misses }, (_, i) => `${label}-${i}`),
  };
}

function plan(topics: MockTopicResult[]) {
  return topics
    .filter((t) => t.scorePercent < t.targetPercent)
    .sort((a, b) => b.targetPercent - b.scorePercent - (a.targetPercent - a.scorePercent))
    .map((t) => ({ topicId: t.topicId, topicLabel: t.label, scorePercent: t.scorePercent, targetPercent: t.targetPercent, action: "" }));
}

describe("free diagnostic topic labels", () => {
  it("never judges a topic on fewer than 3 questions", () => {
    expect(diagnosticTopicLabel({ total: 2, scorePercent: 0 })).toBe("too_few");
    expect(diagnosticTopicLabel({ total: 4, scorePercent: 25 })).toBe("needs_work");
    expect(diagnosticTopicLabel({ total: 4, scorePercent: 50 })).toBe("borderline");
    expect(diagnosticTopicLabel({ total: 3, scorePercent: 100 })).toBe("on_track");
  });
});

describe("result upsell", () => {
  it("uses the concrete PTCE pass line from exam facts", () => {
    const line = officialPassLineFromFacts(getExamFactsProfileForDeck("ptcb-pharmacy-technician-anki-deck")?.exam_facts);
    expect(line).toEqual({
      examName: "Pharmacy Technician Certification Exam (PTCE)",
      passingScore: "1,400 scaled score",
      questionCount: 90,
    });
  });

  it("skips vague pass lines", () => {
    expect(
      officialPassLineFromFacts({ exam_name: "X", administered_by: "Y", verify_at_url: "", passing_score: "Not published by NFPA" }),
    ).toBeUndefined();
  });

  it("does not reassure a PASS on the free diagnostic", () => {
    const topicResults = [topic("Medications", 4), topic("Federal requirements", 2), topic("Patient safety", 0, 1)];
    const upsell = buildResultUpsell({
      report: {
        verdict: "PASS",
        scorePercent: 78,
        passThresholdPercent: 70,
        totalCount: 25,
        topicResults,
        repairPlan: plan(topicResults),
      },
      isFreeDiagnostic: true,
      fullQuestionCount: 90,
      examBody: "PTCB",
      officialPass: { examName: "PTCE", passingScore: "1,400 scaled score", questionCount: 90 },
      deck: { available: true, cardCount: 300, priceLabel: "$11" },
      passRemaining: 0,
      paywallEnabled: true,
    });
    expect(upsell.headline).toBe("You scored 78% — at or above the 70% target on the 25-question diagnostic.");
    expect(upsell.sampleNote).toBe(
      "Based on 25 questions (1–6 per topic) — a quick read, not a verdict. Run the full 90-question mock for a reliable topic score.",
    );
    expect(upsell.reality).toBe("But 25 questions are a sample, not your exam. Official PTCE pass mark: 1,400 scaled score on 90 questions.");
    expect(upsell.misses).toBe("Your biggest gaps: Medications, Federal requirements.");
    expect(upsell.close).toBe("Next step: keep these topics fresh with 300 spaced-repetition flashcards for $11 so the score holds on exam day.");
    expect(upsell.deckCtaLabel).toBe("Lock it in: 300 cards — $11");
    expect(upsell.mockCtaLabel).toBe("Confirm on the full 90-question mock · $5 for 5 attempts");
  });

  it("keeps a below-target free diagnostic amber and points at the full mock", () => {
    const topicResults = [topic("Medications", 4), topic("Federal requirements", 5)];
    const upsell = buildResultUpsell({
      report: { verdict: "NO PASS", scorePercent: 40, passThresholdPercent: 70, totalCount: 25, topicResults, repairPlan: plan(topicResults) },
      isFreeDiagnostic: true,
      fullQuestionCount: 90,
      examBody: "PTCB",
      deck: { available: true, cardCount: 300, priceLabel: "$11" },
      passRemaining: 0,
      paywallEnabled: true,
    });
    expect(upsell.tone).toBe("risk");
    expect(upsell.misses).toBe("Your biggest gaps: Federal requirements, Medications.");
    expect(upsell.close).toBe("Next step: drill these exact topics with 300 spaced-repetition flashcards for $11.");
    expect(upsell.mockCtaLabel).toBe("Take the full 90-question mock · $5 for 5 attempts");
  });

  it("falls back to the exam body and Mock Pass when no deck is on sale", () => {
    const topicResults = [topic("Law", 5)];
    const upsell = buildResultUpsell({
      report: { verdict: "NO PASS", scorePercent: 52, passThresholdPercent: 70, totalCount: 60, topicResults, repairPlan: plan(topicResults) },
      isFreeDiagnostic: false,
      fullQuestionCount: 60,
      examBody: "State board.",
      deck: { available: false },
      passRemaining: 3,
      paywallEnabled: true,
    });
    expect(upsell.tone).toBe("fail");
    expect(upsell.sampleNote).toBeNull();
    expect(upsell.reality).toBe("The real cut score is set by State board, not by this practice target. Close these gaps before you book or sit it.");
    expect(upsell.deckCtaLabel).toBeNull();
    expect(upsell.mockCtaLabel).toBe("Take the full 60-question mock · 3 attempts left");
  });

  it("shows the result-screen discount with the struck list price", () => {
    const upsell = buildResultUpsell({
      report: {
        verdict: "NO PASS",
        scorePercent: 50,
        passThresholdPercent: 70,
        totalCount: 25,
        topicResults: [topic("Medications", 3)],
        repairPlan: plan([topic("Medications", 3)]),
      },
      isFreeDiagnostic: true,
      fullQuestionCount: 90,
      examBody: "PTCB",
      deck: { available: true, cardCount: 300, priceLabel: "$8.80", fullPriceLabel: "$11", percentOff: 20 },
      passRemaining: 0,
      paywallEnabled: true,
    });
    expect(upsell.close).toBe(
      "Next step: drill these exact topics with 300 spaced-repetition flashcards for $8.80 (20% off after your diagnostic).",
    );
    expect(upsell.deckCtaLabel).toBe("Drill weak topics: 300 cards — $8.80");
    expect(upsell.deckCtaFullPrice).toBe("$11");
    expect(upsell.deckOfferNote).toMatch(/^20% off is applied automatically at Gumroad checkout/);
  });
});

describe("diagnostic offer", () => {
  it("does not add the offer code while the $9.99 price test is on", () => {
    expect(applyDiagnosticOffer("https://pixidstudio.gumroad.com/l/yvifxh?wanted=true", 11)).toBeNull();
  });

  it("ignores products without the code and non-Gumroad checkouts", () => {
    expect(applyDiagnosticOffer("https://pixidstudio.gumroad.com/l/not-a-linked-deck?wanted=true", 11)).toBeNull();
    expect(applyDiagnosticOffer("https://prep2go.study/shop/x", 11)).toBeNull();
    expect(applyDiagnosticOffer("https://pixidstudio.gumroad.com/l/yvifxh?wanted=true", 0)).toBeNull();
  });
});
