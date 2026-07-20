import { cookies } from "next/headers";
import { LEARN_SESSION_COOKIE, verifyLearnSession } from "@/lib/learn-access-token";
import { consumeLearnCredit } from "@/lib/learn-credits-store";
import { getMockExamConfig } from "@/lib/mock-exams/configs";
import { isLearnPassEnabled } from "@/lib/mock-exams/learn-pass";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!isLearnPassEnabled()) {
    return Response.json({ ok: false, message: "Not found" }, { status: 404 });
  }

  try {
    const body = (await request.json().catch(() => ({}))) as { mockSlug?: unknown };
    const mockSlug = typeof body.mockSlug === "string" ? body.mockSlug.trim() : "";
    if (!mockSlug || !getMockExamConfig(mockSlug)) {
      return Response.json({ ok: false, message: "Unknown mock exam." }, { status: 400 });
    }

    const jar = await cookies();
    const session = verifyLearnSession(jar.get(LEARN_SESSION_COOKIE)?.value);
    if (!session) {
      return Response.json(
        { ok: false, code: "no_session", message: "Redeem a Learn Pass license key first." },
        { status: 401 },
      );
    }

    const consumed = await consumeLearnCredit(session.licenseHash);
    if (!consumed.ok) {
      const status = consumed.reason === "store" ? 503 : 402;
      return Response.json(
        {
          ok: false,
          code: consumed.reason === "empty" || consumed.reason === "missing" ? "no_credits" : "store",
          message:
            consumed.reason === "store"
              ? "Learn Pass storage temporarily unavailable."
              : "No Learn passes left. Buy more on Gumroad.",
          remaining: 0,
        },
        { status },
      );
    }

    return Response.json({
      ok: true,
      remaining: consumed.remaining,
      mockSlug,
    });
  } catch (error) {
    console.error("[learn/start] failed", error);
    return Response.json({ ok: false, message: "Could not start Learn mode." }, { status: 500 });
  }
}
