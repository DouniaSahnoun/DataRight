import { z } from "zod";

import master from "@/lib/finance/dataset/finance_master_developpeuse.json";
import source from "@/lib/finance/dataset/source.json";
import type {
  CommercialFeature,
  FinancialGraph,
  GraphIssue,
  RevenueLine,
  TechnicalComponent,
} from "@/lib/finance/types";

/**
 * Jeu de démonstration issu des packs ZIP de /data.
 *
 * `scripts/extract-finance-data.mts` extrait `finance_master_developpeuse.json`
 * dans `./dataset/` ; ce module le valide puis le traduit en graphe
 * [Composant] → [Fonctionnalité] → [Ligne de revenu] pour la cartographie.
 *
 * Répartition des rôles :
 *  - le fichier fournit les **faits** : produits et ARR, composants,
 *    dépendances produit ↔ composant, documents, remédiations, scénario ;
 *  - ce module fournit les **rattachements** au registre des clauses
 *    (`lib/mock/clauses.ts`), que le modèle financier ne connaît pas.
 *
 * Les montants ne sont jamais recopiés d'un statut ou d'un résumé du fichier :
 * les postes affichés sont recalculés par `computeRevenuePartition()` à partir
 * des clauses, et `financial_summary` ne sert que de valeur de contrôle.
 */

// --- Schéma : seuls les champs exploités sont exigés -------------------------

const MasterSchema = z.object({
  metadata: z.object({
    company: z.object({
      company_name: z.string(),
      description: z.string(),
      total_arr_eur: z.number().finite().nonnegative(),
    }),
    as_of_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    synthetic_demo_data: z.boolean().optional(),
  }),
  financial_summary: z.object({
    total_arr_eur: z.number(),
    before_d05: z.object({
      explicit_restriction_arr_eur: z.number(),
      insufficient_evidence_arr_eur: z.number(),
      arr_requiring_review_eur: z.number(),
      arr_cleared_eur: z.number(),
    }),
    after_d05: z.object({
      explicit_restriction_arr_eur: z.number(),
      insufficient_evidence_arr_eur: z.number(),
      arr_requiring_review_eur: z.number(),
      arr_cleared_eur: z.number(),
    }),
  }),
  products: z.array(
    z.object({
      product_id: z.string(),
      product_name: z.string(),
      arr_eur: z.number().finite().nonnegative(),
      reason_after_d05: z.string(),
      next_action: z.string(),
    }),
  ),
  components: z.array(
    z.object({
      component_id: z.string(),
      component_name: z.string(),
      type: z.string(),
      document_ids: z.array(z.string()),
      key_condition: z.string(),
    }),
  ),
  dependencies: z.array(
    z.object({
      product_id: z.string(),
      component_id: z.string(),
      use_description: z.string(),
    }),
  ),
  documents: z.array(
    z.object({
      document_id: z.string(),
      type: z.string(),
      entity: z.string(),
      counterparty: z.string(),
      effective_date: z.string().nullable(),
      parent_document_id: z.string().nullable(),
      status: z.string(),
    }),
  ),
  remediation: z.array(
    z.object({
      action_id: z.string(),
      priority: z.number(),
      issue: z.string(),
      arr_concerned_eur: z.number().finite().nonnegative(),
      owner: z.string(),
      action: z.string(),
      evidence_to_close: z.string(),
      target_date: z.string(),
      status: z.string(),
    }),
  ),
  tests: z.array(
    z.object({
      id: z.string(),
      category: z.string(),
      question: z.string(),
      source: z.string(),
      clause: z.string(),
      page: z.number(),
      status: z.string(),
    }),
  ),
  demo_script: z.array(
    z.object({
      time: z.string(),
      speaker: z.string(),
      screen: z.string(),
      message: z.string(),
    }),
  ),
});

export type FinanceMaster = z.infer<typeof MasterSchema>;
export type MasterProduct = FinanceMaster["products"][number];
export type MasterDocument = FinanceMaster["documents"][number];
export type MasterTest = FinanceMaster["tests"][number];
export type DemoStep = FinanceMaster["demo_script"][number];

// --- Rattachements au registre des clauses -----------------------------------

/** Identifiants du modèle financier → documents du corpus (`lib/mock/corpus.ts`). */
export const DOCUMENT_IDS: Record<string, string> = {
  D01: "doc-d01-atlas",
  D02: "doc-d02-helixlm",
  D03: "doc-d03-vectorgrid",
  D04: "doc-d04-horizon",
  D05: "doc-d05-atlas-am1",
  D06: "doc-d06-horizon-sec",
  D07: "doc-d07-ocrvision",
  D08: "doc-d08-reportforge",
};

const FEATURE_IDS: Record<string, { id: string; description: string }> = {
  P01: {
    id: "feat-clauselens",
    description: "Extraction de clauses et classification des points d'attention contractuels.",
  },
  P02: {
    id: "feat-dealroom",
    description: "Recherche sémantique dans les data rooms de transaction.",
  },
  P03: {
    id: "feat-boardpack",
    description: "Génération de synthèses de transaction à destination des comités.",
  },
};

