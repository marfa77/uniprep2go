/** Above-fold related money URLs for high-impression blog posts (link block only, no body edits). */

export type ClusterMoneyLink = { href: string; label: string };

const clusterMoneyLinksByPost: Record<string, ClusterMoneyLink[]> = {
  "mrics-apc-vs-assocrics-pathway-cost": [
    { href: "/mock-exams/mrics-readiness-check", label: "Free MRICS APC practice test" },
    { href: "/mock-exams/mrics-quantity-surveying-readiness-check", label: "MRICS quantity surveying mock" },
    { href: "/decks/mrics-anki-deck", label: "MRICS APC Anki deck" },
  ],
  "cdl-hazmat-endorsement-state-fingerprinting-background-check": [
    { href: "/mock-exams/cdl-hazmat-readiness-check", label: "CDL HazMat practice test" },
    { href: "/mock-exams/cdl-general-knowledge-readiness-check", label: "CDL general knowledge practice test" },
    { href: "/decks/cdl-hazmat-anki-deck", label: "CDL HazMat Anki deck" },
    { href: "/decks/cdl-general-knowledge-anki-deck", label: "CDL general knowledge Anki deck" },
  ],
  "well-ap-vs-fitwel-certification-2026": [
    { href: "/mock-exams/well-ap-readiness-check", label: "WELL AP practice test" },
    { href: "/decks/well-ap-anki-deck", label: "WELL AP Anki deck" },
    { href: "/mock-exams/v/building", label: "Building certification mocks hub" },
  ],
};

export function getBlogClusterMoneyLinks(slug: string): ClusterMoneyLink[] {
  return clusterMoneyLinksByPost[slug] ?? [];
}