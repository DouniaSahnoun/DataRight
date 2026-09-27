"use client";

import { FileStack, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { DocumentCard } from "@/components/documents/document-card";
import { UploadDropzone } from "@/components/documents/upload-dropzone";
import { EmptyState, Input, SectionTitle, Select } from "@/components/ui/primitives";
import { useStore } from "@/lib/store";
import type { DocumentKind } from "@/lib/types";

export default function DocumentsPage() {
  const { documents } = useStore();
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<DocumentKind | "all">("all");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return documents
      .filter((doc) => (kind === "all" ? true : doc.kind === kind))
      .filter((doc) =>
        needle.length === 0
          ? true
          : [doc.title, doc.counterparty, doc.reference]
              .join(" ")
              .toLowerCase()
              .includes(needle),
      );
  }, [documents, kind, query]);

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <SectionTitle
          title="Bibliothèque documentaire"
          subtitle="Importez vos contrats PDF : chaque page est lue pour pouvoir citer sa source."
        />

        <div className="mt-5">
          <UploadDropzone />
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          <div className="relative min-w-0 flex-1 sm:max-w-xs">
            <Search
              className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-ink-400"
              aria-hidden
            />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Rechercher un contrat, une contrepartie…"
              className="pl-8.5"
            />
          </div>
          <Select
            value={kind}
            onChange={(event) => setKind(event.target.value as DocumentKind | "all")}
          >
            <option value="all">Toutes natures</option>
            <option value="license">Licences</option>
            <option value="terms">Conditions d&apos;utilisation</option>
            <option value="addendum">Avenants</option>
            <option value="dpa">Données personnelles</option>
            <option value="other">Autres</option>
          </Select>
          <span className="ml-auto text-[12px] text-ink-400">
            {filtered.length} / {documents.length} document
            {documents.length > 1 ? "s" : ""}
          </span>
        </div>

        <div className="mt-4 grid gap-3 pb-8 lg:grid-cols-2">
          {filtered.map((document) => (
            <DocumentCard key={document.id} document={document} />
          ))}
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon={<FileStack className="size-5" />}
            title="Aucun document ne correspond"
            description="Ajustez la recherche ou le filtre de nature, ou importez un nouveau contrat."
          />
        ) : null}
      </div>
    </div>
  );
}
