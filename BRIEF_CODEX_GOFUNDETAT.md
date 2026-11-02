# GOFUNDÉTAT — Brief produit et technique pour Codex

> Version : 1.0 — 2 novembre 2026  
> Statut : cahier des charges prêt à implémenter.  
> Produit : satire citoyenne sur la taxe au gigaoctet, outils de simulation et overlays pour streams.  
> Hébergement cible du MVP : GitHub Pages, **100 % statique**.  
> Propriétaire / crédit facultatif : Manica.

## 0. Mission de Codex

Implémente dans ce dépôt un minisite public, **responsive, accessible, performant et réellement déployable sur GitHub Pages**, intitulé **GOFUNDÉTAT**, ainsi qu'un générateur d'overlay OBS (simple Browser Source URL) et un widget intégrable par `iframe`. Le ton est une satire publicitaire assumée, dans l'esprit d'un faux service ultra-sérieux proposant une solution manifestement absurde. L'identité visuelle doit être originale : **ne pas reprendre les marques, logos, éléments graphiques ou textes de Free / Reef, GoFundMe, de l'État ou de la DGFiP**. Le nom est un concept de travail ; prévoir qu'il soit remplaçable facilement.

**Priorité : shipper un vrai MVP utile, pas une démonstration factice.** Aucun backend ni achat de service payant dans le MVP. Commencer par examiner le dépôt existant et respecter sa stack si elle est saine ; sinon choisir Vite + TypeScript + CSS simple (ou React seulement si pertinent). Pas d'API privée, pas de collecte personnelle, pas de tracking par défaut.

## 1. Faits vérifiés et garde-fous éditoriaux

- Le vendredi 30 octobre 2026, l'Assemblée nationale a **adopté l'amendement I-1358** au PLF 2027 : 11 pour, 10 contre, 14 abstentions ; il s'agit d'un vote d'amendement, **pas d'une loi définitivement promulguée**.
- L'amendement propose **0,055 euro par gigaoctet** de données distribuées aux abonnés français par les fournisseurs de contenus. Les **fournisseurs de contenus** seraient redevables ; les **FAI** mesureraient et transmettraient les volumes à l'administration, **sans recevoir pour eux-mêmes le produit de la taxe**.
- Plafonnement exprimé par le texte : 15 % du chiffre d'affaires réalisé en France ou 2 % du chiffre d'affaires total de l'émetteur. Ne pas présenter le calcul brut comme la somme effectivement exigible.
- Recettes avancées par les promoteurs : **10 milliards d'euros par an**, estimation et non recette acquise.
- Fin 2025, l'Arcep mesurait **56 Tbit/s** de trafic entrant aux interconnexions des principaux FAI français, valeur ponctuelle et **non mesure annuelle moyenne** ; ne jamais en déduire un total réel annuel d'impôts.
- Des critiques ont été formulées publiquement par Xavier Niel, Octave Klaba, VideoLAN / VLC, Éric Larchevêque et le gouvernement ; le député Laurent Lhardit défend le dispositif. Éric Coquerel a dit s'être trompé de bouton. Représenter équitablement l'intention fiscale affichée et les critiques techniques.
- **Situation au 02/11/2026 : aucune taxe en vigueur / aucune collecte réelle par ce projet.** Mettre cette date dans le dossier éditorial, et isoler dans `src/content/status.ts` les éléments susceptibles de changer après les prochains votes. Éviter toute actualisation de statut juridico-politique inventée.
- **Contexte** : le streaming, les logiciels libres, la livraison via CDN, l'hébergement et les téléchargements soulèvent des questions d'attribution des flux, de concurrence, de plafonnement et de répercussion éventuelle sur les prix. Ne pas affirmer que les spectateurs paient déjà 0,055 €/Go.

**Sources à relier depuis une section `Les vrais textes, les vraies sources`** :

