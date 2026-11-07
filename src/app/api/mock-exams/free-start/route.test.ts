import { beforeEach, describe, expect, it, vi } from "vitest";

const claim = vi.hoisted(() => vi.fn());

vi.mock("@/lib/mock-exams/free-attempt-ip-store", () => ({
  claimFreeAttemptIp: (ip: string) => claim(ip),
}));

import { POST } from "./route";

describe("POST /api/mock-exams/free-start", () => {
  beforeEach(() => {
    claim.mockReset();
    delete process.env.MOCK_PAYWALL;
  });

  it("returns free_used when this address already claimed the diagnostic", async () => {
    claim.mockResolvedValue("used");
    const res = await POST(
      new Request("https://uniprep2go.study/api/mock-exams/free-start", {
        method: "POST",
        headers: { "x-real-ip": "203.0.113.10", "content-type": "application/json" },
        body: "{}",
      }),
    );
    expect(res.status).toBe(402);
    expect(await res.json()).toMatchObject({ ok: false, code: "free_used" });
    expect(claim).toHaveBeenCalledWith("203.0.113.10");
  });

  it("lets the first address start", async () => {
    claim.mockResolvedValue("claimed");
    const res = await POST(
      new Request("https://uniprep2go.study/api/mock-exams/free-start", {
        method: "POST",
        headers: { "x-vercel-forwarded-for": "203.0.113.11, 198.51.100.1" },
      }),
    );
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ ok: true });
    expect(claim).toHaveBeenCalledWith("203.0.113.11");
  });

  it("does not claim when the paywall is off", async () => {
    process.env.MOCK_PAYWALL = "off";
    const res = await POST(
      new Request("https://uniprep2go.study/api/mock-exams/free-start", {
        method: "POST",
        headers: { "x-real-ip": "203.0.113.10" },
      }),
    );
    expect(res.status).toBe(200);
    expect(claim).not.toHaveBeenCalled();
  });
});
