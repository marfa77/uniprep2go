import { NextResponse } from "next/server";
import { shouldExcludeFunnelTraffic } from "@/lib/funnel-exclude";
import { getMockExamConfig } from "@/lib/mock-exams/configs";
import { isAgentUserAgent } from "@/lib/mock-exams/miss-cohort";
import { recordFirstExamMissCohort } from "@/lib/mock-exams/miss-cohort-store";

export const runtime = "nodejs";

function firstForwardedIp(value: string | null) {
  return value?.split(",")[0]?.trim() || undefined;
}

export async function POST(request: Request) {
  try {
    const userAgent = request.headers.get("user-agent");
    if (
      shouldExcludeFunnelTraffic({
        cookieHeader: request.headers.get("cookie"),
        clientIp:
          firstForwardedIp(request.headers.get("x-forwarded-for")) ??
          request.headers.get("x-real-ip") ??
          undefined,
        userAgent,
      }) ||
      isAgentUserAgent(userAgent)
    ) {
      return NextResponse.json({ recorded: false });
    }

    const body = (await request.json()) as {
      slug?: string;
      visitorId?: string;
      sessionMode?: string;
      topics?: Array<{ topicId?: string; correct?: number; total?: number }>;
    };

    if (body.sessionMode !== "exam") {
      return NextResponse.json({ recorded: false });
    }

    const slug = typeof body.slug === "string" ? body.slug : "";
    const visitorId = typeof body.visitorId === "string" ? body.visitorId : "";
    const config = getMockExamConfig(slug);
    if (!config || !Array.isArray(body.topics)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const allowed = new Set(config.topics.map((topic) => topic.id));
    const topicResults = body.topics.flatMap((row) => {
      if (typeof row.topicId !== "string" || !allowed.has(row.topicId)) return [];
      return [
        {
          topicId: row.topicId,
          correct: Number(row.correct) || 0,
          total: Number(row.total) || 0,
        },
      ];
    });

    const result = await recordFirstExamMissCohort({
      slug,
      visitorId,
      topicResults,
    });
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ recorded: false });
  }
}
