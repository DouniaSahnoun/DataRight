"use client";

import {
  ArrowRight,
  Boxes,
  ChevronRight,
  Info,
  Layers,
  Network,
  TrendingDown,
} from "lucide-react";
import { useMemo, useState } from "react";

import type { FinanceSelection } from "@/components/finance/detail-sheet";
import { FinanceDetailSheet } from "@/components/finance/detail-sheet";
import { ImportFinancials } from "@/components/finance/import-financials";
import { DatasetSource, ReferenceDateControl } from "@/components/finance/reference-date";
import { Card, Chip, EmptyState, SectionTitle } from "@/components/ui/primitives";
import { STATUS_META, StatusBadge, StatusDot } from "@/components/ui/status-badge";
import {
  assessComponents,
  computeAssociatedRevenue,
  computeRevenuePartition,
  featuresWithoutRevenue,
} from "@/lib/finance/association";
import { formatKEuros, formatShare, sanitizeDocumentText } from "@/lib/finance/format";
import { useStore } from "@/lib/store";
import type { AddendumLink, RightStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

/** Ordre d'affichage des postes : du plus à traiter au plus neutre. */
const BUCKET_ORDER: RightStatus[] = [
  "restriction",
  "review",
  "insufficient",
  "permission",
];

/** Pourquoi un produit tombe dans ce poste, en une phrase. */
const BUCKET_WHY: Record<RightStatus, string> = {
    restriction: "Un contrat interdit un composant utilisé.",
  review: "Un avenant attend d'être validé.",
  insufficient: "Aucun contrat signé ne couvre un composant.",
  permission: "Tous les composants sont couverts.",
};

export default function CartographiePage() {
  const { financials, documents, clauses, links, referenceDate } = useStore();
  const [selection, setSelection] = useState<FinanceSelection | null>(null);

  const assessments = useMemo(
    () => assessComponents(financials, { documents, clauses, links, referenceDate }),
    [financials, documents, clauses, links, referenceDate],
  );

  const partition = useMemo(
    () => computeRevenuePartition(financials, assessments),
    [financials, assessments],
  );

  /**
   * Projection : ce que deviendraient les postes si les liens d'avenants
   * détectés mais non validés l'étaient. Elle rend visible l'effet d'une
   * validation avant de la faire, sans rien modifier.
   */
  const projection = useMemo(() => {
    const pending = links.filter((link) => link.status === "suggested");
    if (pending.length === 0) return null;

    const projectedLinks: AddendumLink[] = links.map((link) =>
      link.status === "suggested" ? { ...link, status: "confirmed" as const } : link,
    );
    const projected = computeRevenuePartition(
      financials,
      assessComponents(financials, {
        documents,
        clauses,
        links: projectedLinks,
        referenceDate,
      }),
    );
    if (projected.toClarify === partition.toClarify) return null;
    return { projected, pendingCount: pending.length };
  }, [financials, documents, clauses, links, referenceDate, partition.toClarify]);

  /** Clauses qui conditionnent au moins un composant et appellent un traitement. */
  const watchlist = useMemo(() => {
    const entries = assessments
      .filter((assessment) => assessment.status !== "permission")
      .map((assessment) => {
        const clause = assessment.drivingClause;
        const result = computeAssociatedRevenue(
          [assessment.component.id],
          financials,
        );
        return { assessment, clause, amount: result.total };
      });
    return entries.sort((a, b) => b.amount - a.amount);
  }, [assessments, financials]);

  const emptyFeatures = useMemo(
    () => featuresWithoutRevenue(financials),
    [financials],
  );

  const hasData =
    financials.components.length > 0 && financials.revenueLines.length > 0;

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <SectionTitle
          title="Cartographie"
          subtitle="Quels revenus dépendent de quels composants, et où en sont leurs contrats."
        />

        <div className="mt-4 flex flex-col gap-2">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <ImportFinancials />
            <ReferenceDateControl />
          </div>
          <DatasetSource />
        </div>

        {!hasData ? (
          <div className="mt-6">
            <EmptyState
              icon={<Network className="size-5" />}
              title="Aucune donnée financière chargée"
              description="Importez un fichier JSON ou rechargez les données des packs ZIP."
            />
          </div>
        ) : (
          <>
            {/* Synthèse */}
            <div className="mt-6 grid gap-3 lg:grid-cols-3">
              <Card className="p-4 lg:col-span-1">
                <p className="text-[11px] font-semibold tracking-wide text-ink-400 uppercase">
                  Revenus à clarifier
                </p>
                <p className="mt-1 text-3xl font-semibold text-ink-900 tabular-nums">
                  {formatKEuros(partition.toClarify)}
                </p>
                <p className="mt-1 text-[11.5px] text-ink-500">
                  {formatShare(partition.toClarify, partition.portfolioTotal)} du
                  portefeuille recensé ({formatKEuros(partition.portfolioTotal)})
                </p>
                <p className="mt-2 text-[11.5px] leading-relaxed text-ink-600">
                  Produits dont un composant n&apos;est pas couvert par un contrat en
                  vigueur.
                </p>

                {projection ? (
                  <div className="mt-3 rounded-lg border border-brand-200 bg-brand-50/70 p-2.5">
                    <p className="flex items-center gap-1.5 text-[11px] font-medium text-brand-800">
                      <TrendingDown className="size-3.5 shrink-0" aria-hidden />
                      {formatKEuros(projection.projected.toClarify)} si{" "}
                      {projection.pendingCount === 1
                        ? "l'avenant détecté est validé"
                        : `les ${projection.pendingCount} avenants détectés sont validés`}
                    </p>
                    
                  </div>
                ) : null}
              </Card>

              <div className="grid gap-3 sm:grid-cols-2 lg:col-span-2">
                {BUCKET_ORDER.map((status) => {
                  const bucket = partition.buckets[status];
                  return (
                    <Card key={status} className="p-3.5">
                      <div className="flex items-center gap-2">
                        <StatusDot status={status} />
                        <p className="text-[11.5px] font-medium text-ink-600">
                          {STATUS_META[status].label}
                        </p>
                      </div>
                      <p className="mt-1.5 text-xl font-semibold text-ink-900 tabular-nums">
                        {formatKEuros(bucket.total)}
                      </p>
                      <p className="mt-0.5 text-[11px] text-ink-400">
                        {formatShare(bucket.total, partition.portfolioTotal)}
                      </p>
                      <p className="mt-2 text-[11.5px] leading-relaxed text-ink-600">
                        {BUCKET_WHY[status]}
                      </p>
                      {bucket.features.length > 0 ? (
                        <p className="mt-1 text-[11px] text-ink-500">
                          {bucket.features.map((entry) => entry.feature.name).join(" · ")}
                        </p>
                      ) : null}
                    </Card>
                  );
                })}
              </div>
            </div>

            <p className="mt-2 flex items-start gap-1.5 text-[11px] leading-relaxed text-ink-400">
              <Info className="mt-0.5 size-3 shrink-0" aria-hidden />
              Chaque produit n&apos;est compté qu&apos;une fois, dans sa situation la plus
              contraignante.
            </p>

            {/* Composants */}
            <h2 className="mt-8 text-[13px] font-semibold tracking-tight text-ink-900">
              Composants techniques
            </h2>
            <p className="mt-0.5 text-[12px] text-ink-500">
              Cliquez sur un composant pour voir le détail.
            </p>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {assessments.map((assessment) => {
                const result = computeAssociatedRevenue(
                  [assessment.component.id],
                  financials,
                );
                return (
                  <button
                    key={assessment.component.id}
                    type="button"
                    onClick={() =>
                      setSelection({ kind: "component", id: assessment.component.id })
                    }
                    className={cn(
                      "group rounded-xl border bg-white p-4 text-left transition-all hover:shadow-sm focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:outline-none",
                      assessment.status === "restriction"
                        ? "border-rose-200 hover:border-rose-300"
                        : assessment.status === "review"
                          ? "border-amber-200 hover:border-amber-300"
                          : assessment.status === "insufficient"
                            ? "border-ink-200 hover:border-ink-300"
                            : "border-emerald-200 hover:border-emerald-300",
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-[13.5px] font-semibold text-ink-900">
                          {assessment.component.name}
                        </p>
                        <p className="truncate text-[11.5px] text-ink-500">
                          {assessment.component.vendor}
                        </p>
                      </div>
                      <StatusBadge status={assessment.status} size="sm" short />
                    </div>

                    <p className="mt-2.5 text-[11px] font-semibold tracking-wide text-ink-400 uppercase">
                      Revenus associés
                    </p>
                    <p className="text-xl font-semibold text-ink-900 tabular-nums">
                      {formatKEuros(result.total)}
                    </p>

                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      <Chip>
                        <Layers className="size-3" aria-hidden />
                        {result.features.length} fonctionnalité
                        {result.features.length > 1 ? "s" : ""}
                      </Chip>
                      {assessment.pendingLink ? (
                        <Chip className="border-amber-200 bg-amber-50 text-amber-800">
                          Avenant à valider
                        </Chip>
                      ) : null}
                      {assessment.status === "insufficient" ? (
                        <Chip className="border-ink-300 bg-ink-100 text-ink-700">
                          Information manquante
                        </Chip>
                      ) : null}
                    </div>

                    <p className="mt-2.5 flex items-center gap-1 text-[11px] font-medium text-ink-500 transition-colors group-hover:text-brand-700">
                      Voir le détail
                      <ChevronRight className="size-3" aria-hidden />
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Clauses à traiter */}
            <h2 className="mt-8 text-[13px] font-semibold tracking-tight text-ink-900">
              Points à traiter
            </h2>
            

            <div className="mt-3 flex flex-col gap-2 pb-10">
              {watchlist.length === 0 ? (
                <EmptyState
                  icon={<Boxes className="size-5" />}
                  title="Aucun point à traiter"
                  description="Tous les composants sont couverts."
                />
              ) : (
                watchlist.map(({ assessment, clause, amount }) => (
                  <button
                    key={assessment.component.id}
                    type="button"
                    onClick={() =>
                      setSelection(
                        clause
                          ? { kind: "clause", id: clause.id }
                          : { kind: "component", id: assessment.component.id },
                      )
                    }
                    className="group flex items-center gap-3 rounded-lg border border-ink-200 bg-white px-3.5 py-3 text-left transition-all hover:border-brand-300 hover:shadow-sm focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:outline-none"
                  >
                    <StatusDot status={assessment.status} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[12.5px] font-medium text-ink-800">
                        {clause
                          ? sanitizeDocumentText(clause.title, 80)
                          : `${assessment.component.name} — licence introuvable`}
                      </p>
                      <p className="truncate text-[11px] text-ink-500">
                        {assessment.component.name} ·{" "}
                        {assessment.document
                          ? sanitizeDocumentText(assessment.document.title, 60)
                          : "Aucun contrat au dossier"}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-[12.5px] font-semibold text-ink-900 tabular-nums">
                        {formatKEuros(amount)}
                      </p>
                      <p className="text-[10.5px] text-ink-400">Revenus associés</p>
                    </div>
                    <ArrowRight
                      className="size-3.5 shrink-0 text-ink-300 transition-colors group-hover:text-brand-600"
                      aria-hidden
                    />
                  </button>
                ))
              )}

              {emptyFeatures.length > 0 ? (
                <Card className="border-dashed p-3.5">
                  <p className="text-[12px] font-medium text-ink-700">
                    Fonctionnalités sans revenu rattaché
                  </p>
                  <p className="mt-1 text-[11.5px] leading-relaxed text-ink-500">
                    {emptyFeatures.map((feature) => feature.name).join(", ")} : aucun revenu
                    rattaché.
                  </p>
                </Card>
              ) : null}
            </div>
          </>
        )}
      </div>

      <FinanceDetailSheet
        selection={selection}
        onOpenChange={(open) => {
          if (!open) setSelection(null);
        }}
      />
    </div>
  );
}
