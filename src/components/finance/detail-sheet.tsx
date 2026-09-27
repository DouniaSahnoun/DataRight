"use client";

import {
  BadgeCheck,
  Boxes,
  ExternalLink,
  Info,
  Layers,
  ShieldQuestion,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/primitives";
import { Sheet } from "@/components/ui/sheet";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  assessComponent,
  componentsForClause,
  computeAssociatedRevenue,
} from "@/lib/finance/association";
import { formatEuros, formatKEuros, sanitizeDocumentText } from "@/lib/finance/format";
import type { ComponentAssessment } from "@/lib/finance/types";
import { useStore } from "@/lib/store";
import type { Clause } from "@/lib/types";

export type FinanceSelection =
  | { kind: "component"; id: string }
  | { kind: "clause"; id: string };

function ClauseExtract({ clause }: { clause: Clause }) {
  const router = useRouter();
  const { openInViewer, documents } = useStore();
  const document = documents.find((entry) => entry.id === clause.documentId);

  return (
    <div className="rounded-lg border border-ink-200 bg-ink-50/60 p-3">
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge status={clause.status} size="sm" short />
        <span className="truncate text-[12px] font-medium text-ink-700">
          {sanitizeDocumentText(clause.title, 80)}
        </span>
        {document ? (
          <span className="rounded-md bg-ink-900 px-1.5 py-px text-[10px] font-semibold text-white tabular-nums">
            p. {clause.page}
          </span>
        ) : null}
      </div>

      {/* Texte issu d'un PDF : neutralisé avant affichage. */}
      <blockquote className="mt-2 border-l-2 border-ink-200 pl-2.5 font-serif text-[12px] leading-relaxed text-ink-600">
        {sanitizeDocumentText(clause.excerpt, 400)}
      </blockquote>

      {document ? (
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
          className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-ink-600 underline underline-offset-2 hover:text-ink-900"
        >
          Voir le passage dans {sanitizeDocumentText(document.title, 48)}
          <ExternalLink className="size-3" aria-hidden />
        </button>
      ) : null}
    </div>
  );
}

function AddendumAction({ assessment }: { assessment: ComponentAssessment }) {
  const { setLinkStatus, documents } = useStore();
  const link = assessment.pendingLink;
  if (!link) return null;

  const addendum = documents.find((doc) => doc.id === link.addendumDocumentId);

  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50/70 p-3">
      <p className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-amber-800 uppercase">
        <Sparkles className="size-3" aria-hidden />
        Avenant disponible au dossier
      </p>
      <p className="mt-1.5 text-[12.5px] leading-relaxed text-amber-900">
        {sanitizeDocumentText(addendum?.title ?? "Un avenant", 90)} modifie cette clause. Tant que le lien n&apos;est pas validé, ces revenus
        restent à clarifier.
      </p>
      <Button
        variant="primary"
        size="sm"
        className="mt-2.5"
        onClick={() => setLinkStatus(link.id, "confirmed")}
      >
        <BadgeCheck />
        Valider l&apos;avenant d&apos;autorisation commerciale
      </Button>
    </div>
  );
}

