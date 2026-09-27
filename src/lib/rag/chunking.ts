import type { ContractDocument } from "@/lib/types";

/**
 * Découpage du corpus en passages indexables.
 *
 * L'unité retenue est l'alinéa d'article : c'est le plus petit bloc qui reste
 * citable tel quel dans une réponse, et il conserve toujours son numéro de page
 * — condition nécessaire à la traçabilité exigée par DataRight.
 */
export interface Chunk {
  id: string;
  documentId: string;
  documentTitle: string;
  page: number;
  /** Position du passage dans le texte de la page (pour le surlignage). */
  offset: number;
  text: string;
  /** Numéro d'article détecté, ex. "4.2", quand il est identifiable. */
  article?: string;
}

/**
 * Articles hors périmètre : DataRight n'indexe aucune stipulation financière.
 *
 * Le repère est le vocabulaire de la redevance (« fee », « conditions
 * financières ») ou un montant libellé dans une devise — pas la simple mention
 * d'une facturation, afin qu'un plafond d'usage assorti d'un renvoi tarifaire
 * reste, lui, indexé comme la clause d'usage qu'il est.
 */
const OUT_OF_SCOPE =
  /\[article non indexé par dataright\]|conditions financières|\bfees?\b|\b(?:eur|gbp|usd|chf)\s?[\d ,.]/i;

const ARTICLE_PREFIX = /^(?:article\s+)?(\d+(?:\.\d+)*)/i;

/** Regroupe les lignes d'une page en blocs cohérents (un alinéa = un bloc). */
function splitPageIntoBlocks(text: string): { text: string; offset: number }[] {
  const blocks: { text: string; offset: number }[] = [];
  let current: string[] = [];
  let currentOffset = 0;
  let cursor = 0;

  const flush = () => {
    const joined = current.join("\n").trim();
    if (joined.length > 0) blocks.push({ text: joined, offset: currentOffset });
    current = [];
  };

  for (const line of text.split("\n")) {
    const lineStart = cursor;
    cursor += line.length + 1;
    const trimmed = line.trim();

    if (trimmed.length === 0) {
      flush();
      continue;
    }
    // Un nouvel alinéa numéroté ou un titre d'article ouvre un bloc.
    if (current.length > 0 && ARTICLE_PREFIX.test(trimmed)) flush();
    if (current.length === 0) currentOffset = lineStart;
    current.push(trimmed);
  }
  flush();
  return blocks;
}

export function chunkDocument(doc: ContractDocument): Chunk[] {
  const chunks: Chunk[] = [];

  for (const page of doc.pages) {
    for (const block of splitPageIntoBlocks(page.text)) {
      if (OUT_OF_SCOPE.test(block.text)) continue;
      if (block.text.length < 24) continue;

      const article = ARTICLE_PREFIX.exec(block.text)?.[1];
      chunks.push({
        id: `${doc.id}:p${page.number}:${block.offset}`,
        documentId: doc.id,
        documentTitle: doc.title,
        page: page.number,
        offset: block.offset,
        text: block.text,
        article,
      });
    }
  }
  return chunks;
}

export function chunkCorpus(docs: ContractDocument[]): Chunk[] {
  return docs.flatMap(chunkDocument);
}