interface ComponentBinding {
  id: string;
  kind: TechnicalComponent["kind"];
  /** `null` : aucun document opposable pour Asteria AI SAS. */
  documentId: string | null;
  clauseIds: string[];
  relatedClauseIds?: string[];
  /** Libellé du périmètre, quand un composant est scindé par produit. */
  scope?: string;
}

/**
 * Composants du modèle financier → nœuds de la cartographie.
 *
 * **Atlas (C02) est scindé par produit.** L'avenant D05 n'autorise le corpus que
 * pour ClauseLens Enterprise et exclut nommément DealRoom Search (art. 2.2) : un
 * nœud unique étendrait à DealRoom une permission que l'avenant lui refuse. Le
 * périmètre DealRoom est donc gouverné à la fois par la restriction de D01 et
 * par l'exclusion de D05 ; valider l'avenant lève la première, pas la seconde.
 *
 * **D07 et D08 ne sont pas rattachés** (`documentId: null`) : D07 lie VisionCore
 * à Asteria AI UK Ltd et D08 n'est pas signé. Aucun des deux ne prouve un droit
 * d'Asteria AI SAS, d'où « Information manquante » et non une restriction.
 */
const COMPONENT_BINDINGS: Record<string, ComponentBinding | Record<string, ComponentBinding>> = {
  C01: {
    id: "cmp-helixlm",
    kind: "service",
    documentId: DOCUMENT_IDS.D02,
    // L'usage générateur de revenus est le déploiement hébergé (D02 art. 2.1) ;
    // l'interdiction de distribuer les poids encadre le produit sans gouverner ce statut.
    clauseIds: ["cl-d02-hosted"],
    relatedClauseIds: ["cl-d02-weights", "cl-d02-access", "cl-d02-report"],
  },
  C02: {
    P01: {
      id: "cmp-atlas-clauselens",
      kind: "dataset",
      documentId: DOCUMENT_IDS.D01,
      clauseIds: ["cl-d01-commercial"],
      relatedClauseIds: ["cl-d01-grant", "cl-d05-logs", "cl-d05-quarterly"],
      scope: "usage ClauseLens",
    },
    P02: {
      id: "cmp-atlas-dealroom",
      kind: "dataset",
      documentId: DOCUMENT_IDS.D01,
      clauseIds: ["cl-d01-commercial", "cl-d05-scope"],
      relatedClauseIds: ["cl-d01-training"],
      scope: "usage DealRoom",
    },
  },
  C03: {
    id: "cmp-vectorgrid",
    kind: "api",
    documentId: DOCUMENT_IDS.D03,
    clauseIds: ["cl-d03-saas"],
    relatedClauseIds: ["cl-d03-limit", "cl-d03-excess", "cl-d03-reporting"],
  },
  C04: { id: "cmp-reportforge", kind: "library", documentId: null, clauseIds: [] },
  C05: { id: "cmp-ocrvision", kind: "api", documentId: null, clauseIds: [] },
};

/**
 * Remédiations → produits dont elles conditionnent les revenus. Sert à
 * dédupliquer les totaux : R02 et R03 portent sur les mêmes 160 K€ de BoardPack.
 */
const REMEDIATION_FEATURES: Record<string, string[]> = {
  R01: ["feat-dealroom"],
  R02: ["feat-boardpack"],
  R03: ["feat-boardpack"],
  R04: ["feat-clauselens"],
  R05: ["feat-clauselens"],
};

// --- Traduction en graphe ----------------------------------------------------

function bindingFor(componentId: string, productId: string): ComponentBinding | null {
  const binding = COMPONENT_BINDINGS[componentId];
  if (!binding) return null;
  if ("id" in binding) return binding as ComponentBinding;
  return (binding as Record<string, ComponentBinding>)[productId] ?? null;
}

function formatDateFr(iso: string): string {
  const [year, month, day] = iso.split("-");
  return `${day}/${month}/${year}`;
}

