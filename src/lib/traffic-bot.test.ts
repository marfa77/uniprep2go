import { describe, expect, it } from "vitest";
import { isBotUserAgent, isSpoofedBrowserFingerprint } from "./traffic-bot";

describe("traffic bot detection", () => {
  it("flags common crawlers and automation user agents", () => {
    expect(isBotUserAgent("Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)")).toBe(
      true,
    );
    expect(isBotUserAgent("Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.0)")).toBe(
      true,
    );
    expect(isBotUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 HeadlessChrome/120.0.0.0")).toBe(
      true,
    );
    expect(isBotUserAgent("UniPrep2Go-SEO-Audit/1.0")).toBe(true);
    expect(isBotUserAgent("curl/8.4.0")).toBe(true);
  });

  it("allows normal browser user agents", () => {
    expect(
      isBotUserAgent(
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      ),
    ).toBe(false);
    expect(isBotUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15")).toBe(
      false,
    );
  });

  it("does not treat missing user agents as bots", () => {
    expect(isBotUserAgent(undefined)).toBe(false);
    expect(isBotUserAgent("")).toBe(false);
    expect(isBotUserAgent("   ")).toBe(false);
  });

  it("flags the square 1366x1366 data-center Chrome fingerprint", () => {
    expect(isSpoofedBrowserFingerprint({ screen: "1366x1366" })).toBe(true);
    expect(isSpoofedBrowserFingerprint({ screen: "1920x1920" })).toBe(true);
  });

  it("keeps real phone, tablet, and desktop screens", () => {
    for (const screen of ["402x874", "1920x1080", "1024x1366", "1366x768", "800x800", "", undefined]) {
      expect(isSpoofedBrowserFingerprint({ screen })).toBe(false);
    }
    expect(isSpoofedBrowserFingerprint(undefined)).toBe(false);
  });
});
