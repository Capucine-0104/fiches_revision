# Maths pour ingénieur

Site de révision en HTML, CSS et JavaScript, sans outil de build ni dépendance à installer.

- `index.html` : 16 fiches de révision (analyse, géométrie, probabilités, maths expertes), avec recherche, filtres par niveau et suivi des fiches maîtrisées.
- `revision.html` : cartes de révision (une question, une réponse). Les cartes ratées reviennent en premier.
- La progression et le thème (clair ou sombre) sont enregistrés dans le navigateur (`localStorage`). Rien n'est envoyé nulle part.

Les fiches suivent le plan des cours de spécialité de Yvan Monka ([maths-et-tiques.fr](https://www.maths-et-tiques.fr/)). Le site ne reproduit pas ses cours : il y renvoie par des liens.

## Voir le site en local

Ouvrir `index.html` dans un navigateur. Pour un comportement identique à GitHub Pages :

```bash
python3 -m http.server 8000
```

puis aller sur <http://localhost:8000>.

## Publier sur GitHub Pages

1. Créer un dépôt sur GitHub (par exemple `maths-ingenieur`) et y envoyer le contenu de ce dossier :

   ```bash
   git init
   git add .
   git commit -m "Site de révision de maths"
   git branch -M main
   git remote add origin https://github.com/<ton-compte>/maths-ingenieur.git
   git push -u origin main
   ```

2. Sur GitHub : **Settings → Pages → Build and deployment**, choisir **Deploy from a branch**, branche `main`, dossier `/ (root)`, puis **Save**.
3. Après une minute environ, le site est disponible sur `https://<ton-compte>.github.io/maths-ingenieur/`.

Tous les chemins sont relatifs, le site fonctionne donc dans un sous-dossier. Le fichier `.nojekyll` désactive Jekyll, inutile ici.

## Modifier le contenu

- **Une fiche** : modifier le bloc `<article class="fiche" id="…">` dans `index.html`. Penser à garder le même `id` dans le sommaire à gauche.
- **Les cartes** : modifier `js/cards-data.js`. Chaque carte est une ligne `[identifiant de la fiche, question, réponse]`.
- **Les couleurs et polices** : variables en haut de `css/style.css`.

Les polices (IBM Plex et STIX Two) viennent de Google Fonts. Sans connexion, le site utilise les polices du système et reste lisible.

## Vérifier avant de réviser

Les formules sont écrites d'après le plan des cours et relues, mais pas recopiées des PDF. Compare avec ton cours avant un contrôle.