1. Amendement officiel : https://www.assemblee-nationale.fr/dyn/17/amendements/3210A/AN/1358
2. Scrutin officiel : https://www.assemblee-nationale.fr/dyn/17/scrutins/9336
3. Baromètre Arcep : https://www.arcep.fr/cartes-et-donnees/nos-publications-chiffrees/linterconnexion-de-donnees/barometre-de-linterconnexion-de-donnees-en-france.html
4. Réactions / enjeux : https://www.macg.co/services/2026/11/xavier-niel-vlc-ovhcloud-personne-ne-semble-vouloir-de-la-taxe-au-gigaoctet-312069
5. Analyse technique / gouvernement : https://www.it-connect.fr/taxe-gigaoctet-producteurs-donnees-numeriques/
6. Explications sur le vote LFI : https://www.frandroid.com/culture-tech/politique/3306281_trompes-de-bouton-lfi-se-desolidarise-de-la-taxe-au-gigaoctet-quelle-a-votee
7. Réactions d'internautes, simulations et limites : https://www.numerama.com/politique/2365427-taxe-au-gigaoctet-un-internaute-presente-une-facture-de-10-000-euros-au-depute-a-lorigine-du-texte.html

Attention : une campagne humoristique ne doit **pas** attribuer de véritables citations inventées aux personnalités citées. Les blagues originales restent dans la voix de GOFUNDÉTAT.

## 2. Concept / signature

### Nom principal

**GOFUNDÉTAT** — « Le crowdfunding national, mais sans demander votre avis. »

### Positionnement

Une **fausse plateforme de financement participatif de l'État** : chaque gigaoctet consommé est présenté comme une hypothétique contribution budgétaire. Le site est fictif, les calculs sont réels et transparents. La perspective adoptée est celle d'une startup fiscale très enthousiaste qui vient d'inventer le `Giga-as-a-Tax`.

### Promesse comique

- « Votre data fait tourner la France. »
- « Ne faites plus de dons. Faites des downloads. »
- « L'État a trouvé un business model scalable. »
- « Chaque scroll est une opportunité de croissance fiscale. »
- « Avant, on regardait des streams. Maintenant, on finance l'avenir. Enfin, hypothétiquement. »
- « Merci de votre giga-générosité involontaire. »

### Langage

Ton publicité/fintech/crowdfunding + jargon administratif, volontairement disproportionné. Pas d'injures, pas d'appel au harcèlement, pas de consignes visant à saturer un serveur ou à générer artificiellement du trafic. La satire porte sur la mécanique et ses paradoxes, pas sur la vie privée des députés.

### Transparence obligatoirement visible

Badge constant : **« SATIRE — Compteurs simulés »**. Sous les chiffres : « Aucun euro n'a été collecté par ce site. L'amendement n'est pas une loi en vigueur au 02/11/2026. Estimation brute hors plafonds et conditions d'application. » Voir aussi FAQ.

## 3. Direction artistique

- Univers : fausse grande entreprise publique créée par une startup, sérieux corporate poussé à l'absurde.
- Palette suggérée : bleu nuit `#171C38`, violet `#6756E8`, jaune néon `#FACC15`, blanc cassé `#F8FAFC`, gris bleuté `#B8C5E9`.
- Typographies : sans-serif open source (ex. Inter) + affichage chiffres tabulaires ; webfont locale optionnelle, sinon system fonts.
- Logo original : monogramme `GO` conçu en CSS/SVG original, pas de Marianne, sceau de République, logo officiel ni marque copiée.
- Visuels : chiffres démesurés, barre de crowdfunding, faux tarifs produits, cartes pleines d'ironie, transitions légères. `prefers-reduced-motion` obligatoire.
- Mobile first. Contraste WCAG AA. Design pas trop chargé ; la blague doit être comprise en 3 secondes.
- Illustrations générées par code CSS/SVG original si nécessaires, pas de hotlink ni d'usage d'images d'actualité sans droits.

## 4. Pages et modules

### `/` — Accueil / landing

**Bandeau permanent** : « Projet satirique indépendant — ce compteur n'enregistre pas les recettes de l'État. »

**HERO**
- Petit label : « Nouveau : le financement participatif involontaire ».
- H1 : « Votre data fait tourner la France. »
- Sous-titre : « 0,055 € par Go dans un amendement du budget 2027. Nous avons imaginé la première cagnotte nationale alimentée par vos scrolls. »
- CTA 1 : `Calculer ma giga-contribution` -> simulateur.
- CTA 2 : `Installer le compteur sur mon stream` -> configurateur OBS.
- Compteur très visible : `Collecte théorique simulée : XXX XXX €` ; sous-titre `Projection à partir de l'hypothèse politique de 10 Md€/an — pas une mesure réelle`.
- Jauge `Objectif satirique : 10 Md€/an` avec point de départ explicitement défini ; afficher calcul et provenance au clic.

