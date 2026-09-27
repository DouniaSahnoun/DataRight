import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { describe, it } from "node:test";

import {
  assessComponents,
  computeRevenuePartition,
  revenueForFeatures,
} from "@/lib/finance/association";
import { DEMO_FINANCIAL_GRAPH, FINANCE_DATASET, dayBefore } from "@/lib/finance/dataset";
import { readZip } from "@/lib/finance/zip";
import { MOCK_ADDENDUM_LINKS, MOCK_CLAUSES } from "@/lib/mock/clauses";
import { MOCK_DOCUMENTS } from "@/lib/mock/corpus";
import type { AddendumLink } from "@/lib/types";

const amendment = FINANCE_DATASET.amendment!;
const confirmed: AddendumLink[] = MOCK_ADDENDUM_LINKS.map((link) =>
  link.addendumDocumentId === amendment.documentId
    ? { ...link, status: "confirmed" as const }
    : link,
);

function partitionAt(referenceDate: string, links: AddendumLink[]) {
  return computeRevenuePartition(
    DEMO_FINANCIAL_GRAPH,
    assessComponents(DEMO_FINANCIAL_GRAPH, {
      documents: MOCK_DOCUMENTS,
      clauses: MOCK_CLAUSES,
      links,
      referenceDate,
    }),
  );
}

describe("lecture des archives ZIP", () => {
  it("lit le modèle financier dans le pack développeuse, CRC vérifié", async () => {
    const entries = readZip(await readFile("data/Pack_developpeuse_finance.zip"));
    const entry = entries.find((item) => item.name.endsWith("finance_master_developpeuse.json"));
    assert.ok(entry);
    const content = JSON.parse(entry.read().toString("utf8"));
    assert.equal(content.metadata.company.total_arr_eur, 700_000);
  });

  it("refuse une archive corrompue", () => {
    assert.throws(() => readZip(Buffer.from("pas une archive")), /illisible/);
  });

  it("le jeu versionné est celui des archives de /data", async () => {
    const archives = (await readdir("data")).filter((file) => file.endsWith(".zip"));
    assert.ok(archives.includes(FINANCE_DATASET.source.archive));
    const entry = readZip(await readFile(`data/${FINANCE_DATASET.source.archive}`)).find(
      (item) => item.name === FINANCE_DATASET.source.entry,
    );
    const { createHash } = await import("node:crypto");
    assert.equal(
      createHash("sha256").update(entry!.read()).digest("hex"),
      FINANCE_DATASET.source.sha256,
    );
  });
});

describe("cartographie issue du modèle financier", () => {
  it("traduit le fichier sans anomalie : 3 produits, 700 K€", () => {
    assert.deepEqual(FINANCE_DATASET.issues, []);
    assert.equal(DEMO_FINANCIAL_GRAPH.features.length, 3);
    const total = DEMO_FINANCIAL_GRAPH.revenueLines.reduce((sum, line) => sum + line.amount, 0);
    assert.equal(total, FINANCE_DATASET.company.total_arr_eur);
  });

  it("retrouve les montants « avant D05 » du financier", () => {
    const before = partitionAt(dayBefore(amendment.effectiveDate), confirmed);
    const expected = FINANCE_DATASET.expected.before_d05;
    assert.equal(before.buckets.restriction.total, expected.explicit_restriction_arr_eur);
    assert.equal(before.buckets.insufficient.total, expected.insufficient_evidence_arr_eur);
    assert.equal(before.toClarify, expected.arr_requiring_review_eur);
    assert.equal(before.buckets.permission.total, expected.arr_cleared_eur);
  });

  it("retrouve les montants « après D05 » une fois l'avenant validé", () => {
    const after = partitionAt(FINANCE_DATASET.asOfDate, confirmed);
    const expected = FINANCE_DATASET.expected.after_d05;
    assert.equal(after.buckets.restriction.total, expected.explicit_restriction_arr_eur);
    assert.equal(after.buckets.insufficient.total, expected.insufficient_evidence_arr_eur);
    assert.equal(after.toClarify, expected.arr_requiring_review_eur);
    assert.equal(after.buckets.permission.total, expected.arr_cleared_eur);
  });

  it("un avenant validé mais pas encore en vigueur ne lève rien", () => {
    const before = partitionAt(dayBefore(amendment.effectiveDate), confirmed);
    assert.equal(before.buckets.permission.total, 0);
    assert.equal(before.buckets.review.total, 0);
  });

  it("chaque poste compte chaque produit une seule fois", () => {
    for (const partition of [
      partitionAt(dayBefore(amendment.effectiveDate), MOCK_ADDENDUM_LINKS),
      partitionAt(FINANCE_DATASET.asOfDate, MOCK_ADDENDUM_LINKS),
      partitionAt(FINANCE_DATASET.asOfDate, confirmed),
    ]) {
      const sum = Object.values(partition.buckets).reduce((total, bucket) => total + bucket.total, 0);
      assert.equal(sum, partition.portfolioTotal);
    }
  });
});

describe("remédiation", () => {
  it("chaque action vise l'ARR annoncé par le financier", () => {
    for (const action of FINANCE_DATASET.remediation) {
      assert.ok(action.featureIds.length > 0, `${action.action_id} sans produit rattaché`);
      assert.equal(
        revenueForFeatures(action.featureIds, DEMO_FINANCIAL_GRAPH),
        action.arr_concerned_eur,
        action.action_id,
      );
    }
  });

  it("dédoublonne R02 et R03, qui portent sur les mêmes revenus BoardPack", () => {
    const open = FINANCE_DATASET.remediation.filter((action) => action.status === "Ouvert");
    const naive = open.reduce((sum, action) => sum + action.arr_concerned_eur, 0);
    const deduplicated = revenueForFeatures(
      open.flatMap((action) => action.featureIds),
      DEMO_FINANCIAL_GRAPH,
    );
    assert.equal(naive, 560_000);
    assert.equal(deduplicated, FINANCE_DATASET.expected.after_d05.arr_requiring_review_eur);
  });
});

describe("règle de vocabulaire — données du modèle financier", () => {
  const FORBIDDEN =
    /\b(pertes?|risques?|risqué\w*|exposition|exposé\w*|menace\w*|manque à gagner|sinistre\w*)\b/iu;

  it("aucun texte du modèle financier affiché n'emploie un terme proscrit", () => {
    const displayed = [
      ...FINANCE_DATASET.demoScript.map((step) => step.message),
      ...FINANCE_DATASET.products.flatMap((p) => [p.reason_after_d05, p.next_action]),
      ...FINANCE_DATASET.remediation.flatMap((r) => [r.issue, r.action, r.evidence_to_close, r.owner]),
      ...DEMO_FINANCIAL_GRAPH.components.flatMap((c) => [c.name, c.description, c.evidenceNote ?? ""]),
      FINANCE_DATASET.company.description,
    ];
    for (const text of displayed) {
      assert.equal(FORBIDDEN.exec(text), null, text);
    }
  });
});
