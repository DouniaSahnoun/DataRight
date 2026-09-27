"use client";

import { CircleAlert, FileUp, Loader2, UploadCloud } from "lucide-react";
import { useCallback, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { importPdf } from "@/lib/pdf/extract";
import { extractClauses, suggestAddendumLinks } from "@/lib/rag/clause-extraction";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

interface Progress {
  fileName: string;
  step: string;
  ratio: number;
}

/**
 * Import de contrats PDF.
 *
 * Tout se passe dans le navigateur : extraction paginée via pdf.js, puis
 * pré-extraction des droits et détection des liens d'avenant. Aucun fichier
 * n'est envoyé à un serveur.
 */
export function UploadDropzone() {
  const { documents, clauses, addDocument } = useStore();
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState<Progress | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastImport, setLastImport] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    async (files: FileList | File[]) => {
      const pdfs = Array.from(files).filter(
        (file) => file.type === "application/pdf" || /\.pdf$/i.test(file.name),
      );
      if (pdfs.length === 0) {
        setError("Format non pris en charge : seuls les fichiers PDF sont acceptés.");
        return;
      }

      setError(null);
      for (const file of pdfs) {
        try {
          setProgress({ fileName: file.name, step: "Extraction du texte", ratio: 0.05 });

          const document = await importPdf(file, (done, total) => {
            setProgress({
              fileName: file.name,
              step: `Extraction page ${done} / ${total}`,
              ratio: total > 0 ? done / total : 0,
            });
          });

          setProgress({ fileName: file.name, step: "Analyse des droits", ratio: 0.9 });
          const extracted = extractClauses(document);

          const links = suggestAddendumLinks(document, extracted, documents, clauses);

          addDocument({ document, clauses: extracted, links });
          setLastImport(
            `« ${document.title} » importé : ${document.pageCount} page${document.pageCount > 1 ? "s" : ""}, ${extracted.length} droit${extracted.length > 1 ? "s" : ""} identifié${extracted.length > 1 ? "s" : ""}${links.length > 0 ? `, ${links.length} lien${links.length > 1 ? "s" : ""} d'avenant à valider` : ""}.`,
          );
        } catch (cause) {
          setError(
            `Échec de l'import de « ${file.name} » : ${
              cause instanceof Error ? cause.message : "fichier illisible"
            }.`,
          );
        } finally {
          setProgress(null);
        }
      }
    },
    [addDocument, clauses, documents],
  );

  return (
    <div>
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          void handleFiles(event.dataTransfer.files);
        }}
        className={cn(
          "rounded-xl border-2 border-dashed bg-white px-6 py-8 text-center transition-colors",
          dragging ? "border-brand-400 bg-brand-50/50" : "border-ink-200",
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          multiple
          className="hidden"
          onChange={(event) => {
            if (event.target.files) void handleFiles(event.target.files);
            event.target.value = "";
          }}
        />

        {progress ? (
          <div className="mx-auto max-w-sm">
            <Loader2 className="mx-auto size-5 animate-spin text-brand-600" aria-hidden />
            <p className="mt-3 truncate text-sm font-medium text-ink-800">
              {progress.fileName}
            </p>
            <p className="text-[12.5px] text-ink-500">{progress.step}</p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-ink-100">
              <div
                className="h-full rounded-full bg-brand-600 transition-all duration-300"
                style={{ width: `${Math.round(progress.ratio * 100)}%` }}
              />
            </div>
          </div>
        ) : (
          <>
            <div className="mx-auto flex size-11 items-center justify-center rounded-full bg-ink-100 text-ink-500">
              <UploadCloud className="size-5" aria-hidden />
            </div>
            <p className="mt-3 text-sm font-medium text-ink-900">
              Déposez vos contrats PDF ici
            </p>
            <p className="mx-auto mt-1 max-w-md text-[12.5px] leading-relaxed text-ink-500">
              Licences, conditions, avenants. Tout reste dans votre navigateur.
            </p>
            <Button
              variant="primary"
              size="sm"
              className="mt-4"
              onClick={() => inputRef.current?.click()}
            >
              <FileUp />
              Sélectionner des fichiers
            </Button>
          </>
        )}
      </div>

      {error ? (
        <div className="mt-3 flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 p-3 text-[12.5px] text-rose-800">
          <CircleAlert className="mt-0.5 size-3.5 shrink-0" aria-hidden />
          {error}
        </div>
      ) : null}

      {lastImport && !error ? (
        <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-[12.5px] text-emerald-800">
          {lastImport}
        </div>
      ) : null}
    </div>
  );
}
