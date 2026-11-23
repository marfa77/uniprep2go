import { describe, expect, it } from "vitest";
import { getCfaLevel2FormulaPreview } from "./cfa-level-2-formula-preview";

describe("CFA Level 2 formula preview", () => {
  it("exposes at least 20 curriculum formulas across topics", () => {
    const preview = getCfaLevel2FormulaPreview();
    expect(preview.length).toBeGreaterThanOrEqual(20);
    const topics = new Set(preview.map((row) => row.topicLabel));
    expect(topics.size).toBe(10);
    expect(preview.every((row) => row.name.length > 3 && row.latex.length > 2)).toBe(true);
  });
});