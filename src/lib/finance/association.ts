import type {
  AssociatedRevenueResult,
  CommercialFeature,
  ComponentAssessment,
  ComponentContribution,
  FeatureContribution,
  FinancialGraph,
  GraphIssue,
  GraphValidation,
  RevenueLine,
  RevenuePartition,
  StatusBucket,
  TechnicalComponent,
} from "@/lib/finance/types";
import { STATUS_LABELS } from "@/lib/finance/types";
import { effectiveClause } from "@/lib/rag/addendum";
import type { AddendumLink, Clause, ContractDocument, RightStatus } from "@/lib/types";

/**
 * Calcul des revenus associés à une situation contractuelle.
 *
 * Aucune notion de perte, de risque ou de probabilité : la fonction répond à la
 * question « quelles lignes de revenus dépendent de ces composants ? », et rien
 * d'autre. L'interprétation reste à l'utilisateur.
 */

/** Ordre de priorité d'affichage : du plus bloquant au plus neutre. */
const STATUS_PRECEDENCE: RightStatus[] = [
  "restriction",
  "insufficient",
  "review",
  "permission",
];

function worstStatus(statuses: RightStatus[]): RightStatus {
  for (const candidate of STATUS_PRECEDENCE) {
    if (statuses.includes(candidate)) return candidate;
  }
  return "permission";
}

