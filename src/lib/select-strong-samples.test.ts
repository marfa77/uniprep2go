import { describe, expect, it } from "vitest";
import { sanitizeStem, scoreCivicQa, scoreMcq } from "./select-strong-samples";

describe("sanitizeStem", () => {
  it("strips mock-writer wrappers", () => {
    expect(sanitizeStem("On the PTCB / PTCE Mock, what is a common brand name for Tamsulosin? Select the best answer.")).toBe(
      "What is a common brand name for Tamsulosin?",
    );
    expect(
      sanitizeStem("Which benefits are most characteristic of Medicare Part B coverage on a life/health licensing exam?"),
    ).toBe("Which benefits are most characteristic of Medicare Part B coverage?");
    expect(sanitizeStem("In SIE products and risks, when is mutual fund NAV calculated?")).toBe(
      "When is mutual fund NAV calculated?",
    );
  });
});

describe("scoreCivicQa", () => {
  it("rejects exam-format meta questions", () => {
    expect(scoreCivicQa("Wie viele Fragen hat der Einbürgerungstest?", "33 Fragen")).toBeLessThan(0);
  });

  it("scores a real civics question", () => {
    expect(
      scoreCivicQa(
        "Deutschland ist ein Rechtsstaat. Was ist damit gemeint?",
        "Alle Einwohner und der Staat müssen sich an die Gesetze halten.",
      ),
    ).toBeGreaterThan(15);
  });
});

describe("scoreMcq", () => {
  it("rejects FDIC template distractors", () => {
    expect(
      scoreMcq({
        prompt: "What is fiduciary duty in real estate?",
        options: [
          { id: "a", text: "Loyalty to the client" },
          { id: "b", text: "FDIC deposit insurance covers this concept" },
        ],
        correctOptionId: "a",
      }),
    ).toBeLessThanOrEqual(2);
  });
});
