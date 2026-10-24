import { describe, expect, it } from "vitest";
import { getPracticeOptionsCompared } from "./practice-options-compared";

describe("getPracticeOptionsCompared", () => {
  it("returns CFA L1 table with checked date and sources", () => {
    const table = getPracticeOptionsCompared("cfa-level-1-readiness-check");
    expect(table).not.toBeNull();
    expect(table!.checkedDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(table!.rows.length).toBeGreaterThanOrEqual(3);
    expect(table!.sources.length).toBeGreaterThanOrEqual(2);
    expect(table!.rows.every((r) => r.href && r.format && r.access)).toBe(true);
    expect(table!.checkedDate).toBe("2026-10-24");
    expect(table!.rows.some((r) => /180/.test(r.format))).toBe(true);
  });

  it("returns a CFA L2 table aimed at the practice-exam query", () => {
    const table = getPracticeOptionsCompared("cfa-level-2-readiness-check");
    expect(table).not.toBeNull();
    expect(table!.checkedDate).toBe("2026-10-24");
    expect(table!.rows.some((r) => r.name.includes("CFA Level 2 practice exam"))).toBe(true);
    expect(table!.rows.some((r) => /300 Hours/i.test(r.name))).toBe(true);
    expect(table!.sources.some((s) => s.url.includes("300hours.com"))).toBe(true);
  });

  it("returns SIE table with FINRA practice-test source", () => {
    const table = getPracticeOptionsCompared("sie-full-mock");
    expect(table).not.toBeNull();
    expect(table!.checkedDate).toBe("2026-10-23");
    expect(table!.rows.some((r) => /FINRA/i.test(r.name))).toBe(true);
    expect(table!.sources.some((s) => s.url.includes("finra.org"))).toBe(true);
  });

  it("returns null for mocks without a table", () => {
    expect(getPracticeOptionsCompared("nha-cpct-readiness-check")).toBeNull();
  });
});
