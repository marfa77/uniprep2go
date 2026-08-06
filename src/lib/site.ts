export const siteConfig = {
  name: "UniPrep2Go",
  url: "https://uniprep2go.study",
  description:
    "Free timed practice tests and readiness checks for US licensing and finance exams, plus independent Anki decks and printable PDF cram sheets for daily drilling after your mock results.",
  primaryMarket: "United States",
  primaryPositioning:
    "US exam prep built around free timed online mocks and readiness checks — topic scoring, answer review, and pass/no-pass reports — with Anki decks and printable PDFs as the linked remediation layer.",
  primaryUseCases: [
    "FINRA SIE, Series 7, and Series 63 exam prep",
    "US insurance and California real estate licensing exam prep",
    "CFA and FRM finance credential review",
    "Other US licensing and specialty exam practice tests (also on this site)",
    "Language decks and EU citizenship prep live on Prep2Go; UniPrep keeps free mocks indexed",
  ],
  contactEmail: "support@uniprep2go.study",
  customDeckInquiry: {
    title: "Custom decks on request",
    summary:
      "We build custom Anki decks to order — licensing exams, language certifications, corporate training, immigration topics, and niche subjects not yet in the catalog.",
    instructions:
      "Email us with your exam or topic, target audience, preferred card count, and deadline. We will reply with scope, timeline, and pricing.",
    mailtoSubject: "Custom deck inquiry",
  },
  partnerDeckInquiry: {
    title: "Partner Anki decks welcome",
    summary:
      "We accept high-quality third-party Anki decks for exams already covered (or soon covered) by a free UniPrep2Go readiness check. After quality review we publish the deck with a matching mock on this site; customer checkout stays on UniPrep/Gumroad, and partner payouts are settled monthly bank-to-bank.",
    instructions:
      "Email us with the exam name, card count, sample cards or a private .apkg link, your rights to the content, and payout bank country. No public upload form yet — inquiry by email only.",
    mailtoSubject: "Partner Anki deck submission",
  },
  checkoutProviders: "Gumroad, Lemon Squeezy, and the Prep2Go Immigration App Store",
  checkoutSellers: "PixID Studio and Prep2Go",
  gumroadStoreUrl: "https://pixidstudio.gumroad.com",
  starterDeckUrl: "https://pixidstudio.gumroad.com/l/ldpevc?wanted=true",
  lemonSqueezyStoreUrl: "https://ciple-a2.lemonsqueezy.com",
  googleAnalyticsId: "G-NDF8PVD7N3",
  ahrefsAnalyticsKey: "X11yI8gl/4QXmr55ol2GlA",
  legalLastUpdated: "2026-06-01",
  footerDisclaimer: {
    independence:
      "UniPrep2Go is an independent publisher of supplementary study materials. Our Anki decks and app content are for personal exam preparation only — not official exam materials, curriculum replacements, practice exams, or professional advice.",
    trademarks:
      "CFA® and Chartered Financial Analyst® are trademarks owned by CFA Institute. Other exam, credential, and program names on this site belong to their respective owners. No exam body or government authority — including CFA Institute, FINRA, GARP, IB, CAPLE, or immigration agencies — endorses, promotes, sponsors, or warrants our products.",
  },
} as const;

export const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/cookies", label: "Cookie Policy" },
  { href: "/contact", label: "Contact" },
] as const;

export function customDeckMailtoUrl() {
  const subject = encodeURIComponent(siteConfig.customDeckInquiry.mailtoSubject);

  return `mailto:${siteConfig.contactEmail}?subject=${subject}`;
}

export function partnerDeckMailtoUrl() {
  const subject = encodeURIComponent(siteConfig.partnerDeckInquiry.mailtoSubject);

  return `mailto:${siteConfig.contactEmail}?subject=${subject}`;
}

export function absoluteUrl(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