**Section 1 : Comment ça « fonctionne »**
1. Vous consommez de la data.
2. Une plateforme envoie des octets.
3. GOFUNDÉTAT vous remercie d'avoir imaginé une contribution.
Pied de section : juridiquement, le FAI mesurerait, l'émetteur serait redevable, l'État encaisserait si le dispositif était définitivement adopté.

**Section 2 : Calculez votre générosité involontaire**
Onglets ou segments : `Netflix / vidéo`, `Jeu vidéo`, `Cloud`, `Live streaming`, `Libre (Go)` ; afficher les hypothèses en clair, jamais de valeurs sans unités.
- Jeu 100 Go => 5,50 € théoriques bruts.
- Vidéo 15 Go => 0,825 € théoriques bruts.
- Sauvegarde 1 To decimal => 55,00 € bruts.
- Live 6 Mb/s, 1 h, 100 viewers français constants => 270 Go = 14,85 € bruts théoriques, **sans adaptation de débit, CDN, plafonds ou statut légal**.
CTA `Partager mon ticket fiscal imaginaire` : carte image ou lien partageable.

**Section 3 : Nos offres citoyennes fictives**
- `Forfait 4K patriotique` — « Plus de pixels, plus de patriotisme. »
- `Pack Cloud Souverain` — « Sauvegardez deux fois. Pour la nation. »
- `Option Scroll Illimité` — « Le pouce travaille, le budget sourit. »
Mention visible `Offres fictives, aucun achat, aucun débit, aucune affiliation gouvernementale`.

**Section 4 : Installez votre compteur**
3 CTA : `OBS & Stream`, `Mon site`, `Partager sur mes réseaux` ; exemples visuels de formats.

**Section 5 : On en parle**
Courtes synthèses sourcées des réactions de Laurent Lhardit (défense), Xavier Niel, Octave Klaba, VideoLAN, Éric Larchevêque, Éric Coquerel. Liens sortants vers sources. Pas d'images de personnes réelles inventées, ni faux témoignages attribués.

**Section 6 : Réalité vs satire**
- FAQ : La taxe existe-t-elle déjà ? Non à la date du lancement.
- Qui serait redevable ? Le fournisseur de contenus, pas directement l'utilisateur / FAI.
- L'internaute sera-t-il facturé ? Pas directement par l'amendement ; répercussion économique éventuelle indéterminée.
- Mon compteur OBS mesure-t-il la taxe réelle d'une plateforme ? Non, il fournit une estimation hypothétique ; selon le mode, on peut mesurer réellement l'upload OBS, pas les octets servis à chaque viewer.
- Qui est derrière GOFUNDÉTAT ? Projet indépendant et satirique, crédits transparents.

**FOOTER**
Sources, code source Github, conditions, confidentialité, mise à jour du statut fiscal, mention `Projet indépendant, sans lien avec l'État, les FAI ou les plateformes citées`. Crédit Manica discret si accepté.

### `/simulateur.html` — simulateur multi-scénarios

- Entrée de Go libre ; slider vidéo/jeu/cloud ; formulaire spécifique live.
- Mise à jour instantanée, arrondis corrects, unités explicites, copie du lien partageable (`URLSearchParams`) ; bannière satire.
- Vue carte sociale 1200×630 à produire statiquement ou via Canvas **local**, export PNG/WebP ; les OG génériques du site sont un fichier PNG statique. Ne pas dépendre de capture API.
- Bouton `Copier le résultat` et partage via Web Share API quand disponible, fallback copier.
- Exemples de copy : `J'ai téléchargé 100 Go. Selon le barème imaginaire du GOFUNDÉTAT, ça ferait 5,50 € de giga-solidarité. #GOFUNDÉTAT #TaxeAuGo`.

### `/obs.html` — générateur d'overlay OBS

