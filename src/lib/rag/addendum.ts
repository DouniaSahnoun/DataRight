import type { AddendumLink, Clause, RightStatus } from "@/lib/types";

/**
 * Règle de préséance des avenants, partagée par le moteur de réponses
 * (`rag/engine.ts`) et par la couche de dépendance économique
 * (`finance/association.ts`) — afin que les deux ne puissent pas diverger.
 *
 * Trois états possibles pour le lien avenant → clause d'origine :
 *  - `confirmed` : la clause de l'avenant se substitue à la clause d'origine ;
 *  - `suggested` : le lien est détecté mais pas validé, donc pas opposable — la
 *    situation devient un point à vérifier ;
 *  - `rejected` (ou absent) : la rédaction initiale s'applique.
 */
export interface EffectiveClause {
  status: RightStatus;
  /** Clause réellement applicable (celle de l'avenant si le lien est validé). */
  clause: Clause;
  /** Clause d'avenant concernée, validée ou non. */
  addendumClause?: Clause;
  link?: AddendumLink;
  /** Vrai lorsqu'un lien existe mais attend une validation manuelle. */
  awaitingValidation: boolean;
}

export function effectiveClause(
  clause: Clause,
  clauses: Clause[],
  links: AddendumLink[],
): EffectiveClause {
  const link = links.find(
    (entry) => entry.originClauseId === clause.id && entry.status !== "rejected",
  );
  const addendumClause = link
    ? clauses.find((entry) => entry.id === link.addendumClauseId)
    : undefined;

  if (!link || !addendumClause) {
    return { status: clause.status, clause, awaitingValidation: false };
  }

  if (link.status === "confirmed") {
    return {
      status: addendumClause.status,
      clause: addendumClause,
      addendumClause,
      link,
      awaitingValidation: false,
    };
  }

  return {
    status: "review",
    clause,
    addendumClause,
    link,
    awaitingValidation: true,
  };
}
