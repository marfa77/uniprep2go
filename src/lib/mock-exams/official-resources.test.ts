import { describe, expect, it } from "vitest";
import { getAllMockExams, getMockExamConfig } from "./configs";
import { getMockOfficialResources } from "./official-resources";

describe("getMockOfficialResources", () => {
  it("resolves FINRA SIE to the official SIE page", () => {
    const config = getMockExamConfig("sie-full-mock");
    expect(config).not.toBeNull();
    const resources = getMockOfficialResources(config!);
    expect(resources.certifier).toMatch(/FINRA/i);
    expect(resources.verifyAtUrl).toContain("finra.org");
    expect(resources.sources.length).toBeGreaterThan(0);
    expect(resources.sources.every((source) => source.url.startsWith("https://"))).toBe(true);
  });

  it("resolves PTCB from exam-facts profile when linked", () => {
    const config = getMockExamConfig("ptcb-pharmacy-technician-mock");
    expect(config).not.toBeNull();
    const resources = getMockOfficialResources(config!);
    expect(resources.verifyAtUrl).toContain("ptcb.org");
    expect(resources.certifier).toMatch(/PTCB|Pharmacy Technician/i);
  });

  it("resolves CDL / FMCSA for transport mocks", () => {
    const config = getMockExamConfig("cdl-general-knowledge-readiness-check");
    expect(config).not.toBeNull();
    const resources = getMockOfficialResources(config!);
    expect(resources.verifyAtUrl).toContain("fmcsa.dot.gov");
  });

  it("resolves Florida real estate to DBPR", () => {
    const config = getMockExamConfig("fl-real-estate-readiness-check");
    expect(config).not.toBeNull();
    const resources = getMockOfficialResources(config!);
    expect(resources.verifyAtUrl).toMatch(/floridalicense|myfloridalicense/i);
  });

  it("gives every mock a certifier name and https verify URL when known", () => {
    const mocks = getAllMockExams();
    expect(mocks.length).toBeGreaterThan(100);

    let withVerifyUrl = 0;
    for (const config of mocks) {
      const resources = getMockOfficialResources(config);
      expect(resources.certifier.length).toBeGreaterThan(2);
      expect(resources.trustLine.length).toBeGreaterThan(40);
      if (resources.verifyAtUrl) {
        withVerifyUrl += 1;
        expect(resources.verifyAtUrl.startsWith("https://")).toBe(true);
      }
      for (const source of resources.sources) {
        expect(source.url.startsWith("https://")).toBe(true);
        expect(source.label.length).toBeGreaterThan(2);
      }
    }

    // Every catalog mock should resolve an outbound official URL.
    expect(withVerifyUrl).toBe(mocks.length);
  });
});
