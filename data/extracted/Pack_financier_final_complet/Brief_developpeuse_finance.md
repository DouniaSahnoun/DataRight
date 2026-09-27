# Brief financier pour la développeuse

## Résultats attendus

- ARR total : 700 000 EUR.
- Avant D05 : 540 000 EUR sous restriction explicite et 160 000 EUR avec preuve insuffisante.
- Après D05 : 240 000 EUR sous restriction explicite, 160 000 EUR avec preuve insuffisante et 300 000 EUR sécurisés sous conditions.
- Total restant à vérifier : 400 000 EUR, soit 57,1 % de l'ARR.

## Comportements obligatoires

1. Relier D05 à D01 et D06 à D04.
2. Appliquer la date de référence demandée par l'utilisateur.
3. Limiter D05 à ClauseLens Enterprise et ne pas l'étendre à DealRoom Search.
4. Vérifier l'entité contractante : D07 ne couvre pas Asteria AI SAS.
5. Écarter D08 comme preuve de droit effectif parce qu'il n'est pas signé.
6. Citer document, clause et page dans chaque réponse.
7. Répondre « information insuffisante » lorsque le dossier ne prouve pas la conclusion.
8. Afficher l'ARR concerné comme montant à vérifier, jamais comme perte certaine.

Utiliser `data/finance_master_developpeuse.json`. Les questions réservées au financier ne figurent pas dans ce fichier.
