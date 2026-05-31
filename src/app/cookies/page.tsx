import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal-document";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { cookieSections } from "@/lib/legal-content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `Cookie and analytics disclosure for ${siteConfig.name}.`,
  alternates: {
    canonical: "/cookies",
  },
};

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-[#f7f3ea] text-[#18140f]">
      <SiteHeader />
      <LegalDocument
        intro={`This page explains how ${siteConfig.name} uses cookies, local storage, and analytics technologies.`}
        sections={cookieSections}
        title="Cookie Policy"
      />
      <SiteFooter />
    </main>
  );
}
