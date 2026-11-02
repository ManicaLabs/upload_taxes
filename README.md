# GOFUNDÉTAT

**Le crowdfunding national, mais sans demander votre avis.** GOFUNDÉTAT est un site satirique indépendant autour de l’amendement I-1358 au PLF 2027. Il simule des montants à partir des hypothèses publiques du texte ; il ne collecte ni argent ni données personnelles.

> **Satire · compteurs simulés.** Aucun euro n’a été collecté par ce site. Selon les informations vérifiées le 02/11/2026, l’amendement a été adopté en scrutin d’amendement, mais n’est pas une loi promulguée ou en vigueur. Les résultats sont des montants bruts théoriques, avant plafonds et conditions d’application.

## Fonctionnalités

- Landing page et compteur national déterministe, basé sur l’hypothèse politique de 10 Md€/an. Il ne mesure pas le trafic et n’utilise pas les chiffres Arcep.
- Simulateur à **0,055 €/Go décimal** avec scénarios vidéo, jeu, cloud, live et volume libre.
- Générateur d’URL d’overlay OBS Browser Source. Les paramètres d’audience sont saisis par l’utilisateur ; le résultat est une estimation hypothétique et jamais une mesure d’upload OBS ou de livraison par la plateforme.
- Widget `iframe` autonome, générateur de snippet, cartes sociales PNG créées localement dans Canvas.
- Sources officielles et articles de contexte présentés avec leur nature.
- Site statique multipage, sans backend, API, cookies ou suivi, publiable sur GitHub Pages.

## Démarrer localement

Prérequis : Node.js 18 ou plus récent et npm.

```bash
npm ci
npm run dev
```

Vite affiche l’adresse locale dans le terminal. Pour exécuter les tests et construire le site :

```bash
npm test
npm run build
npm run preview
```

La compilation crée le site statique dans `dist/`. Le chemin de base local est `/`. La build CI GitHub Pages utilise `/upload_taxes/`, le nom de ce dépôt. Pour un domaine personnalisé, changer `base` dans `vite.config.ts` vers `'/'` pour le build, configurer le domaine dans Pages, ajouter le fichier `CNAME` correspondant et actualiser l’URL absolue de l’image Open Graph dans `index.html`.

## Publication sur GitHub Pages

1. Pousser la branche `main` sur GitHub.
2. Ouvrir **Settings → Pages** dans le dépôt.
3. Sous **Build and deployment**, choisir **GitHub Actions** comme source.
4. Le workflow `.github/workflows/deploy.yml` installe les dépendances, lance les tests, construit `dist/` puis publie avec l’environnement `github-pages`.
5. Suivre l’exécution dans l’onglet **Actions**. L’adresse attendue pour ce dépôt est `https://manicalabs.github.io/upload_taxes/` après activation de Pages et succès du workflow.

Le workflow est déclenché sur chaque push vers `main`, ou manuellement depuis Actions. Il utilise les permissions minimales de publication Pages configurées dans son YAML.

## Configurer OBS

1. Ouvrir `obs.html`, saisir un débit moyen diffusé et une moyenne de viewers français. L’audience est un paramètre manuel.
2. Choisir le format, le thème et la couleur, puis générer et copier l’URL.
3. Dans OBS, ouvrir **Sources → + → Navigateur / Browser**, coller l’URL, et choisir la taille proposée par l’interface : compact `800 × 180`, vertical `400 × 250` ou bandeau `1920 × 250`.
4. Activer la transparence si souhaité. Éviter de rafraîchir la source à chaque changement de scène pour garder son horodatage de départ.

L’overlay est en mode `estimated` seulement. Il extrapole les gigaoctets à partir d’un débit constant, de la durée et des viewers français moyens renseignés. Il ne lit pas les octets envoyés par OBS et ne connaît pas les octets distribués à chaque spectateur. Ne jamais ajouter une clé de stream, un mot de passe ou un jeton à l’URL.

**Phase P1 :** envisager un companion local sécurisé fondé sur obs-websocket et son compteur `outputBytes`. L’upload OBS mesuré doit rester distinct de toute extrapolation de la distribution aux viewers. Ce connecteur n’est pas inclus dans ce MVP.

## Intégrer le widget

Ouvrir `widgets.html`, choisir le thème et les dimensions, puis copier le code HTML proposé. Exemple :

```html
<iframe src="https://manicalabs.github.io/upload_taxes/embed.html?theme=dark"
  title="GOFUNDÉTAT : projection satirique de taxe au Go"
  width="360" height="180" loading="lazy" referrerpolicy="no-referrer"></iframe>
```

Le compteur dans l’iframe est lui aussi une projection simulée. Si la politique CSP du site hôte interdit les iframes, créer un lien classique vers le site.

## Méthode et limites des calculs

- Taux retenu : `0.055 € / Go`, soit **5,5 centimes** par gigaoctet, pas 0,055 centime.
- `1 Go = 1 000 000 000 octets` ; `1 Mb/s = 1 000 000 bits/s`.
- Live constant : `Go/viewer = Mb/s × secondes / 8000`, puis multiplication par les viewers français moyens saisis.
- Exemple : `6 Mb/s × 3600 s / 8000 = 2,7 Go/viewer`; pour 100 viewers moyens, `270 Go`, soit `14,85 €` bruts théoriques.
- Les calculs ne déduisent pas les plafonds de 15 % du chiffre d’affaires français ou 2 % du chiffre d’affaires total, ni les conditions d’application. Ils ne déterminent donc aucune somme exigible.
- Le compteur national projette 10 Md€ sur une année modèle de 365 jours à partir du 02/11/2026 00:00 heure de Paris, soit environ 317,10 €/s. Il continue au-delà d’un an ; seule sa jauge est plafonnée à 100 %.
- Les 56 Tbit/s de l’Arcep cités dans le débat correspondent à une mesure ponctuelle de fin 2025 aux interconnexions des principaux FAI, pas à une moyenne annuelle et encore moins à une recette fiscale.

Le statut éditorial et les sources centrales sont regroupés dans `src/content/status.ts` pour faciliter leur mise à jour. Vérifier les textes et le statut politique avant toute republication.

## Tests

Les tests Vitest vérifient le taux et les conversions, les scénarios demandés, l’horloge injectée du compteur national et les bornes des paramètres d’overlay. Pour les lancer : `npm test`.

## Confidentialité et licence

Aucun compte, aucune collecte d’argent, aucun cookie de suivi, aucun service tiers ou API n’est requis. Le formulaire et la génération d’images tournent dans le navigateur ; les seuls paramètres de l’overlay figurent dans l’URL publique générée. Ne pas y placer de donnée personnelle ou secrète.

Code sous licence MIT. Les marques et noms tiers cités le sont à des fins descriptives ; GOFUNDÉTAT est un projet indépendant sans lien avec l’État, les FAI ou les plateformes mentionnées.