export function buildGraphFromMaster(data: FinanceMaster): {
  graph: FinancialGraph;
  issues: GraphIssue[];
} {
  const issues: GraphIssue[] = [];
  const documents = new Map(data.documents.map((doc) => [doc.document_id, doc]));
  const components = new Map<string, TechnicalComponent>();
  const featureComponents = new Map<string, string[]>();

  const featureIdOf = (productId: string) =>
    FEATURE_IDS[productId]?.id ?? `feat-${productId.toLowerCase()}`;

  for (const dependency of data.dependencies) {
    const product = data.products.find((entry) => entry.product_id === dependency.product_id);
    const source = data.components.find(
      (entry) => entry.component_id === dependency.component_id,
    );
    if (!product || !source) {
      issues.push({
        level: "warning",
        message: `Dépendance ${dependency.product_id} → ${dependency.component_id} ignorée : produit ou composant inconnu.`,
      });
      continue;
    }

    const binding = bindingFor(source.component_id, product.product_id);
    const counterparty = source.document_ids
      .map((id) => documents.get(id)?.counterparty)
      .find(Boolean);

    // Composant absent des rattachements : il reste cartographié, sans clause,
    // et relève donc de l'information manquante jusqu'à qualification.
    const node: TechnicalComponent = binding
      ? {
          id: binding.id,
          name: binding.scope
            ? `${source.component_name} (${binding.scope})`
            : source.component_name,
          description: `${source.type} — ${source.key_condition}`,
          kind: binding.kind,
          vendor: counterparty ?? "Fournisseur non renseigné",
          documentId: binding.documentId,
          clauseIds: binding.clauseIds,
          relatedClauseIds: binding.relatedClauseIds,
          evidenceNote: binding.documentId === null ? source.key_condition : undefined,
        }
      : {
          id: `cmp-${source.component_id.toLowerCase()}`,
          name: source.component_name,
          description: `${source.type} — ${source.key_condition}`,
          kind: "service",
          vendor: counterparty ?? "Fournisseur non renseigné",
          documentId: null,
          clauseIds: [],
          evidenceNote: source.key_condition,
        };

    if (!binding) {
      issues.push({
        level: "warning",
        message: `Composant ${source.component_id} (${source.component_name}) sans rattachement au registre des clauses : classé en information manquante.`,
      });
    }

    components.set(node.id, node);
    const featureId = featureIdOf(product.product_id);
    const list = featureComponents.get(featureId) ?? [];
    if (!list.includes(node.id)) list.push(node.id);
    featureComponents.set(featureId, list);
  }

  const features: CommercialFeature[] = data.products.map((product) => ({
    id: featureIdOf(product.product_id),
    name: product.product_name,
    description: FEATURE_IDS[product.product_id]?.description ?? "",
    componentIds: featureComponents.get(featureIdOf(product.product_id)) ?? [],
  }));

  // Le modèle financier donne un ARR par produit : une ligne de revenu chacun.
  const revenueLines: RevenueLine[] = data.products.map((product) => ({
    id: `rev-${featureIdOf(product.product_id).replace(/^feat-/, "")}`,
    label: `ARR ${product.product_name}`,
    featureId: featureIdOf(product.product_id),
    amount: product.arr_eur,
    period: `ARR au ${formatDateFr(data.metadata.as_of_date)}`,
  }));

  const sum = revenueLines.reduce((total, line) => total + line.amount, 0);
  if (sum !== data.metadata.company.total_arr_eur) {
    issues.push({
      level: "warning",
      message: `La somme des ARR produits (${sum} EUR) diffère de l'ARR total déclaré (${data.metadata.company.total_arr_eur} EUR).`,
    });
  }

  return {
    graph: { components: [...components.values()], features, revenueLines },
    issues,
  };
}

// --- Jeu chargé --------------------------------------------------------------

const parsed = MasterSchema.parse(master);
const built = buildGraphFromMaster(parsed);

/** Avenant qui fait basculer la comparaison avant / après (D05 pour ce dossier). */
const amendment = parsed.documents.find(
  (doc) => doc.parent_document_id !== null && doc.type === "Avenant" && doc.effective_date,
);

export const FINANCE_DATASET = {
  /** Provenance : archive et entrée ZIP d'origine, empreinte SHA-256. */
  source,
  company: parsed.metadata.company,
  asOfDate: parsed.metadata.as_of_date,
  synthetic: parsed.metadata.synthetic_demo_data ?? false,
  graph: built.graph,
  issues: built.issues,
  products: parsed.products.map((product) => ({
    ...product,
    featureId:
      FEATURE_IDS[product.product_id]?.id ?? `feat-${product.product_id.toLowerCase()}`,
  })),
  documents: parsed.documents,
  remediation: parsed.remediation.map((entry) => ({
    ...entry,
    featureIds: REMEDIATION_FEATURES[entry.action_id] ?? [],
  })),
  tests: parsed.tests,
  demoScript: parsed.demo_script,
  /** Résultats attendus du financier : valeurs de contrôle, jamais affichées telles quelles. */
  expected: parsed.financial_summary,
  amendment: amendment
    ? {
        masterId: amendment.document_id,
        documentId: DOCUMENT_IDS[amendment.document_id] ?? amendment.document_id,
        effectiveDate: amendment.effective_date as string,
      }
    : null,
};

export type FinanceDataset = typeof FINANCE_DATASET;
export type RemediationAction = FinanceDataset["remediation"][number];

export const DEMO_FINANCIAL_GRAPH: FinancialGraph = FINANCE_DATASET.graph;

/** Veille d'une date ISO : la situation « avant » un avenant. */
export function dayBefore(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() - 1);
  return date.toISOString().slice(0, 10);
}

export { formatDateFr };
