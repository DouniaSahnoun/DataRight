import { chunkCorpus } from "@/lib/rag/chunking";
import type { AnswerDraft, AnswerProvider } from "@/lib/rag/provider";
import { MockAnswerProvider } from "@/lib/rag/provider";
import { normalize, retrieve } from "@/lib/rag/retriever";
import type {
  AddendumLink,
  AddendumNotice,
  Answer,
  Citation,
  Clause,
  ContractDocument,
} from "@/lib/types";

/**
 * Orchestration du pipeline : découpage → recherche → synthèse → vérification.
 *
 * Deux garanties y sont implémentées, et ce sont les deux seules choses que le
 * reste de l'application n'a pas à revérifier :
 *
 * 1. Aucune citation n'est affichée si son texte n'est pas retrouvé mot pour mot
 *    dans la page annoncée (`locateExcerpt`). Une réponse dont toutes les
 *    citations sont écartées bascule en « Information insuffisante ».
 * 2. Quand un avenant modifie une clause citée, c'est la règle de l'avenant qui
 *    prime — à condition que le lien ait été validé manuellement. Un lien
 *    seulement suggéré dégrade la réponse en « À vérifier juridiquement ».
 */

export interface ExcerptLocation {
  start: number;
  end: number;
  /** Texte tel qu'il figure dans la page (espaces et retours d'origine). */
  text: string;
}

/**
 * Retrouve un extrait dans le texte d'une page, en tolérant les seules
 * différences d'espacement — jamais de différence de mots.
 */
export function locateExcerpt(
  pageText: string,
  excerpt: string,
): ExcerptLocation | null {
  const map: number[] = [];
  let flat = "";
  let previousWasSpace = false;

  for (let i = 0; i < pageText.length; i += 1) {
    const char = pageText[i];
    if (/\s/.test(char)) {
      if (previousWasSpace || flat.length === 0) continue;
      flat += " ";
      map.push(i);
      previousWasSpace = true;
      continue;
    }
    flat += char;
    map.push(i);
    previousWasSpace = false;
  }

  const needle = excerpt.replace(/\s+/g, " ").trim();
  if (needle.length === 0) return null;

  const index = normalize(flat).indexOf(normalize(needle));
  if (index === -1) return null;

  const start = map[index];
  const end = (map[index + needle.length - 1] ?? start) + 1;
  return { start, end, text: pageText.slice(start, end) };
}

function findDocument(documents: ContractDocument[], id: string) {
  return documents.find((doc) => doc.id === id);
}

/** Garde les citations vérifiables, écarte les autres. */
function verifyCitations(
  draft: AnswerDraft,
  documents: ContractDocument[],
): { citations: Citation[]; rejected: number } {
  const citations: Citation[] = [];
  let rejected = 0;

  for (const candidate of draft.citations) {
    const doc = findDocument(documents, candidate.documentId);
    const page = doc?.pages.find((entry) => entry.number === candidate.page);
    if (!doc || !page) {
      rejected += 1;
      continue;
    }

    const located = locateExcerpt(page.text, candidate.excerpt);
    if (!located) {
      rejected += 1;
      continue;
    }

    citations.push({
      documentId: doc.id,
      documentTitle: doc.title,
      page: page.number,
      excerpt: located.text,
      score: candidate.score ?? 1,
      clauseId: candidate.clauseId,
      role: candidate.role ?? "principale",
    });
  }

  return { citations, rejected };
}

function clauseForCitation(clauses: Clause[], citation: Citation): Clause | undefined {
  if (citation.clauseId) {
    const byId = clauses.find((clause) => clause.id === citation.clauseId);
    if (byId) return byId;
  }
  const needle = normalize(citation.excerpt.replace(/\s+/g, " ").trim());
  return clauses.find(
    (clause) =>
      clause.documentId === citation.documentId &&
      clause.page === citation.page &&
      needle.includes(normalize(clause.excerpt.replace(/\s+/g, " ").trim())),
  );
}

interface AddendumResolution {
  citations: Citation[];
  notice?: AddendumNotice;
  status?: Answer["status"];
  summary?: string;
  extraCaveats: string[];
}

