"use client";

import type { ContractDocument, DocumentKind, DocumentPage } from "@/lib/types";
import { createId } from "@/lib/utils";

/**
 * Extraction de texte paginée via pdf.js.
 *
 * La pagination est la donnée critique du produit : chaque passage doit pouvoir
 * être rattaché à un numéro de page affichable. On reconstruit donc les lignes à
 * partir des coordonnées des fragments plutôt que de concaténer le flux brut.
 */

type TextItem = { str: string; transform: number[]; hasEOL?: boolean };

let workerConfigured = false;

async function loadPdfjs() {
  const pdfjs = await import("pdfjs-dist");
  if (!workerConfigured) {
    // Le worker est copié dans /public au build (voir README).
    pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
    workerConfigured = true;
  }
  return pdfjs;
}

/** Regroupe les fragments d'une page en lignes, par position verticale. */
function itemsToText(items: TextItem[]): string {
  const lines: { y: number; parts: { x: number; str: string }[] }[] = [];

  for (const item of items) {
    if (!item.str) continue;
    const x = item.transform[4];
    const y = Math.round(item.transform[5]);
    const line = lines.find((entry) => Math.abs(entry.y - y) <= 2);
    if (line) line.parts.push({ x, str: item.str });
    else lines.push({ y, parts: [{ x, str: item.str }] });
  }

  return lines
    .sort((a, b) => b.y - a.y)
    .map((line) =>
      line.parts
        .sort((a, b) => a.x - b.x)
        .map((part) => part.str)
        .join("")
        .replace(/\s+/g, " ")
        .trim(),
    )
    .filter((line) => line.length > 0)
    .join("\n");
}

export interface ExtractionResult {
  pages: DocumentPage[];
  pageCount: number;
}

export async function extractPdfPages(
  file: File,
  onProgress?: (done: number, total: number) => void,
): Promise<ExtractionResult> {
  const pdfjs = await loadPdfjs();
  const data = await file.arrayBuffer();
  const loadingTask = pdfjs.getDocument({ data });
  const pdf = await loadingTask.promise;
  const pageCount = pdf.numPages;

  const pages: DocumentPage[] = [];
  for (let number = 1; number <= pageCount; number += 1) {
    const page = await pdf.getPage(number);
    const content = await page.getTextContent();
    pages.push({
      number,
      text: itemsToText(content.items as TextItem[]),
    });
    onProgress?.(number, pageCount);
  }

  await loadingTask.destroy();
  return { pages, pageCount };
}

const KIND_PATTERNS: [RegExp, DocumentKind][] = [
  [/avenant|addendum|modification du contrat/i, "addendum"],
  [/conditions (generales|générales)|cgu|terms of (use|service)/i, "terms"],
  [/licence|license|sdk|composant/i, "license"],
  [/données personnelles|sous-traitance|rgpd|dpa/i, "dpa"],
];

/** Déduit des métadonnées du contenu : proposition, corrigeable par l'utilisateur. */
export function inferMetadata(file: File, pages: DocumentPage[]) {
  const head = pages
    .slice(0, 2)
    .map((page) => page.text)
    .join("\n");

  const kind =
    KIND_PATTERNS.find(([pattern]) => pattern.test(head) || pattern.test(file.name))?.[1] ??
    "other";

  const reference =
    /(?:référence|reference|contrat n[°o]?)\s*:?\s*([A-Z0-9][A-Z0-9\-/.]{3,})/i.exec(head)?.[1] ??
    "—";

  const counterparty =
    /([A-ZÀ-Ü][\wÀ-ÿ&'.\- ]{2,60}?\s(?:SAS|SARL|SA|B\.?V\.?|Ltd|LLC|GmbH|Inc\.?))/.exec(head)?.[1]?.trim() ??
    "À compléter";

  const isoDate = /(\d{4})-(\d{2})-(\d{2})/.exec(head);
  const frDate = /(\d{1,2})[/\s](\d{1,2}|janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)[/\s](\d{4})/i.exec(head);

  const months = [
    "janvier", "février", "mars", "avril", "mai", "juin",
    "juillet", "août", "septembre", "octobre", "novembre", "décembre",
  ];
  let effectiveDate = new Date().toISOString().slice(0, 10);
  if (isoDate) {
    effectiveDate = isoDate[0];
  } else if (frDate) {
    const monthIndex = Number.isNaN(Number(frDate[2]))
      ? months.indexOf(frDate[2].toLowerCase()) + 1
      : Number(frDate[2]);
    effectiveDate = `${frDate[3]}-${String(monthIndex).padStart(2, "0")}-${frDate[1].padStart(2, "0")}`;
  }

  const title = file.name.replace(/\.pdf$/i, "").replace(/[_-]+/g, " ").trim();

  return { kind, reference, counterparty, effectiveDate, title };
}

export async function importPdf(
  file: File,
  onProgress?: (done: number, total: number) => void,
): Promise<ContractDocument> {
  const { pages, pageCount } = await extractPdfPages(file, onProgress);
  const meta = inferMetadata(file, pages);

  return {
    id: createId("doc"),
    title: meta.title || file.name,
    counterparty: meta.counterparty,
    kind: meta.kind,
    reference: meta.reference,
    effectiveDate: meta.effectiveDate,
    addedAt: new Date().toISOString(),
    source: "upload",
    pageCount,
    pages,
    fileSize: file.size,
  };
}