Configurateur clair :
- Mode `Estimation simple (sans installation)` — disponible en MVP.
- Débit moyen diffusé (Mb/s), viewers français moyens (manuel, valeur 1 par défaut mais expliquée), date/heure de départ ou bouton `Démarrer une simulation`, thème, format.
- Le nombre de viewers est un **paramètre fourni par l'utilisateur**, pas un chiffre récupéré automatiquement.
- Prévisualisation live.
- Générer une URL absolue `.../overlay.html?mode=estimated&...` encodant uniquement des paramètres publics non sensibles ; ne jamais encoder mot de passe ou jeton.
- Boutons `Copier l'URL`, `Instructions OBS`, `Réinitialiser`, `Voir aperçu`.
- Instructions : OBS > Sources > + > Navigateur / Browser > URL > largeur/hauteur proposées. Activer si nécessaire la transparence ; ne pas rafraîchir à chaque changement de scène pour éviter sauts. Conseiller une taille 800×180 (compact), 400×250 (vertical) ou 1920×250 (bandeau).
- Visualiser dans l'overlay : `≈ X Go théoriques distribués` + `≈ Y € de taxe brute hypothétique` + mention `SIMULATION`.
- Mode propre à l'upload OBS *ne pas promettre dans le MVP* : afficher un encart `Bientôt : mesures locales OBS (connecteur optionnel)`.

### `/overlay.html` — Browser Source OBS

- Fond transparent, aucune navigation, aucune interaction obligatoire en streaming.
- Formats `compact`, `vertical`, `ticker` ; thèmes `dark`, `light`, `minimal` ; couleurs paramétrables via whitelist.
- Les paramètres d'URL sont strictement validés/bornés : bitrate >0 à 100 Mbps, audience 0 à 1 000 000, temps de départ raisonnable, durée plafonnée, `mode=estimated` uniquement dans MVP.
- Calcul temps réel avec `Date.now()` et timestamp ancré ; ne pas compter deux fois les secondes après reload ; pause/reprise explicite au besoin.
- Après chargement, afficher valeurs lisibles même si JS est lent. Pas d'animation coûteuse, compatible CEF/OBS, `prefers-reduced-motion`.
- Ne jamais demander une clé de stream.
- Option `window.obsstudio.getStatus` pour indiquer `streaming / non-streaming` si réellement disponible et permis : **ne jamais prétendre que ce statut donne la quantité d'octets**.

### `/embed.html` — widget pour sites web

- Widget autonome avec compteur national **simulé**, clairement qualifié, et lien vers l'explication.
- Mode iframe : `<iframe src="https://OWNER.github.io/REPO/embed.html?theme=dark" title="GOFUNDÉTAT : projection satirique de taxe au Go" width="360" height="180" loading="lazy" referrerpolicy="no-referrer"></iframe>` ; générer l'URL avec le vrai origin/base path du site, ne pas laisser les placeholders dans l'interface finale.
- Générateur sur `/widgets.html` pour choisir la taille/thème et copier le snippet ; aucun script tiers obligatoire.
- Si le site hôte bloque l'iframe via CSP, proposer lien classique.

### `/partager.html` — réseaux sociaux

- Carte statique OG pour lien partagé et cartes dynamiques exportables localement.
- Préréglages `Instagram Story 1080×1920`, `post 1080×1080`, `16:9`, `TikTok vertical` : génération PNG depuis canvas.
- Ne **pas** prétendre pouvoir intégrer du HTML arbitraire directement à TikTok, Instagram, YouTube ou X. Fournir visuels et liens partageables ; l'intégration live passe par logiciel compatible Browser Source.
- Bouton copier texte, puis partage Web Share si supporté.

## 5. Calculs et nomenclature (très important)

**Unité fiscale et conversion** :

- `RATE_EUR_PER_GB = 0.055`.
- `1 GB = 1_000_000_000 octets` **décimaux** (pour éviter les confusions Go/Gio).
- `1 Mb/s = 1_000_000 bits/s`.
- `GB = bytes / 1e9`.
- `theoreticalGrossEUR = GB * 0.055`.
- Pour un live hypothétique à débit constant : `GB_per_viewer = bitrate_Mbps * duration_seconds / 8000`; `GB_total = GB_per_viewer * average_french_viewers`; `EUR_gross = GB_total * 0.055`.
- Ne pas confondre `viewer simultané moyen`, `pic de viewers`, `nombre de vues`, `spectateurs uniques`, audience mondiale, CDN, adaptation vidéo et volumes réellement livrés à la France. Labels et info-bulles nécessaires.
- Calcul séparé `OBS_upload_bytes` (mesurable en option avancée) **≠** `platform_delivery_bytes` (non observable directement depuis l'overlay).
- Le compteur du site est une **projection fictive déterministe**, et non une collecte : paramètre `REVENUE_TARGET_EUR_PER_YEAR = 10_000_000_000`, `SIMULATION_START_ISO = 2026-11-02T00:00:00+01:00`, `SECONDS_PER_MODEL_YEAR = 365*24*3600`; taux d'accroissement `≈ 317,10 €/s` ; cumul = `max(0, elapsed_s) * (10e9 / secondsPerYear)`. Définir comportement après 1 an (par exemple compte toujours et jauge de l'objectif est plafonnée à 100 %). Afficher la base et le mode calcul au clic.
- Cette projection ne s'appuie **pas** sur une mesure Internet « en live », ni sur l'ARCEP. NE PAS présenter une estimation fiscale comme des rentrées budgétaires effectivement enregistrées.
- `0,055 €` = **5,5 centimes**, et non `0,055 centime`. Tester cette confusion qui est déjà apparue sur des simulations publiques.
- Toujours afficher `brut théorique`, `avant plafonds`, `si le dispositif devenait applicable`, et `avec les hypothèses saisies` là où pertinent.

