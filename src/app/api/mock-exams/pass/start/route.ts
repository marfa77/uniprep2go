import { cookies } from "next/headers";
import { MOCK_PASS_COOKIE, verifyMockPassSession } from "@/lib/mock-pass-token";
import { consumeMockPassAttempt } from "@/lib/mock-pass-store";
import { getMockExamConfig } from "@/lib/mock-exams/configs";
import { isMockPaywallEnabled } from "@/lib/mock-exams/mock-pass";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as { mockSlug?: unknown };
    const mockSlug = typeof body.mockSlug === "string" ? body.mockSlug.trim() : "";
    if (!mockSlug || !getMockExamConfig(mockSlug)) {
      return Response.json({ ok: false, message: "Unknown mock exam." }, { status: 400 });
    }

    if (!isMockPaywallEnabled()) {
      return Response.json({ ok: true, remaining: 0, open: true, mockSlug });
    }

    const jar = await cookies();
    const session = verifyMockPassSession(jar.get(MOCK_PASS_COOKIE)?.value);
    if (!session) {
      return Response.json(
        { ok: false, code: "no_pass", message: "Your free mock is used. Unlock 5 more attempts to continue.", remaining: 0 },
        { status: 402 },
      );
    }

    const consumed = await consumeMockPassAttempt(session.licenseHash);
    if (!consumed.ok) {
      if (consumed.reason === "store") {
        return Response.json(
          { ok: false, code: "store", message: "Could not check your attempts right now. Try again in a minute." },
          { status: 503 },
        );
      }
      return Response.json(
        { ok: false, code: "no_attempts", message: "All attempts on this Mock Pass are used. Get 5 more to continue.", remaining: 0 },
        { status: 402 },
      );
    }

    return Response.json({ ok: true, remaining: consumed.remaining, mockSlug });
  } catch (error) {
    console.error("[mock-pass/start] failed", error);
    return Response.json({ ok: false, code: "error", message: "Could not start the mock. Try again." }, { status: 500 });
  }
}
