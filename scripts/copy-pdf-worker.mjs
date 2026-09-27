// Copie le worker pdf.js dans /public : pdf.js le charge par URL depuis le
// navigateur, il doit donc être servi comme un actif statique.
import { copyFile, mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);

try {
  const pdfjsEntry = require.resolve("pdfjs-dist/build/pdf.min.mjs");
  const source = join(dirname(pdfjsEntry), "pdf.worker.min.mjs");
  await mkdir("public", { recursive: true });
  await copyFile(source, join("public", "pdf.worker.min.mjs"));
  console.log("pdf.worker.min.mjs copié dans /public");
} catch (error) {
  console.warn("Copie du worker pdf.js impossible :", error.message);
}
