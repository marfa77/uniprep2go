import { notFound } from "next/navigation";
import { buildMockExamMarkdown, getMockExamBySlug } from "@/lib/mock-exams/llm";

export const revalidate = 3600;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const config = getMockExamBySlug(slug);

  if (!config) {
    notFound();
  }

  return new Response(buildMockExamMarkdown(config), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
