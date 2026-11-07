import { claimFreeAttemptIp } from "@/lib/mock-exams/free-attempt-ip-store";
import { trustedClientIp } from "@/lib/mock-exams/free-attempt-ip";
import { isMockPaywallEnabled } from "@/lib/mock-exams/mock-pass";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    if (!isMockPaywallEnabled()) {
      return Response.json({ ok: true, open: true });
    }

    const ip = trustedClientIp(request.headers);
    if (!ip) {
      return Response.json({ ok: true, skipped: true });
    }

    const claim = await claimFreeAttemptIp(ip);
    if (claim === "used") {
      return Response.json(
        {
          ok: false,
          code: "free_used",
          message: "Your free mock is used. Unlock 5 more attempts to continue.",
        },
        { status: 402 },
      );
    }

    return Response.json({ ok: true, skipped: claim === "unavailable" });
  } catch (error) {
    console.error("[mock-exams/free-start] failed", error);
    return Response.json({ ok: true, skipped: true });
  }
}
