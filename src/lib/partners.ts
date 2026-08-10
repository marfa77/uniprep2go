import partnersCatalog from "@/data/partners/partners.json";
import { siteConfig } from "./site";

export type PartnerRecord = {
  partnerId: string;
  displayName: string;
  email: string;
  /** Telegram chat id for sale pings / digests. Empty until onboarded. */
  telegramChatId: string;
  splitAuthorBps: number;
  payoutCurrency: string;
  payoutNotes?: string;
  deckSlugs: string[];
  status?: "template" | "active" | "paused";
};

type PartnersFile = {
  defaultAuthorShareBps: number;
  defaultUniShareBps: number;
  minPayoutUsd: number;
  partners: PartnerRecord[];
};

const catalog = partnersCatalog as PartnersFile;

export function getPartnerCatalog() {
  return catalog;
}

export function listPartners(): PartnerRecord[] {
  return catalog.partners;
}

export function listActivePartners(): PartnerRecord[] {
  return catalog.partners.filter(
    (partner) => partner.status !== "template" && partner.status !== "paused",
  );
}

export function getPartnerById(partnerId: string): PartnerRecord | null {
  return catalog.partners.find((partner) => partner.partnerId === partnerId) ?? null;
}

export function getPartnerForDeckSlug(deckSlug: string): PartnerRecord | null {
  return (
    catalog.partners.find(
      (partner) =>
        partner.status !== "template" &&
        partner.deckSlugs.includes(deckSlug) &&
        partner.status !== "paused",
    ) ?? null
  );
}

export function getAuthorShareBps(partner?: PartnerRecord | null) {
  return partner?.splitAuthorBps ?? catalog.defaultAuthorShareBps;
}

export function getUniShareBps(partner?: PartnerRecord | null) {
  const author = getAuthorShareBps(partner);
  return Math.max(0, 10_000 - author);
}

export function getMinPayoutUsd() {
  return catalog.minPayoutUsd ?? siteConfig.partnerDeckInquiry.minPayoutUsd;
}

export function computeSaleShares(netCents: number, partner?: PartnerRecord | null) {
  const authorBps = getAuthorShareBps(partner);
  const authorShareCents = Math.round((netCents * authorBps) / 10_000);
  const uniShareCents = Math.max(0, netCents - authorShareCents);
  return { authorShareCents, uniShareCents, authorBps };
}
