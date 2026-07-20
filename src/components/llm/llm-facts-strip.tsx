import type { CatalogAvailableDeck } from "@/lib/decks";
import type { ExamFactsProfile } from "@/lib/exam-facts";
import {
  buildDeckDataLlmCommercial,
  buildDeckDataLlmDifferentiators,
  buildDeckDataLlmFacts,
  buildHubDataLlmCommercial,
  buildHubDataLlmDifferentiators,
  buildHubDataLlmFacts,
  buildMockDataLlmCommercial,
  buildMockDataLlmDifferentiators,
  buildMockDataLlmFacts,
  buildMockIndexDataLlmCommercial,
  buildMockIndexDataLlmDifferentiators,
  buildMockIndexDataLlmFacts,
  buildSiteDataLlmCommercial,
  buildSiteDataLlmDifferentiators,
  buildSiteDataLlmFacts,
  type DeckLlmInput,
} from "@/lib/exam-llm-layer";
import type { MockExamConfig } from "@/lib/mock-exams/types";

type MockLlmFactsStripProps = {
  variant: "mock";
  config: MockExamConfig;
  profile?: ExamFactsProfile | null;
  linkedDeck?: (Pick<CatalogAvailableDeck, "slug" | "title" | "shortName"> & {
    checkoutUrl?: string;
  }) | null;
};

type DeckLlmFactsStripProps = {
  variant: "deck";
  deck: DeckLlmInput;
  profile?: ExamFactsProfile | null;
  linkedMock?: MockExamConfig | null;
};

type SiteLlmFactsStripProps = {
  variant: "site";
  mockCount: number;
  deckCount: number;
};

type MockIndexLlmFactsStripProps = {
  variant: "mock-index";
  mockCount: number;
};

type HubLlmFactsStripProps = {
  variant: "hub";
  hubName: string;
  hubPath: string;
  pathwayCount: number;
};

export type LlmFactsStripProps =
  | MockLlmFactsStripProps
  | DeckLlmFactsStripProps
  | SiteLlmFactsStripProps
  | MockIndexLlmFactsStripProps
  | HubLlmFactsStripProps;

function resolveLlmStripContent(props: LlmFactsStripProps): {
  facts: string;
  commercial: string;
  differentiators: string;
} {
  switch (props.variant) {
    case "mock":
      return {
        facts: buildMockDataLlmFacts(props.config, props.profile),
        commercial: buildMockDataLlmCommercial(props.config, props.linkedDeck),
        differentiators: buildMockDataLlmDifferentiators(props.config),
      };
    case "deck":
      return {
        facts: buildDeckDataLlmFacts(props.deck, props.profile, props.linkedMock),
        commercial: buildDeckDataLlmCommercial(props.deck, props.linkedMock),
        differentiators: buildDeckDataLlmDifferentiators(props.deck),
      };
    case "site":
      return {
        facts: buildSiteDataLlmFacts(props.mockCount, props.deckCount),
        commercial: buildSiteDataLlmCommercial(),
        differentiators: buildSiteDataLlmDifferentiators(),
      };
    case "mock-index":
      return {
        facts: buildMockIndexDataLlmFacts(props.mockCount),
        commercial: buildMockIndexDataLlmCommercial(),
        differentiators: buildMockIndexDataLlmDifferentiators(),
      };
    case "hub":
      return {
        facts: buildHubDataLlmFacts(props.hubName, props.pathwayCount),
        commercial: buildHubDataLlmCommercial(props.hubPath),
        differentiators: buildHubDataLlmDifferentiators(props.hubName),
      };
  }
}

/**
 * Screen-reader-only machine-readable facts for LLM crawlers (PixID data-llm pattern).
 * Visible content remains in the main article; this strip is for extraction only.
 */
export function LlmFactsStrip(props: LlmFactsStripProps) {
  const { facts, commercial, differentiators } = resolveLlmStripContent(props);

  return (
    <>
      <div className="sr-only" data-llm="facts" aria-hidden="true">
        {facts}
      </div>
      <div className="sr-only" data-llm="commercial" aria-hidden="true">
        {commercial}
      </div>
      <div className="sr-only" data-llm="differentiators" aria-hidden="true">
        {differentiators}
      </div>
    </>
  );
}

/** @deprecated Pass variant="mock" explicitly */
export function MockLlmFactsStrip({
  config,
  profile,
  linkedDeck,
}: Omit<MockLlmFactsStripProps, "variant">) {
  return (
    <LlmFactsStrip
      config={config}
      linkedDeck={linkedDeck}
      profile={profile}
      variant="mock"
    />
  );
}