## 6. Architecture technique

### P0 / MVP — zéro backend

- Vite + TypeScript, pages statiques multipages ou framework existant compatible `build` et GitHub Pages.
- `src/lib/tax.ts` : fonctions pures de calcul, conversion, arrondi, clamp, type de scénarios.
- `src/lib/nationalProjection.ts` : projection déterministe avec horloge injectée pour tests.
- `src/lib/share.ts` : URL publique, Clipboard API, Web Share, rendu Canvas ; fallbacks et messages clairs.
- `src/content/status.ts` : `lastVerifiedAt`, `legalStatus`, `amendmentNo`, `rate`, `sources`, `notice`. Toutes les pages utilisent ce module.
- `src/components/` : hero, ticker, amount, publicBadge, calculators, overlay, embed, FAQ.
- Aucun service tiers obligatoire. Pas de secret en client-side. Aucun dépôt de mot de passe OBS dans localStorage, URL, analytics, GitHub Pages ou logs.
- URL via `import.meta.env.BASE_URL` ou méthode compatible, afin de fonctionner sur `https://OWNER.github.io/REPO/` **et** sur domaine personnalisé.
- Générer `.github/workflows/deploy.yml` utilisant `checkout`, `setup-node`, `npm ci`, `npm run build`, `upload-pages-artifact`, `deploy-pages`, permissions `contents: read`, `pages: write`, `id-token: write` et `concurrency` appropriée. Déploiement depuis la branche par défaut, environnement `github-pages`.
- Exemple `.env.example` sans secret avec `VITE_SITE_URL` uniquement si nécessaire ; éviter les URLs hardcodées.
- `LICENSE` MIT ou licence libre appropriée et `README.md` complet.

### P1 (après MVP) — mesure locale d'upload OBS

L'interface Browser Source **ne donne pas nativement les octets livrés à tous les spectateurs**. Pour mesurer les vrais octets émis par OBS vers l'ingest, développer un **connecteur optionnel local** :

1. OBS 28+ possède obs-websocket 5.x intégré ; utiliser `GetStreamStatus` dont les champs comprennent `outputActive`, `outputDuration` et `outputBytes`.
2. Un petit outil local Node/TypeScript `companion/` se connecte à `ws://127.0.0.1:4455`, avec mot de passe enregistré **uniquement en configuration locale sécurisée**, jamais transmis à GitHub Pages.
3. Le companion héberge sa propre version de l'overlay et un canal de données en `127.0.0.1` exclusivement ; OBS Browser Source pointe vers `http://127.0.0.1:PORT/overlay`. Cela évite les connexions websocket d'une page HTTPS publique vers localhost, les difficultés de mixed content et les fuites de secrets.
4. Bloquer l'accès réseau extérieur, valider `Host` et `Origin`, empêcher DNS rebinding/CSRF, ne proposer que des endpoints en lecture pour le navigateur, ne jamais exposer les contrôles d'OBS.
5. La mesure `outputBytes` représente **OBS -> plateforme** ; afficher `Upload OBS mesuré` séparément. Le `Coût théorique plateforme` reste **une extrapolation** `bitrate livré × viewers français × durée` ; pas d'égalité trompeuse entre les deux.
6. Détecter resets/reconnexions/début-fin de stream, persister une session locale limitée, ne jamais envoyer les statistiques à un serveur par défaut.
7. Tests hors OBS via fixture simulée pour développeurs, documentation sécurité et compatibilité.

