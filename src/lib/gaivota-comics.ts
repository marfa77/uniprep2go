import { siteConfig } from "@/lib/site";

/** Series catalog for Gaivota em Portugal comics (HTML free + Gumroad paid). */
export const gaivotaSeries = {
  slug: "gaivota-em-portugal",
  title: "Gaivota em Portugal",
  subtitle: "Portuguese history comics — noir B&W, one event per episode",
  hubPath: "/comics/gaivota-em-portugal",
  /** Gumroad store product for paid episodes (filled after create). */
  gumroadPermalink: "gaivota-em-portugal-comics",
  gumroadCheckoutUrl: "https://pixidstudio.gumroad.com/l/gaivota-em-portugal-comics?wanted=true",
  paidPriceUsd: 5,
} as const;

export type GaivotaEpisode = {
  id: string;
  number: number;
  titlePt: string;
  titleEn: string;
  event: string;
  year: string;
  price: "free" | number;
  status: "live" | "coming";
  readerPath?: string;
  pagePath?: string;
  /** Per-episode Gumroad checkout (paid episodes; one product per episode). */
  gumroadCheckoutUrl?: string;
};

export const gaivotaEpisodes: GaivotaEpisode[] = [
  {
    id: "01-1755-earthquake",
    number: 1,
    titlePt: "O Terramoto",
    titleEn: "The Great Lisbon Earthquake",
    event: "Great Lisbon Earthquake",
    year: "1755",
    price: "free",
    status: "live",
    readerPath: "/comics/gaivota-em-portugal/01-1755-earthquake/reader.html",
    pagePath: "/comics/gaivota-em-portugal/01-1755-earthquake",
  },
  {
    id: "02-25-de-abril",
    number: 2,
    titlePt: "25 de Abril",
    titleEn: "Carnation Revolution",
    event: "Carnation Revolution (25 de Abril)",
    year: "1974",
    price: 5,
    status: "live",
    pagePath: "/comics/gaivota-em-portugal/02-25-de-abril",
    gumroadCheckoutUrl:
      "https://pixidstudio.gumroad.com/l/gaivota-em-portugal-comics?wanted=true",
  },
  {
    id: "03-aljubarrota",
    number: 3,
    titlePt: "Aljubarrota",
    titleEn: "Battle of Aljubarrota",
    event: "Battle of Aljubarrota",
    year: "1385",
    price: 5,
    status: "live",
    pagePath: "/comics/gaivota-em-portugal/03-aljubarrota",
    gumroadCheckoutUrl:
      "https://pixidstudio.gumroad.com/l/gaivota-ep03-aljubarrota?wanted=true",
  },
  {
    id: "04-ceuta",
    number: 4,
    titlePt: "Ceuta",
    titleEn: "Conquest of Ceuta",
    event: "Conquest of Ceuta (start of the Discoveries)",
    year: "1415",
    price: 5,
    status: "live",
    pagePath: "/comics/gaivota-em-portugal/04-ceuta",
    gumroadCheckoutUrl: "https://pixidstudio.gumroad.com/l/gaivota-ep04-ceuta?wanted=true",
  },
  {
    id: "05-vasco-da-gama",
    number: 5,
    titlePt: "Vasco da Gama",
    titleEn: "Vasco da Gama reaches India",
    event: "Vasco da Gama reaches Calicut",
    year: "1498",
    price: 5,
    status: "live",
    pagePath: "/comics/gaivota-em-portugal/05-vasco-da-gama",
    gumroadCheckoutUrl:
      "https://pixidstudio.gumroad.com/l/gaivota-ep05-vasco-da-gama?wanted=true",
  },
];

export function gaivotaAbsolute(path: string) {
  return new URL(path, siteConfig.url).toString();
}
