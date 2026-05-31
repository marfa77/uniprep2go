import { buildCatalogFacts } from "@/lib/llm-docs";

export function GET() {
  return Response.json(buildCatalogFacts(), {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