Docs : https://github.com/obsproject/obs-websocket et https://github.com/obsproject/obs-websocket/blob/master/docs/generated/protocol.md ; Browser Source : https://obsproject.com/kb/browser-source

### P2 (optionnel uniquement) — audience et cagnotte collective

- Récupération de viewers Twitch/YouTube via API officielle **uniquement si permission et modèle d'authentification sûr**, dans le companion ou un backend ; aucune clé secrète côté frontend. Protéger vie privée et quotas API.
- Une vraie métrique collective participative nécessite un backend (par exemple Cloudflare Workers + D1 ou Firebase avec règles robustes) : opt-in, antifraude, rate-limit, documentation, labels `déclarations des participants` ; elle **n'est pas vérifiée fiscalement**.
- Ne jamais inventer ou générer un `nombre de participants en direct` comme une métrique réelle ; une animation fictive doit être libellée `simulation`.
- Un éventuel système de partage de badges/personnalisation ne doit jamais exiger de compte pour fonctionner en MVP.

## 7. Critères d'acceptation

**Faits / clarté**
- [ ] L'amendement n'est **jamais** présenté comme un impôt déjà applicable.
- [ ] Les FAI sont décrits comme mesureurs / déclarants, pas destinataires de la taxe.
- [ ] Le compteur national est étiqueté `projection simulée` partout, overlay/iframe inclus.
- [ ] Les résultats par scénario sont indiqués `bruts théoriques`, hors plafonds, hypothèses visibles.
- [ ] Le mode stream distingue octets envoyés **par OBS** des octets envoyés **par la plateforme aux spectateurs**.
- [ ] Une section sources officielles est consultable et les liens fonctionnent.

**Calculs**
- [ ] `100 Go -> 5.50 €`, `15 Go -> 0.825 €`, `1 To -> 55 €`.
- [ ] `6 Mb/s * 3600s / 8000 = 2.7 GB/viewer`, `*100 = 270 GB`, `*0.055 = 14.85 €`.
- [ ] Simulation annuelle : `10 milliards / 365 jours ≈ 317.10 €/s`, progression déterministe à horloge identique et pas de reset à chaque reload.
- [ ] Zéro, nombres extrêmes, mauvaises unités, URL malformée, taux invalide : pas de NaN/Infinity, UI sûre, messages explicites.

**Technique / UX**
- [ ] `npm install`, `npm run build`, `npm run test` passent et l'artefact statique produit peut être prévisualisé localement.
- [ ] GitHub Pages fonctionne avec sous-répertoire `/REPO/` et domaine personnalisé.
- [ ] `overlay.html` fonctionne en OBS (tester/simuler viewport 800×180, 400×250, 1920×250), fond transparent, performant.
- [ ] `embed.html` est intégrable via iframe et se distingue visuellement d'une vraie collecte.
- [ ] Boutons `copier URL`, `copier HTML`, `partager` fonctionnent, y compris fallback sans Web Share.
- [ ] Responsive mobile 320px, clavier, focus, aria-live raisonnable pour chiffres (éviter annonce à chaque seconde), respect reduced-motion.
- [ ] Liens externes rel sûr, pas de XSS via query string, paramètres bornés.
- [ ] Pas de cookie tracking, pas d'API, de clé secret, ni d'envoi de statistiques utilisateur hors machine en MVP.
- [ ] `README` : instructions exécution, publication GitHub Pages, intégration OBS, widgets web, limites de mesure et satiricité.

## 8. Architecture fichiers suggérée

```text
.
├── index.html
├── simulateur.html
├── obs.html
├── overlay.html
├── embed.html
├── widgets.html
├── partager.html
├── public/
│   ├── favicon.svg
│   ├── og-image.png
│   └── robots.txt
├── src/
│   ├── content/status.ts
│   ├── lib/tax.ts
│   ├── lib/nationalProjection.ts
│   ├── lib/urlParams.ts
│   ├── lib/share.ts
│   ├── pages/...
│   ├── components/...
│   └── styles/...
├── tests/
│   ├── tax.test.ts
│   ├── projection.test.ts
│   └── urlParams.test.ts
├── .github/workflows/deploy.yml
├── README.md
├── LICENSE
├── package.json
└── vite.config.ts
```

