"use client";

import {
  ArrowRight,
  Check,
  ExternalLink,
  GitCompareArrows,
  RotateCcw,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, Chip, EmptyState, SectionTitle } from "@/components/ui/primitives";
import { StatusBadge } from "@/components/ui/status-badge";
import { useStore } from "@/lib/store";
import type { AddendumLink, Clause } from "@/lib/types";
import { cn } from "@/lib/utils";

const STATUS_STYLE: Record<AddendumLink["status"], { label: string; className: string }> =
  {
    confirmed: {
      label: "Lien validé — l'avenant prévaut",
      className: "border-emerald-200 bg-emerald-50 text-emerald-800",
    },
    suggested: {
      label: "Détecté automatiquement — à valider",
      className: "border-amber-200 bg-amber-50 text-amber-800",
    },
    rejected: {
      label: "Lien écarté — la clause d'origine s'applique",
      className: "border-ink-200 bg-ink-100 text-ink-600",
    },
  };

function ClausePreview({
  clause,
  label,
  tone,
}: {
  clause?: Clause;
  label: string;
  tone: "origin" | "addendum";
}) {
  const router = useRouter();
  const { documents, openInViewer } = useStore();
  const document = documents.find((entry) => entry.id === clause?.documentId);

  if (!clause || !document) {
    return (
      <div className="rounded-lg border border-dashed border-ink-200 p-3 text-[12px] text-ink-400">
        {label} introuvable (document retiré du dossier).
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex min-w-0 flex-1 flex-col rounded-lg border p-3",
        tone === "addendum"
          ? "border-emerald-200 bg-emerald-50/40"
          : "border-ink-200 bg-ink-50/60",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px] font-semibold tracking-widest text-ink-400 uppercase">
          {label}
        </span>
        <StatusBadge status={clause.status} size="sm" short />
      </div>
      <p className="mt-1.5 truncate text-[12px] font-medium text-ink-800">
        {document.title}
      </p>
      <p className="text-[11px] text-ink-400">
        Page {clause.page} · {clause.category}
      </p>
      <blockquote className="mt-2 flex-1 border-l-2 border-ink-200 pl-2.5 font-serif text-[12px] leading-relaxed text-ink-600">
        {clause.excerpt}
      </blockquote>
      <button
        type="button"
        onClick={() => {
          openInViewer({
            documentId: clause.documentId,
            page: clause.page,
            highlight: clause.excerpt,
          });
          router.push("/");
        }}
        className="mt-2 inline-flex items-center gap-1 self-start text-[11px] font-medium text-ink-600 underline underline-offset-2 hover:text-ink-900"
      >
        Voir dans le document
        <ExternalLink className="size-3" aria-hidden />
      </button>
    </div>
  );
}

function LinkCard({ link }: { link: AddendumLink }) {
  const { clauses, setLinkStatus } = useStore();
  const addendumClause = clauses.find((entry) => entry.id === link.addendumClauseId);
  const originClause = clauses.find((entry) => entry.id === link.originClauseId);
  const style = STATUS_STYLE[link.status];

  return (
    <Card className="p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium",
            style.className,
          )}
        >
          <GitCompareArrows className="size-3" aria-hidden />
          {style.label}
        </span>
        <Chip>Confiance {Math.round(link.confidence * 100)} %</Chip>
      </div>

      <p className="mt-3 text-[12.5px] leading-relaxed text-ink-600">
        {link.rationale}
      </p>

      <div className="mt-3 flex flex-col items-stretch gap-2 md:flex-row md:items-stretch">
        <ClausePreview clause={originClause} label="Clause d'origine" tone="origin" />
        <div className="flex items-center justify-center text-ink-300 md:px-1">
          <ArrowRight className="size-4 rotate-90 md:rotate-0" aria-hidden />
        </div>
        <ClausePreview
          clause={addendumClause}
          label="Rédaction de l'avenant"
          tone="addendum"
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-ink-100 pt-3">
        <p className="mr-auto text-[11.5px] text-ink-400">
          La règle de l&apos;avenant ne prévaut dans les réponses qu&apos;une fois le
          lien validé.
        </p>
        {link.status !== "confirmed" ? (
          <Button
            variant="primary"
            size="sm"
            onClick={() => setLinkStatus(link.id, "confirmed")}
          >
            <Check />
            Valider le lien
          </Button>
        ) : null}
        {link.status !== "rejected" ? (
          <Button
            variant="danger"
            size="sm"
            onClick={() => setLinkStatus(link.id, "rejected")}
          >
            <X />
            Écarter
          </Button>
        ) : null}
        {link.status !== "suggested" ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLinkStatus(link.id, "suggested")}
          >
            <RotateCcw />
            Remettre en attente
          </Button>
        ) : null}
      </div>
    </Card>
  );
}

export default function AddendumsPage() {
  const { links, documents } = useStore();

  const orphanAddendums = documents.filter(
    (doc) =>
      doc.kind === "addendum" &&
      !links.some((link) => link.addendumDocumentId === doc.id),
  );

  const ordered = [...links].sort((a, b) => {
    const weight = (status: AddendumLink["status"]) =>
      status === "suggested" ? 0 : status === "confirmed" ? 1 : 2;
    return weight(a.status) - weight(b.status) || b.confidence - a.confidence;
  });

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
        <SectionTitle
          title="Avenants et clauses modifiées"
          subtitle="Un avenant ne s'applique qu'une fois son lien validé par vous."
        />

        <div className="mt-5 flex flex-col gap-3 pb-8">
          {ordered.map((link) => (
            <LinkCard key={link.id} link={link} />
          ))}

          {ordered.length === 0 ? (
            <EmptyState
              icon={<GitCompareArrows className="size-5" />}
              title="Aucun lien d'avenant"
              description="Importez un avenant : la clause qu'il modifie vous sera proposée."
            />
          ) : null}

          {orphanAddendums.length > 0 ? (
            <Card className="border-dashed p-4">
              <p className="text-[12px] font-semibold text-ink-700">
                Avenants sans clause d&apos;origine identifiée
              </p>
              <p className="mt-1 text-[12px] text-ink-500">
                Aucune clause d&apos;origine trouvée : le contrat initial est-il importé ?
              </p>
              <ul className="mt-2 flex flex-col gap-1">
                {orphanAddendums.map((doc) => (
                  <li key={doc.id} className="text-[12px] text-ink-600">
                    · {doc.title}
                  </li>
                ))}
              </ul>
            </Card>
          ) : null}
        </div>
      </div>
    </div>
  );
}
