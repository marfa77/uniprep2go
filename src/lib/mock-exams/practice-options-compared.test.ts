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
    expect(table!.rows.some((r) => /Practice Pack/.test(r.notes) && /Registered/.test(r.access))).toBe(true);
    expect(table!.sources.some((s) => s.url.includes("300hours.com"))).toBe(true);
  });

  it("returns a Life in the UK table from the published Home Office format", () => {
    const table = getPracticeOptionsCompared("life-in-the-uk-readiness-check");
    expect(table).not.toBeNull();
    expect(table!.checkedDate).toBe("2026-07-26");
    expect(table!.rows.some((r) => /24 multiple-choice/.test(r.format) && /£50/.test(r.access))).toBe(true);
    expect(table!.rows.some((r) => /60 questions/.test(r.format))).toBe(true);
    expect(table!.sources.some((s) => s.url.includes("gov.uk/life-in-the-uk-test"))).toBe(true);
  });

  it("returns SIE table with FINRA practice-test source", () => {
    const table = getPracticeOptionsCompared("sie-full-mock");
    expect(table).not.toBeNull();
    expect(table!.checkedDate).toBe("2026-10-23");
    expect(table!.rows.some((r) => /FINRA/i.test(r.name))).toBe(true);
    expect(table!.sources.some((s) => s.url.includes("finra.org"))).toBe(true);
  });

  it("returns a PTCE table from the PTCB practice-tools page", () => {
    const table = getPracticeOptionsCompared("ptcb-pharmacy-technician-mock");
    expect(table).not.toBeNull();
    expect(table!.checkedDate).toBe("2026-10-31");
    expect(table!.rows.some((r) => /Practice Bank/.test(r.name) && /\$65/.test(r.access))).toBe(true);
    expect(table!.rows.some((r) => /Pre-PTCE/.test(r.name) && /\$29/.test(r.access))).toBe(true);
    expect(table!.sources.some((s) => s.url.includes("ptcb.org/official-ptcb-practice-tools"))).toBe(true);
  });

  it("returns a Series 7 table from pages checked 2026-11-03", () => {
    const table = getPracticeOptionsCompared("series-7-readiness-check");
    expect(table).not.toBeNull();
    expect(table!.checkedDate).toBe("2026-11-03");
    expect(table!.rows.some((r) => r.name.includes("Series 7 practice test") && /60 questions/.test(r.format))).toBe(
      true,
    );
    expect(table!.rows.some((r) => /Achievable/.test(r.name) && /125 questions/.test(r.format))).toBe(true);
    expect(table!.rows.some((r) => /Kaplan/.test(r.name) && /\$139/.test(r.access))).toBe(true);
    expect(table!.sources.some((s) => s.url.includes("Series_7_Content_Outline.pdf"))).toBe(true);
  });

  it("returns a ServSafe Manager table from pages checked 2026-11-04", () => {
    const table = getPracticeOptionsCompared("servsafe-manager-mock");
    expect(table).not.toBeNull();
    expect(table!.checkedDate).toBe("2026-11-04");
    expect(table!.rows.some((r) => r.name.includes("ServSafe Manager practice test") && /90 questions/.test(r.format))).toBe(
      true,
    );
    expect(table!.rows.some((r) => /Effortless Math/.test(r.name) && /90/.test(r.format))).toBe(true);
    expect(table!.rows.some((r) => /LineCheck/.test(r.name) && /account/i.test(r.access))).toBe(true);
    expect(table!.sources.some((s) => s.url.includes("SSFS-Examinee-Handbook.pdf"))).toBe(true);
  });

  it("returns Series 63 and Series 65 tables from pages checked 2026-11-13", () => {
    const series63 = getPracticeOptionsCompared("series-63-readiness-check");
    expect(series63).not.toBeNull();
    expect(series63!.checkedDate).toBe("2026-11-13");
    expect(series63!.rows.some((r) => r.name.includes("Series 63 practice test") && /60 questions/.test(r.format))).toBe(
      true,
    );
    expect(series63!.rows.some((r) => /Achievable/.test(r.name) && /60 questions/.test(r.format))).toBe(true);
    expect(series63!.rows.some((r) => /Kaplan/.test(r.name) && /\$129/.test(r.access))).toBe(true);
    expect(series63!.rows.some((r) => /NASAA/.test(r.name) && /\$147/.test(r.access))).toBe(true);
    expect(series63!.sources.some((s) => s.url.includes("series-63-exam-content-outline"))).toBe(true);

    const series65 = getPracticeOptionsCompared("series-65-readiness-check");
    expect(series65).not.toBeNull();
    expect(series65!.checkedDate).toBe("2026-11-13");
    expect(series65!.rows.some((r) => r.name.includes("Series 65 practice test") && /120 questions/.test(r.format))).toBe(
      true,
    );
    expect(series65!.rows.some((r) => /Achievable/.test(r.name) && /130 questions/.test(r.format))).toBe(true);
    expect(series65!.rows.some((r) => /Kaplan/.test(r.name) && /\$289/.test(r.access) && /\$49/.test(r.access))).toBe(
      true,
    );
    expect(series65!.rows.some((r) => /NASAA/.test(r.name) && /\$187/.test(r.access))).toBe(true);
    expect(series65!.sources.some((s) => s.url.includes("series-65-exam-content-outline"))).toBe(true);
  });

  it("returns PMP and LEED Green Associate tables from pages checked 2026-11-14", () => {
    const pmp = getPracticeOptionsCompared("pmp-readiness-check");
    expect(pmp).not.toBeNull();
    expect(pmp!.checkedDate).toBe("2026-11-14");
    expect(pmp!.rows.some((r) => /51 questions/.test(r.format) && /70 minutes/.test(r.format))).toBe(true);
    expect(pmp!.rows.some((r) => /PMAspirant/.test(r.name) && /180-question/.test(r.format))).toBe(true);
    expect(pmp!.rows.some((r) => /exam day/.test(r.name) && /240 minutes/.test(r.format))).toBe(true);
    expect(pmp!.sources.some((s) => s.url.includes("pmi.org/certifications/project-management-pmp"))).toBe(true);

    const leed = getPracticeOptionsCompared("leed-green-associate-readiness-check");
    expect(leed).not.toBeNull();
    expect(leed!.checkedDate).toBe("2026-11-14");
    expect(leed!.rows.some((r) => /60 questions/.test(r.format) && /75 minutes/.test(r.format))).toBe(true);
    expect(leed!.rows.some((r) => /170 out of 200/.test(r.format) && /\$250/.test(r.access))).toBe(true);
    expect(leed!.sources.some((s) => s.url.includes("usgbc.org/credentials/exam-preparation"))).toBe(true);
  });

  it("returns null for mocks without a table", () => {
    expect(getPracticeOptionsCompared("nha-cpct-readiness-check")).toBeNull();
  });

  it("includes CDCP competitors checked 2026-11-07", () => {
    const table = getPracticeOptionsCompared("cdcp-readiness-check");
    expect(table?.checkedDate).toBe("2026-11-07");
    expect(table?.rows.some((r) => r.href.includes("open-exam-prep"))).toBe(true);
    expect(table?.rows[0]?.href).toContain("cdcp-readiness-check");
  });

  it("includes Finland kansalaisuuskoe competitors checked 2026-11-07", () => {
    const table = getPracticeOptionsCompared("finland-kansalaisuuskoe-readiness-check");
    expect(table?.checkedDate).toBe("2026-11-07");
    expect(table?.rows.some((r) => r.href.includes("migri.fi"))).toBe(true);
    expect(table?.rows.some((r) => r.href.includes("kansalaisuuskoulu"))).toBe(true);
    expect(table?.rows[0]?.href).toContain("finland-kansalaisuuskoe");
  });
});
