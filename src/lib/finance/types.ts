import type { AddendumLink, Clause, ContractDocument, RightStatus } from "@/lib/types";

/**
 * Modèle de dépendance économique.
 *
 * Chaîne modélisée : [Composant technique] → [Fonctionnalité commerciale] →
 * [Ligne de revenu]. Les deux premières relations sont des many-to-many : un
 * composant alimente plusieurs fonctionnalités, une fonctionnalité repose sur
 * plusieurs composants, et une fonctionnalité porte plusieurs lignes de revenus.
 *
 * Vocabulaire : ce module quantifie des **revenus associés** à une situation
 * contractuelle et une **dépendance**. Il ne produit aucune estimation de perte,
 * de risque financier ni de probabilité — ces notions n'existent nulle part dans
 * le code, et les libellés d'interface sont figés dans `STATUS_LABELS`.
 */

export interface TechnicalComponent {
  id: string;
  name: string;
  description: string;
  kind: "sdk" | "api" | "library" | "dataset" | "service" | "internal";
  /** Éditeur ou fournisseur ; « Interne » pour un développement maison. */
  vendor: string;
  /** Contrat couvrant ce composant. `null` : aucun contrat au dossier. */
  documentId: string | null;
  /**
   * Clauses qui conditionnent l'usage générateur de revenus, et donc le statut
   * du composant. Vide si aucune clause n'a été identifiée.
   */
  clauseIds: string[];
  /**
   * Clauses utiles au dossier sans conditionner cet usage précis : elles sont
   * affichées dans le panneau de détail mais n'entrent pas dans le statut.
   */
  relatedClauseIds?: string[];
  /**
   * Pourquoi aucun document n'est retenu alors que le dossier en contient un
   * (mauvaise entité contractante, brouillon non signé…). Affiché tel quel.
   */
  evidenceNote?: string;
}

export interface CommercialFeature {
  id: string;
  name: string;
  description: string;
  /** Composants techniques dont dépend la fonctionnalité. */
  componentIds: string[];
}

export interface RevenueLine {
  id: string;
  label: string;
  featureId: string;
  /** Montant annualisé, en euros. Toujours un nombre : jamais lu depuis un PDF. */
  amount: number;
  /** Période de référence, pour l'affichage uniquement. */
  period: string;
  segment?: string;
}

export interface FinancialGraph {
  components: TechnicalComponent[];
  features: CommercialFeature[];
  revenueLines: RevenueLine[];
}

/** Libellés imposés côté interface : aucun terme de perte ou de risque. */
export const STATUS_LABELS: Record<RightStatus, string> = {
  permission: "Usage autorisé",
  restriction: "Restriction explicite",
  review: "Point à vérifier",
  insufficient: "Information manquante",
};

/** Situation contractuelle d'un composant, après prise en compte des avenants. */
export interface ComponentAssessment {
  component: TechnicalComponent;
  status: RightStatus;
  label: string;
  /** Explication en une phrase, affichable telle quelle. */
  reason: string;
  document?: ContractDocument;
  /** Clause d'origine qui détermine le statut. */
  drivingClause?: Clause;
  /** Clause d'avenant qui s'y substitue, lorsqu'un lien est validé. */
  effectiveClause?: Clause;
  /** Lien d'avenant en attente de validation manuelle, le cas échéant. */
  pendingLink?: AddendumLink;
}

export interface FeatureContribution {
  feature: CommercialFeature;
  lines: RevenueLine[];
  amount: number;
  /** Composants retenus qui mènent à cette fonctionnalité. */
  viaComponentIds: string[];
}

export interface ComponentContribution {
  component: TechnicalComponent;
  /** Revenus associés à ce composant pris isolément (avant déduplication). */
  amount: number;
  featureIds: string[];
  lineIds: string[];
}

export interface AssociatedRevenueResult {
  /** Total dédupliqué : chaque ligne de revenu compte une seule fois. */
  total: number;
  /** Somme des contributions par composant, doublons inclus. */
  grossTotal: number;
  /** Écart imputable aux fonctionnalités partagées (`grossTotal - total`). */
  deduplicatedAmount: number;
  lines: RevenueLine[];
  features: FeatureContribution[];
  components: ComponentContribution[];
  /** Fonctionnalités atteintes par plusieurs composants retenus. */
  shared: FeatureContribution[];
  /** Identifiants demandés qui n'existent pas dans le graphe. */
  unknownComponentIds: string[];
}

/** Un poste du portefeuille : les revenus rattachés à une même situation. */
export interface StatusBucket {
  status: RightStatus;
  label: string;
  total: number;
  features: FeatureContribution[];
  lines: RevenueLine[];
  componentIds: string[];
}

/**
 * Répartition du portefeuille par situation contractuelle.
 *
 * Chaque ligne de revenu est affectée à un seul poste — celui de la situation
 * la plus bloquante parmi les composants de sa fonctionnalité. Les quatre
 * postes forment donc une partition : leur somme vaut `portfolioTotal`.
 */
export interface RevenuePartition {
  buckets: Record<RightStatus, StatusBucket>;
  portfolioTotal: number;
  /** Restriction + point à vérifier + information manquante. */
  toClarify: number;
}

export interface GraphIssue {
  level: "error" | "warning";
  message: string;
}

export interface GraphValidation {
  graph: FinancialGraph;
  issues: GraphIssue[];
  /** Nombre d'entrées écartées parce qu'inexploitables. */
  discarded: number;
}
