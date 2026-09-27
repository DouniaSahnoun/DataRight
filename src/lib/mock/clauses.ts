import type { AddendumLink, Clause } from "@/lib/types";

/**
 * Registre des droits pré-extrait pour le dossier de démonstration (D01 → D08).
 *
 * Chaque `excerpt` est une citation littérale présente dans le texte de la page
 * référencée : le moteur refuse toute citation qu'il ne retrouve pas (voir
 * `lib/rag/engine.ts`), et `npm run check:engine` rejoue la vérification hors
 * navigateur.
 *
 * Ordre significatif pour D01 : `cl-d01-commercial` précède les autres alinéas
 * de l'article 3.1, car la détection automatique d'avenant (`clauseAtArticle`)
 * retient la première clause du registre contenue dans l'article cité.
 */
export const MOCK_CLAUSES: Clause[] = [
  // --- D01 · Atlas Business Corpus (DataForge Ltd) ---
  {
    id: "cl-d01-commercial",
    documentId: "doc-d01-atlas",
    page: 1,
    title: "Usage commercial du corpus interdit",
    category: "Usage commercial",
    status: "restriction",
    summary:
      "Rédaction initiale de l'article 3.1(a) : le corpus Atlas ne peut être utilisé dans aucun produit ni service commercial.",
    excerpt:
      "Licensee shall not: (a) use the Licensed Data in any commercial product or service;",
  },
  {
    id: "cl-d01-grant",
    documentId: "doc-d01-atlas",
    page: 1,
    title: "Licence limitée à la recherche interne non productive",
    category: "Usage interne",
    status: "permission",
    summary:
      "Droit d'usage limité, non exclusif et non transférable, réservé à la recherche et à l'évaluation internes hors production.",
    excerpt:
      "Licensor grants Licensee a limited, non-exclusive, non-transferable right to use the Licensed Data solely for internal, non-production research and evaluation purposes.",
  },
  {
    id: "cl-d01-training",
    documentId: "doc-d01-atlas",
    page: 1,
    title: "Entraînement et récupération en production interdits",
    category: "Données",
    status: "restriction",
    summary:
      "Interdiction d'entraîner, d'affiner ou d'alimenter un modèle de production à partir du corpus.",
    excerpt:
      "(b) use the Licensed Data to train, fine-tune or retrieve content for a production model;",
  },
  {
    id: "cl-d01-distribution",
    documentId: "doc-d01-atlas",
    page: 1,
    title: "Distribution du corpus interdite",
    category: "Redistribution",
    status: "restriction",
    summary: "Aucune distribution du corpus sous quelque forme que ce soit.",
    excerpt: "(c) distribute the Licensed Data;",
  },
  {
    id: "cl-d01-affiliate",
    documentId: "doc-d01-atlas",
    page: 1,
    title: "Accès des filiales et clients soumis à accord écrit",
    category: "Redistribution",
    status: "restriction",
    summary:
      "Aucun accès ne peut être ouvert à une filiale ou à un client sans accord écrit préalable du concédant.",
    excerpt:
      "(d) permit access by any affiliate or customer without Licensor's prior written consent.",
  },
  {
    id: "cl-d01-incident",
    documentId: "doc-d01-atlas",
    page: 2,
    title: "Notification d'accès non autorisé sous 48 heures",
    category: "Obligations",
    status: "review",
    summary:
      "Obligation de notifier le concédant dans les 48 heures suivant la découverte d'un accès non autorisé : procédure interne à confirmer.",
    excerpt:
      "Licensee shall notify Licensor within forty-eight (48) hours after discovering unauthorised access to the Licensed Data.",
  },
  {
    id: "cl-d01-deletion",
    documentId: "doc-d01-atlas",
    page: 2,
    title: "Suppression du corpus au terme du contrat",
    category: "Données",
    status: "restriction",
    summary:
      "À l'échéance ou en cas de résiliation, l'usage cesse et le corpus est supprimé, hors une copie d'archive chiffrée.",
    excerpt:
      "On expiry or termination, Licensee shall stop using and delete the Licensed Data, except for one encrypted legal archive copy.",
  },

  // --- D05 · Avenant n° 1 au contrat Atlas ---
  {
    id: "cl-d05-permission",
    documentId: "doc-d05-atlas-am1",
    page: 1,
    title: "Usage commercial autorisé pour ClauseLens Enterprise",
    category: "Usage commercial",
    status: "permission",
    summary:
      "Par dérogation à l'article 3.1(a) du contrat initial, le corpus Atlas peut être exploité en production dans ClauseLens Enterprise.",
    excerpt:
      "Despite Section 3.1(a) of D01, Licensee may use the Licensed Data in ClauseLens Enterprise for production retrieval, evaluation and quality monitoring.",
  },
  {
    id: "cl-d05-scope",
    documentId: "doc-d05-atlas-am1",
    page: 1,
    title: "Périmètre limité : DealRoom Search et BoardPack Studio exclus",
    category: "Usage commercial",
    status: "restriction",
    summary:
      "L'autorisation ne vaut que pour ClauseLens Enterprise : elle ne couvre ni DealRoom Search, ni BoardPack Studio, ni aucun autre produit.",
    excerpt:
      "This permission applies only to ClauseLens Enterprise and does not authorise use in DealRoom Search, BoardPack Studio or any other product.",
  },
  {
    id: "cl-d05-nodisclosure",
    documentId: "doc-d05-atlas-am1",
    page: 1,
    title: "Corpus sous-jacent non exposable aux clients",
    category: "Redistribution",
    status: "restriction",
    summary:
      "Le corpus lui-même ne peut être exposé, reproduit ni distribué à un client, y compris dans le produit autorisé.",
    excerpt:
      "Licensee shall not expose, reproduce or distribute the underlying Licensed Data to any customer.",
  },
  {
    id: "cl-d05-logs",
    documentId: "doc-d05-atlas-am1",
    page: 1,
    title: "Journalisation des accès par produit",
    category: "Obligations",
    status: "review",
    summary:
      "Condition de l'autorisation : conserver des journaux par produit traçant les accès au corpus.",
    excerpt:
      "Licensee shall retain product-level logs showing when the Licensed Data is accessed.",
  },
  {
    id: "cl-d05-quarterly",
    documentId: "doc-d05-atlas-am1",
    page: 1,
    title: "Synthèse trimestrielle sous 20 jours",
    category: "Obligations",
    status: "review",
    summary:
      "Condition de l'autorisation : transmettre au concédant une synthèse trimestrielle dans les 20 jours calendaires suivant chaque trimestre.",
    excerpt:
      "Licensee shall provide Licensor with a quarterly summary within twenty (20) calendar days after each quarter.",
  },
  {
    id: "cl-d05-affiliate",
    documentId: "doc-d05-atlas-am1",
    page: 2,
    title: "Autorisation non extensible aux filiales",
    category: "Redistribution",
    status: "restriction",
    summary:
      "L'autorisation bénéficie à Asteria AI SAS seule et ne s'étend à aucune filiale sans accord écrit du concédant.",
    excerpt:
      "The permission granted by this Amendment applies only to Asteria AI SAS and does not extend to an affiliate without Licensor's written consent.",
  },

  // --- D02 · HelixLM 7B (Helix Labs GmbH) ---
  {
    id: "cl-d02-hosted",
    documentId: "doc-d02-helixlm",
    page: 1,
    title: "Déploiement commercial en service hébergé autorisé",
    category: "Usage commercial",
    status: "permission",
    summary:
      "Droit non exclusif de déployer le modèle au sein des services hébergés d'Asteria et de les facturer aux clients.",
    excerpt:
      "Licensor grants Licensee a non-exclusive right to deploy the Model as part of Licensee's hosted commercial services and to charge customers for those services.",
  },
  {
    id: "cl-d02-finetune",
    documentId: "doc-d02-helixlm",
    page: 1,
    title: "Versions affinées internes autorisées",
    category: "Usage interne",
    status: "permission",
    summary:
      "Création de versions affinées internes autorisée, pour le même usage que celui concédé.",
    excerpt:
      "Licensee may create internal fine-tuned versions for the same permitted use.",
  },
  {
    id: "cl-d02-weights",
    documentId: "doc-d02-helixlm",
    page: 1,
    title: "Distribution des poids du modèle interdite",
    category: "Redistribution",
    status: "restriction",
    summary:
      "Les poids du modèle ne peuvent être distribués ni mis à disposition d'un tiers.",
    excerpt:
      "Licensee shall not distribute or provide the Model weights to any third party.",
  },
  {
    id: "cl-d02-access",
    documentId: "doc-d02-helixlm",
    page: 1,
    title: "Accès client exclusivement via le service hébergé",
    category: "Redistribution",
    status: "restriction",
    summary:
      "L'accès des clients doit passer par le service hébergé d'Asteria, sans remise du modèle.",
    excerpt: "Customer access must remain through Licensee's Hosted Service.",
  },
  {
    id: "cl-d02-outputs",
    documentId: "doc-d02-helixlm",
    page: 1,
    title: "Livraison des sorties du modèle aux clients",
    category: "Données",
    status: "review",
    summary:
      "Les sorties peuvent être livrées aux clients, sous réserve du droit applicable et du contrat client : à cadrer contrat par contrat.",
    excerpt:
      "Outputs may be delivered to customers, subject to applicable law and the customer agreement.",
  },
  {
    id: "cl-d02-report",
    documentId: "doc-d02-helixlm",
    page: 2,
    title: "Rapport annuel d'usage au 15 janvier",
    category: "Obligations",
    status: "review",
    summary:
      "Une synthèse de l'année civile écoulée est due au plus tard le 15 janvier de chaque année.",
    excerpt:
      "A summary report for the prior calendar year is due by 15 January each year.",
  },

  // --- D03 · VectorGrid Enterprise (VectorGrid Inc) ---
  {
    id: "cl-d03-saas",
    documentId: "doc-d03-vectorgrid",
    page: 1,
    title: "Revente en SaaS commercial autorisée",
    category: "Usage commercial",
    status: "permission",
    summary:
      "Le service peut être utilisé pour fournir des produits SaaS commerciaux aux clients d'Asteria.",
    excerpt:
      "Customer may use the service to provide commercial software-as-a-service products to its own customers.",
  },
  {
    id: "cl-d03-limit",
    documentId: "doc-d03-vectorgrid",
    page: 1,
    title: "Plafond d'un million de documents par mois",
    category: "Obligations",
    status: "review",
    summary:
      "L'abonnement couvre un million de documents traités par mois civil : volume à surveiller.",
    excerpt:
      "The subscription includes up to one million (1,000,000) documents processed per calendar month.",
  },
  {
    id: "cl-d03-excess",
    documentId: "doc-d03-vectorgrid",
    page: 1,
    title: "Dépassement soumis à accord écrit du fournisseur",
    category: "Usage commercial",
    status: "review",
    summary:
      "Tout dépassement du plafond requiert l'accord écrit préalable du fournisseur.",
    excerpt:
      "Excess usage requires Provider's written approval and may be charged at the rates in the applicable order form.",
  },
  {
    id: "cl-d03-customerdata",
    documentId: "doc-d03-vectorgrid",
    page: 1,
    title: "Traitement des données client limité au service",
    category: "Données",
    status: "permission",
    summary:
      "Le fournisseur ne traite les données client que pour fournir, sécuriser et supporter le service.",
    excerpt:
      "Provider may process Customer Data only to provide, secure and support the service, unless the parties agree otherwise in writing.",
  },
  {
    id: "cl-d03-reporting",
    documentId: "doc-d03-vectorgrid",
    page: 2,
    title: "Rapport d'usage trimestriel sous 15 jours",
    category: "Obligations",
    status: "review",
    summary:
      "Un rapport d'usage est dû dans les 15 jours calendaires suivant chaque trimestre civil.",
    excerpt:
      "Within fifteen (15) calendar days after each calendar quarter, Customer shall provide a usage report showing documents processed and active production workspaces.",
  },

  // --- D04 · Abonnement ClauseLens Enterprise (Horizon Bank SA) ---
  {
    id: "cl-d04-subscription",
    documentId: "doc-d04-horizon",
    page: 1,
    title: "Accès client à ClauseLens Enterprise",
    category: "Usage commercial",
    status: "permission",
    summary:
      "Asteria, en qualité de fournisseur, ouvre à Horizon Bank l'accès à ClauseLens Enterprise.",
    excerpt:
      "Provider grants Customer access to ClauseLens Enterprise for contract analysis and risk classification.",
  },
  {
    id: "cl-d04-volume",
    documentId: "doc-d04-horizon",
    page: 1,
    title: "Plafond de deux millions de pages par an",
    category: "Obligations",
    status: "review",
    summary:
      "L'abonnement couvre deux millions de pages traitées par année d'abonnement.",
    excerpt:
      "The subscription includes up to two million (2,000,000) pages processed during each subscription year.",
  },
  {
    id: "cl-d04-documents",
    documentId: "doc-d04-horizon",
    page: 1,
    title: "Documents client traités pour le seul service",
    category: "Données",
    status: "permission",
    summary:
      "Les documents déposés par Horizon Bank ne sont traités que pour fournir, sécuriser et supporter le service.",
    excerpt:
      "Provider may process those documents only to provide, secure and support ClauseLens Enterprise and as otherwise instructed in writing by Customer.",
  },
  {
    id: "cl-d04-renewal",
    documentId: "doc-d04-horizon",
    page: 2,
    title: "Reconduction tacite, préavis de 60 jours",
    category: "Obligations",
    status: "review",
    summary:
      "L'abonnement se reconduit par périodes de douze mois sauf préavis écrit d'au moins 60 jours avant le terme.",
    excerpt:
      "The Subscription automatically renews for successive twelve-month periods unless either party gives at least sixty (60) days' written notice before the end of the then-current term.",
  },
  {
    id: "cl-d04-availability",
    documentId: "doc-d04-horizon",
    page: 2,
    title: "Engagement de disponibilité à 99,5 %",
    category: "Obligations",
    status: "review",
    summary:
      "Objectif de disponibilité mensuelle de 99,5 %, hors maintenance planifiée et événements hors contrôle.",
    excerpt:
      "Provider targets 99.5 percent monthly availability, excluding scheduled maintenance and events outside Provider's reasonable control.",
  },

  // --- D06 · Avenant sécurité Horizon Bank ---
  {
    id: "cl-d06-notification",
    documentId: "doc-d06-horizon-sec",
    page: 1,
    title: "Notification d'incident sous 24 heures",
    category: "Obligations",
    status: "review",
    summary:
      "Asteria doit notifier Horizon Bank dans les 24 heures suivant la confirmation d'un incident touchant ses données.",
    excerpt:
      "Provider shall notify Customer within twenty-four (24) hours after confirming that a Security Incident affects Customer Data.",
  },
  {
    id: "cl-d06-audit",
    documentId: "doc-d06-horizon-sec",
    page: 2,
    title: "Test de sécurité indépendant annuel",
    category: "Obligations",
    status: "review",
    summary:
      "Un test de sécurité indépendant annuel est dû, avec remise de la synthèse dans les 30 jours suivant sa réalisation.",
    excerpt:
      "Provider shall perform an annual independent security test and deliver the executive summary to Customer within thirty (30) days after completion.",
  },
  {
    id: "cl-d06-precedence",
    documentId: "doc-d06-horizon-sec",
    page: 2,
    title: "Primauté de l'avenant sur la notification d'incident",
    category: "Obligations",
    status: "review",
    summary:
      "D04 reste en vigueur ; en cas de contradiction sur la notification d'incident, c'est l'avenant qui prévaut.",
    excerpt:
      "D04 remains in force. If this Addendum conflicts with D04 on security incident notification, this Addendum controls.",
  },

  // --- D07 · OCRVision API (VisionCore Inc) — signé par l'entité britannique ---
  {
    id: "cl-d07-entity",
    documentId: "doc-d07-ocrvision",
    page: 1,
    title: "Contrat limité à Asteria AI UK Ltd",
    category: "Périmètre contractuel",
    status: "restriction",
    summary:
      "Le « Client » désigne Asteria AI UK Ltd seule : société mère, filiales et affiliées sont exclues sauf accord écrit.",
    excerpt:
      "'Customer' means Asteria AI UK Ltd only and excludes its parent, subsidiaries and other affiliates unless Provider gives prior written consent.",
  },
  {
    id: "cl-d07-noaffiliate",
    documentId: "doc-d07-ocrvision",
    page: 1,
    title: "Aucun droit concédé à Asteria AI SAS",
    category: "Périmètre contractuel",
    status: "restriction",
    summary:
      "Le contrat énonce expressément qu'il ne concède aucun droit à Asteria AI SAS ni à aucune autre affiliée.",
    excerpt:
      "No right is granted to Asteria AI SAS or any other affiliate by this Agreement.",
  },
  {
    id: "cl-d07-commercial",
    documentId: "doc-d07-ocrvision",
    page: 1,
    title: "Usage commercial hébergé réservé à l'entité signataire",
    category: "Usage commercial",
    status: "permission",
    summary:
      "L'intégration de l'API dans des services hébergés commerciaux est autorisée — au bénéfice d'Asteria AI UK Ltd uniquement.",
    excerpt:
      "Customer may integrate OCRVision API into Customer's commercial hosted services.",
  },
  {
    id: "cl-d07-resell",
    documentId: "doc-d07-ocrvision",
    page: 1,
    title: "Revente des identifiants d'API interdite",
    category: "Redistribution",
    status: "restriction",
    summary: "Les identifiants d'accès à l'API ne peuvent être revendus.",
    excerpt: "Customer shall not resell API credentials.",
  },
  {
    id: "cl-d07-assignment",
    documentId: "doc-d07-ocrvision",
    page: 2,
    title: "Cession ou sous-licence à une affiliée interdite",
    category: "Redistribution",
    status: "restriction",
    summary:
      "Le contrat ne peut être cédé ni sous-licencié à une affiliée sans accord écrit du fournisseur.",
    excerpt:
      "Customer may not assign or sublicense this Agreement to an affiliate without Provider's written consent.",
  },

  // --- D08 · Bon de commande ReportForge (projet non signé) ---
  {
    id: "cl-d08-draft",
    documentId: "doc-d08-reportforge",
    page: 1,
    title: "Projet non signé, sans effet contractuel",
    category: "Périmètre contractuel",
    status: "insufficient",
    summary:
      "Le document est un projet de négociation : il ne produit aucun effet tant qu'il n'est pas signé par les deux parties.",
    excerpt:
      "This document is an unsigned draft for negotiation and has no contractual effect until signed by authorised representatives of both parties.",
  },
  {
    id: "cl-d08-nolicence",
    documentId: "doc-d08-reportforge",
    page: 1,
    title: "Aucune licence concédée par la circulation du projet",
    category: "Périmètre contractuel",
    status: "insufficient",
    summary:
      "La transmission du projet ne concède ni licence ni service.",
    excerpt: "No licence or service is granted by circulation of this draft.",
  },
  {
    id: "cl-d08-production",
    documentId: "doc-d08-reportforge",
    page: 1,
    title: "Droits de déploiement en production subordonnés à signature",
    category: "Usage commercial",
    status: "insufficient",
    summary:
      "Les droits de déploiement en production supposent la signature du bon de commande et des conditions cadres visées.",
    excerpt:
      "Production deployment rights remain subject to execution of this Order Form and the referenced master terms.",
  },
  {
    id: "cl-d08-masterterms",
    documentId: "doc-d08-reportforge",
    page: 2,
    title: "Conditions cadres absentes du dossier",
    category: "Périmètre contractuel",
    status: "insufficient",
    summary:
      "Les conditions cadres référencées ne sont pas jointes : limitations, garanties, droits sur les données et résiliation restent non convenus.",
    excerpt:
      "The master terms referenced in this draft are not attached. The parties have not agreed limitations, warranty terms, data rights or termination rights.",
  },
];

