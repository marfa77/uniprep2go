import { buildSiteOrganizationJsonLdDocument } from "@/lib/product-jsonld";

/** Primary site Organization for Google/LLM entity clarity (UniPrep2Go). */
export function SiteOrganizationSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(buildSiteOrganizationJsonLdDocument()),
      }}
    />
  );
}
