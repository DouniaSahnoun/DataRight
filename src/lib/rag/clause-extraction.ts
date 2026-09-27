import { chunkDocument } from "@/lib/rag/chunking";
import { normalize, tokenize } from "@/lib/rag/retriever";
import type { AddendumLink, Clause, ContractDocument, RightStatus } from "@/lib/types";
import { createId } from "@/lib/utils";

/**
 * Extraction automatique des droits d'un document importé.
 *
 * Volontairement conservatrice : on ne retient que les alinéas porteurs d'un
 * marqueur de droit explicite, et tout résultat reste corrigeable par
 * l'utilisateur depuis le registre des droits.
 */

/**
 * Les motifs sont testés sur le texte normalisé (minuscules, sans diacritiques) :
 * certains PDF restituent « autorisé » sans son accent, et une clause ne doit pas
 * échapper à l'extraction pour cette raison.
 */
const CATEGORIES: { label: string; patterns: RegExp }[] = [
  {
    label: "Usage commercial",
    patterns: /commercial|exploitation|service heberg|hosted service|saas|software-as-a-service/,
  },
  {
    label: "Redistribution",
    patterns: /distribu|sous-licenci|revend|ceder|partager|revente|resell|sublicense|assign/,
  },
  {
    label: "Données",
    patterns: /donnees|cache|jeu de donnees|dataset|base de donnees|licensed data|customer data|corpus|model weights/,
  },
  { label: "Marques", patterns: /marque|logo|nom commercial|trademark/ },
  { label: "Confidentialité", patterns: /confidentialit|secret|nda|confidential/ },
  {
    label: "Propriété intellectuelle",
    patterns: /propriete intellectuelle|droits d'auteur|ingenierie inverse|decompil|intellectual property/,
  },
  {
    label: "Obligations",
    patterns: /s'engage|doit |obligation|mention|shall |must |notify|usage report|summary report/,
  },
  {
    label: "Usage interne",
    patterns: /usage interne|besoins propres|collaborateurs|internal|non-production/,
  },
];

/**
 * Marqueurs de droit, en français et en anglais : le dossier peut mêler des
 * contrats rédigés dans les deux langues.
 */
const RESTRICTION =
  /s'interdit|est interdit|interdiction|ne confere aucun|ne s'etend pas|prohib|shall not|may not|no right is granted|no licence|does not authorise|does not extend|excludes|must remain/;
const PERMISSION =
  /est autorise|sont autorises|concede|peut realiser|beneficie|a le droit|grants licensee|grants customer|may use|may create|may integrate|may deploy|may process|may be delivered|may request|retains/;
const REVIEW =
  /accord ecrit prealable|autorisation ecrite prealable|cas par cas|sous reserve|requiert|soumis a|subject to|prior written consent|written approval|written consent|unless the parties|remain subject to|requires/;

function classify(rawText: string): RightStatus | null {
  const text = normalize(rawText);
  const restriction = RESTRICTION.test(text);
  const permission = PERMISSION.test(text);
  const review = REVIEW.test(text);

  if (!restriction && !permission && !review) return null;
  if (permission && (review || restriction)) return "review";
  if (permission) return "permission";
  if (restriction) return "restriction";
  return "review";
}

function categoryOf(rawText: string): string {
  const text = normalize(rawText);
  return CATEGORIES.find((entry) => entry.patterns.test(text))?.label ?? "Autres usages";
}

function titleOf(text: string, article?: string): string {
  const flat = text.replace(/\s+/g, " ").replace(/^(?:article\s+)?[\d.]+\s*[—-]?\s*/i, "");
  const words = flat.split(" ").slice(0, 9).join(" ");
  const prefix = article ? `Art. ${article} — ` : "";
  return `${prefix}${words}${flat.split(" ").length > 9 ? "…" : ""}`;
}

export function extractClauses(doc: ContractDocument): Clause[] {
  const clauses: Clause[] = [];

  for (const chunk of chunkDocument(doc)) {
    const status = classify(chunk.text);
    if (!status) continue;

    const excerpt = chunk.text.replace(/\s+/g, " ").trim();
    if (excerpt.length < 40) continue;

    clauses.push({
      id: createId("cl"),
      documentId: doc.id,
      page: chunk.page,
      title: titleOf(chunk.text, chunk.article),
      category: categoryOf(chunk.text),
      status,
      excerpt,
      summary: excerpt.length > 180 ? `${excerpt.slice(0, 180).trimEnd()}…` : excerpt,
    });
  }

  return clauses;
}