export interface AssessmentContext {
  documents: ContractDocument[];
  clauses: Clause[];
  links: AddendumLink[];
  /**
   * Date de référence (AAAA-MM-JJ). Les clauses d'un document qui n'est pas
   * encore en vigueur à cette date sont ignorées, de même que les liens des
   * avenants correspondants. Absente : tous les documents s'appliquent.
   */
  referenceDate?: string;
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Un document est en vigueur à la date de référence si sa date d'effet la
 * précède. Une date absente ou non datée (brouillon « — ») n'est pas filtrée :
 * c'est le statut de ses clauses qui en rend compte.
 */
function inForce(document: ContractDocument | undefined, referenceDate?: string): boolean {
  if (!referenceDate || !document || !ISO_DATE.test(document.effectiveDate)) return true;
  return document.effectiveDate <= referenceDate;
}

/**
 * Situation contractuelle d'un composant, avenants pris en compte.
 *
 * Un composant sans contrat au dossier relève de l'« Information manquante »,
 * sauf s'il est développé en interne : l'absence de licence tierce est alors la
 * situation normale, pas une lacune documentaire.
 */
export function assessComponent(
  component: TechnicalComponent,
  context: AssessmentContext,
): ComponentAssessment {
  const document = context.documents.find((doc) => doc.id === component.documentId);
  const documentOf = (id: string) => context.documents.find((doc) => doc.id === id);
  const { referenceDate } = context;

  if (component.kind === "internal") {
    return {
      component,
      status: "permission",
      label: STATUS_LABELS.permission,
      reason:
        "Composant développé en interne : aucune licence tierce ne conditionne son usage.",
    };
  }

  if (!component.documentId || !document) {
    return {
      component,
      status: "insufficient",
      label: STATUS_LABELS.insufficient,
      reason:
        component.evidenceNote ??
        "Aucun contrat couvrant ce composant n'a été trouvé au dossier. Importez la licence correspondante pour qualifier son usage.",
    };
  }

  const governing = component.clauseIds
    .map((id) => context.clauses.find((clause) => clause.id === id))
    .filter((clause): clause is Clause => Boolean(clause))
    .filter((clause) => inForce(documentOf(clause.documentId), referenceDate));

  if (governing.length === 0) {
    return {
      component,
      status: "insufficient",
      label: STATUS_LABELS.insufficient,
      document,
      reason: `Le contrat « ${document.title} » est au dossier, mais aucune clause d'usage en vigueur n'y a été identifiée pour ce composant.`,
    };
  }

  // Un avenant qui n'a pas encore pris effet ne modifie rien, validé ou non.
  const links = context.links.filter((link) =>
    inForce(documentOf(link.addendumDocumentId), referenceDate),
  );

  const resolved = governing.map((clause) => ({
    origin: clause,
    ...effectiveClause(clause, context.clauses, links),
  }));

  const status = worstStatus(resolved.map((entry) => entry.status));
  const driving =
    resolved.find((entry) => entry.status === status) ?? resolved[0];
  // La clause déterminante peut appartenir à un autre document que le contrat
  // principal du composant (avenant, exclusion de périmètre).
  const source = documentOf(driving.clause.documentId) ?? document;

  const reason =
    status === "restriction"
      ? `Clause restrictive applicable : ${driving.clause.title} (${source.title}, page ${driving.clause.page}).`
      : status === "review" && driving.awaitingValidation
        ? `Un avenant modifiant « ${driving.origin.title} » est au dossier mais son lien n'a pas encore été validé : la situation reste à confirmer.`
        : status === "review"
          ? `Clause conditionnelle : ${driving.clause.title} (${source.title}, page ${driving.clause.page}).`
          : `Usage couvert par « ${driving.clause.title} » (${source.title}, page ${driving.clause.page}).`;

  return {
    component,
    status,
    label: STATUS_LABELS[status],
    document,
    reason,
    drivingClause: driving.origin,
    effectiveClause:
      driving.clause.id === driving.origin.id ? undefined : driving.clause,
    pendingLink: driving.awaitingValidation ? driving.link : undefined,
  };
}

export function assessComponents(
  graph: FinancialGraph,
  context: AssessmentContext,
): ComponentAssessment[] {
  return graph.components.map((component) => assessComponent(component, context));
}

/**
 * Revenus associés à un ensemble de fonctionnalités, chaque ligne comptée une
 * fois — pour totaliser des actions qui visent en partie les mêmes produits.
 */
export function revenueForFeatures(featureIds: string[], graph: FinancialGraph): number {
  const unique = new Set(featureIds);
  return sumLines(graph.revenueLines.filter((line) => unique.has(line.featureId)));
}

function featuresOf(graph: FinancialGraph, componentId: string): CommercialFeature[] {
  return graph.features.filter((feature) =>
    feature.componentIds.includes(componentId),
  );
}

function linesOf(graph: FinancialGraph, featureId: string): RevenueLine[] {
  return graph.revenueLines.filter(
    (line) => line.featureId === featureId && Number.isFinite(line.amount),
  );
}

export function sumLines(lines: RevenueLine[]): number {
  return lines.reduce(
    (total, line) => total + (Number.isFinite(line.amount) ? line.amount : 0),
    0,
  );
}

/**
 * Revenus associés à un ensemble de composants.
 *
 * **Règle anti-doublon** : une même ligne de revenu n'est comptée qu'une seule
 * fois dans `total`, même si plusieurs composants retenus alimentent la
 * fonctionnalité qui la porte. `grossTotal` conserve la somme des contributions
 * individuelles et `deduplicatedAmount` mesure l'écart, afin que l'interface
 * puisse expliquer pourquoi le total n'est pas l'addition des cartes.
 */
export function computeAssociatedRevenue(
  componentIds: string[],
  graph: FinancialGraph,
): AssociatedRevenueResult {
  const requested = Array.from(new Set(componentIds));
  const selected: TechnicalComponent[] = [];
  const unknownComponentIds: string[] = [];

  for (const id of requested) {
    const component = graph.components.find((entry) => entry.id === id);
    if (component) selected.push(component);
    else unknownComponentIds.push(id);
  }

  const components: ComponentContribution[] = [];
  const featureMap = new Map<string, FeatureContribution>();
  const lineMap = new Map<string, RevenueLine>();
  let grossTotal = 0;

  for (const component of selected) {
    const componentFeatures = featuresOf(graph, component.id);
    const componentLines: RevenueLine[] = [];

    for (const feature of componentFeatures) {
      const lines = linesOf(graph, feature.id);
      componentLines.push(...lines);

      const existing = featureMap.get(feature.id);
      if (existing) {
        existing.viaComponentIds.push(component.id);
      } else {
        featureMap.set(feature.id, {
          feature,
          lines,
          amount: sumLines(lines),
          viaComponentIds: [component.id],
        });
      }

      // Déduplication : la clé est l'identifiant de ligne, donc une ligne
      // atteinte par deux composants distincts n'entre qu'une fois.
      for (const line of lines) lineMap.set(line.id, line);
    }

    const amount = sumLines(componentLines);
    grossTotal += amount;

    components.push({
      component,
      amount,
      featureIds: componentFeatures.map((feature) => feature.id),
      lineIds: componentLines.map((line) => line.id),
    });
  }

  const features = [...featureMap.values()].sort((a, b) => b.amount - a.amount);
  const lines = [...lineMap.values()];
  const total = sumLines(lines);

  return {
    total,
    grossTotal,
    deduplicatedAmount: grossTotal - total,
    lines,
    features,
    components: components.sort((a, b) => b.amount - a.amount),
    shared: features.filter((entry) => entry.viaComponentIds.length > 1),
    unknownComponentIds,
  };
}

/**
 * Répartition du portefeuille par situation contractuelle.
 *
 * Contrairement à `computeAssociatedRevenue`, qui répond à « quels revenus
 * dépendent de CES composants ? », cette fonction partitionne : chaque ligne de
 * revenu est affectée au poste correspondant à la situation la plus bloquante
 * parmi les composants de sa fonctionnalité. Une même ligne ne peut donc pas
 * figurer dans deux postes, et la somme des postes vaut le portefeuille total.
 *
 * Une fonctionnalité sans composant identifié est rattachée à l'information
 * manquante : on ne sait pas de quoi elle dépend.
 */
export function computeRevenuePartition(
  graph: FinancialGraph,
  assessments: ComponentAssessment[],
): RevenuePartition {
  const statusOf = new Map(
    assessments.map((assessment) => [assessment.component.id, assessment.status]),
  );

  const buckets = {} as Record<RightStatus, StatusBucket>;
  for (const status of STATUS_PRECEDENCE) {
    buckets[status] = {
      status,
      label: STATUS_LABELS[status],
      total: 0,
      features: [],
      lines: [],
      componentIds: [],
    };
  }

  for (const feature of graph.features) {
    const componentStatuses = feature.componentIds
      .map((id) => statusOf.get(id))
      .filter((status): status is RightStatus => Boolean(status));

    const status =
      componentStatuses.length === 0 ? "insufficient" : worstStatus(componentStatuses);

    const lines = linesOf(graph, feature.id);
    const amount = sumLines(lines);
    const bucket = buckets[status];

    // Les composants qui portent la situation retenue : ce sont eux qu'il faut
    // traiter pour faire changer ce poste.
    const driving = feature.componentIds.filter((id) => statusOf.get(id) === status);

    bucket.features.push({
      feature,
      lines,
      amount,
      viaComponentIds: driving.length > 0 ? driving : feature.componentIds,
    });
    bucket.lines.push(...lines);
    bucket.total += amount;
    for (const id of driving) {
      if (!bucket.componentIds.includes(id)) bucket.componentIds.push(id);
    }
  }

  for (const status of STATUS_PRECEDENCE) {
    buckets[status].features.sort((a, b) => b.amount - a.amount);
  }

  const portfolioTotal = sumLines(graph.revenueLines);

  return {
    buckets,
    portfolioTotal,
    toClarify:
      buckets.restriction.total + buckets.review.total + buckets.insufficient.total,
  };
}

/** Composants régis par une clause, que celle-ci porte ou non leur statut. */
export function componentsForClause(
  clauseId: string,
  graph: FinancialGraph,
): TechnicalComponent[] {
  return graph.components.filter(
    (component) =>
      component.clauseIds.includes(clauseId) ||
      (component.relatedClauseIds ?? []).includes(clauseId),
  );
}

/** Revenus associés aux composants régis par une clause donnée. */
export function computeAssociatedRevenueForClause(
  clauseId: string,
  graph: FinancialGraph,
): AssociatedRevenueResult {
  return computeAssociatedRevenue(
    componentsForClause(clauseId, graph).map((component) => component.id),
    graph,
  );
}

/** Composants qui n'alimentent aucune fonctionnalité recensée. */
export function orphanComponents(graph: FinancialGraph): TechnicalComponent[] {
  return graph.components.filter(
    (component) => featuresOf(graph, component.id).length === 0,
  );
}

/** Fonctionnalités sans ligne de revenu rattachée. */
export function featuresWithoutRevenue(graph: FinancialGraph): CommercialFeature[] {
  return graph.features.filter((feature) => linesOf(graph, feature.id).length === 0);
}

const MAX_AMOUNT = 1_000_000_000_000;

/**
 * Valide un graphe financier importé et écarte ce qui est inexploitable.
 *
 * Les données financières sont saisies ou importées, jamais extraites d'un PDF :
 * un montant n'est retenu que s'il s'agit d'un nombre fini et positif. Toute
 * chaîne de caractères, tout `NaN` et toute valeur hors bornes sont écartés et
 * signalés, plutôt que propagés dans un calcul.
 */
export function validateGraph(candidate: unknown): GraphValidation {
  const issues: GraphIssue[] = [];
  let discarded = 0;

  const source = (candidate ?? {}) as Partial<FinancialGraph>;
  const rawComponents = Array.isArray(source.components) ? source.components : [];
  const rawFeatures = Array.isArray(source.features) ? source.features : [];
  const rawLines = Array.isArray(source.revenueLines) ? source.revenueLines : [];

  if (!Array.isArray(source.components) || !Array.isArray(source.features)) {
    issues.push({
      level: "error",
      message:
        "Structure attendue : un objet contenant les tableaux « components », « features » et « revenueLines ».",
    });
    return { graph: { components: [], features: [], revenueLines: [] }, issues, discarded };
  }

  const components = rawComponents.filter((component) => {
    const valid =
      typeof component?.id === "string" && typeof component?.name === "string";
    if (!valid) discarded += 1;
    return valid;
  });

  const componentIds = new Set(components.map((component) => component.id));

  const features = rawFeatures.filter((feature) => {
    const valid = typeof feature?.id === "string" && typeof feature?.name === "string";
    if (!valid) discarded += 1;
    return valid;
  });

  const featureIds = new Set(features.map((feature) => feature.id));

  const revenueLines = rawLines.filter((line) => {
    if (typeof line?.id !== "string" || typeof line?.featureId !== "string") {
      discarded += 1;
      return false;
    }
    if (typeof line.amount !== "number" || !Number.isFinite(line.amount)) {
      discarded += 1;
      issues.push({
        level: "warning",
        message: `Ligne « ${line.id} » écartée : le montant n'est pas un nombre exploitable.`,
      });
      return false;
    }
    if (line.amount < 0 || line.amount > MAX_AMOUNT) {
      discarded += 1;
      issues.push({
        level: "warning",
        message: `Ligne « ${line.id} » écartée : montant hors bornes admissibles.`,
      });
      return false;
    }
    if (!featureIds.has(line.featureId)) {
      discarded += 1;
      issues.push({
        level: "warning",
        message: `Ligne « ${line.id} » écartée : la fonctionnalité « ${line.featureId} » n'existe pas.`,
      });
      return false;
    }
    return true;
  });

  for (const feature of features) {
    const unknown = (feature.componentIds ?? []).filter(
      (id: string) => !componentIds.has(id),
    );
    if (unknown.length > 0) {
      issues.push({
        level: "warning",
        message: `La fonctionnalité « ${feature.name} » référence un composant inconnu : ${unknown.join(", ")}.`,
      });
    }
  }

  if (components.length === 0) {
    issues.push({
      level: "error",
      message: "Aucun composant exploitable dans le fichier importé.",
    });
  }

  return {
    graph: {
      components: components.map((component) => ({
        ...component,
        clauseIds: Array.isArray(component.clauseIds) ? component.clauseIds : [],
        documentId: component.documentId ?? null,
      })),
      features: features.map((feature) => ({
        ...feature,
        componentIds: Array.isArray(feature.componentIds) ? feature.componentIds : [],
      })),
      revenueLines,
    },
    issues,
    discarded,
  };
}