/** Applique la préséance de l'avenant sur les clauses citées. */
function resolveAddendum(
  citations: Citation[],
  documents: ContractDocument[],
  clauses: Clause[],
  links: AddendumLink[],
  draftStatus: Answer["status"],
): AddendumResolution {
  const extraCaveats: string[] = [];

  for (const citation of citations) {
    const clause = clauseForCitation(clauses, citation);
    if (!clause) continue;

    const link = links.find(
      (entry) => entry.originClauseId === clause.id && entry.status !== "rejected",
    );
    const rejectedLink = links.find(
      (entry) => entry.originClauseId === clause.id && entry.status === "rejected",
    );

    const activeLink = link ?? rejectedLink;
    if (!activeLink) continue;

    const addendumDoc = findDocument(documents, activeLink.addendumDocumentId);
    const originDoc = findDocument(documents, activeLink.originDocumentId);
    const addendumClause = clauses.find(
      (entry) => entry.id === activeLink.addendumClauseId,
    );
    if (!addendumDoc || !originDoc || !addendumClause) continue;

    // Lien écarté par un utilisateur : la rédaction initiale reprend ses droits.
    if (activeLink.status === "rejected") {
      return {
        citations: citations
          .filter((entry) => entry.documentId !== addendumDoc.id)
          .map((entry) =>
            entry === citation ? { ...entry, role: "principale" as const } : entry,
          ),
        status: clause.status,
        summary: `Le lien avec « ${addendumDoc.title} » a été écarté manuellement : c'est la rédaction initiale qui s'applique. ${clause.summary}`,
        notice: {
          addendumDocumentId: addendumDoc.id,
          addendumTitle: addendumDoc.title,
          originDocumentId: originDoc.id,
          originTitle: originDoc.title,
          confirmed: false,
          message: `Un avenant modifiant cette clause existe au dossier, mais le lien a été rejeté. Réactivez-le depuis l'onglet Avenants pour qu'il prévale.`,
        },
        extraCaveats,
      };
    }

    const addendumPage = addendumDoc.pages.find(
      (page) => page.number === addendumClause.page,
    );
    const located = addendumPage
      ? locateExcerpt(addendumPage.text, addendumClause.excerpt)
      : null;

    const withAddendum: Citation[] = citations.map((entry) =>
      entry === citation ? { ...entry, role: "modifiée par avenant" as const } : entry,
    );

    const alreadyCited = withAddendum.some(
      (entry) => entry.clauseId === addendumClause.id,
    );
    if (!alreadyCited && located) {
      withAddendum.unshift({
        documentId: addendumDoc.id,
        documentTitle: addendumDoc.title,
        page: addendumClause.page,
        excerpt: located.text,
        score: 1,
        clauseId: addendumClause.id,
        role: "avenant",
      });
    }

    // L'avenant en tête : c'est la règle applicable.
    withAddendum.sort((a, b) => {
      const weight = (role?: Citation["role"]) =>
        role === "avenant" ? 0 : role === "modifiée par avenant" ? 1 : 2;
      return weight(a.role) - weight(b.role);
    });

    const confirmed = activeLink.status === "confirmed";
    if (!confirmed) {
      extraCaveats.push(
        "Le lien entre l'avenant et la clause d'origine n'a pas encore été validé manuellement : la réponse est donnée sous réserve.",
      );
    }

    return {
      citations: withAddendum,
      notice: {
        addendumDocumentId: addendumDoc.id,
        addendumTitle: addendumDoc.title,
        originDocumentId: originDoc.id,
        originTitle: originDoc.title,
        confirmed,
        message: confirmed
          ? `La clause d'origine de « ${originDoc.title} » est remplacée par « ${addendumDoc.title} ». La règle de l'avenant prévaut.`
          : `Lien détecté (confiance ${Math.round(activeLink.confidence * 100)} %) entre « ${addendumDoc.title} » et la clause d'origine, en attente de validation manuelle.`,
      },
      status: confirmed ? draftStatus : "review",
      extraCaveats,
    };
  }

  return { citations, extraCaveats };
}

export interface AskInput {
  question: string;
  documents: ContractDocument[];
  clauses: Clause[];
  links: AddendumLink[];
  provider?: AnswerProvider;
}

export async function ask({
  question,
  documents,
  clauses,
  links,
  provider = new MockAnswerProvider(),
}: AskInput): Promise<Answer> {
  const chunks = chunkCorpus(documents);
  const retrieved = retrieve(question, chunks);

  const draft = await provider.synthesize({ question, retrieved, documents });
  const { citations, rejected } = verifyCitations(draft, documents);

  const caveats = [...draft.caveats];
  if (rejected > 0) {
    caveats.push(
      `${rejected} citation${rejected > 1 ? "s" : ""} proposée${rejected > 1 ? "s" : ""} par le moteur ${rejected > 1 ? "ont" : "a"} été écartée${rejected > 1 ? "s" : ""} : le passage n'a pas été retrouvé dans la page annoncée.`,
    );
  }

  const base: Answer = {
    id: `ans-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    question,
    status: draft.status,
    summary: draft.summary,
    citations,
    caveats,
    createdAt: new Date().toISOString(),
    engine: provider.name,
  };

  // Une réponse affirmative sans citation vérifiée n'est jamais affichée.
  if (citations.length === 0 && base.status !== "insufficient") {
    return {
      ...base,
      status: "insufficient",
      summary:
        "Information insuffisante. Le moteur n'a pas pu justifier sa réponse par un passage vérifiable du dossier ; la synthèse a donc été écartée.",
    };
  }

  // Une réponse sans conclusion n'a rien à requalifier : un avenant, validé ou
  // non, ne rend pas le dossier plus disert sur une question qu'il ne traite
  // pas. On laisse donc « Information insuffisante » tel quel.
  if (base.status === "insufficient") return base;

  const resolution = resolveAddendum(
    citations,
    documents,
    clauses,
    links,
    base.status,
  );

  return {
    ...base,
    citations: resolution.citations,
    status: resolution.status ?? base.status,
    summary: resolution.summary ?? base.summary,
    caveats: [...base.caveats, ...resolution.extraCaveats],
    addendum: resolution.notice,
  };
}
