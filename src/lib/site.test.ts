import { describe, expect, it } from "vitest";
import { legalLinks, siteConfig } from "./site";

describe("site config", () => {
  it("exposes legal contact and policy links", () => {
    expect(siteConfig.contactEmail).toContain("@");
    expect(siteConfig.googleAnalyticsId).toBe("G-NDF8PVD7N3");
    expect(siteConfig.ahrefsAnalyticsKey).toBe("X11yI8gl/4QXmr55ol2GlA");
    expect(legalLinks.map((link) => link.href)).toEqual([
      "/privacy",
      "/terms",
      "/cookies",
      "/contact",
    ]);
  });
});
