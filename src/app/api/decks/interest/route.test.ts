import { describe, expect, it, vi, beforeEach } from "vitest";

const recordFunnelEvent = vi.fn(async () => undefined);
const notifyDeckWaitlistInterest = vi.fn(async () => true);

vi.mock("@/lib/funnel-store", () => ({ recordFunnelEvent }));
vi.mock("@/lib/telegram-notify", () => ({ notifyDeckWaitlistInterest }));

describe("POST /api/decks/interest", () => {
  beforeEach(() => {
    recordFunnelEvent.mockClear();
    notifyDeckWaitlistInterest.mockClear();
  });

  it("requires a valid email and forwards it to Telegram", async () => {
    const { POST } = await import("./route");
    const request = new Request("https://uniprep2go.study/api/decks/interest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-vercel-ip-country": "BE",
      },
      body: JSON.stringify({
        deckSlug: "belgium-wallonie-citoyennete-anki-deck",
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
        deckSlug: "belgium-wallonie-citoyennete-anki-deck",
      }),
      expect.objectContaining({ slug: "belgium-wallonie-citoyennete-anki-deck" }),
      "learner@example.com",
    );
    expect(recordFunnelEvent).toHaveBeenCalledTimes(1);
  });

  it("rejects missing or invalid email", async () => {
    const { POST } = await import("./route");
    const request = new Request("https://uniprep2go.study/api/decks/interest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        deckSlug: "belgium-wallonie-citoyennete-anki-deck",
        email: "not-an-email",
      }),
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
    expect(notifyDeckWaitlistInterest).not.toHaveBeenCalled();
    expect(recordFunnelEvent).not.toHaveBeenCalled();
  });
});
