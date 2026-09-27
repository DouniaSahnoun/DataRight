"use client";

import {
  ArrowUpRight,
  GitCompareArrows,
  Info,
  Quote,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import Link from "next/link";

import { StatusBadge } from "@/components/ui/status-badge";
import { useStore } from "@/lib/store";
import type { Answer, Citation } from "@/lib/types";
import { cn, formatDateTime } from "@/lib/utils";

const ROLE_STYLE: Record<NonNullable<Citation["role"]>, string> = {
  principale: "border-brand-200 bg-brand-50 text-brand-700",
  avenant: "border-emerald-200 bg-emerald-50 text-emerald-700",
  "modifiée par avenant": "border-amber-200 bg-amber-50 text-amber-800",
  contexte: "border-ink-200 bg-ink-50 text-ink-500",
};

function CitationRow({ citation }: { citation: Citation }) {
  const { openInViewer } = useStore();

  return (
    <button
      type="button"
      onClick={() =>
        openInViewer({
          documentId: citation.documentId,
          page: citation.page,
          highlight: citation.excerpt,
        })
      }
      className="group w-full rounded-lg border border-ink-200 bg-white p-3 text-left transition-all hover:border-brand-300 hover:shadow-sm focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:outline-none"
    >
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="truncate text-[12.5px] font-medium text-ink-800">
          {citation.documentTitle}
        </span>
        <span className="rounded-md bg-ink-900 px-1.5 py-px text-[10px] font-semibold text-white tabular-nums">
          p. {citation.page}
        </span>
        {citation.role ? (
          <span
            className={cn(
              "rounded-md border px-1.5 py-px text-[10px] font-medium",
              ROLE_STYLE[citation.role],
            )}
          >
            {citation.role}
          </span>
        ) : null}
        <ArrowUpRight className="ml-auto size-3.5 shrink-0 text-ink-300 transition-colors group-hover:text-brand-600" />
      </div>

      <blockquote className="mt-2 border-l-2 border-ink-200 pl-3 font-serif text-[13px] leading-relaxed text-ink-600 group-hover:border-brand-300">
        <Quote className="mr-1 inline size-3 -translate-y-0.5 text-ink-300" aria-hidden />
        {citation.excerpt}
      </blockquote>
    </button>
  );
}

export function AnswerCard({ answer }: { answer: Answer }) {
  const hasCitations = answer.citations.length > 0;

  return (
    <div className="animate-fade-up rounded-xl border border-ink-200 bg-white p-4 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <StatusBadge status={answer.status} />
        <span className="text-[11px] text-ink-400">
          {answer.engine === "claude" ? "Claude" : "Moteur local"} ·{" "}
          {formatDateTime(answer.createdAt)}
        </span>
      </div>

      <p className="mt-3 text-[14.5px] leading-relaxed text-ink-900">{answer.summary}</p>

      {answer.addendum ? (
        <div
          className={cn(
            "mt-3 rounded-lg border p-3",
            answer.addendum.confirmed
              ? "border-emerald-200 bg-emerald-50/70"
              : "border-amber-200 bg-amber-50/70",
          )}
        >
          <div className="flex items-center gap-2">
            <GitCompareArrows
              className={cn(
                "size-3.5 shrink-0",
                answer.addendum.confirmed ? "text-emerald-700" : "text-amber-700",
              )}
              aria-hidden
            />
            <p
              className={cn(
                "text-[11px] font-semibold tracking-wide uppercase",
                answer.addendum.confirmed ? "text-emerald-800" : "text-amber-800",
              )}
            >
              {answer.addendum.confirmed
                ? "Avenant appliqué"
                : "Lien d'avenant à valider"}
            </p>
            {answer.addendum.confirmed ? (
              <ShieldCheck className="size-3.5 text-emerald-600" aria-hidden />
            ) : null}
          </div>
          <p
            className={cn(
              "mt-1.5 text-[12.5px] leading-relaxed",
              answer.addendum.confirmed ? "text-emerald-900" : "text-amber-900",
            )}
          >
            {answer.addendum.message}
          </p>
          <Link
            href="/avenants"
            className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-ink-700 underline underline-offset-2 hover:text-ink-900"
          >
            Gérer les liens d&apos;avenants
            <ArrowUpRight className="size-3" aria-hidden />
          </Link>
        </div>
      ) : null}

      {hasCitations ? (
        <div className="mt-4">
          <p className="mb-2 text-[11px] font-semibold tracking-wide text-ink-400 uppercase">
            Sources justificatives ({answer.citations.length})
          </p>
          <div className="flex flex-col gap-2">
            {answer.citations.map((citation, index) => (
              <CitationRow key={`${citation.documentId}-${citation.page}-${index}`} citation={citation} />
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-4 flex items-start gap-2 rounded-lg border border-dashed border-ink-200 bg-ink-50 p-3 text-[12.5px] text-ink-600">
          <Info className="mt-0.5 size-3.5 shrink-0 text-ink-400" aria-hidden />
          <p>
            Aucun passage du dossier ne permet de conclure.
          </p>
        </div>
      )}

      {answer.caveats.length > 0 ? (
        <div className="mt-3 rounded-lg border border-ink-200 bg-ink-50/70 p-3">
          <div className="flex items-center gap-2">
            <TriangleAlert className="size-3.5 text-ink-400" aria-hidden />
            <p className="text-[11px] font-semibold tracking-wide text-ink-500 uppercase">
              Conditions & points d&apos;attention
            </p>
          </div>
          <ul className="mt-2 flex flex-col gap-1.5">
            {answer.caveats.map((caveat, index) => (
              <li
                key={index}
                className="flex gap-2 text-[12.5px] leading-relaxed text-ink-700"
              >
                <span className="mt-1.5 size-1 shrink-0 rounded-full bg-ink-400" />
                {caveat}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
