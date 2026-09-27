"use client";

import {
  BookOpenText,
  Check,
  GitCompareArrows,
  Pencil,
  Trash2,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, Chip, Input, Label, Select } from "@/components/ui/primitives";
import { StatusDot } from "@/components/ui/status-badge";
import { useStore } from "@/lib/store";
import type { ContractDocument, DocumentKind } from "@/lib/types";
import { formatBytes, formatDate } from "@/lib/utils";

const KIND_OPTIONS: { value: DocumentKind; label: string }[] = [
  { value: "license", label: "Licence" },
  { value: "terms", label: "Conditions d'utilisation" },
  { value: "addendum", label: "Avenant" },
  { value: "dpa", label: "Données personnelles" },
  { value: "other", label: "Autre" },
];

export function DocumentCard({ document }: { document: ContractDocument }) {
  const router = useRouter();
  const { clauses, documents, openInViewer, removeDocument, updateDocument } =
    useStore();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(document);

  const docClauses = clauses.filter((clause) => clause.documentId === document.id);
  const amended = documents.find((entry) => entry.id === document.amends);
  const kindLabel = KIND_OPTIONS.find((option) => option.value === document.kind)?.label;

  const counts = {
    permission: docClauses.filter((clause) => clause.status === "permission").length,
    restriction: docClauses.filter((clause) => clause.status === "restriction").length,
    review: docClauses.filter((clause) => clause.status === "review").length,
  };

  const open = () => {
    openInViewer({ documentId: document.id, page: 1 });
    router.push("/");
  };

  if (editing) {
    return (
      <Card className="p-4">
        <p className="mb-3 text-[11px] font-semibold tracking-wide text-ink-400 uppercase">
          Corriger les métadonnées extraites
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor={`title-${document.id}`}>Intitulé</Label>
            <Input
              id={`title-${document.id}`}
              value={draft.title}
              onChange={(event) => setDraft({ ...draft, title: event.target.value })}
            />
          </div>
          <div>
            <Label htmlFor={`party-${document.id}`}>Contrepartie</Label>
            <Input
              id={`party-${document.id}`}
              value={draft.counterparty}
              onChange={(event) =>
                setDraft({ ...draft, counterparty: event.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor={`ref-${document.id}`}>Référence</Label>
            <Input
              id={`ref-${document.id}`}
              value={draft.reference}
              onChange={(event) => setDraft({ ...draft, reference: event.target.value })}
            />
          </div>
          <div>
            <Label htmlFor={`kind-${document.id}`}>Nature</Label>
            <Select
              id={`kind-${document.id}`}
              className="w-full"
              value={draft.kind}
              onChange={(event) =>
                setDraft({ ...draft, kind: event.target.value as DocumentKind })
              }
            >
              {KIND_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor={`date-${document.id}`}>Date d&apos;effet</Label>
            <Input
              id={`date-${document.id}`}
              type="date"
              value={draft.effectiveDate}
              onChange={(event) =>
                setDraft({ ...draft, effectiveDate: event.target.value })
              }
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setDraft(document);
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
              updateDocument(document.id, {
                title: draft.title,
                counterparty: draft.counterparty,
                reference: draft.reference,
                kind: draft.kind,
                effectiveDate: draft.effectiveDate,
              });
              setEditing(false);
            }}
          >
            <Check />
            Enregistrer
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col p-4 transition-shadow hover:shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-[14px] font-semibold text-ink-900">
            {document.title}
          </h3>
          <p className="mt-0.5 truncate text-[12px] text-ink-500">
            {document.counterparty} · réf. {document.reference}
          </p>
        </div>
        <Chip className={document.kind === "addendum" ? "border-amber-200 bg-amber-50 text-amber-800" : undefined}>
          {document.kind === "addendum" ? (
            <GitCompareArrows className="size-3" aria-hidden />
          ) : null}
          {kindLabel}
        </Chip>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11.5px] text-ink-500">
        <span>Effet au {formatDate(document.effectiveDate)}</span>
        <span>{document.pageCount} pages</span>
        <span>{document.source === "upload" ? formatBytes(document.fileSize) : "Jeu de démonstration"}</span>
        <span>Ajouté le {formatDate(document.addedAt)}</span>
      </div>

      {amended ? (
        <p className="mt-2 flex items-center gap-1.5 rounded-md bg-amber-50 px-2 py-1 text-[11.5px] text-amber-800">
          <GitCompareArrows className="size-3 shrink-0" aria-hidden />
          Modifie « {amended.title} »
        </p>
      ) : null}

      <div className="mt-3 flex flex-wrap items-center gap-3 border-t border-ink-100 pt-3 text-[11.5px] text-ink-600">
        <span className="flex items-center gap-1.5">
          <StatusDot status="permission" />
          {counts.permission} permission{counts.permission > 1 ? "s" : ""}
        </span>
        <span className="flex items-center gap-1.5">
          <StatusDot status="restriction" />
          {counts.restriction} restriction{counts.restriction > 1 ? "s" : ""}
        </span>
        <span className="flex items-center gap-1.5">
          <StatusDot status="review" />
          {counts.review} à vérifier
        </span>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <Button variant="secondary" size="sm" onClick={open}>
          <BookOpenText />
          Consulter
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setEditing(true)}>
          <Pencil />
          Corriger
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          className="ml-auto text-ink-400 hover:text-rose-600"
          title="Retirer du dossier"
          onClick={() => {
            if (
              window.confirm(
                `Retirer « ${document.title} » du dossier ? Les droits extraits associés seront supprimés.`,
              )
            ) {
              removeDocument(document.id);
            }
          }}
        >
          <Trash2 />
        </Button>
      </div>
    </Card>
  );
}