export function FinanceDetailSheet({
  selection,
  onOpenChange,
}: {
  selection: FinanceSelection | null;
  onOpenChange: (open: boolean) => void;
}) {
  const { financials, documents, clauses, links, referenceDate } = useStore();
  const context = { documents, clauses, links, referenceDate };

  // Rien à détailler : le panneau n'est pas monté du tout.
  if (!selection) return null;

  const clause =
    selection.kind === "clause"
      ? clauses.find((entry) => entry.id === selection.id)
      : undefined;

  const components =
    selection.kind === "component"
      ? financials.components.filter((entry) => entry.id === selection.id)
      : componentsForClause(selection.id, financials);

  const assessments = components.map((component) =>
    assessComponent(component, context),
  );
  const result = computeAssociatedRevenue(
    components.map((component) => component.id),
    financials,
  );

  const primary = assessments[0];
  const title =
    selection.kind === "component"
      ? (components[0]?.name ?? "Composant")
      : sanitizeDocumentText(clause?.title ?? "Clause", 90);

  const governingClauses =
    selection.kind === "component" && components[0]
      ? [
          ...components[0].clauseIds,
          ...(components[0].relatedClauseIds ?? []),
        ]
          .map((id) => clauses.find((entry) => entry.id === id))
          .filter((entry): entry is Clause => Boolean(entry))
      : clause
        ? [clause]
        : [];

  return (
    <Sheet
      open
      onOpenChange={onOpenChange}
      title={title}
      description={
        selection.kind === "component"
          ? components[0]?.description
          : "Composants régis par cette clause et revenus qui en dépendent."
      }
      footer={
        <p className="flex items-start gap-2 text-[11px] leading-relaxed text-ink-500">
          <Info className="mt-0.5 size-3 shrink-0" aria-hidden />
          Ces montants indiquent une dépendance, pas une prévision.
        </p>
      }
    >
      <div className="flex flex-col gap-4">
        {/* Revenus associés */}
        <div className="rounded-xl border border-ink-200 bg-white p-4">
          <p className="text-[11px] font-semibold tracking-wide text-ink-400 uppercase">
            {selection.kind === "component"
              ? "Revenus associés à ce composant"
              : "Revenus associés à cette clause"}
          </p>
          <p className="mt-1 text-2xl font-semibold text-ink-900 tabular-nums">
            {formatKEuros(result.total)}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {primary ? <StatusBadge status={primary.status} size="sm" /> : null}
            <Chip>
              <Layers className="size-3" aria-hidden />
              {result.features.length} fonctionnalité
              {result.features.length > 1 ? "s" : ""}
            </Chip>
            <Chip>
              <Boxes className="size-3" aria-hidden />
              {components.length} composant{components.length > 1 ? "s" : ""}
            </Chip>
          </div>

          {result.deduplicatedAmount > 0 ? (
            <p className="mt-2.5 rounded-md bg-ink-50 px-2.5 py-2 text-[11.5px] leading-relaxed text-ink-600">
              {formatKEuros(result.deduplicatedAmount)} comptés une seule fois
              (fonctionnalités partagées).
            </p>
          ) : null}
        </div>

        {primary ? (
          <div className="rounded-lg border border-ink-200 p-3">
            <p className="text-[11px] font-semibold tracking-wide text-ink-400 uppercase">
              Situation contractuelle
            </p>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-700">
              {primary.reason}
            </p>
          </div>
        ) : null}

        {assessments.map((assessment) => (
          <AddendumAction key={assessment.component.id} assessment={assessment} />
        ))}

        {/* Composants impactés */}
        <section>
          <h3 className="mb-2 text-[11px] font-semibold tracking-wide text-ink-400 uppercase">
            Composants impactés
          </h3>
          <div className="flex flex-col gap-2">
            {assessments.map((assessment) => {
              const contribution = result.components.find(
                (entry) => entry.component.id === assessment.component.id,
              );
              return (
                <div
                  key={assessment.component.id}
                  className="flex items-center justify-between gap-3 rounded-lg border border-ink-200 px-3 py-2"
                >
                  <div className="min-w-0">
                    <p className="truncate text-[12.5px] font-medium text-ink-800">
                      {assessment.component.name}
                    </p>
                    <p className="truncate text-[11px] text-ink-400">
                      {assessment.component.vendor}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <StatusBadge status={assessment.status} size="sm" short />
                    <span className="text-[12px] font-semibold text-ink-900 tabular-nums">
                      {formatKEuros(contribution?.amount ?? 0)}
                    </span>
                  </div>
                </div>
              );
            })}
            {assessments.length === 0 ? (
              <p className="rounded-lg border border-dashed border-ink-200 px-3 py-3 text-[12px] text-ink-500">
                Aucun composant de la cartographie n&apos;est rattaché à cette clause.
              </p>
            ) : null}
          </div>
        </section>

        {/* Fonctionnalités et détail chiffré */}
        <section>
          <h3 className="mb-2 text-[11px] font-semibold tracking-wide text-ink-400 uppercase">
            Fonctionnalités commerciales dépendantes
          </h3>

          {result.features.length === 0 ? (
            <p className="rounded-lg border border-dashed border-ink-200 px-3 py-3 text-[12px] text-ink-500">
              Aucune fonctionnalité commerciale recensée ne dépend de ce périmètre.
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              {result.features.map((entry) => (
                <div
                  key={entry.feature.id}
                  className="rounded-lg border border-ink-200 p-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[12.5px] font-medium text-ink-800">
                        {entry.feature.name}
                      </p>
                      <p className="mt-0.5 text-[11px] leading-relaxed text-ink-500">
                        {entry.feature.description}
                      </p>
                    </div>
                    <span className="shrink-0 text-[12.5px] font-semibold text-ink-900 tabular-nums">
                      {formatKEuros(entry.amount)}
                    </span>
                  </div>

                  {entry.viaComponentIds.length > 1 ? (
                    <p className="mt-2 inline-flex items-center gap-1 rounded-md bg-brand-50 px-2 py-0.5 text-[10.5px] font-medium text-brand-700">
                      <ShieldQuestion className="size-3" aria-hidden />
                      Dépend de {entry.viaComponentIds.length} composants retenus —
                      comptée une seule fois
                    </p>
                  ) : null}

                  {entry.lines.length === 0 ? (
                    <p className="mt-2 text-[11.5px] text-ink-400">
                      Aucun revenu associé à cette fonctionnalité.
                    </p>
                  ) : (
                    <ul className="mt-2 flex flex-col divide-y divide-ink-100 border-t border-ink-100">
                      {entry.lines.map((line) => (
                        <li
                          key={line.id}
                          className="flex items-center justify-between gap-3 py-1.5"
                        >
                          <span className="min-w-0 truncate text-[11.5px] text-ink-600">
                            {line.label}
                            {line.segment ? (
                              <span className="text-ink-400"> · {line.segment}</span>
                            ) : null}
                          </span>
                          <span className="shrink-0 text-[11.5px] text-ink-700 tabular-nums">
                            {formatEuros(line.amount)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Clauses de référence */}
        {governingClauses.length > 0 ? (
          <section>
            <h3 className="mb-2 text-[11px] font-semibold tracking-wide text-ink-400 uppercase">
              Clauses de référence
            </h3>
            <div className="flex flex-col gap-2">
              {governingClauses.map((entry) => (
                <ClauseExtract key={entry.id} clause={entry} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </Sheet>
  );
}