/**
 * Liens avenant → clause d'origine détectés automatiquement, à valider.
 *
 * État initial de la démonstration : détectés, pas encore opposables. Tant que
 * le premier lien n'est pas validé, le corpus Atlas reste sous la restriction
 * initiale pour ClauseLens Enterprise — c'est ce que la cartographie donne à
 * voir, et ce que la validation lève.
 */
export const MOCK_ADDENDUM_LINKS: AddendumLink[] = [
  {
    id: "link-d05-commercial",
    addendumDocumentId: "doc-d05-atlas-am1",
    addendumClauseId: "cl-d05-permission",
    originDocumentId: "doc-d01-atlas",
    originClauseId: "cl-d01-commercial",
    confidence: 0.92,
    rationale:
      "L'avenant vise expressément « Section 3.1(a) of D01 » et lui substitue une autorisation. Même contrepartie (DataForge Ltd), date d'effet postérieure (1er juillet 2026), mention « EXECUTED ».",
    status: "suggested",
  },
  {
    id: "link-d05-distribution",
    addendumDocumentId: "doc-d05-atlas-am1",
    addendumClauseId: "cl-d05-nodisclosure",
    originDocumentId: "doc-d01-atlas",
    originClauseId: "cl-d01-distribution",
    confidence: 0.57,
    rationale:
      "Recouvrement lexical sur l'interdiction de distribuer le corpus. L'avenant précise toutefois à l'article 4.1 que D01 « remains unchanged and in full force » hors des points qu'il modifie : le lien peut n'être qu'un rappel, et non une substitution.",
    status: "suggested",
  },
];
