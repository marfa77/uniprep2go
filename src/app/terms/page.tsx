import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal-document";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { termsSections } from "@/lib/legal-content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of Service for ${siteConfig.name} digital study products.`,
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#f7f3ea] text-[#18140f]">
      <SiteHeader />
      <LegalDocument
        intro={`These terms govern use of ${siteConfig.url} and purchases linked from the site.`}
        sections={termsSections}
        title="Terms of Service"
      />
      <SiteFooter />
    </main>
  );
}
