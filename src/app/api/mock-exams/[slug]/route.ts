import { NextResponse } from "next/server";
import { buildMockExamFacts, getMockExamBySlug } from "@/lib/mock-exams/llm";

export const revalidate = 3600;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const config = getMockExamBySlug(slug);

  if (!config) {
    return NextResponse.json({ error: "Mock exam not found" }, { status: 404 });
  }

  return NextResponse.json(buildMockExamFacts(config));
}
