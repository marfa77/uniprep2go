import { describe, expect, it, vi, beforeEach } from "vitest";

const { recordFunnelEvent, notifyDeckWaitlistInterest } = vi.hoisted(() => ({
  recordFunnelEvent: vi.fn(async () => undefined),
  notifyDeckWaitlistInterest: vi.fn(async () => true),
}));

vi.mock("@/lib/funnel-store", () => ({ recordFunnelEvent }));
vi.mock("@/lib/telegram-notify", () => ({ notifyDeckWaitlistInterest }));

import { POST } from "./route";

describe("POST /api/decks/interest", () => {
  beforeEach(() => {
    recordFunnelEvent.mockClear();
    notifyDeckWaitlistInterest.mockClear();
  });

  it("requires a valid email and forwards it to Telegram", async () => {
    const request = new Request("https://uniprep2go.study/api/decks/interest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-vercel-ip-country": "US",
      },
      body: JSON.stringify({
        deckSlug: "cdl-general-knowledge-anki-deck",
        email: " Learner@Example.com ",
      }),
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.ok).toBe(true);
    expect(notifyDeckWaitlistInterest).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "deck_waitlist_interest",
        deckSlug: "cdl-general-knowledge-anki-deck",
      }),
      expect.objectContaining({ slug: "cdl-general-knowledge-anki-deck" }),
      "learner@example.com",
    );
    expect(recordFunnelEvent).toHaveBeenCalledTimes(1);
  });

  it("rejects missing or invalid email", async () => {
    const request = new Request("https://uniprep2go.study/api/decks/interest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        deckSlug: "cdl-general-knowledge-anki-deck",
        email: "not-an-email",
      }),
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
    expect(notifyDeckWaitlistInterest).not.toHaveBeenCalled();
    expect(recordFunnelEvent).not.toHaveBeenCalled();
  });
});
