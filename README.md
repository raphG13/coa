# On fait COA? — version web

Tirage des postes à la relève : PCR / Régul / J+1 le matin (3 COA), PCR / Régul l'après-midi (2 COA).
Trois modes : dé 3D, roue à aiguille, roulette casino. Version web de l'appli iOS, pour toute l'équipe.

**Lien : https://raphg13.github.io/coa/**

Sur iPhone : ouvrir le lien dans Safari → Partager → « Sur l'écran d'accueil ».
Sur Android : ouvrir dans Chrome → menu ⋮ → « Ajouter à l'écran d'accueil ».

- Aucune donnée envoyée nulle part : tout reste sur le téléphone (mode choisi, gages déjà tirés dans la journée).
- Fonctionne hors ligne après la première ouverture (service worker `sw.js`).
- Fichiers : `index.html` (interface), `app.js` (jeu), `manifest.json`, `sw.js`, icônes.
- Test : `?mode=dice|wheel|ball&shift=matin|aprem&auto=N` enchaîne N lancers.

Mise à jour : modifier, `git push`, puis incrémenter `CACHE` dans `sw.js` pour forcer le rafraîchissement.
