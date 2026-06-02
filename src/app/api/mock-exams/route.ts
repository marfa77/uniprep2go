import { NextResponse } from "next/server";
import { buildMockExamCatalogFacts } from "@/lib/mock-exams/llm";

export const revalidate = 3600;

export async function GET() {
  return NextResponse.json(buildMockExamCatalogFacts());
}
