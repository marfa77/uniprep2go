import { describe, expect, it } from "vitest";
import {
  CITIZENSHIP_GUIDE_PILOT_SLUGS,
  getCitizenshipGuideContent,
  isCitizenshipGuidePilot,
} from "./citizenship-guide-content";

describe("citizenship guide pilots", () => {
  it("defines evergreen guide content for the three launch pilots", () => {
    for (const slug of CITIZENSHIP_GUIDE_PILOT_SLUGS) {
      expect(isCitizenshipGuidePilot(slug)).toBe(true);
      const guide = getCitizenshipGuideContent(slug);
      expect(guide?.rows.length).toBeGreaterThanOrEqual(5);
      expect(guide?.failTraps.length).toBeGreaterThanOrEqual(4);
      expect(guide?.languageVsCivics.paragraphs.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("hides deck CTA on Finland mock-only pathway", () => {
    const finland = getCitizenshipGuideContent("finland-kansalaisuuskoe-readiness-check");
    expect(finland?.deckCta).toBe("hidden");
  });

  it("shows live deck CTA on Life in the UK and LiD pilots", () => {
    expect(getCitizenshipGuideContent("life-in-the-uk-readiness-check")?.deckCta).toBe("live");
    expect(getCitizenshipGuideContent("leben-in-deutschland-readiness-check")?.deckCta).toBe("live");
  });

  it("returns null for non-pilot citizenship mocks", () => {
    expect(getCitizenshipGuideContent("norway-statsborgerproven-readiness-check")).toBeNull();
    expect(isCitizenshipGuidePilot("norway-statsborgerproven-readiness-check")).toBe(false);
  });
});
