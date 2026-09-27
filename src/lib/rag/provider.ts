import { SCRIPTED_ANSWERS } from "@/lib/mock/scripted-answers";
import type { ScoredChunk } from "@/lib/rag/retriever";
import { normalize, tokenize } from "@/lib/rag/retriever";
import type { ContractDocument, RightStatus } from "@/lib/types";

/**
 * Couche de synthèse du pipeline RAG.
 *
 * Le moteur (engine.ts) fournit toujours les passages récupérés ; le provider ne
 * fait que rédiger. Il ne voit rien d'autre que ces passages, ce qui rend
 * structurellement impossible une réponse sans source. Deux implémentations :
 * `MockAnswerProvider` (hors-ligne, déterministe) et l'appel à Claude côté
 * serveur (`/api/ask`), qui respecte le même contrat.
 */

export interface DraftCitation {
  documentId: string;
  page: number;
  /** Citation littérale, vérifiée ensuite contre le texte de la page. */
  excerpt: string;
  role?: "principale" | "modifiée par avenant" | "avenant" | "contexte";
  clauseId?: string;
  score?: number;
}

export interface AnswerDraft {
  status: RightStatus;
  summary: string;
  caveats: string[];
  citations: DraftCitation[];
}

export interface SynthesisInput {
  question: string;
  retrieved: ScoredChunk[];
  documents: ContractDocument[];
}

export interface AnswerProvider {
  readonly name: "mock" | "claude";
  synthesize(input: SynthesisInput): Promise<AnswerDraft>;
}

/**
 * Couverture minimale des termes de la question exigée pour oser répondre.
 * En deçà, le dossier est considéré comme muet sur le sujet.
 */
export const CONFIDENCE_FLOOR = 0.34;

const PERMISSION_MARKERS = [
  "est autorise",
  "sont autorises",
  "concede au",
  "peut realiser",
  "le client peut",
  "beneficie",
];
const RESTRICTION_MARKERS = [
  "interdit",
  "interdiction",
  "s'interdit",
  "ne confere aucun",
  "ne s'etend pas",
];
const REVIEW_MARKERS = [
  "accord ecrit prealable",
  "autorisation ecrite prealable",
  "cas par cas",
  "sous reserve",
  "requiert la signature",
  "soumis a",
];

function classify(text: string): RightStatus {
  const value = normalize(text);
  const restriction = RESTRICTION_MARKERS.some((marker) => value.includes(marker));
  const permission = PERMISSION_MARKERS.some((marker) => value.includes(marker));
  const review = REVIEW_MARKERS.some((marker) => value.includes(marker));

  if (restriction && !permission) return "restriction";
  if (permission && review) return "review";
  if (permission) return "permission";
  if (review) return "review";
  if (restriction) return "restriction";
  return "review";
}

/** Première phrase du passage, tronquée proprement. */
function leadSentence(text: string, max = 240): string {
  const flat = text.replace(/\s+/g, " ").trim();
  const end = flat.search(/\.\s|\.$/);
  const sentence = end > 40 ? flat.slice(0, end + 1) : flat;
  return sentence.length > max ? `${sentence.slice(0, max).trimEnd()}…` : sentence;
}

function matchScripted(question: string) {
  const tokens = new Set(tokenize(question));
  return SCRIPTED_ANSWERS.find((entry) =>
    entry.all.every((group) => group.some((term) => tokens.has(term))),
  );
}

/**
 * Provider hors-ligne. Il répond d'abord par les scénarios scriptés (démo), et
 * retombe sinon sur une synthèse extractive stricte : statut déduit des marqueurs
 * lexicaux du passage le mieux classé, citations = passages récupérés tels quels.
 */
export class MockAnswerProvider implements AnswerProvider {
  readonly name = "mock" as const;

  async synthesize({ question, retrieved }: SynthesisInput): Promise<AnswerDraft> {
    const scripted = matchScripted(question);
    if (scripted) return structuredClone(scripted.draft);

    const best = retrieved[0];
    if (!best || best.coverage < CONFIDENCE_FLOOR) {
      return {
        status: "insufficient",
        summary:
          "Information insuffisante. Aucun passage du dossier ne traite cette question de manière suffisamment directe pour fonder une réponse. Importez le contrat concerné ou reformulez la question en nommant le produit ou le type d'usage visé.",
        caveats: [
          "DataRight ne répond jamais sans citation : en l'absence de passage pertinent, aucune conclusion n'est produite.",
        ],
        citations: retrieved.slice(0, 2).map((entry) => ({
          documentId: entry.chunk.documentId,
          page: entry.chunk.page,
          excerpt: entry.chunk.text,
          role: "contexte" as const,
          score: entry.score,
        })),
      };
    }

    const status = classify(best.chunk.text);
    const article = best.chunk.article ? ` (art. ${best.chunk.article})` : "";
    const opening =
      status === "permission"
        ? "Usage couvert par une clause explicite"
        : status === "restriction"
          ? "Restriction explicite dans le dossier"
          : "Clause conditionnelle : validation juridique requise";

    return {
      status,
      summary: `${opening} — ${best.chunk.documentTitle}, page ${best.chunk.page}${article} : ${leadSentence(best.chunk.text)}`,
      caveats:
        status === "review"
          ? ["Le passage retenu subordonne l'usage à une condition ou à un accord : faire valider par la direction juridique."]
          : [],
      citations: retrieved.slice(0, 3).map((entry, index) => ({
        documentId: entry.chunk.documentId,
        page: entry.chunk.page,
        excerpt: entry.chunk.text,
        role: index === 0 ? ("principale" as const) : ("contexte" as const),
        score: entry.score,
      })),
    };
  }
}
