import type { Chunk } from "@/lib/rag/chunking";

/**
 * Retrieval lexical (BM25 simplifié) adapté au vocabulaire juridique.
 *
 * Pas d'embeddings ici : le moteur de démonstration doit tourner entièrement
 * hors-ligne et rester inspectable — chaque score est explicable par les termes
 * qui l'ont produit. L'interface `retrieve()` est la couche à remplacer par une
 * recherche vectorielle le jour où un index distant est branché.
 *
 * Le dossier de démonstration est rédigé en anglais et les questions se posent
 * en français : les familles de termes portent donc les deux langues. Elles
 * n'interviennent que dans le **classement**. La couverture
 * (`ScoredChunk.coverage`), elle, ne compte que les termes littéralement
 * retrouvés — c'est ce qui permet au moteur de reconnaître qu'un dossier est
 * muet sur une question, et cette mesure ne doit pas être assouplie.
 */

const STOPWORDS = new Set([
  "les", "des", "une", "aux", "pour", "par", "que", "qui", "dans", "sur", "est",
  "son", "ses", "nos", "notre", "avec", "sans", "sous", "cette", "cet", "ces",
  "ont", "avons", "peut", "peuvent", "pouvons", "doit", "doivent", "etre",
  "avoir", "fait", "faire", "plus", "tout", "tous", "toute", "toutes", "leur",
  "leurs", "elle", "nous", "vous", "ils", "elles", "quel", "quelle", "quelles",
  "quels", "combien", "comment", "pourquoi", "est-ce", "duree",
  // Anglais : mots-outils et auxiliaires omniprésents dans les contrats.
  "the", "and", "for", "with", "not", "any", "are", "was", "were", "shall",
  "may", "must", "will", "would", "should", "could", "can", "this", "that",
  "these", "those", "from", "has", "have", "been", "its", "their", "which",
  "what", "when", "where", "who", "whom", "such", "than", "then", "there",
  "here", "into", "out", "per", "each", "both", "all", "other", "only", "also",
  "more", "most", "does", "did", "upon", "under", "unless", "within", "after",
  "before", "during", "between",
]);

/** Familles de termes : une question et une clause parlent rarement la même langue. */
const SYNONYM_GROUPS: string[][] = [
  ["commercial", "commerciale", "commercially", "commercialisation", "exploitation", "exploiter", "hebergee", "heberge", "hosted", "saas", "monetisable", "production"],
  ["droit", "droits", "autorise", "autorisation", "autorises", "authorise", "authorised", "permission", "permis", "permitted", "concede", "grant", "grants", "granted", "licence", "license", "right", "rights"],
  ["interdit", "interdiction", "interdire", "restriction", "restrictions", "restreint", "restrict", "restricted", "exclu", "exclut", "excludes", "excluded", "prohibe", "prohibited"],
  ["redistribuer", "redistribution", "distribuer", "distribution", "distribute", "revendre", "revente", "resell", "sous", "licencier", "sublicense", "ceder", "assign", "partager", "provide"],
  ["cache", "mise", "conservation", "conserver", "retain", "retention", "stocker", "stockage", "supprimer", "delete", "archive", "jours", "days", "calendaires", "calendar"],
  ["marque", "marques", "logo", "logos", "trademark", "marketing", "communication", "commerciaux", "nom"],
  ["ia", "modele", "model", "apprentissage", "entrainer", "entrainement", "train", "training", "tune", "weights", "automatique", "derive", "derives", "derived"],
  ["client", "clients", "customer", "customers", "tiers", "third", "party", "parties", "prestataire", "utilisateur", "utilisateurs", "users"],
  ["composant", "composants", "component", "bibliotheque", "library", "module", "sdk", "logiciel", "software", "service", "api"],
  ["donnees", "data", "dataset", "corpus", "licensed", "jeux", "cartographiques"],
  ["filiale", "filiales", "affiliate", "affiliates", "entite", "entity", "parent", "subsidiaries", "perimetre", "scope"],
  ["rapport", "reporting", "report", "synthese", "summary", "notifier", "notify", "notification", "notice", "trimestriel", "trimestre", "quarter", "quarterly", "annuel", "annual"],
  ["renouvelle", "renouvellement", "reconduction", "renew", "renews", "renewal", "resiliation", "resilier", "terminate", "termination", "term", "preavis", "echeance", "expiry"],
  ["plafond", "limite", "limit", "volume", "million", "documents", "pages", "usage", "excess", "depassement"],
];

