import type { Metadata } from "next";
import { IntentPageView } from "@/components/intent-page";
import { getIntentPageBySlug } from "@/lib/intent-pages";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const page = getIntentPageBySlug("which-citizenship-anki-deck");
  if (!page) {
    return { title: "Not found" };
  }

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: "/which-citizenship-anki-deck" },
  };
}

export default async function WhichCitizenshipAnkiDeckPage() {
  const page = getIntentPageBySlug("which-citizenship-anki-deck");
  if (!page) {
    notFound();
  }

  return <IntentPageView page={page} />;
}
