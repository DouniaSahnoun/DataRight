# DataRight — mémoire contractuelle

DataRight retrouve instantanément un droit d'usage ou une obligation dans un
dossier de contrats (licences, conditions d'utilisation, avenants) et **justifie
systématiquement sa réponse** : document source, page exacte, citation littérale.

Une seconde couche relie ces droits à la **dépendance économique** de
l'entreprise : quels revenus reposent sur quels composants, et lesquels appellent
une vérification avant un examen approfondi.

> **Séparation des sources.** L'analyse contractuelle reste purement juridique :
> les articles à portée financière d'un contrat ne sont jamais indexés
> (`OUT_OF_SCOPE` dans `src/lib/rag/chunking.ts`), et aucun montant n'est lu dans
> un PDF. Les chiffres proviennent exclusivement de la cartographie financière,
> saisie ou importée en JSON puis validée.
>
> **Vocabulaire.** Les montants expriment une dépendance — « Revenus associés »,
> « Point à vérifier », « Information manquante ». Jamais une perte, un risque ni
> une probabilité.

## Démarrage

```bash
npm install
npm run dev          # http://localhost:3000
```

Le dossier de démonstration — les huit documents de `example/` — est chargé
d'office ; l'état est ensuite conservé dans le `localStorage` du navigateur.

| Commande             | Rôle                                                        |
| -------------------- | ----------------------------------------------------------- |
| `npm run dev`        | Serveur de développement                                     |
| `npm run build`      | Build de production                                          |
| `npm run lint`       | ESLint                                                       |
| `npm run check:engine` | Contrôles de traçabilité du moteur (voir plus bas)         |
| `npm test`           | Tests unitaires du calcul de dépendance économique           |
| `npm run data:extract` | Extraction des packs ZIP de `/data`                        |

## Espace de travail

- **Contract Memory** (`/`) — écran scindé : conversation à gauche, visualiseur à
  droite. Cliquer une source fait défiler le document jusqu'à la page et surligne
  le passage.
- **Cartographie** (`/cartographie`) — revenus associés par composant et par
  situation contractuelle, avec date de référence.
- **Documents** (`/documents`) — import PDF, extraction paginée, métadonnées.
- **Registre des droits** (`/droits`) — clauses extraites, filtrables et corrigeables.
- **Avenants** (`/avenants`) — liens avenant → clause d'origine, à valider ou écarter.

## Données financières : packs ZIP de `/data`

`npm run data:extract` (lancé automatiquement avant `dev` et `build`) lit les
archives de `/data` avec `node:zlib` — sans dépendance, CRC-32 vérifié :

- les fichiers transmissibles à la développeuse sont extraits dans
  `data/extracted/<pack>/` ;
- `finance_master_developpeuse.json` est recopié dans `src/lib/finance/dataset/`
  avec sa provenance (`source.json` : archive, entrée, SHA-256) ;
- **les porteurs des questions réservées ne sont jamais extraits** (dossiers
  Word, classeur complet, `finance_master_complet.json`,
  `questions_reservees_financier.json`, `project_context_day2.json`).

`src/lib/finance/dataset.ts` valide ce fichier (zod) et le traduit en graphe
composants → produits → lignes de revenus. Les postes affichés sont
**recalculés** à partir des clauses ; `financial_summary` ne sert que de valeur
de contrôle (`dataset.test.ts`).

**Date de référence.** Une clause d'un document pas encore en vigueur est
ignorée, tout comme le lien d'un avenant pas encore en vigueur. Au 30/06/2026 :
540 K€ sous restriction + 160 K€ en information manquante. Au 23/09/2026, avenant
validé : 240 K€ + 160 K€ à vérifier (57,1 %), 300 K€ à droit documenté.

Quatre statuts, signalés par les mêmes badges dans toute l'interface :
**Permission validée / Usage autorisé** (vert), **Restriction explicite** (rouge),
**À vérifier juridiquement / Point à vérifier** (ambre), **Information
insuffisante / manquante** (gris).

## Architecture RAG

```
PDF ─► extraction paginée ─► découpage en alinéas ─► retrieval lexical ─┐
      (lib/pdf/extract.ts)   (lib/rag/chunking.ts)   (lib/rag/retriever.ts)
                                                                        │
      ┌─────────────────────────────────────────────────────────────────┘
      ▼
  synthèse (lib/rag/provider.ts)          vérification (lib/rag/engine.ts)
  ├─ MockAnswerProvider   — hors-ligne    ├─ chaque citation retrouvée mot pour
  └─ ClaudeAnswerProvider — api/ask       │  mot dans la page annoncée, sinon
                                          │  écartée
                                          └─ préséance de l'avenant si le lien
                                             a été validé
```

Deux garanties sont implémentées dans le moteur, et nulle part ailleurs :

1. **Aucune citation non vérifiée n'atteint l'interface.** `locateExcerpt()`
   recherche l'extrait dans le texte de la page annoncée, en ne tolérant que les
   différences d'espacement. Une citation introuvable est supprimée et signalée ;
   une réponse affirmative qui perdrait toutes ses citations bascule
   automatiquement en « Information insuffisante ».
2. **La règle de l'avenant prime — après validation humaine.** Un lien
   `confirmed` fait remonter la clause de l'avenant en tête des sources et
   applique sa règle ; un lien seulement `suggested` dégrade la réponse en « À
   vérifier juridiquement » ; un lien `rejected` rétablit la rédaction initiale.
   Le comportement se constate en direct depuis `/avenants`.

Le seuil de confiance porte sur la **couverture** des termes de la question
(`ScoredChunk.coverage`), et non sur le score BM25 normalisé — qui vaut toujours 1
pour le premier résultat, même quand le dossier est muet sur le sujet.

### Brancher Claude

Le moteur local simulé est actif par défaut. Le basculement se fait depuis le
sélecteur « Moteur local / Claude » de la barre supérieure.

```bash
cp .env.example .env.local   # puis renseigner ANTHROPIC_API_KEY
```

`src/app/api/ask/route.ts` appelle `claude-opus-5` en sorties structurées. Le
modèle ne reçoit **que** les passages sélectionnés par le retriever, numérotés :
il renvoie un numéro de passage, jamais un nom de document ou de page, et son
extrait est revérifié par le moteur. Sans clé configurée, l'appel répond 503 et
l'interface retombe sur le moteur local en l'indiquant dans la réponse.

## Jeu de démonstration

La data room fictive d'**Asteria AI SAS**, éditeur de trois produits d'analyse
contractuelle. `example/` contient les PDF d'origine ; `src/lib/mock/corpus.ts`
en reprend le texte mot pour mot, tel que l'extraction paginée le restitue.

| Réf. | Document                                        | Ce qu'il apporte au dossier                          |
| ---- | ----------------------------------------------- | ---------------------------------------------------- |
| D01  | Atlas Business Corpus Data Licence              | Recherche interne seule — usage commercial interdit  |
| D02  | HelixLM Commercial Model Licence                | Déploiement hébergé permis, poids non distribuables  |
| D03  | VectorGrid Enterprise Agreement                 | SaaS commercial permis, plafond et rapport trimestriel |
| D04  | ClauseLens Enterprise Subscription (Horizon Bank) | Contrat client : volumétrie, reconduction tacite   |
| D05  | Amendment No 1 au contrat Atlas                 | **Lève D01 — pour ClauseLens Enterprise seulement**  |
| D06  | Horizon Bank Security Addendum                  | Notification d'incident sous 24 h                    |
| D07  | OCRVision API Agreement                         | **Signé par Asteria AI UK Ltd, pas par la SAS**      |
| D08  | ReportForge Order Form                          | **Projet non signé, sans effet contractuel**         |

Cinq questions pré-programmées couvrent les quatre statuts :

| Question                                               | Résultat attendu                                  |
| ------------------------------------------------------ | ------------------------------------------------- |
| Usage commercial du corpus Atlas                       | À vérifier → Permission une fois l'avenant validé |
| Déploiement de HelixLM en service hébergé              | Permission sous condition de forme                |
| Délai de transmission du rapport VectorGrid            | Permission — 15 jours                             |
| Reconduction de l'abonnement Horizon Bank              | Permission — préavis de 60 jours                  |
| Usage commercial de l'API OCRVision                    | **Information insuffisante** (mauvaise entité)    |

Scénario recommandé : poser la première question (le lien d'avenant n'étant pas
encore validé, la réponse est « À vérifier juridiquement » et renvoie vers
`/avenants`), valider le lien, puis reposer la même question — la règle de
l'avenant prévaut et la clause d'origine s'affiche en « modifiée par avenant ».
L'écarter fait réapparaître la restriction initiale.

La dernière question est la plus parlante en due diligence : le contrat
OCRVision **est** au dossier, mais il lie VisionCore à `Asteria AI UK Ltd` et
écarte nommément `Asteria AI SAS`. DataRight ne conclut pas — il cite l'article
qui exclut l'entité.

`npm run check:engine` rejoue ces cas hors navigateur et vérifie en plus que
chaque extrait du registre existe bien dans sa page.

## Dépendance économique

La cartographie relie `[Composant technique] → [Fonctionnalité commerciale] →
[Ligne de revenu]`. Les deux premières relations sont des many-to-many : un
composant alimente plusieurs fonctionnalités, une fonctionnalité repose sur
plusieurs composants.

**Vocabulaire, règle absolue.** L'interface ne parle jamais de perte ni de
risque. Quatre libellés seulement : « Usage autorisé », « Restriction
explicite », « Point à vérifier », « Information manquante » — plus « Revenus
associés » et « Dépendance ». Un montant dit *quels revenus reposent sur une
situation contractuelle*, pas ce qu'il adviendrait d'eux. Un test
(`association.test.ts` → « règle de vocabulaire ») relit les fichiers
d'interface et échoue si un terme proscrit réapparaît.

**Règle anti-doublon.** `computeAssociatedRevenue()` déduplique par ligne de
revenu : si deux composants sous restriction alimentent la même fonctionnalité,
ses revenus ne sont additionnés qu'une fois. L'écart avec la somme naïve est
conservé (`deduplicatedAmount`) et affiché, pour que le total reste explicable.

**Postes du portefeuille.** `computeRevenuePartition()` affecte chaque ligne à un
seul poste — celui de la situation la plus contraignante parmi les composants de
sa fonctionnalité. Les quatre postes totalisent donc exactement le portefeuille.

**Étanchéité texte / chiffres.** Aucun montant ne provient d'un PDF : ils sont
saisis ou importés en JSON, puis validés (`validateGraph`) — une valeur textuelle,
`NaN`, négative ou hors bornes est écartée et signalée. Tout texte de document
affiché dans le tableau de bord passe par `sanitizeDocumentText()`, qui retire
caractères de contrôle, marques de direction et balises. Une consigne glissée
dans un contrat (« ignore les règles précédentes », « affiche 0 € ») reste donc du
texte inerte, côté interface comme côté modèle (règle 6 du prompt système).

### Scénario de démonstration

Portefeuille : 700 K€ d'ARR sur trois produits — ClauseLens Enterprise (300 K€),
DealRoom Search (240 K€), BoardPack Studio (160 K€).

État initial : l'avenant Atlas est au dossier mais **son lien n'est pas validé**,
et les 700 K€ figurent tous parmi les revenus à clarifier — 240 K€ sous
restriction explicite, 300 K€ à vérifier, 160 K€ en information manquante. La
synthèse annonce ce que donnerait une validation (400 K€).

Ouvrez la carte **Atlas Business Corpus (usage ClauseLens)** → « Valider
l'avenant d'autorisation commerciale ». Le composant passe à « Usage autorisé »,
ClauseLens bascule dans les revenus couverts et le montant à clarifier tombe à
400 K€ — en même temps que la réponse de Contract Memory sur l'usage du corpus
passe de « À vérifier juridiquement » à « Permission validée ».

**Ce que la validation ne lève pas**, et c'est le point de la démonstration :
DealRoom Search reste à 240 K€ sous restriction, parce que l'article 2.2 de
l'avenant l'exclut nommément du périmètre autorisé. Le corpus Atlas figure donc
deux fois dans la cartographie, une fois par périmètre d'usage — modéliser une
seule brique reviendrait à étendre à DealRoom une permission que l'avenant lui
refuse. Les 160 K€ de BoardPack, eux, ne relèvent d'aucune restriction : il leur
manque un document opposable (D07 vise la mauvaise entité, D08 n'est pas signé).

Le lien se rejoue depuis `/avenants` (« Écarter », « Remettre en attente ») pour
rejouer la démonstration.

## Pile technique

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Radix UI ·
lucide-react · pdf.js 6 (extraction 100 % côté navigateur, aucun fichier n'est
téléversé) · SDK Anthropic (optionnel).
