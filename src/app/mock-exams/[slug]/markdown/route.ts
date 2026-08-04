import { notFound } from "next/navigation";
import { buildMockExamMarkdown, getMockExamBySlug } from "@/lib/mock-exams/llm";
import { geoMarkdownHeaders } from "@/lib/seo";

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
    headers: geoMarkdownHeaders(`/mock-exams/${slug}`),
  });
}
