import type { BlogPostDraft } from "../types";

export const wallonieCitoyenneteParcoursIntegrationPost: BlogPostDraft = {
  slug: "wallonie-citoyennete-francais-a2-parcours-integration",
  title:
    "La Citoyenneté Belge en Wallonie : Pas d'Examen Civique — Mais le Français A2 n'est Pas Négociable",
  titleTag: "Citoyenneté Wallonie: A2 FR, Parcours CRI (Pas de QCM)",
  metaDescription:
    "Nationalité belge en Wallonie: pas de QCM civique — français A2 + parcours CRI (ou diplôme / 400h / travail). DELF, 1 030 €, pièges Flandre.",
  publishedAt: "2026-08-04",
  contentUpdated: "2026-11-24",
  eyebrow: "Belgique · Wallonie · Parcours d'intégration",
  clusterId: "belgium-citizenship",
  relatedSlugs: [
    "belgium-citizenship-test-flanders-vs-wallonia",
    "luxembourg-vivre-ensemble-test-format-pass",
    "france-naturalization-2026-civic-exam-b2-language-test",
  ],
  intro:
    "**En Wallonie, il n'y a pas de QCM de citoyenneté.** Le parcours d'intégration est gratuit : un module d'accueil, au moins 60 heures de formation à la citoyenneté, et du français si nécessaire. Ce guide résume ce que dit la page officielle du SPW Action sociale, qui est concerné, et comment vous préparer.",
  mockSlug: "belgium-wallonie-citoyennete-readiness-check",
  deckSlug: "belgium-wallonie-citoyennete-anki-deck",
  cta: {
    mockLabel: "Passer le readiness check Wallonie Citoyenneté (gratuit)",
    deckLabel: "Deck Anki Wallonie Citoyenneté",
    summary:
      "Entraînez-vous aux thèmes institutions, droits et vie quotidienne avec le readiness check gratuit Wallonie, puis révisez avec la deck Anki. Vérifiez les conditions fédérales de nationalité auprès de votre commune avant le dépôt.",
    extraLinks: [
      {
        href: "/blog/belgium-citizenship-test-flanders-vs-wallonia",
        label: "Flandre vs Wallonie — comparaison régionale (EN)",
      },
      {
        href: "/mock-exams/belgium-flanders-mo-readiness-check",
        label: "Readiness check Flandre MO (si vous êtes en Flandre)",
      },
      {
        href: "https://www.prep2go.study/shop/delf-a2-anki-deck",
        label: "French DELF deck on Prep2Go",
      },
      {
        href: "https://www.prep2go.study",
        label: "Prep2Go.study — decks langue & immigration",
      },
    ],
  },
  sections: [
    {
      heading: "Qu'est-ce que le parcours d'intégration wallon ?",
      blocks: [
        {
          type: "p",
          text: "En Wallonie, l'intégration des personnes étrangères passe par le **parcours d'intégration**, organisé par la Région. Selon le SPW Action sociale, il comprend quatre volets :",
        },
        {
          type: "ul",
          items: [
            "un **module d'accueil** : information sur les droits et devoirs, bilan social, test de positionnement en français et aide aux démarches administratives ;",
            "une **formation à la citoyenneté** de **60 heures minimum** ;",
            "une **formation à la langue française** de **400 heures minimum**, si nécessaire ;",
            "une **orientation socio-professionnelle** adaptée, si nécessaire.",
          ],
        },
        {
          type: "p",
          text: "**L'ensemble du parcours est gratuit.**",
        },
      ],
    },
    {
      heading: "Qui doit suivre le parcours ?",
      blocks: [
        {
          type: "p",
          text: "Le parcours concerne les personnes étrangères en Belgique depuis moins de trois ans, avec un titre de séjour de plus de trois mois. Les ressortissants de l'UE, de l'EEE et de la Suisse, et les membres de leur famille, en sont exclus. Le Code wallon de l'action sociale et de la santé (article 152/7, § 3) définit qui est obligé ; les personnes obligées doivent terminer le parcours dans les 3 ans.",
        },
      ],
    },
    {
      heading: "Y a-t-il un QCM de citoyenneté ?",
      blocks: [
        {
          type: "p",
          text: "Non. La page officielle du parcours décrit une **formation** à la citoyenneté, pas un examen écrit à choix multiples. C'est la grande différence avec la Flandre, où le cours de maatschappelijke oriëntatie se termine par un test. Voir [Belgique : Flandre ou Wallonie](/blog/belgium-citizenship-test-flanders-vs-wallonia).",
        },
      ],
    },
    {
      heading: "Et le français ?",
      blocks: [
        {
          type: "p",
          text: "Le module d'accueil comprend un test de positionnement en français. Si nécessaire, le parcours prévoit une formation d'au moins 400 heures. La page officielle n'indique pas de niveau cible (par exemple A2) pour le parcours lui-même. Pour la nationalité belge, d'autres conditions fédérales s'appliquent : vérifiez-les auprès de votre commune avant de déposer un dossier.",
        },
      ],
    },
    {
      heading: "Comment vous préparer ?",
      blocks: [
        {
          type: "steps",
          items: [
            { title: "Commencez par le module d'accueil", body: "Il fixe votre parcours : bilan social, test de français, démarches." },
            { title: "Suivez la formation citoyenneté", body: "Au moins 60 heures sur les institutions, les droits et la vie en Belgique." },
            { title: "Révisez les thèmes", body: "Utilisez le [readiness check Wallonie citoyenneté](/mock-exams/belgium-wallonie-citoyennete-readiness-check) et la [deck Anki Wallonie citoyenneté](/decks/belgium-wallonie-citoyennete-anki-deck)." },
            { title: "Travaillez votre français", body: "Le français reste utile pour toutes les démarches, y compris la nationalité." },
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Le parcours d'intégration wallon est-il payant ?",
      answer: "Non. Le SPW Action sociale indique que l'ensemble du parcours est gratuit (vérifié le 24 nov. 2026).",
    },
    {
      question: "Combien d'heures dure la formation à la citoyenneté ?",
      answer: "Au moins 60 heures.",
    },
    {
      question: "Y a-t-il un examen écrit de citoyenneté en Wallonie ?",
      answer: "La page officielle du parcours ne décrit aucun examen écrit : il s'agit d'une formation.",
    },
    {
      question: "Combien d'heures de français sont prévues ?",
      answer: "Au moins 400 heures, si nécessaire, après un test de positionnement dans le module d'accueil.",
    },
    {
      question: "Qui est obligé de suivre le parcours ?",
      answer: "Les personnes définies à l'article 152/7, § 3 du Code wallon de l'action sociale et de la santé ; elles doivent le terminer dans les 3 ans. Les citoyens de l'UE, de l'EEE et de la Suisse sont exclus.",
    },
    {
      question: "Le parcours suffit-il pour la nationalité belge ?",
      answer: "Non. La nationalité relève de conditions fédérales supplémentaires.",
    },
  ],
  bottomLine:
    "En Wallonie, pas de QCM : un parcours gratuit avec au moins 60 heures de citoyenneté et du français si nécessaire. Source : [SPW Action sociale — parcours d'intégration](https://actionsociale.wallonie.be/home/thematiques/integration-des-personnes-etrangeres/parcours-d-integration.html), vérifié le 24 nov. 2026.",
};
