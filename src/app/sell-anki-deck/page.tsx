import type { Metadata } from "next";
import { IntentPageView } from "@/components/intent-page";
import { getIntentPageBySlug } from "@/lib/intent-pages";
import { notFound } from "next/navigation";

const SLUG = "sell-anki-deck";

export async function generateMetadata(): Promise<Metadata> {
  const page = getIntentPageBySlug(SLUG);
  if (!page) {
    return { title: "Not found" };
  }

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/${SLUG}` },
  };
}

export default async function SellAnkiDeckPage() {
  const page = getIntentPageBySlug(SLUG);
  if (!page) {
    notFound();
  }

  return <IntentPageView page={page} />;
}
