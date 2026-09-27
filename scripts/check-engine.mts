/**
 * Contrôle de la garantie de traçabilité du moteur.
 *
 * Trois vérifications, exécutables hors navigateur (`npm run check:engine`) :
 *  1. chaque extrait du registre des droits existe mot pour mot dans sa page ;
 *  2. chacune des questions de démonstration produit le statut attendu avec au
 *     moins une citation vérifiée ;
 *  3. écarter le lien d'avenant renverse bien la réponse sur l'usage commercial.
 */
import { MOCK_ADDENDUM_LINKS, MOCK_CLAUSES } from "@/lib/mock/clauses";
import { MOCK_DOCUMENTS } from "@/lib/mock/corpus";
import { SCRIPTED_ANSWERS } from "@/lib/mock/scripted-answers";
import { extractClauses, suggestAddendumLinks } from "@/lib/rag/clause-extraction";
import { ask, locateExcerpt } from "@/lib/rag/engine";
import type { RightStatus } from "@/lib/types";

let failures = 0;

function check(label: string, condition: boolean, detail = "") {
  if (condition) {
    console.log(`  ok   ${label}`);
  } else {
    failures += 1;
    console.error(`  FAIL ${label}${detail ? ` — ${detail}` : ""}`);
  }
}

console.log("\n1. Extraits du registre présents dans les pages citées");
for (const clause of MOCK_CLAUSES) {
  const doc = MOCK_DOCUMENTS.find((entry) => entry.id === clause.documentId);
  const page = doc?.pages.find((entry) => entry.number === clause.page);
  check(
    `${clause.id} (${doc?.reference ?? "?"} p.${clause.page})`,
    Boolean(page && locateExcerpt(page.text, clause.excerpt)),
  );
}

console.log("\n2. Questions de démonstration");
const EXPECTED: Record<string, RightStatus> = {
  // L'avenant Atlas est au dossier mais son lien n'est pas encore validé.
  "q-atlas-commercial": "review",
  "q-helixlm-hosted": "permission",
  "q-vectorgrid-reporting": "permission",
  "q-horizon-renewal": "permission",
  "q-ocrvision-commercial": "insufficient",
};

for (const scripted of SCRIPTED_ANSWERS) {
  const answer = await ask({
    question: scripted.question,
    documents: MOCK_DOCUMENTS,
    clauses: MOCK_CLAUSES,
    links: MOCK_ADDENDUM_LINKS,
  });
  const expected = EXPECTED[scripted.id];
  check(
    `${scripted.id} → ${answer.status} (${answer.citations.length} citation(s))`,
    answer.status === expected && answer.citations.length > 0,
    `statut attendu : ${expected}`,
  );
  const unverified = answer.caveats.some((caveat) => caveat.includes("écartée"));
  check(`${scripted.id} : aucune citation écartée`, !unverified);
}

console.log("\n3. Question hors dossier");
const offTopic = await ask({
  question: "Quel est le délai de préavis pour résilier notre bail commercial ?",
  documents: MOCK_DOCUMENTS,
  clauses: MOCK_CLAUSES,
  links: MOCK_ADDENDUM_LINKS,
});
check(
  `statut « insufficient » (obtenu : ${offTopic.status})`,
  offTopic.status === "insufficient",
);

console.log("\n4. Préséance de l'avenant selon la validation du lien");
const rejectedLinks = MOCK_ADDENDUM_LINKS.map((link) =>
  link.id === "link-d05-commercial" ? { ...link, status: "rejected" as const } : link,
);
const withoutAddendum = await ask({
  question: SCRIPTED_ANSWERS[0].question,
  documents: MOCK_DOCUMENTS,
  clauses: MOCK_CLAUSES,
  links: rejectedLinks,
});
check(
  `lien écarté → restriction (obtenu : ${withoutAddendum.status})`,
  withoutAddendum.status === "restriction",
);
check(
  "lien écarté → plus aucune citation de l'avenant",
  withoutAddendum.citations.every(
    (citation) => citation.documentId !== "doc-d05-atlas-am1",
  ),
);

const confirmedLinks = MOCK_ADDENDUM_LINKS.map((link) =>
  link.id === "link-d05-commercial" ? { ...link, status: "confirmed" as const } : link,
);
const validated = await ask({
  question: SCRIPTED_ANSWERS[0].question,
  documents: MOCK_DOCUMENTS,
  clauses: MOCK_CLAUSES,
  links: confirmedLinks,
});
check(
  `lien validé → permission (obtenu : ${validated.status})`,
  validated.status === "permission",
);
check(
  "lien validé → l'avenant est cité en premier",
  validated.citations[0]?.documentId === "doc-d05-atlas-am1",
);

const unvalidated = await ask({
  question: SCRIPTED_ANSWERS[0].question,
  documents: MOCK_DOCUMENTS,
  clauses: MOCK_CLAUSES,
  links: MOCK_ADDENDUM_LINKS,
});
check(
  `état initial (lien non validé) → à vérifier (obtenu : ${unvalidated.status})`,
  unvalidated.status === "review",
);

console.log("\n5. Détection d'un avenant importé");
const uploaded = {
  ...MOCK_DOCUMENTS.find((doc) => doc.kind === "addendum")!,
  id: "doc-upload-test",
  source: "upload" as const,
};
const uploadedClauses = extractClauses(uploaded);
check(
  `${uploadedClauses.length} droit(s) extrait(s) automatiquement`,
  uploadedClauses.length > 0,
);

const suggested = suggestAddendumLinks(
  uploaded,
  uploadedClauses,
  MOCK_DOCUMENTS.filter((doc) => doc.kind !== "addendum"),
  MOCK_CLAUSES,
);
check(
  `lien vers la clause d'usage commercial d'origine (${suggested.length} lien(s))`,
  suggested.some((link) => link.originClauseId === "cl-d01-commercial"),
);
check(
  "tous les liens détectés restent à valider manuellement",
  suggested.every((link) => link.status === "suggested"),
);

console.log(
  failures === 0
    ? "\nTous les contrôles passent.\n"
    : `\n${failures} contrôle(s) en échec.\n`,
);
process.exit(failures === 0 ? 0 : 1);
