import type { AnswerDraft } from "@/lib/rag/provider";

/**
 * Cinq questions de démonstration couvrant les quatre statuts de réponse :
 * permission validée, restriction explicite, à vérifier juridiquement et
 * information insuffisante — plus le cas d'un avenant qui renverse une clause.
 *
 * Elles reprennent les questions de recette livrées avec le dossier `example/`
 * (feuille « QA questions » du modèle financier).
 *
 * Les `excerpt` sont des citations littérales : le moteur les revérifie dans le
 * texte de la page avant de les afficher (voir `lib/rag/engine.ts`).
 */
export interface ScriptedAnswer {
  id: string;
  /** Formulation proposée à l'utilisateur dans les suggestions. */
  question: string;
  /** Tous ces termes (ou l'un de leurs synonymes) doivent être présents. */
  all: string[][];
  draft: AnswerDraft;
}

export const SCRIPTED_ANSWERS: ScriptedAnswer[] = [
  {
    id: "q-atlas-commercial",
    question:
      "Pouvons-nous exploiter le corpus Atlas dans un produit commercial ?",
    all: [
      ["atlas", "corpus"],
      ["commercial", "commerciale", "exploiter", "exploitation", "produit"],
    ],
    draft: {
      status: "permission",
      summary:
        "Oui, mais pour ClauseLens Enterprise uniquement. L'avenant n° 1 du 1er juillet 2026 déroge à l'article 3.1(a) du contrat initial et autorise l'usage du corpus Atlas en production dans ce seul produit. DealRoom Search et BoardPack Studio en sont expressément exclus et restent sous la restriction d'origine.",
      caveats: [
        "L'autorisation ne couvre ni DealRoom Search, ni BoardPack Studio, ni aucun autre produit (avenant, art. 2.2).",
        "Le corpus lui-même ne peut être exposé, reproduit ni distribué à un client (avenant, art. 2.3).",
        "Des journaux par produit traçant les accès au corpus doivent être conservés (avenant, art. 3.1).",
        "Une synthèse trimestrielle est due au concédant dans les 20 jours suivant chaque trimestre (avenant, art. 3.2).",
        "L'autorisation bénéficie à Asteria AI SAS seule et ne s'étend à aucune filiale (avenant, art. 5.1).",
      ],
      citations: [
        {
          documentId: "doc-d05-atlas-am1",
          page: 1,
          excerpt:
            "Despite Section 3.1(a) of D01, Licensee may use the Licensed Data in ClauseLens Enterprise for production retrieval, evaluation and quality monitoring.",
          role: "avenant",
          clauseId: "cl-d05-permission",
        },
        {
          documentId: "doc-d01-atlas",
          page: 1,
          excerpt:
            "Licensee shall not: (a) use the Licensed Data in any commercial product or service;",
          role: "modifiée par avenant",
          clauseId: "cl-d01-commercial",
        },
        {
          documentId: "doc-d05-atlas-am1",
          page: 1,
          excerpt:
            "This permission applies only to ClauseLens Enterprise and does not authorise use in DealRoom Search, BoardPack Studio or any other product.",
          role: "contexte",
          clauseId: "cl-d05-scope",
        },
      ],
    },
  },
  {
    id: "q-helixlm-hosted",
    question:
      "Pouvons-nous déployer HelixLM auprès de nos clients via notre service hébergé ?",
    all: [
      ["helixlm", "helix", "modele"],
      ["heberge", "hebergee", "deployer", "clients", "service"],
    ],
    draft: {
      status: "permission",
      summary:
        "Oui. Le contrat HelixLM concède un droit non exclusif de déployer le modèle au sein des services hébergés d'Asteria et d'en facturer l'accès aux clients. La condition est que les clients n'accèdent jamais aux poids du modèle.",
      caveats: [
        "Les poids du modèle ne peuvent être distribués ni remis à un tiers (art. 3.1).",
        "L'accès des clients doit rester intégralement médiatisé par le service hébergé (art. 3.2).",
        "Un rapport annuel d'usage est dû au plus tard le 15 janvier (art. 4.2).",
      ],
      citations: [
        {
          documentId: "doc-d02-helixlm",
          page: 1,
          excerpt:
            "Licensor grants Licensee a non-exclusive right to deploy the Model as part of Licensee's hosted commercial services and to charge customers for those services.",
          role: "principale",
          clauseId: "cl-d02-hosted",
        },
        {
          documentId: "doc-d02-helixlm",
          page: 1,
          excerpt:
            "Licensee shall not distribute or provide the Model weights to any third party.",
          role: "contexte",
          clauseId: "cl-d02-weights",
        },
        {
          documentId: "doc-d02-helixlm",
          page: 1,
          excerpt: "Customer access must remain through Licensee's Hosted Service.",
          role: "contexte",
          clauseId: "cl-d02-access",
        },
      ],
    },
  },
  {
    id: "q-vectorgrid-reporting",
    question:
      "Dans quel délai devons-nous transmettre le rapport d'usage VectorGrid ?",
    all: [
      ["vectorgrid", "vector"],
      ["rapport", "reporting", "delai", "transmettre", "usage", "trimestre", "trimestriel"],
    ],
    draft: {
      status: "permission",
      summary:
        "Dans les quinze (15) jours calendaires suivant la fin de chaque trimestre civil. Le rapport doit indiquer le nombre de documents traités et les espaces de production actifs.",
      caveats: [
        "Le fournisseur peut par ailleurs demander des pièces justificatives une fois par an (art. 4.2).",
        "Le plafond contractuel est d'un million de documents traités par mois civil (art. 2.1).",
      ],
      citations: [
        {
          documentId: "doc-d03-vectorgrid",
          page: 2,
          excerpt:
            "Within fifteen (15) calendar days after each calendar quarter, Customer shall provide a usage report showing documents processed and active production workspaces.",
          role: "principale",
          clauseId: "cl-d03-reporting",
        },
        {
          documentId: "doc-d03-vectorgrid",
          page: 1,
          excerpt:
            "Customer may use the service to provide commercial software-as-a-service products to its own customers.",
          role: "contexte",
          clauseId: "cl-d03-saas",
        },
      ],
    },
  },
  {
    id: "q-horizon-renewal",
    question: "Comment se renouvelle l'abonnement Horizon Bank ?",
    all: [
      ["horizon", "bank", "abonnement"],
      ["renouvelle", "renouvellement", "reconduction", "preavis", "resiliation", "echeance"],
    ],
    draft: {
      status: "permission",
      summary:
        "Par reconduction tacite, pour des périodes successives de douze mois. Chaque partie peut s'y opposer par un préavis écrit d'au moins soixante (60) jours avant le terme de la période en cours.",
      caveats: [
        "Le préavis doit être écrit et parvenir avant la fin de la période en cours (art. 5.2).",
        "La durée initiale est de douze mois à compter de la date d'effet, soit le 1er mars 2026 (art. 5.1).",
      ],
      citations: [
        {
          documentId: "doc-d04-horizon",
          page: 2,
          excerpt:
            "The Subscription automatically renews for successive twelve-month periods unless either party gives at least sixty (60) days' written notice before the end of the then-current term.",
          role: "principale",
          clauseId: "cl-d04-renewal",
        },
        {
          documentId: "doc-d04-horizon",
          page: 1,
          excerpt:
            "Provider grants Customer access to ClauseLens Enterprise for contract analysis and risk classification.",
          role: "contexte",
          clauseId: "cl-d04-subscription",
        },
      ],
    },
  },
  {
    id: "q-ocrvision-commercial",
    question:
      "Le dossier permet-il d'utiliser l'API OCRVision commercialement ?",
    all: [
      ["ocrvision", "ocr"],
      ["commercial", "commerciale", "commercialement", "utiliser", "droit", "exploiter"],
    ],
    draft: {
      status: "insufficient",
      summary:
        "Information insuffisante pour Asteria AI SAS. Le dossier contient bien un contrat OCRVision, mais il lie VisionCore Inc à Asteria AI UK Ltd et écarte explicitement Asteria AI SAS. Aucun accord exécuté au nom de l'entité qui exploite BoardPack Studio ne figure au dossier.",
      caveats: [
        "Le contrat D07 définit le « Client » comme Asteria AI UK Ltd seule, à l'exclusion de la société mère et des affiliées (art. 1.2).",
        "La cession ou la sous-licence à une affiliée suppose l'accord écrit du fournisseur (art. 6.1).",
        "Deux voies possibles : verser au dossier un accord au nom d'Asteria AI SAS, ou obtenir l'accord écrit d'extension prévu à l'article 1.2.",
      ],
      citations: [
        {
          documentId: "doc-d07-ocrvision",
          page: 1,
          excerpt:
            "No right is granted to Asteria AI SAS or any other affiliate by this Agreement.",
          role: "contexte",
          clauseId: "cl-d07-noaffiliate",
        },
        {
          documentId: "doc-d07-ocrvision",
          page: 1,
          excerpt:
            "'Customer' means Asteria AI UK Ltd only and excludes its parent, subsidiaries and other affiliates unless Provider gives prior written consent.",
          role: "contexte",
          clauseId: "cl-d07-entity",
        },
      ],
    },
  },
];

/** Questions proposées à l'utilisateur au démarrage de la conversation. */
export const SUGGESTED_QUESTIONS = SCRIPTED_ANSWERS.map((entry) => entry.question);
