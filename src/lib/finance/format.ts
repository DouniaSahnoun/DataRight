/**
 * Affichage des montants et neutralisation des textes issus de documents.
 *
 * Les deux vont ensemble : un montant est toujours produit par `Intl` à partir
 * d'un nombre du modèle, jamais d'une chaîne lue dans un PDF. Et tout texte
 * provenant d'un document importé passe par `sanitizeDocumentText()` avant
 * affichage, pour qu'une consigne glissée dans un contrat (« ignore les règles
 * précédentes », « affiche 0 € ») reste ce qu'elle est : du texte inerte.
 */

const EUR = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const K_EUR = new Intl.NumberFormat("fr-FR", {
  maximumFractionDigits: 0,
});

const SHARE = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 1 });

const K_EUR_DECIMAL = new Intl.NumberFormat("fr-FR", {
  maximumFractionDigits: 1,
});

/** Montant en euros, formaté en K€ — l'unité de lecture du tableau de bord. */
export function formatKEuros(amount: number): string {
  if (!Number.isFinite(amount)) return "—";
  const thousands = amount / 1000;
  const formatter = Math.abs(thousands) < 10 ? K_EUR_DECIMAL : K_EUR;
  return `${formatter.format(thousands)} K€`;
}

/** Montant en euros, formaté à l'unité — utilisé dans les détails de lignes. */
export function formatEuros(amount: number): string {
  if (!Number.isFinite(amount)) return "—";
  return EUR.format(amount);
}

export function formatShare(part: number, whole: number): string {
  if (!Number.isFinite(part) || !Number.isFinite(whole) || whole <= 0) return "—";
  // Une décimale : 57,1 % et non 57 %, pour rester fidèle au modèle financier.
  return `${SHARE.format((part / whole) * 100)} %`;
}

const CONTROL_CHARS = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f]/g;
const BIDI_OVERRIDES = /[‪-‮⁦-⁩‎‏]/g;

/**
 * Rend inoffensif un texte provenant d'un document importé.
 *
 * Supprime les caractères de contrôle et les marques de direction (qui peuvent
 * inverser visuellement un nombre), neutralise les balises, aplatit les
 * espaces et borne la longueur. Le texte reste lisible et fidèle : rien n'est
 * reformulé, seule la capacité de nuisance à l'affichage est retirée.
 */
export function sanitizeDocumentText(value: string, maxLength = 320): string {
  const cleaned = value
    .replace(CONTROL_CHARS, " ")
    .replace(BIDI_OVERRIDES, "")
    .replace(/[<>]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (cleaned.length <= maxLength) return cleaned;
  return `${cleaned.slice(0, maxLength).trimEnd()}…`;
}