/**
 * Retrouve la clause d'origine visée par un numéro d'article cité.
 *
 * On passe par le texte du contrat initial plutôt que par les extraits du
 * registre : ces derniers omettent souvent la numérotation, alors que l'alinéa
 * du document, lui, la porte toujours.
 */
function clauseAtArticle(
  origin: ContractDocument,
  originClauses: Clause[],
  article: string,
): Clause | undefined {
  const chunk = chunkDocument(origin).find((entry) => entry.article === article);
  if (!chunk) return undefined;

  const haystack = normalize(chunk.text.replace(/\s+/g, " "));
  return originClauses.find(
    (clause) =>
      clause.page === chunk.page &&
      haystack.includes(normalize(clause.excerpt.replace(/\s+/g, " ").trim())),
  );
}

function similarity(a: string, b: string): number {
  const left = new Set(tokenize(a));
  const right = new Set(tokenize(b));
  if (left.size === 0 || right.size === 0) return 0;
  let shared = 0;
  for (const token of left) if (right.has(token)) shared += 1;
  return shared / Math.min(left.size, right.size);
}

/**
 * Propose des liens entre les clauses d'un avenant et celles qu'il modifie.
 *
 * Deux signaux : la citation explicite d'un article du contrat initial
 * (« l'article 4.2 du contrat initial ») et le recouvrement lexical. Le lien est
 * toujours créé au statut « suggested » : la validation reste manuelle.
 */
export function suggestAddendumLinks(
  addendum: ContractDocument,
  addendumClauses: Clause[],
  documents: ContractDocument[],
  clauses: Clause[],
): AddendumLink[] {
  if (addendum.kind !== "addendum") return [];

  const fullText = addendum.pages.map((page) => page.text).join("\n");
  const normalizedText = normalize(fullText);

  // 1. Contrat d'origine : référence citée, puis contrepartie identique.
  const origin =
    documents.find(
      (doc) =>
        doc.id !== addendum.id &&
        doc.kind !== "addendum" &&
        doc.reference !== "—" &&
        normalizedText.includes(normalize(doc.reference)),
    ) ??
    documents.find(
      (doc) =>
        doc.id !== addendum.id &&
        doc.kind !== "addendum" &&
        normalize(doc.counterparty) === normalize(addendum.counterparty),
    );

  if (!origin) return [];

  const originClauses = clauses.filter((clause) => clause.documentId === origin.id);
  const links: AddendumLink[] = [];

  for (const clause of addendumClauses) {
    // « l'article 4.2 du contrat initial » ou « Section 3.1(a) of D01 ».
    const citedArticle = /(?:article|section)\s+(\d+(?:\.\d+)+)(?:\([a-z]\))?\s+(?:du contrat|of\s+[a-z]*\d+)/i.exec(
      clause.excerpt,
    )?.[1];

    let target: Clause | undefined;
    let confidence = 0;
    let rationale = "";

    if (citedArticle) {
      target = clauseAtArticle(origin, originClauses, citedArticle);
      if (target) {
        confidence = 0.9;
        rationale = `L'avenant cite explicitement l'article ${citedArticle} du contrat « ${origin.title} » et en donne une nouvelle rédaction.`;
      }
    }

    if (!target) {
      let best = 0;
      for (const candidate of originClauses) {
        const score = similarity(clause.excerpt, candidate.excerpt);
        if (score > best) {
          best = score;
          target = candidate;
        }
      }
      if (!target || best < 0.35) continue;
      confidence = Math.min(0.85, best);
      rationale = `Recouvrement lexical de ${Math.round(best * 100)} % avec une clause de « ${origin.title} », même contrepartie et date d'effet postérieure.`;
    }

    if (!target) continue;

    links.push({
      id: createId("link"),
      addendumDocumentId: addendum.id,
      addendumClauseId: clause.id,
      originDocumentId: origin.id,
      originClauseId: target.id,
      confidence,
      rationale,
      status: "suggested",
    });
  }

  return links;
}
