import { describe, expect, it, vi, beforeEach } from "vitest";

const recordFunnelEvent = vi.fn(async () => undefined);
const notifyMockInterest = vi.fn(async () => true);

vi.mock("@/lib/funnel-store", () => ({ recordFunnelEvent }));
vi.mock("@/lib/telegram-notify", () => ({ notifyMockInterest }));
vi.mock("@/lib/mock-exams/access", () => ({
  getMockAccessState: (mockSlug: string) => ({
    mockSlug,
    accessMode: "coming_soon",
    fullReportUnlocked: false,
    interestCaptureEnabled: true,
    ctaLabel: "Notify me when this launches",
    ctaDescription: "Leave your email and we will notify you.",
  }),
}));

describe("POST /api/mock-exams/interest", () => {
  beforeEach(() => {
    recordFunnelEvent.mockClear();
    notifyMockInterest.mockClear();
  });

  it("records interest for a known mock and forwards email to Telegram", async () => {
    const { POST } = await import("./route");
    const request = new Request("https://uniprep2go.study/api/mock-exams/interest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-vercel-ip-country": "US",
        "accept-language": "en-US,en;q=0.9",
      },
      body: JSON.stringify({
        mockSlug: "series-7-readiness-check",
        deckSlug: "attacker-controlled-deck",
        email: "learner@example.com",
        verdict: "NO PASS",
      }),
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.ok).toBe(true);
    expect(notifyMockInterest).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "mock_unlock_interest",
        deckSlug: "series-7-anki-deck",
        source: "mock:series-7-readiness-check:interest:NO PASS",
        country: "US",
      }),
      expect.objectContaining({ slug: "series-7-readiness-check" }),
      "learner@example.com",
    );
    expect(recordFunnelEvent).toHaveBeenCalledTimes(1);
  });

  it("rejects interest without a valid email", async () => {
    const { POST } = await import("./route");
    const request = new Request("https://uniprep2go.study/api/mock-exams/interest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mockSlug: "series-7-readiness-check" }),
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
    expect(notifyMockInterest).not.toHaveBeenCalled();
    expect(recordFunnelEvent).not.toHaveBeenCalled();
  });

  it("rejects unknown or overlong mock slugs", async () => {
    const { POST } = await import("./route");
    const request = new Request("https://uniprep2go.study/api/mock-exams/interest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mockSlug: "x".repeat(121), email: "learner@example.com" }),
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
    expect(recordFunnelEvent).not.toHaveBeenCalled();
  });
});
