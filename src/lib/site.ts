export const siteConfig = {
  name: "UniPrep2Go",
  url: "https://uniprep2go.study",
  description:
    "Independent Anki flashcard decks for US licensing exams, finance credentials, language certifications, professional training, and academic subjects, plus Prep2Go Immigration app decks for survival guides and citizenship test prep.",
  primaryMarket: "United States",
  primaryPositioning:
    "US exam prep and professional licensing Anki decks, with finance credentials and language certifications as supporting catalog categories.",
  primaryUseCases: [
    "FINRA SIE, Series 7, and Series 63 exam prep",
    "US insurance and California real estate licensing exam prep",
    "CFA and FRM finance credential review",
    "Language certification vocabulary and grammar practice",
    "Immigration survival guides and citizenship test prep in the Prep2Go Immigration iOS app",
  ],
  contactEmail: "support@uniprep2go.study",
  checkoutProviders: "Gumroad, Lemon Squeezy, and the Prep2Go Immigration App Store",
  checkoutSellers: "PixID Studio and Prep2Go",
  gumroadStoreUrl: "https://pixidstudio.gumroad.com",
  lemonSqueezyStoreUrl: "https://ciple-a2.lemonsqueezy.com",
  googleAnalyticsId: "G-NDF8PVD7N3",
  ahrefsAnalyticsKey: "X11yI8gl/4QXmr55ol2GlA",
  legalLastUpdated: "2026-06-01",
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
