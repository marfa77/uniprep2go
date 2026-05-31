export const siteConfig = {
  name: "UniPrep2Go",
  url: "https://uniprep2go.study",
  description:
    "Independent Anki flashcard decks for finance exam preparation, sold through Gumroad.",
  contactEmail: "support@uniprep2go.study",
  checkoutProvider: "Gumroad",
  checkoutSeller: "PixID Studio",
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