Adapter librement cette arborescence au dépôt réel ; ne pas inventer de fichiers dont les besoins ne sont pas présents. Privilégier simplicité et robustesse.

## 9. Séquencement de réalisation

1. **Audit dépôt / setup** : regarder fichiers existants ; choisir stack ; tests de démarrage ; configuration Pages.
2. **Design system** : identité, responsivité, composants réutilisables ; disclaimer global.
3. **Moteur de calcul** : unités, simulateur multi-cas, projection nationale avec tests.
4. **Landing** : copy satirique, chiffre principal, explications, sources contradictoires, FAQ.
5. **OBS** : configurateur, URL, overlay transparent et scénarios ; instructions.
6. **Embed et partage** : snippet iframe, cartes PNG, Web Share/clipboard.
7. **QA et déploiement** : vérifier textes, tests, mobile/desktop/OBS, build GitHub Pages, README ; fournir URL finale quand publiée.
8. **Option P1** seulement une fois P0 stable : companion local, mesure `outputBytes` authentifiée ; tests/sécurité.

Si le budget de développement est court, prioriser `landing + simulateur + overlay OBS + deploy + mention satire` sur les cartes sociales et tous les thèmes.

## 10. Stratégie de diffusion et métriques

### Lancement
- Vidéo TikTok/Reel de 20–35 s : montrer le compteur national puis ajouter un overlay à un live ; slogan `Avec ce live, j'ai hypothétiquement financé X € de déficit. Merci qui ?`.
- LinkedIn : angle `comment rendre visibles les externalités du numérique sans raconter n'importe quoi sur la fiscalité` ; lien vers explication technique, préciser le caractère satirique.
- X / Bluesky / Reddit / Discord streamers : extrait GIF/clip avec compteur ; documenter l'installation OBS en 3 actions.
- GitHub README avec GIF de démo (assets originaux) et issues pour contributions.

### Viral loop
1. Simulation personnalisée rapide -> 2. Carte partageable -> 3. Clic vers site -> 4. Création overlay -> 5. Spectateurs voient le site / lien -> 6. Nouvelles simulations.

### KPI si mesure consentie plus tard
Nombre de pages consultées agrégé, clics `copier URL OBS`, `copier embed`, téléchargements de cartes, reprises du repo. **Pas de faux chiffres utilisateurs.**

### Plan d'actualité
Le statut peut changer après la poursuite des débats budgétaires à partir du 3 novembre 2026. Le site doit permettre de remplacer très vite `amendement adopté / non en vigueur` par `supprimé / rejeté / modifié / promulgué`, avec **source et date de vérification**. Si la taxe disparaît, la blague reste opérationnelle : `Notre plus grand financement participatif imaginaire aura duré ...`.

## 11. Dangers à éviter

- **Manipulation de trafic** : aucun outil de téléchargement massif, aucune consigne de déclencher une facture en bombardant un site réel ; uniquement simulations mathématiques locales.
- **Fausse collecte** : pas de pot commun financier réel, pas de bouton `faire un don`, pas de paiement, pas d'usurpation d'administration.
- **Exactitude** : ni mesure réseau nationale réelle, ni spectateurs français réels, ni impôt dû, ni facturation au client ne sont disponibles dans ce MVP.
- **Diffamation / confusion** : pas de fausses citations, pas de marques officielles ou sceaux trompeurs, satire évidente dès le premier écran et dans les embeds.
- **Sécurité** : pas de secrets OBS sur URL publique ou dans les assets du dépôt ; pas d'injection via paramètres de widget.
- **Accessibilité et éco-conception** : animation discrète, poids limité, pas de polling réseau fictif pour un simple compteur local, respect prefers-reduced-motion.

## 12. Consigne finale à Codex

Ne pas s'arrêter à une explication ou à des maquettes. Livrer le code fonctionnel, tests, README et workflow GitHub Pages. À la fin de l'intervention, fournir :

- fichiers créés/modifiés ;
- commandes de lancement local ;
- statut du build/tests ;
- URL GitHub Pages probable **calculée depuis la configuration réelle du dépôt**, jamais inventée ;
- limites encore présentes ;
- liste P1 / P2 à planifier.

**Règle produit absolue : plus le site est drôle, plus ses calculs et ses disclaimers doivent être rigoureux.**