/** Marques diacritiques combinantes, retirées après décomposition NFD. */
const DIACRITICS = /[̀-ͯ]/g;

export function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(DIACRITICS, "")
    .toLowerCase();
}

export function tokenize(value: string): string[] {
  return normalize(value)
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 2 && !STOPWORDS.has(token));
}

/** Étend les termes de la requête aux familles auxquelles ils appartiennent. */
export function expandQuery(tokens: string[]): Map<string, number> {
  const weights = new Map<string, number>();
  for (const token of tokens) weights.set(token, 1);

  for (const group of SYNONYM_GROUPS) {
    if (!tokens.some((token) => group.includes(token))) continue;
    for (const related of group) {
      if (!weights.has(related)) weights.set(related, 0.45);
    }
  }
  return weights;
}

export interface ScoredChunk {
  chunk: Chunk;
  /** Score de classement, normalisé entre 0 et 1 sur le meilleur passage. */
  score: number;
  /**
   * Part des termes propres à la question retrouvés dans le passage (0-1).
   *
   * C'est la seule mesure absolue : le score normalisé vaut toujours 1 pour le
   * premier résultat, y compris lorsque le dossier ne contient rien de
   * pertinent. Le seuil de confiance s'applique donc à la couverture.
   */
  coverage: number;
  /** Termes de la requête effectivement retrouvés dans le passage. */
  matchedTerms: string[];
}

const K1 = 1.4;
const B = 0.72;

export function retrieve(
  question: string,
  chunks: Chunk[],
  limit = 6,
): ScoredChunk[] {
  if (chunks.length === 0) return [];

  const queryTokens = tokenize(question);
  if (queryTokens.length === 0) return [];
  const coreTokens = new Set(queryTokens);
  const weights = expandQuery(queryTokens);

  const docTokens = chunks.map((chunk) => tokenize(chunk.text));
  const avgLength =
    docTokens.reduce((sum, tokens) => sum + tokens.length, 0) / chunks.length;

  const documentFrequency = new Map<string, number>();
  for (const tokens of docTokens) {
    for (const token of new Set(tokens)) {
      documentFrequency.set(token, (documentFrequency.get(token) ?? 0) + 1);
    }
  }

  const scored: ScoredChunk[] = chunks.map((chunk, index) => {
    const tokens = docTokens[index];
    const frequencies = new Map<string, number>();
    for (const token of tokens) {
      frequencies.set(token, (frequencies.get(token) ?? 0) + 1);
    }

    let score = 0;
    const matched: string[] = [];

    for (const [term, weight] of weights) {
      const tf = frequencies.get(term);
      if (!tf) continue;

      const df = documentFrequency.get(term) ?? 0;
      const idf = Math.log(1 + (chunks.length - df + 0.5) / (df + 0.5));
      const saturation =
        (tf * (K1 + 1)) /
        (tf + K1 * (1 - B + (B * tokens.length) / (avgLength || 1)));

      score += weight * idf * saturation;
      if (weight === 1) matched.push(term);
    }

    // Bonus de proximité : la question reprise presque littéralement compte double.
    const normalizedChunk = normalize(chunk.text);
    const bigrams = queryTokens
      .slice(0, -1)
      .map((token, i) => `${token} ${queryTokens[i + 1]}`);
    for (const bigram of bigrams) {
      if (normalizedChunk.includes(bigram)) score += 1.2;
    }

    return {
      chunk,
      score,
      coverage: coreTokens.size > 0 ? matched.length / coreTokens.size : 0,
      matchedTerms: matched,
    };
  });

  const best = Math.max(...scored.map((entry) => entry.score), 0);
  if (best <= 0) return [];

  return scored
    .map((entry) => ({ ...entry, score: entry.score / best }))
    .filter((entry) => entry.score > 0.12)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
