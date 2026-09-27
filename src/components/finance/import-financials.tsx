"use client";

import { CircleAlert, RotateCcw, TriangleAlert, Upload } from "lucide-react";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { validateGraph } from "@/lib/finance/association";
import { useStore } from "@/lib/store";

/**
 * Import des données financières (JSON).
 *
 * Les montants ne proviennent jamais d'un document contractuel : ils sont
 * importés depuis une source structurée, validés champ par champ, et toute
 * entrée inexploitable est écartée en le disant plutôt qu'en l'ignorant.
 */
export function ImportFinancials() {
  const { replaceFinancials, resetFinancials, financialIssues } = useStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setError(null);
    setSummary(null);

    try {
      const text = await file.text();
      let parsed: unknown;
      try {
        parsed = JSON.parse(text);
      } catch {
        setError(
          "Erreur lors de l'import des données financières : le fichier n'est pas un JSON valide.",
        );
        return;
      }

      const validation = validateGraph(parsed);
      const blocking = validation.issues.filter((issue) => issue.level === "error");

      if (blocking.length > 0) {
        setError(`Erreur lors de l'import des données financières : ${blocking[0].message}`);
        return;
      }

      replaceFinancials(validation.graph, validation.issues);
      setSummary(
        `${validation.graph.components.length} composants, ${validation.graph.features.length} fonctionnalités et ${validation.graph.revenueLines.length} lignes de revenus importés` +
          (validation.discarded > 0
            ? ` — ${validation.discarded} entrée${validation.discarded > 1 ? "s" : ""} écartée${validation.discarded > 1 ? "s" : ""}.`
            : "."),
      );
    } catch {
      setError(
        "Erreur lors de l'import des données financières : le fichier n'a pas pu être lu.",
      );
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="application/json,.json"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) void handleFile(file);
            event.target.value = "";
          }}
        />
        <Button variant="secondary" size="sm" onClick={() => inputRef.current?.click()}>
          <Upload />
          Importer des données financières
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            resetFinancials();
            setError(null);
            setSummary(null);
          }}
        >
          <RotateCcw />
          Recharger les données des packs ZIP
        </Button>
      </div>

      {error ? (
        <div className="mt-2 flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 p-3 text-[12px] text-rose-800">
          <CircleAlert className="mt-0.5 size-3.5 shrink-0" aria-hidden />
          <span>
            {error}
            <br />
            Les données précédentes restent affichées.
          </span>
        </div>
      ) : null}

      {summary ? (
        <p className="mt-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-[12px] text-emerald-800">
          {summary}
        </p>
      ) : null}

      {financialIssues.length > 0 ? (
        <div className="mt-2 rounded-lg border border-amber-200 bg-amber-50 p-3">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-amber-800 uppercase">
            <TriangleAlert className="size-3" aria-hidden />
            Entrées écartées à l&apos;import
          </p>
          <ul className="mt-1.5 flex flex-col gap-1">
            {financialIssues.slice(0, 6).map((issue, index) => (
              <li key={index} className="text-[11.5px] leading-relaxed text-amber-900">
                · {issue.message}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
