import type { BlogPostDraft } from "../types";

export const wallonieCitoyenneteParcoursIntegrationPost: BlogPostDraft = {
  slug: "wallonie-citoyennete-francais-a2-parcours-integration",
  title:
    "La Citoyenneté Belge en Wallonie : Pas d'Examen Civique — Mais le Français A2 n'est Pas Négociable",
  titleTag: "Citoyenneté Wallonie: A2 FR, Parcours CRI (Pas de QCM)",
  metaDescription:
    "Nationalité belge en Wallonie: pas de QCM civique — français A2 + parcours CRI (ou diplôme / 400h / travail). DELF, 1 030 €, pièges Flandre.",
  publishedAt: "2026-08-04",
  eyebrow: "Belgique · Wallonie · Parcours d'intégration",
  clusterId: "belgium-citizenship",
  relatedSlugs: [
    "belgium-citizenship-test-flanders-vs-wallonia",
    "luxembourg-vivre-ensemble-test-format-pass",
    "france-naturalization-2026-civic-exam-b2-language-test",
  ],
  intro:
    "**En Wallonie, il n'existe aucun test standardisé de connaissances civiques** du type QCM à 30 questions. Contrairement à la Flandre et son *Maatschappelijke Oriëntatie* (MO), la Wallonie repose sur un autre paradigme : **français A2 certifié + preuve d'intégration sociale** via un parcours structuré (ou équivalents). Ce guide détaille ce que la Région exige réellement en 2026, pourquoi confondre Wallonie et Flandre coûte cher, et comment constituer votre dossier avant qu'une réforme fédérale ne referme la fenêtre.",
  mockSlug: "belgium-wallonie-citoyennete-readiness-check",
  deckSlug: "belgium-wallonie-citoyennete-anki-deck",
  cta: {
    mockLabel: "Passer le readiness check Wallonie Citoyenneté (gratuit)",
    deckLabel: "Rejoindre la liste d'attente Anki Wallonie Citoyenneté",
    summary:
      "Entraînez-vous aux thèmes institutions / droits / vie quotidienne avec le readiness check gratuit Wallonie. Rejoignez la waitlist Anki civique, puis sécurisez votre preuve de français A2 (DELF, TCF, EPS ou attestation CRI) avant de payer les 1 030 €.",
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
        href: "/decks/delf-b2-french-anki-deck",
        label: "Deck Anki DELF B2 français (future-proof B1/B2)",
      },
      {
        href: "https://www.prep2go.study",
        label: "Prep2Go.study — decks langue & immigration",
      },
    ],
  },
  sections: [
    {
      heading: "Le Reality Check : Ce Qui Existe Vraiment en 2026",
      blocks: [
        {
          type: "p",
          text: "Pour la nationalité belge par déclaration (art. 12bis du Code de la nationalité), vous devez satisfaire aux piliers fédéraux suivants — vérifiez toujours auprès de votre commune et des sources officielles avant de déposer.",
        },
        {
          type: "table",
          caption: "Piliers fédéraux (valeurs typiques 2026 — à confirmer)",
          headers: ["Pilier", "Exigence actuelle"],
          rows: [
            ["Résidence", "Souvent 5 ans de séjour légal ininterrompu en Belgique"],
            [
              "Participation économique",
              "Souvent 468 jours de travail salarié (ou trimestres de cotisations en indépendant) sur les 5 dernières années",
            ],
            ["Langue", "Niveau A2 minimum (CECRL) dans une langue nationale — en Wallonie : français"],
            [
              "Intégration sociale",
              "Parcours d'intégration, diplôme belge, formation pro ~400h, ou travail ininterrompu depuis 5 ans (selon voie)",
            ],
            ["Frais", "Droit d'enregistrement fédéral souvent cité à **1 030 €** (indexé)"],
          ],
        },
        {
          type: "p",
          text: "**Point clé :** dans certains cas, **5 ans de travail ininterrompu** peuvent présumer simultanément langue, intégration et participation économique. C'est la voie « jackpot » des dossiers salariés stables — confirmez-la avec votre commune / SPF Justice avant de compter dessus.",
        },
      ],
    },
    {
      heading: "Base Fédérale : Aujourd'hui vs Demain",
      blocks: [
        {
          type: "table",
          headers: ["Exigence", "Actuel (2026)", "Projet / tendance"],
          rows: [
            ["Résidence", "5 ans (typique)", "Discussions d'allongement dans certains scénarios"],
            ["Langue", "A2", "Possible relèvement vers B1"],
            ["Test civique", "Aucun au fédéral", "Proposition d'un test national"],
            ["Intégration", "Preuve régionale (CRI, diplôme…)", "Possible harmonisation"],
            ["Frais", "~1 030 €", "Indexation annuelle"],
          ],
        },
        {
          type: "p",
          text: "La fenêtre actuelle — A2 + preuve régionale sans QCM fédéral — n'est pas garantie. Traitez tout « projet Arizona » / réforme 2025–2029 comme **tendance**, pas comme examen déjà en vigueur.",
        },
      ],
    },
    {
      heading: "Le Parcours Wallon : Deux Preuves Distinctes",
      blocks: [
        {
          type: "ol",
          items: [
            "**Preuve de langue française A2** — certification officielle (pas « je parle au travail »).",
            "**Preuve d'intégration sociale** — parcours CRI (attestation), diplôme belge reconnu, formation professionnelle ~400h, ou 5 ans de travail ininterrompu (selon votre situation).",
          ],
        },
        {
          type: "p",
          text: "**Ce que vous n'avez pas besoin de faire aujourd'hui :** mémoriser une banque QCM sur la Constitution, passer un examen type MO flamand, ou craindre un test sur le nombre de députés.",
        },
      ],
    },
    {
      heading: "Les Certificats de Français : Deep-Dive",
      blocks: [
        {
          type: "table",
          caption: "Preuves linguistiques courantes (vérifier l'acceptation locale)",
          headers: ["Certificat", "Niveau", "Validité", "Coût (est.)", "Piège"],
          rows: [
            ["DELF A2", "A2", "À vie", "~90–130 €", "Format académique pour autodidactes"],
            ["TCF", "Score ≈ A2", "Souvent 2 ans", "~90–120 €", "Renouveler si dossier tardif"],
            ["EPS", "A2 CECRL", "Variable", "Souvent subventionné", "Le certificat doit mentionner le niveau CECRL"],
            [
              "Attestation CRI / BAPA",
              "A2 via parcours",
              "Liée au parcours",
              "Inclus / gratuit",
              "Fréquentation seule ≠ validation linguistique",
            ],
            [
              "Diplôme belge",
              "CESS / bac / master…",
              "Permanent",
              "N/A",
              "Diplôme étranger ≠ automatique",
            ],
          ],
        },
        {
          type: "ul",
          items: [
            "**Piège « je parle français au travail » :** une attestation d'employeur ne remplace pas DELF / TCF / EPS / CRI validé.",
            "**Piège A1 :** insuffisant. Le seuil pour la nationalité pointe vers **A2**.",
            "**Piège diplôme étranger :** même UE, pas automatiquement preuve d'intégration pour la nationalité belge.",
          ],
        },
      ],
    },
    {
      heading: "Le Parcours d'Intégration (CRI) : Ce Que C'est Vraiment",
      blocks: [
        {
          type: "p",
          text: "Les **Centres Régionaux d'Intégration (CRI)** animent le dispositif wallon (plusieurs centres régionaux + un réseau d'Initiatives Locales d'Intégration). Public **obligé** (primo-arrivants sous conditions) vs public **volontaire** (souvent pour la nationalité) — les exemptions (UE/EEE/Suisse, etc.) se vérifient au cas par cas.",
        },
        {
          type: "table",
          caption: "Étapes typiques du parcours (ordres de grandeur)",
          headers: ["Étape", "Contenu"],
          rows: [
            ["Module d'accueil", "Bilan, droits & devoirs, positionnement FR, convention"],
            ["Formation citoyenneté", "Institutions, santé, logement, emploi, école — souvent ≥ 60 h"],
            ["Français", "Si niveau < A2 — volume important (souvent cité ~400 h)"],
            ["Orientation sociopro", "Forem / CRI si sans emploi"],
          ],
        },
        {
          type: "p",
          text: "Délai max souvent cité autour de **36 mois** ; des amendes administratives existent en cas de non-respect des obligations pour le public obligé. À la fin : **attestation** (ex. Annexe XII) — joignez-la au dossier **avec** validation linguistique A2 si c'est votre voie.",
        },
      ],
    },
    {
      heading: "Le « Gap » Civique : Ce Qu'il Faut Déjà Savoir",
      blocks: [
        {
          type: "topics",
          items: [
            {
              title: "Institutions belges & Wallonie",
              body: "Fédéral (Roi, gouvernement, Chambre/Sénat), Régions (Wallonie, Flandre, Bruxelles, Communauté germanophone), communes (état civil, population, étrangers).",
            },
            {
              title: "Droits, devoirs & nationalité",
              body: "Constitution / droits fondamentaux, art. 12bis, vote obligatoire, liberté d'expression et cadre légal.",
            },
            {
              title: "Géographie & UE",
              body: "Les **5 provinces wallonnes** et chefs-lieux (pas « 10 provinces wallonnes » — la Belgique en a 10 au total). UE, Bruxelles comme siège, euro / Schengen.",
            },
            {
              title: "Vie quotidienne",
              body: "Mutuelles / INAMI, logement social, école obligatoire jusqu'à 18 ans, Forem / chômage / CPAS.",
            },
            {
              title: "Actualité & réformes",
              body: "Test civique fédéral éventuel, A2→B1, harmonisation régionale — non mémorisable des années à l'avance.",
            },
          ],
        },
        {
          type: "p",
          text: "Contrairement au test tchèque (banque de 300 questions), **il n'existe pas de banque publique wallonne**. Le readiness check UniPrep2Go prépare les thèmes — ce n'est pas un document officiel.",
        },
      ],
    },
    {
      heading: "Bruxelles vs Wallonie",
      blocks: [
        {
          type: "table",
          headers: ["", "Wallonie", "Bruxelles (COCOF)"],
          rows: [
            ["Organisme", "CRI", "BAPA"],
            ["Langue du parcours", "Français", "FR/NL possible"],
            ["Citoyenneté (ordres de grandeur)", "~60 h", "~50 h"],
            ["Coût parcours", "Souvent gratuit", "Souvent gratuit"],
          ],
        },
        {
          type: "p",
          text: "**Language shopping** (vivre ici, parcours là) peut se refermer si une réforme impose la langue / le parcours du lieu de résidence.",
        },
      ],
    },
    {
      heading: "Flandre vs Wallonie (Une Table)",
      blocks: [
        {
          type: "table",
          headers: ["Critère", "Flandre", "Wallonie"],
          rows: [
            ["Test civique", "MO + examens / obligation de réussite", "Pas de QCM standardisé"],
            ["Langue", "Néerlandais", "Français"],
            ["Philosophie", "Inburgering (normes, réussite)", "Droits, accès, accompagnement"],
            ["Parcours", "Souvent payant", "Souvent gratuit"],
            ["Emploi", "VDAB", "Orientation Forem si chômage"],
          ],
        },
      ],
    },
    {
      heading: "Deux Scénarios de Préparation",
      blocks: [
        {
          type: "steps",
          items: [
            {
              title: "Scénario A — Règles actuelles",
              body: "Valider A2 (DELF/TCF/EPS/CRI) → choisir la voie d'intégration → vérifier les 468 jours (ONSS / cotisations) → dossier (naissance apostillée + traduction, casiers) → dépôt commune + ~1 030 € → avis Procureur (souvent 4–8 mois).",
            },
            {
              title: "Scénario B — Future-proof",
              body: "Viser B1 FR, suivre le CRI même en volontaire, maîtriser les thèmes civiques via le readiness check, suivre les réformes, **déposer avant** un durcissement si vous êtes déjà éligible.",
            },
          ],
        },
      ],
    },
    {
      heading: "Pièges Classiques",
      blocks: [
        {
          type: "ul",
          items: [
            "Chercher une « banque de questions wallonne » ou confondre avec le MO flamand",
            "Présenter un A1 / diplôme étranger / attestation sans niveau CECRL",
            "Ignorer les 468 jours et les périodes sans affiliation",
            "Sous-estimer apostilles + traductions assermentées (souvent 200–500 €)",
            "Attendre un examen civique wallon qui n'existe pas encore",
            "Sous-estimer le délai CRI (jusqu'à ~36 mois pour le public concerné)",
            "Croire qu'un quiz en ligne remplace une attestation CRI ou un DELF",
          ],
        },
      ],
    },
    {
      heading: "Timeline et Coûts (Wallonie)",
      blocks: [
        {
          type: "table",
          headers: ["Étape", "Durée typique", "Coût estimé"],
          rows: [
            ["Français → A2", "6–18 mois", "0 € à ~1 500 €"],
            ["DELF / attestation CRI", "1 jour / 3–18 mois", "~90–130 € / gratuit"],
            ["Parcours CRI (si besoin)", "3–36 mois", "Souvent gratuit"],
            ["Dossier (traductions…)", "1–2 mois", "~200–500 €"],
            ["Dépôt commune", "1 jour", "~1 030 €"],
            ["Avis Procureur", "4–8 mois", "Inclus"],
          ],
        },
        {
          type: "p",
          text: "Budget réaliste souvent cité : **environ 1 300–1 700 €** pour un candidat seul sans diplôme belge — hors cours intensifs privés.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "La Wallonie a-t-elle un examen de citoyenneté ?",
      answer:
        "Non. Contrairement à la Flandre, il n'existe pas de QCM obligatoire sur les connaissances civiques. La preuve d'intégration passe par un parcours (CRI), un diplôme belge, une formation professionnelle, ou d'autres voies prévues par la loi — à confirmer pour votre dossier.",
    },
    {
      question: "Le DELF A2 est-il obligatoire ?",
      answer:
        "Non, mais c'est souvent la preuve la plus claire. TCF A2, certificat EPS avec niveau CECRL, ou attestation de niveau A2 via CRI/BAPA peuvent aussi convenir selon les cas.",
    },
    {
      question: "Qu'est-ce que le parcours d'intégration / CRI ?",
      answer:
        "Un dispositif wallon (accueil, formation citoyenneté, français si besoin, orientation sociopro) qui peut déboucher sur une attestation utilisable pour la nationalité. Public obligé et public volontaire n'ont pas les mêmes contraintes — renseignez-vous auprès de votre CRI.",
    },
    {
      question: "Puis-je utiliser le néerlandais si je vis en Wallonie ?",
      answer:
        "La loi fédérale reconnaît les trois langues nationales, mais déposer dans une commune wallonne avec un parcours cohérent en français est en pratique le choix le plus simple. Une réforme future pourrait lier davantage langue et lieu de résidence.",
    },
    {
      question: "Quelle différence entre Wallonie et Bruxelles ?",
      answer:
        "Wallonie : CRI, parcours en français. Bruxelles : BAPA, options FR/NL, volumes de formation légèrement différents. Vérifiez l'opérateur de votre région de résidence.",
    },
    {
      question: "La Belgique va-t-elle ajouter un examen civique national ?",
      answer:
        "Des propositions circulent au niveau fédéral, mais rien n'est à traiter comme examen en vigueur tant que le texte n'est pas adopté et mis en œuvre. La procédure actuelle (A2 + preuve régionale) reste la référence en 2026 — jusqu'à preuve du contraire.",
    },
    {
      question: "Que couvre le readiness check UniPrep2Go Wallonie ?",
      answer:
        "Un diagnostic chronométré sur des thèmes citoyenneté / parcours d'intégration (institutions, histoire-géo-UE, droits, vie quotidienne). Outil d'entraînement indépendant — pas une attestation CRI, pas un document officiel pour la commune.",
    },
    {
      question: "UniPrep2Go est-il un organisme officiel wallon ?",
      answer:
        "Non. Aide à l'étude indépendante. Appuyez-vous sur votre CRI, votre commune, et les textes officiels du SPF Justice / autorités wallonnes.",
    },
  ],
  bottomLine:
    "Aujourd'hui, la nationalité en Wallonie est une **course de fond administrative**, pas un sprint de mémorisation QCM : **français A2 certifié**, preuve d'intégration (CRI ou équivalent), participation économique, et frais fédéraux. Demain, B1 et/ou un test civique fédéral peuvent durcir le jeu — déposez si vous êtes prêt, et utilisez le readiness check + waitlist Anki UniPrep2Go pour rester future-proof sans confondre Wallonie et Flandre.",
};
