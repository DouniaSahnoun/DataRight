// Extrait les packs de données financières de /data (archives ZIP) :
//
//  1. chaque fichier autorisé est copié dans data/extracted/<pack>/… ;
//  2. le modèle financier retenu (finance_master_developpeuse.json, version la
//     plus récente) est recopié dans src/lib/finance/dataset/, d'où
//     l'application l'importe — avec une fiche de provenance (source.json).
//
// Liste blanche stricte : les packs du financier contiennent aussi les
// questions réservées au test indépendant (dossier Word, classeur complet,
// finance_master_complet.json, questions_reservees_financier.json…). Aucun de
// ces fichiers n'est extrait ; le script les signale simplement comme écartés.
//
// Idempotent et tolérant : sans archive dans /data, le jeu déjà versionné est
// conservé. Exécuté automatiquement avant `dev` et `build`.

import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { basename, dirname, join } from "node:path";

// Chemin relatif et extension explicite : le script tourne sous Node seul
// (suppression native des types, Node ≥ 22.18), sans tsx ni alias « @/ ».
import { readZip, type ZipEntry } from "../src/lib/finance/zip.ts";

const DATA_DIR = "data";
const EXTRACT_DIR = join(DATA_DIR, "extracted");
const DATASET_DIR = join("src", "lib", "finance", "dataset");
const MASTER = "finance_master_developpeuse.json";

/** Fichiers transmissibles à la développeuse, d'après les README des packs. */
const ALLOWED = new Set([
  MASTER,
  "project_context_developpeuse.json",
  "questions_developpeuse.json",
  "document_relationships.json",
  "financial_comparison.json",
  "Brief_developpeuse_finance.md",
  "README_developpeuse.md",
  "components.csv",
  "products.csv",
  "dependencies.csv",
  "documents.csv",
]);

/** Porteurs des questions réservées : jamais extraits, quel que soit le pack. */
const RESERVED = [
  /^finance_master_complet\.json$/,
  /^questions_reservees/,
  /^project_context_day2\.json$/,
  /\.docx$/,
  /modele_financier_complet\.xlsx$/,
];

async function main() {
  if (!existsSync(DATA_DIR)) {
    console.warn("[data] dossier /data absent : jeu versionné conservé.");
    return;
  }

  const archives = (await readdir(DATA_DIR)).filter((file) => file.endsWith(".zip")).sort();
  if (archives.length === 0) {
    console.warn("[data] aucune archive ZIP dans /data : jeu versionné conservé.");
    return;
  }

  const masters: { pack: string; entry: ZipEntry; content: Buffer }[] = [];
  let extracted = 0;
  const reserved = new Set<string>();

  for (const archive of archives) {
    const pack = archive.replace(/\.zip$/, "");
    const entries = readZip(await readFile(join(DATA_DIR, archive)));

    for (const entry of entries) {
      const name = basename(entry.name);
      if (RESERVED.some((pattern) => pattern.test(name))) {
        reserved.add(name);
        continue;
      }
      if (!ALLOWED.has(name)) continue;

      const content = entry.read();
      const target = join(EXTRACT_DIR, pack, entry.name);
      await mkdir(dirname(target), { recursive: true });
      await writeFile(target, content);
      extracted += 1;

      if (name === MASTER) masters.push({ pack, entry, content });
    }
  }

  console.log(`[data] ${extracted} fichiers extraits de ${archives.length} archives → ${EXTRACT_DIR}/`);
  if (reserved.size > 0) {
    console.log(`[data] écartés (questions réservées) : ${[...reserved].sort().join(", ")}`);
  }

  if (masters.length === 0) {
    console.warn(`[data] ${MASTER} introuvable dans les archives : jeu versionné conservé.`);
    return;
  }

  // Plusieurs packs embarquent le même modèle : on retient le plus récent et on
  // signale toute divergence de contenu plutôt que d'en choisir un en silence.
  masters.sort((a, b) => b.entry.modifiedAt.getTime() - a.entry.modifiedAt.getTime());
  const chosen = masters[0];
  const digest = (buffer: Buffer) => createHash("sha256").update(buffer).digest("hex");
  const divergent = masters.filter((master) => digest(master.content) !== digest(chosen.content));
  for (const master of divergent) {
    console.warn(`[data] ${MASTER} diffère dans ${master.pack}.zip : version de ${chosen.pack}.zip retenue.`);
  }

  // Contrôle de forme minimal avant de remplacer le jeu de l'application ; la
  // validation complète a lieu au chargement (lib/finance/dataset.ts).
  const parsed = JSON.parse(chosen.content.toString("utf8"));
  if (!Array.isArray(parsed.products) || !Array.isArray(parsed.dependencies)) {
    throw new Error(`${MASTER} (${chosen.pack}.zip) : produits ou dépendances absents`);
  }

  await mkdir(DATASET_DIR, { recursive: true });
  await writeFile(join(DATASET_DIR, MASTER), chosen.content);
  await writeFile(
    join(DATASET_DIR, "source.json"),
    `${JSON.stringify(
      {
        archive: `${chosen.pack}.zip`,
        entry: chosen.entry.name,
        modifiedAt: chosen.entry.modifiedAt.toISOString(),
        sha256: digest(chosen.content),
      },
      null,
      2,
    )}\n`,
  );
  console.log(`[data] modèle financier : ${chosen.pack}.zip › ${chosen.entry.name} → ${DATASET_DIR}/`);
}

await main();
