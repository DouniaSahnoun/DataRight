"use client";

import { ChevronDown, ChevronUp, FileText, Highlighter } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { EmptyState, Select } from "@/components/ui/primitives";
import { locateExcerpt } from "@/lib/rag/engine";
import { useStore } from "@/lib/store";
import type { ContractDocument } from "@/lib/types";
import { cn, formatDate } from "@/lib/utils";

const KIND_LABEL: Record<ContractDocument["kind"], string> = {
  license: "Licence",
  terms: "Conditions",
  addendum: "Avenant",
  dpa: "Données personnelles",
  other: "Document",
};

/** Rend le texte d'une page en surlignant le passage cité, s'il y figure. */
function PageText({
  text,
  highlight,
  markRef,
}: {
  text: string;
  highlight?: string;
  markRef: React.RefObject<HTMLElement | null>;
}) {
  const located = useMemo(
    () => (highlight ? locateExcerpt(text, highlight) : null),
    [text, highlight],
  );

  if (!located) {
    return <p className="whitespace-pre-wrap">{text}</p>;
  }

  return (
    <p className="whitespace-pre-wrap">
      {text.slice(0, located.start)}
      <mark ref={markRef as React.RefObject<HTMLElement>} className="dr-mark highlight-pulse">
        {located.text}
      </mark>
      {text.slice(located.end)}
    </p>
  );
}

export function DocumentViewer({ className }: { className?: string }) {
  const { documents, viewerTarget, openInViewer } = useStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef(new Map<number, HTMLElement>());
  const markRef = useRef<HTMLElement | null>(null);
  const [activePage, setActivePage] = useState(1);

  const activeId = viewerTarget?.documentId ?? documents[0]?.id ?? null;
  const doc = documents.find((entry) => entry.id === activeId) ?? null;

  // Défilement automatique vers la page (et le passage) demandé par une citation.
  useEffect(() => {
    if (!viewerTarget || !doc) return;
    const frame = requestAnimationFrame(() => {
      const target =
        (viewerTarget.highlight && markRef.current) ||
        pageRefs.current.get(viewerTarget.page);
      target?.scrollIntoView({ behavior: "smooth", block: "center" });
      setActivePage(viewerTarget.page);
    });
    return () => cancelAnimationFrame(frame);
  }, [viewerTarget, doc]);

  // Page courante déduite de la position de défilement.
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const onScroll = () => {
      const { top } = container.getBoundingClientRect();
      let current = 1;
      for (const [number, element] of pageRefs.current) {
        if (element.getBoundingClientRect().top - top <= 80) current = number;
      }
      setActivePage(current);
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, [doc?.id]);

  const goToPage = (page: number) => {
    if (!doc) return;
    const clamped = Math.min(Math.max(page, 1), doc.pageCount);
    pageRefs.current.get(clamped)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActivePage(clamped);
  };

  if (!doc) {
    return (
      <div className={cn("flex items-center justify-center p-6", className)}>
        <EmptyState
          icon={<FileText className="size-5" />}
          title="Aucun document au dossier"
          description="Importez un contrat PDF depuis l'espace Documents pour consulter son texte paginé ici."
        />
      </div>
    );
  }

  return (
    <div className={cn("flex min-h-0 flex-col bg-ink-100/60", className)}>
      <div className="flex shrink-0 flex-wrap items-center gap-2 border-b border-ink-200 bg-white px-4 py-2.5">
        <div className="min-w-0 flex-1">
          <Select
            value={doc.id}
            onChange={(event) =>
              openInViewer({ documentId: event.target.value, page: 1 })
            }
            className="w-full max-w-full truncate border-0 px-0 text-sm font-semibold shadow-none focus:ring-0"
          >
            {documents.map((entry) => (
              <option key={entry.id} value={entry.id}>
                {entry.title}
              </option>
            ))}
          </Select>
          <p className="truncate text-[11px] text-ink-400">
            {KIND_LABEL[doc.kind]} · {doc.counterparty} · effet au{" "}
            {formatDate(doc.effectiveDate)} · réf. {doc.reference}
          </p>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Page précédente"
            disabled={activePage <= 1}
            onClick={() => goToPage(activePage - 1)}
          >
            <ChevronUp />
          </Button>
          <span className="min-w-[68px] text-center text-xs font-medium text-ink-600 tabular-nums">
            Page {activePage} / {doc.pageCount}
          </span>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Page suivante"
            disabled={activePage >= doc.pageCount}
            onClick={() => goToPage(activePage + 1)}
          >
            <ChevronDown />
          </Button>
        </div>
      </div>

      {viewerTarget?.highlight ? (
        <div className="flex shrink-0 items-center gap-2 border-b border-amber-200 bg-amber-50 px-4 py-2 text-[11px] text-amber-900">
          <Highlighter className="size-3.5 shrink-0" aria-hidden />
          <span className="truncate">
            Passage cité surligné en page {viewerTarget.page}
          </span>
        </div>
      ) : null}

      <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-2xl flex-col gap-4">
          {doc.pages.map((page) => (
            <article
              key={page.number}
              ref={(element) => {
                if (element) pageRefs.current.set(page.number, element);
                else pageRefs.current.delete(page.number);
              }}
              className={cn(
                "scroll-mt-4 rounded-lg border bg-white px-6 py-6 shadow-xs transition-colors sm:px-8",
                activePage === page.number ? "border-brand-200" : "border-ink-200",
              )}
            >
              <div className="mb-4 flex items-center justify-between border-b border-ink-100 pb-2">
                <span className="text-[10px] font-semibold tracking-widest text-ink-400 uppercase">
                  {doc.reference !== "—" ? doc.reference : doc.title}
                </span>
                <span className="text-[10px] font-medium text-ink-400 tabular-nums">
                  Page {page.number} / {doc.pageCount}
                </span>
              </div>
              <div className="font-serif text-[13.5px] leading-[1.75] text-ink-800">
                <PageText
                  text={page.text}
                  highlight={
                    viewerTarget?.page === page.number ? viewerTarget.highlight : undefined
                  }
                  markRef={markRef}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
