export const siteConfig = {
  name: "UniPrep2Go",
  url: "https://uniprep2go.study",
  description:
    "Independent Anki flashcard decks for finance exams, language certifications, professional training, and academic subjects.",
  contactEmail: "support@uniprep2go.study",
  checkoutProviders: "Gumroad and Lemon Squeezy",
  checkoutSellers: "PixID Studio and Prep2Go",
  gumroadStoreUrl: "https://pixidstudio.gumroad.com",
  lemonSqueezyStoreUrl: "https://ciple-a2.lemonsqueezy.com",
  googleAnalyticsId: "G-NDF8PVD7N3",
  ahrefsAnalyticsKey: "X11yI8gl/4QXmr55ol2GlA",
  legalLastUpdated: "2026-05-31",
} as const;

export const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/cookies", label: "Cookie Policy" },
  { href: "/contact", label: "Contact" },
] as const;

export function absoluteUrl(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
