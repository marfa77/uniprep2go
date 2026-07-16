import type { Metadata } from "next";
import { IntentPageView } from "@/components/intent-page";
import { getIntentPageBySlug } from "@/lib/intent-pages";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const page = getIntentPageBySlug("best-frm-part-1-anki-deck");
  if (!page) {
    return { title: "Not found" };
  }

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: "/best-frm-part-1-anki-deck" },
  };
}

export default async function BestFrmPartOneAnkiDeckPage() {
  const page = getIntentPageBySlug("best-frm-part-1-anki-deck");
  if (!page) {
    notFound();
  }

  return <IntentPageView page={page} />;
}
