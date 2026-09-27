"use client";

import { Check, ExternalLink, Lock, Pencil, Scale, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  Chip,
  EmptyState,
  Input,
  Label,
  SectionTitle,
  Select,
  Textarea,
} from "@/components/ui/primitives";
import { STATUS_META, StatusBadge } from "@/components/ui/status-badge";
import { useStore } from "@/lib/store";
import type { Clause, RightStatus } from "@/lib/types";

function ClauseRow({ clause }: { clause: Clause }) {
  const router = useRouter();
  const { documents, clauses, openInViewer, updateClause, deleteClause } = useStore();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(clause);

  const document = documents.find((entry) => entry.id === clause.documentId);
  const superseding = clauses.find((entry) => entry.id === clause.supersededBy);
  const supersedingDoc = documents.find(
    (entry) => entry.id === superseding?.documentId,
  );

  const reveal = () => {
    openInViewer({
      documentId: clause.documentId,
      page: clause.page,
      highlight: clause.excerpt,
    });
    router.push("/");
  };

  if (editing) {
    return (
      <Card className="p-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor={`t-${clause.id}`}>Intitulé du droit</Label>
            <Input
              id={`t-${clause.id}`}
              value={draft.title}
              onChange={(event) => setDraft({ ...draft, title: event.target.value })}
            />
          </div>
          <div>
            <Label htmlFor={`c-${clause.id}`}>Catégorie</Label>
            <Input
              id={`c-${clause.id}`}
              value={draft.category}
              onChange={(event) => setDraft({ ...draft, category: event.target.value })}
            />
          </div>
          <div>
            <Label htmlFor={`s-${clause.id}`}>Statut</Label>
            <Select
              id={`s-${clause.id}`}
              className="w-full"
              value={draft.status}
              onChange={(event) =>
                setDraft({ ...draft, status: event.target.value as RightStatus })
              }
            >
              {(Object.keys(STATUS_META) as RightStatus[]).map((status) => (
                <option key={status} value={status}>
                  {STATUS_META[status].label}
                </option>
              ))}
            </Select>
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor={`r-${clause.id}`}>Reformulation</Label>
            <Textarea
              id={`r-${clause.id}`}
              rows={2}
              value={draft.summary}
              onChange={(event) => setDraft({ ...draft, summary: event.target.value })}
            />
          </div>
        </div>

        <div className="mt-3 rounded-lg border border-ink-200 bg-ink-50 p-3">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-ink-500 uppercase">
            <Lock className="size-3" aria-hidden />
            Extrait source — non modifiable
          </p>
          <p className="mt-1.5 font-serif text-[12.5px] leading-relaxed text-ink-600">
            {clause.excerpt}
          </p>
          <p className="mt-1.5 text-[11px] text-ink-400">
            La citation ne se modifie pas. Si elle est erronée, supprimez ce droit.
          </p>
        </div>

        <div className="mt-3 flex justify-end gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setDraft(clause);
              setEditing(false);
            }}
          >
            <X />
            Annuler
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              updateClause(clause.id, {
                title: draft.title,
                category: draft.category,
                status: draft.status,
                summary: draft.summary,
              });
              setEditing(false);
            }}
          >
            <Check />
            Enregistrer la correction
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 transition-shadow hover:shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-[13.5px] font-semibold text-ink-900">{clause.title}</h3>
            {clause.edited ? (
              <Chip className="border-brand-200 bg-brand-50 text-brand-700">
                Corrigé manuellement
              </Chip>
            ) : null}
          </div>
          <p className="mt-0.5 text-[12px] text-ink-500">
            {document?.title ?? "Document retiré"} · page {clause.page} ·{" "}
            {clause.category}
          </p>
        </div>
        <StatusBadge status={clause.status} size="sm" />
      </div>

      <p className="mt-2 text-[13px] leading-relaxed text-ink-700">{clause.summary}</p>

      <blockquote className="mt-2 border-l-2 border-ink-200 pl-3 font-serif text-[12.5px] leading-relaxed text-ink-500">
        {clause.excerpt}
      </blockquote>

      {superseding ? (
        <p className="mt-2 rounded-md bg-amber-50 px-2 py-1 text-[11.5px] text-amber-800">
          Remplacé par « {supersedingDoc?.title ?? "avenant"} » — {superseding.title}
        </p>
      ) : null}

      <div className="mt-3 flex items-center gap-1.5">
        <Button variant="ghost" size="sm" onClick={reveal}>
          <ExternalLink />
          Voir dans le document
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setEditing(true)}>
          <Pencil />
          Corriger
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          className="ml-auto text-ink-400 hover:text-rose-600"
          title="Supprimer ce droit"
          onClick={() => {
            if (window.confirm("Supprimer ce droit du registre ?")) {
              deleteClause(clause.id);
            }
          }}
        >
          <Trash2 />
        </Button>
      </div>
    </Card>
  );
}

export default function RightsRegistryPage() {
  const { clauses, documents } = useStore();
  const [status, setStatus] = useState<RightStatus | "all">("all");
  const [documentId, setDocumentId] = useState<string | "all">("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return clauses
      .filter((clause) => (status === "all" ? true : clause.status === status))
      .filter((clause) =>
        documentId === "all" ? true : clause.documentId === documentId,
      )
      .filter((clause) =>
        needle.length === 0
          ? true
          : [clause.title, clause.category, clause.excerpt, clause.summary]
              .join(" ")
              .toLowerCase()
              .includes(needle),
      );
  }, [clauses, documentId, query, status]);

  const totals = useMemo(
    () => ({
      permission: clauses.filter((clause) => clause.status === "permission").length,
      restriction: clauses.filter((clause) => clause.status === "restriction").length,
      review: clauses.filter((clause) => clause.status === "review").length,
    }),
    [clauses],
  );

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
        <SectionTitle
          title="Registre des droits"
          subtitle="Chaque droit renvoie à sa page et à sa citation. Vous pouvez corriger les extractions."
        />

        <div className="mt-4 grid grid-cols-3 gap-3">
          {(
            [
              ["permission", totals.permission],
              ["restriction", totals.restriction],
              ["review", totals.review],
            ] as const
          ).map(([key, value]) => (
            <Card key={key} className="px-3 py-2.5">
              <p className="text-xl font-semibold text-ink-900 tabular-nums">{value}</p>
              <p className="mt-0.5 text-[11.5px] text-ink-500">
                {STATUS_META[key].label}
              </p>
            </Card>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Rechercher dans les droits…"
            className="min-w-0 flex-1 sm:max-w-xs"
          />
          <Select
            value={status}
            onChange={(event) => setStatus(event.target.value as RightStatus | "all")}
          >
            <option value="all">Tous les statuts</option>
            {(Object.keys(STATUS_META) as RightStatus[]).map((key) => (
              <option key={key} value={key}>
                {STATUS_META[key].label}
              </option>
            ))}
          </Select>
          <Select
            value={documentId}
            onChange={(event) => setDocumentId(event.target.value)}
            className="max-w-[220px]"
          >
            <option value="all">Tous les documents</option>
            {documents.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.title}
              </option>
            ))}
          </Select>
        </div>

        <div className="mt-4 flex flex-col gap-3 pb-8">
          {filtered.map((clause) => (
            <ClauseRow key={clause.id} clause={clause} />
          ))}
          {filtered.length === 0 ? (
            <EmptyState
              icon={<Scale className="size-5" />}
              title="Aucun droit ne correspond"
              description="Modifiez les filtres, ou importez un contrat pour alimenter le registre."
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
