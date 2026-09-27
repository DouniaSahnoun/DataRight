/**
 * Modèle de domaine DataRight.
 *
 * Périmètre volontairement restreint : droits, permissions, restrictions et
 * traçabilité documentaire. Aucune notion financière (prix, redevance, revenu,
 * modèle économique) n'est modélisée ni exploitée par le moteur.
 */

/** Statut juridique d'un droit d'usage. */
export type RightStatus =
  | "permission" // Permission validée (clause explicite autorisant l'usage)
  | "restriction" // Restriction explicite (clause interdisant ou limitant)
  | "review" // À vérifier juridiquement (clause ambiguë ou conditionnelle)
  | "insufficient"; // Information insuffisante / permission absente du dossier

export type DocumentKind = "license" | "terms" | "addendum" | "dpa" | "other";

export type DocumentSource = "mock" | "upload";

/** Une page extraite d'un PDF : l'unité de traçabilité de base. */
export interface DocumentPage {
  /** Numéro de page, 1-indexé, tel qu'affiché dans le PDF. */
  number: number;
  text: string;
}

export interface ContractDocument {
  id: string;
  title: string;
  /** Contrepartie / éditeur au contrat. */
  counterparty: string;
  kind: DocumentKind;
  /** Référence interne ou numéro de contrat. */
  reference: string;
  /** Date d'effet au format ISO (AAAA-MM-JJ). */
  effectiveDate: string;
  /** Date d'ajout dans DataRight (ISO complet). */
  addedAt: string;
  source: DocumentSource;
  pageCount: number;
  pages: DocumentPage[];
  /** Pour un avenant : identifiant du contrat d'origine qu'il modifie. */
  amends?: string;
  /** Taille du fichier d'origine, en octets (métadonnée d'import). */
  fileSize?: number;
}

/** Droit ou obligation extrait d'une page, éditable par l'utilisateur. */
export interface Clause {
  id: string;
  documentId: string;
  page: number;
  title: string;
  /** Famille d'usage : "Usage commercial", "Redistribution", "Données"... */
  category: string;
  status: RightStatus;
  /** Citation littérale extraite du document source. */
  excerpt: string;
  /** Reformulation courte, éditable. */
  summary: string;
  /** Vrai si l'utilisateur a corrigé l'extraction automatique. */
  edited?: boolean;
  /** Identifiant de la clause d'avenant qui prend le pas sur celle-ci. */
  supersededBy?: string;
}

/** Source justificative attachée à une réponse. Jamais générée sans vérification. */
export interface Citation {
  documentId: string;
  documentTitle: string;
  page: number;
  /** Extrait littéral, vérifié comme présent dans le texte de la page. */
  excerpt: string;
  /** Score de pertinence du passage (0-1). */
  score: number;
  clauseId?: string;
  /** Rôle de la citation dans le raisonnement. */
  role?: "principale" | "modifiée par avenant" | "avenant" | "contexte";
}

export interface AddendumNotice {
  addendumDocumentId: string;
  addendumTitle: string;
  originDocumentId: string;
  originTitle: string;
  message: string;
  /** Vrai si le lien a été validé manuellement par un utilisateur. */
  confirmed: boolean;
}

export interface Answer {
  id: string;
  question: string;
  status: RightStatus;
  /** Réponse synthétique, une à trois phrases. */
  summary: string;
  citations: Citation[];
  /** Points d'attention ou conditions à respecter. */
  caveats: string[];
  addendum?: AddendumNotice;
  createdAt: string;
  /** Origine de la synthèse : moteur local simulé ou modèle distant. */
  engine: "mock" | "claude";
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  answer?: Answer;
  createdAt: string;
  pending?: boolean;
}

/** Lien entre une clause d'avenant et la clause d'origine qu'elle modifie. */
export interface AddendumLink {
  id: string;
  addendumDocumentId: string;
  addendumClauseId: string;
  originDocumentId: string;
  originClauseId: string;
  /** Confiance de la détection automatique (0-1). */
  confidence: number;
  /** Explication lisible de la détection. */
  rationale: string;
  status: "suggested" | "confirmed" | "rejected";
}

/** Cible de navigation du visualiseur : document + page + passage à surligner. */
export interface ViewerTarget {
  documentId: string;
  page: number;
  highlight?: string;
}
