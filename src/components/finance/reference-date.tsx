"use client";

import { CalendarDays, PackageOpen } from "lucide-react";

import { FINANCE_DATASET, formatDateFr } from "@/lib/finance/dataset";
import { useStore } from "@/lib/store";

/**
 * Date à laquelle la situation contractuelle est appréciée. Un avenant dont la
 * date d'effet est postérieure ne modifie rien, même si son lien est validé.
 */
export function ReferenceDateControl() {
  const { referenceDate, setReferenceDate } = useStore();

  return (
    <label className="inline-flex items-center gap-2 rounded-lg border border-ink-200 bg-white px-2.5 py-1.5 text-[12px] text-ink-600">
      <CalendarDays className="size-3.5 text-ink-400" aria-hidden />
      Situation au
      <input
        type="date"
        value={referenceDate}
        onChange={(event) => {
          if (event.target.value) setReferenceDate(event.target.value);
        }}
        className="rounded border-none bg-transparent font-medium text-ink-900 tabular-nums focus:outline-none"
      />
      {referenceDate !== FINANCE_DATASET.asOfDate ? (
        <button
          type="button"
          onClick={() => setReferenceDate(FINANCE_DATASET.asOfDate)}
          className="text-[11px] font-medium text-brand-700 underline underline-offset-2"
        >
          {formatDateFr(FINANCE_DATASET.asOfDate)}
        </button>
      ) : null}
    </label>
  );
}

/** Provenance des montants : l'archive de /data dont ils sont extraits. */
export function DatasetSource() {
  const { source, asOfDate } = FINANCE_DATASET;
  return (
    <p className="flex items-center gap-1.5 text-[11px] text-ink-400">
      <PackageOpen className="size-3 shrink-0" aria-hidden />
      Source : {source.archive} · au {formatDateFr(asOfDate)}
    </p>
  );
}
