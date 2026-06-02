import { describe, expect, it, vi, beforeEach } from "vitest";

const recordFunnelEvent = vi.fn(async () => undefined);

vi.mock("@/lib/funnel-store", () => ({ recordFunnelEvent }));

describe("POST /api/mock-exams/interest", () => {
  beforeEach(() => {
    recordFunnelEvent.mockClear();
  });

  it("records interest for a known mock and derives deck slug from config", async () => {
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
        verdict: "NO PASS",
      }),
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.ok).toBe(true);
    expect(recordFunnelEvent).toHaveBeenCalledTimes(1);
    expect(recordFunnelEvent.mock.calls[0]?.[0]).toMatchObject({
      name: "mock_unlock_interest",
      deckSlug: "series-7-anki-deck",
      source: "mock:series-7-readiness-check:interest:NO PASS",
      country: "US",
    });
  });

  it("rejects unknown or overlong mock slugs", async () => {
    const { POST } = await import("./route");
    const request = new Request("https://uniprep2go.study/api/mock-exams/interest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mockSlug: "x".repeat(121) }),
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
    expect(recordFunnelEvent).not.toHaveBeenCalled();
  });
});
