const webDev = "Développeur web";

const projects = {
  clinoly: {
    category: "Plateforme SaaS",
    role: "Fondateur et développeur principal",
    platform: "Web, tablette et mobile",
    tagline: "La gestion de cabinet pour les médecins, cliniques et centres médicaux.",
    description:
      "Clinoly est un SaaS multi-établissements de gestion de cliniques couvrant dossiers patients, planning, consultations, ordonnances et facturation, en français, arabe et anglais.",
    summary:
      "Clinoly remplace le tableur, l'agenda papier et le classeur sur lesquels fonctionnent encore la plupart des petits cabinets. Le médecin l'ouvre et voit qui attend, qui est le suivant et ce qui s'est passé la dernière fois. La réceptionniste prend rendez-vous, enregistre l'arrivée et encaisse sans jamais voir une note clinique.",
    context:
      "Il est conçu d'abord pour le Maroc : français, arabe avec une mise en page complète de droite à gauche, anglais, dirhams et formats de téléphone locaux. Rien dans le pays n'est codé en dur : la devise, la taxe, la langue et les formats de documents relèvent tous de la configuration.",
    keyPoints: ["Multi-établissements dès la base de données", "Français, arabe RTL et anglais", "Chaque accès à un dossier est journalisé"],
    imageAlt: "Tableau de bord de Clinoly avec les patients du jour, les prochains rendez-vous et les actions rapides",
    urlLabel: "Visiter clinoly.com",
    highlights: [
      { title: "Accueil", text: "Calendriers jour, semaine, mois et liste, une salle d'attente en direct, une liste d'attente qui propose automatiquement les créneaux libérés, et des rappels qui ne partent jamais deux fois." },
      { title: "Consultation", text: "Un seul écran de la plainte au suivi : constantes avec courbes de tendance, examen, diagnostics structurés, ordonnances, et prescriptions d'analyses et d'imagerie." },
      { title: "Facturation", text: "Une grille tarifaire, des factures, des paiements partiels, des remboursements, des reçus et des PDF à l'image du cabinet, avec le solde de chaque patient toujours exact." },
      { title: "Accès patient", text: "Un portail pour les rendez-vous, ordonnances et factures, plus une page de réservation publique par clinique avec son propre QR code." },
      { title: "Pilotage", text: "Des tableaux de bord par rôle, des analyses d'activité et de revenus, des rapports CSV et PDF, et une piste d'audit en ajout seul." },
      { title: "L'IA, avec le médecin aux commandes", text: "Elle peut résumer un historique, structurer des notes ou rédiger une lettre d'orientation. Elle ne pose jamais de diagnostic, ne prescrit jamais et n'écrit jamais dans un dossier, et le consentement du patient la conditionne." },
    ],
    engineering: [
      { title: "Une isolation appliquée deux fois", text: "Chaque clinique est séparée au niveau des données. La frontière est vérifiée une première fois par un garde, puis de nouveau par chaque requête." },
      { title: "Les dossiers sont amendés, jamais réécrits", text: "La concurrence optimiste empêche un second onglet d'écraser un travail plus récent, et un instantané de révision est enregistré avant chaque modification." },
      { title: "Les règles de planning vivent dans la base de données", text: "La double réservation est empêchée par la base elle-même : aucun bug côté client ne peut créer de conflit." },
      { title: "L'argent ne touche jamais un flottant", text: "Chaque montant est stocké sous forme d'entier en unités mineures, de la grille tarifaire au reçu final." },
      { title: "Les fonctionnalités sont des interrupteurs", text: "Désactiver une capacité la refuse au niveau de la route et la retire de la navigation, des offres, de la grille tarifaire et des pages marketing, dans les trois langues." },
      { title: "Un contrat, partagé", text: "Les types, les schémas de validation et le schéma Prisma se trouvent dans des paquets partagés : le client et le serveur ne peuvent pas diverger." },
    ],
    gallery: [
      { alt: "Écran de consultation de Clinoly avec constantes, motif et actions d'ordonnance", caption: "La consultation, des constantes à l'ordonnance sur un seul écran." },
      { alt: "Salle d'attente en direct de Clinoly listant les patients en file", caption: "Une salle d'attente en direct partagée entre l'accueil et le médecin." },
      { alt: "Tableau de bord de Clinoly en arabe avec une mise en page de droite à gauche", caption: "L'arabe, avec une vraie mise en page de droite à gauche." },
      { alt: "Analyses de Clinoly avec graphiques de rendez-vous, d'absences et de revenus", caption: "Activité, absences et revenus sur une seule page." },
    ],
  },

  masroufi: {
    category: "Application mobile",
    role: "Designer et développeur",
    platform: "Android, avec iOS et web depuis une seule base de code",
    tagline: "Une application de finances personnelles privée qui garde chaque dirham sur votre appareil.",
    description:
      "Masroufi est une application de finances privée créée avec React Native et Expo : comptes, dettes, budgets et objectifs, stockés sur votre appareil, en arabe, français et anglais.",
    summary:
      "Masroufi (مصروفي) répond aux questions qu'un foyer se pose vraiment : combien ai-je, que dois-je, et combien puis-je dépenser sans risque ? Comptes, transactions, dettes, budgets, revenus et factures récurrents, objectifs d'épargne et rapports tiennent au même endroit.",
    context:
      "Elle est pensée d'abord pour l'arabe, avec une prise en charge complète de la lecture de droite à gauche, en plus du français et de l'anglais, et utilise le dirham marocain par défaut. Tout reste sur l'appareil : pas de compte, pas de serveur, pas d'analyse d'usage.",
    keyPoints: ["Pas de compte, pas de serveur, pas d'analyse d'usage", "L'arabe d'abord, puis le français et l'anglais", "Des sauvegardes chiffrées que vous contrôlez"],
    imageAlt: "Écran d'accueil de Masroufi avec l'argent total, les soldes des comptes et les boutons d'ajout rapide",
    download: { label: "Télécharger pour Android", detail: "APK · 102 Mo" },
    heroShots: [
      { alt: "Écran de planification de Masroufi indiquant le montant disponible à dépenser" },
      { alt: "Écran d'accueil de Masroufi en arabe" },
    ],
    highlights: [
      { title: "Dépensez en un geste", text: "Des boutons rapides apparaissent d'eux-mêmes d'après ce que vous répétez, et chaque saisie peut être annulée sur-le-champ." },
      { title: "Disponible à dépenser", text: "Part de vos comptes dépensables, puis soustrait les factures à venir, les dettes et l'argent mis de côté pour vos objectifs. Les revenus attendus ne sont jamais comptés." },
      { title: "Les dettes, dans les deux sens", text: "Suivez ce que vous devez et ce qu'on vous doit, avec des échéanciers et des plans de remboursement comparés côte à côte." },
      { title: "Revenus et factures en pilote automatique", text: "Ajoutez un salaire ou une facture une fois et il s'enregistre tout seul à sa date. Vous pouvez modifier, suspendre ou supprimer chacun." },
      { title: "Budgets et objectifs", text: "Les budgets montrent votre rythme sur la période, et les objectifs d'épargne suggèrent ce qu'il faut mettre de côté chaque mois." },
      { title: "Des rapports lisibles", text: "Flux de trésorerie, origine et destination de l'argent, comparaisons avec la période précédente, et exports PDF ou CSV qui préservent l'arabe." },
    ],
    engineering: [
      { title: "Aucun solde n'est stocké", text: "Un solde est la somme des écritures du grand livre d'un compte : il ne peut donc pas s'écarter de l'historique." },
      { title: "L'argent est en entiers d'unités mineures", text: "Les montants sont analysés par arithmétique sur chaînes. Une saisie qui ne peut pas être lue exactement est refusée, jamais arrondie." },
      { title: "Un chiffrement vérifiable", text: "Les sauvegardes utilisent AES-256-GCM avec une clé dérivée par scrypt. Une restauration est d'abord vérifiée en entier, puis se fait en tout ou rien." },
      { title: "Une traduction manquante est une erreur de compilation", text: "L'arabe, le français et l'anglais sont typés : une clé ne peut pas manquer dans une langue." },
      { title: "Les tests exécutent du vrai SQL", text: "Les tests financiers exercent de vraies migrations, contraintes et vues plutôt que des mocks, et des parcours de bout en bout pilotent l'interface réelle." },
      { title: "Une seule définition de chaque total", text: "Soldes, flux de trésorerie et totaux de dettes proviennent d'un seul jeu de vues SQL, partagé par chaque écran." },
    ],
    gallery: [
      { alt: "Écran de planification de Masroufi indiquant le montant disponible à dépenser", caption: "Ce qu'on peut dépenser sans risque" },
      { alt: "Écran des dettes de Masroufi avec l'argent dû dans les deux sens", caption: "Dettes, dans les deux sens" },
      { alt: "Écran des budgets de Masroufi suivant le rythme de dépense", caption: "Rythme du budget" },
      { alt: "Écran des rapports de Masroufi en arabe avec une mise en page de droite à gauche", caption: "L'arabe d'abord" },
      { alt: "Écran des rapports de Masroufi en mode sombre", caption: "Mode sombre" },
    ],
  },

  sakina: {
    category: "Application mobile",
    role: "Designer et développeur",
    platform: "Android, avec iOS et web depuis une seule base de code",
    tagline: "Un compagnon islamique paisible et privé qui fonctionne entièrement hors ligne.",
    description:
      "Sakina (سكينة) est un compagnon islamique hors ligne créé avec React Native et Expo : horaires de prière, Qibla, Coran complet, invocations, tasbih et zakat, en arabe, anglais et français.",
    summary:
      "Sakina (سكينة) réunit la journée d'un musulman en un seul endroit calme. L'accueil montre l'essentiel du jour : la prochaine prière avec son compte à rebours, le verset du jour, les invocations et les objectifs. Tout le reste est à un geste : le Coran complet avec recherche et mémorisation, invocations et doua, un tasbih Misbaha, le calendrier hégirien et un calculateur de zakat.",
    context:
      "Elle est pensée d'abord pour l'arabe, avec une mise en page complète de droite à gauche, et reste complète en anglais et en français. Il n'y a ni compte, ni analyse d'usage, ni cloud : chaque écran principal s'affiche à partir des données du téléphone, et le réseau ne sert que pour les téléchargements que vous demandez.",
    keyPoints: ["Entièrement hors ligne, sans compte ni suivi", "L'arabe d'abord, puis l'anglais et le français", "Chaque texte rattaché à une source nommée"],
    imageAlt: "Écran d'accueil de Sakina avec la prochaine prière et son compte à rebours, les horaires du jour et les objectifs quotidiens",
    download: { label: "Télécharger pour Android", detail: "APK · 70 Mo" },
    heroShots: [
      { alt: "Horaires de prière de Sakina en arabe avec une mise en page de droite à gauche" },
      { alt: "Horaires de prière de Sakina en mode sombre" },
    ],
    highlights: [
      { title: "Des horaires de prière sans réseau", text: "Calculés sur l'appareil à partir de votre position, avec douze méthodes de calcul, la règle d'Asr que vous suivez et une mention claire quand vous ajustez une heure." },
      { title: "Le Coran complet", text: "Le texte uthmani complet avec navigation par sourate, juz et page, signets, repère de dernière lecture, recherche arabe locale, audio verset par verset et traductions téléchargeables." },
      { title: "Qibla et calendrier hégirien", text: "Une boussole avec guide de calibrage, et un calendrier Umm al-Qura avec occasions, journal de jeûne et ajustement manuel du jour." },
      { title: "Invocations, doua et tasbih", text: "Invocations du matin et du soir et doua coraniques avec compteurs, plus un tasbih Misbaha de 33 grains avec retour haptique et objectifs." },
      { title: "Mémorisation et plan de khatma", text: "Des plans par sourate, une file de révision espacée et une progression lisible d'un coup d'œil, avec des encouragements plutôt qu'une pression de séries." },
      { title: "La zakat, expliquée", text: "Espèces, or, argent, marchandises et dettes, avec la méthode du nisab affichée pour voir comment le résultat est obtenu." },
    ],
    engineering: [
      { title: "Hors ligne par construction", text: "Chaque écran principal s'affiche depuis le SQLite de l'appareil. Le texte coranique, les invocations et les hadiths sont intégrés et chargés localement, et le réseau ne sert qu'à un téléchargement que vous avez demandé." },
      { title: "Le texte religieux est vérifié, pas improvisé", text: "Le contenu vient de sources documentées, dont l'empreinte est recalculée et contrôlée par un script de validation. Chaque source et sa licence sont listées dans l'application, et là où aucune source vérifiée n'existe, l'application le dit." },
      { title: "La droite à gauche, corrigée à la racine", text: "Sur Android, l'alignement du texte est logique dans un paragraphe RTL : forcer le bord droit plaçait l'arabe à gauche. Le texte natif n'utilise plus que start, end et center, et un test fait échouer la compilation si les côtés physiques reviennent." },
      { title: "Un moteur d'adhan qui survit à l'application fermée", text: "Un module natif local planifie les alarmes, joue l'adhan depuis un service au premier plan et affiche un écran d'arrêt en plein écran, sans dépendre de l'ouverture de l'application." },
      { title: "Privé par conception", text: "Pas de back-end, pas d'analyse d'usage, pas de suivi. La position sert sur l'appareil aux horaires de prière et à la Qibla et n'est jamais envoyée ; les sauvegardes sont exportées par vous." },
      { title: "Testé sur du vrai SQL", text: "Les tests unitaires et d'intégration tournent sur du vrai SQLite, et des parcours Playwright pilotent la version web en arabe, anglais et français, en clair et en sombre." },
    ],
    gallery: [
      { alt: "Horaires de prière de Sakina en arabe avec compte à rebours jusqu'à la prochaine prière", caption: "L'arabe d'abord" },
      { alt: "Lecteur du Coran de Sakina affichant la sourate Ya-Sin", caption: "Le lecteur du Coran" },
      { alt: "Tasbih de Sakina avec un Misbaha de 33 grains", caption: "Un tasbih Misbaha" },
      { alt: "Boussole Qibla de Sakina pointant vers la Kaaba", caption: "Boussole Qibla" },
      { alt: "Horaires de prière de Sakina en mode sombre", caption: "Mode sombre" },
      { alt: "Écran d'accueil de Sakina en français et en mode sombre", caption: "Complète en français" },
    ],
  },

  inspectra: {
    category: "Extension Chrome",
    role: "Designer et développeur",
    platform: "Panneau latéral de Chrome et ligne de commande",
    tagline: "Auditez n'importe quelle page en performance, SEO, accessibilité et sécurité, puis voyez exactement quoi corriger.",
    description:
      "Inspectra est une extension Chrome qui audite la performance, le SEO, l'accessibilité et la sécurité, montre les éléments exacts à corriger, et garde toutes les données dans votre navigateur.",
    summary:
      "Inspectra s'ouvre dans le panneau latéral de Chrome et audite la page que vous avez sous les yeux. Chaque problème explique ce qui a été trouvé, pourquoi c'est important et comment le corriger, avec un exemple de code et les éléments concernés. Cliquez sur l'un d'eux et il est mis en évidence dans la page.",
    context:
      "Elle peut explorer un site entier, suivre les scores dans le temps et exporter des rapports exploitables par une équipe. Tout s'exécute localement dans le navigateur et rien n'est envoyé.",
    keyPoints: ["Core Web Vitals avec attribution", "Explore des sites entiers", "S'exécute en local, rien n'est envoyé"],
    imageAlt: "Panneau latéral d'Inspectra affichant un score global de 98 et les Core Web Vitals",
    highlights: [
      { title: "Des Core Web Vitals mesurés correctement", text: "LCP avec sa décomposition en quatre phases et l'élément responsable, CLS avec ce qui a bougé, plus INP, FCP, TTFB et Total Blocking Time." },
      { title: "Ce que voient vraiment les moteurs de recherche", text: "Compare le HTML du serveur avec la page rendue, pour repérer les titres, canoniques et balises noindex qui n'existent qu'après l'exécution du JavaScript." },
      { title: "Accessibilité avec axe-core", text: "Contrôles WCAG 2.2 A et AA avec les éléments en échec. Les points qui demandent un humain sont listés à part et n'affectent jamais le score." },
      { title: "Une sécurité qui va en profondeur", text: "En-têtes de réponse, évaluateur de contournements de CSP, attributs des cookies de session, contenu mixte, identifiants exposés et bibliothèques JavaScript avec des CVE connues." },
      { title: "Explorations de site entier", text: "Liens cassés avec les pages qui y mènent, chaînes de redirections, titres en double, erreurs de sitemap, pages orphelines et contenu léger." },
      { title: "Des rapports qu'on a envie d'envoyer", text: "Un PDF composé avec scores, indicateurs et constats, du Markdown prêt à coller dans un ticket et du JSON pour l'outillage." },
    ],
    engineering: [
      { title: "Un objet par règle", text: "Une règle renvoie non applicable, réussi, ou un échec avec ses éléments. Ajoutez un objet et l'interface, les scores et chaque rapport le prennent en compte." },
      { title: "Injecté seulement à la demande", text: "Le collecteur ne s'exécute que lorsque vous lancez un audit : rien ne tourne sur les pages que vous ne faites que parcourir." },
      { title: "Le même moteur en CI", text: "Le moteur de règles est aussi livré sous forme d'outil en ligne de commande : un problème repéré dans le navigateur peut bloquer la pull request qui le ramène." },
      { title: "Des fixtures qui échouent exprès", text: "Les tests de bout en bout auditent une page volontairement propre et des pages volontairement cassées dans un vrai Chromium." },
    ],
    gallery: [
      { alt: "Onglet performance d'Inspectra avec les Core Web Vitals et une décomposition du LCP", caption: "Le LCP, décomposé en phases" },
      { alt: "Onglet SEO d'Inspectra avec aperçus de recherche et de partage social", caption: "Aperçus de recherche et de réseaux sociaux" },
      { alt: "Onglet sécurité d'Inspectra vérifiant les en-têtes de réponse", caption: "Analyse des en-têtes et de la CSP" },
    ],
  },

  "ministry-industry-commerce": {
    title: "Ministère de l'Industrie et du Commerce",
    titleLang: "fr",
    category: "Portail gouvernemental",
    role: webDev,
    platform: "Web",
    tagline: "Le portail officiel du ministère marocain de l'Industrie et du Commerce.",
    description:
      "Un portail gouvernemental trilingue pour le ministère marocain de l'Industrie et du Commerce, construit sur Drupal 10 avec un thème sur mesure et une prise en charge complète de l'arabe de droite à gauche.",
    summary:
      "Le portail officiel du ministère marocain de l'Industrie et du Commerce est un site trilingue qui présente les secteurs du ministère, ses programmes de soutien, ses services aux citoyens et aux entreprises, et ses annonces officielles.",
    context: "Il fonctionne sur Drupal 10 avec un thème sur mesure, et sert l'arabe de droite à gauche, le français et l'anglais à partir du même design.",
    imageAlt: "Page d'accueil du portail du ministère marocain de l'Industrie et du Commerce",
    urlLabel: "Visiter mcinet.gov.ma",
    technologies: ["Drupal 10", "Thème sur mesure", "Bootstrap", "Multilingue et RTL", "Docker"],
  },
  ouigo: {
    category: "Plateforme de réservation de trains",
    role: "Développeur front-end",
    platform: "Web",
    tagline: "La plateforme de réservation des trains à grande vitesse à bas prix de la SNCF.",
    description:
      "Travail front-end sur OUIGO, la plateforme de réservation des trains à grande vitesse à bas prix de la SNCF, centré sur l'accessibilité et le comportement responsive sur tous les appareils.",
    summary:
      "OUIGO est le service ferroviaire à grande vitesse à bas prix exploité par la SNCF, qui propose des voyages abordables et rapides entre les grandes villes de France et d'Espagne.",
    context:
      "J'ai contribué au développement front-end de sa plateforme de réservation à fort trafic, avec une attention particulière à l'accessibilité et au comportement responsive sur tous les appareils.",
    imageAlt: "Page d'accueil d'OUIGO avec le formulaire de recherche de trains",
    urlLabel: "Visiter ouigo.com",
  },
  "barnes-international": {
    category: "Immobilier de luxe",
    role: webDev,
    platform: "Web",
    tagline: "Une adresse mondiale pour les biens d'exception.",
    description:
      "Développement web pour BARNES International, agence immobilière de luxe en France et dans le monde, centré sur un design raffiné et le multilingue.",
    summary:
      "BARNES International est une agence immobilière de luxe qui propose des biens et des services haut de gamme en France et dans le monde.",
    context: "L'accent était mis sur un design haut de gamme, des transitions fluides et la prise en charge de plusieurs langues, en accord avec la marque.",
    imageAlt: "Page d'accueil de BARNES International avec un appartement de luxe et la recherche de biens",
    urlLabel: "Visiter barnes-international.com",
  },
  "junior-sncf": {
    category: "Service SNCF",
    role: webDev,
    platform: "Web",
    tagline: "Des trajets en train accompagnés pour les enfants, par la SNCF.",
    description:
      "Développement web pour Junior & Cie, le service SNCF qui propose des voyages en train encadrés, sûrs et agréables partout en France pour les enfants de 4 à 14 ans.",
    summary:
      "Junior & Cie est un service de la SNCF pour les enfants de 4 à 14 ans, qui propose des voyages en train encadrés, sûrs et agréables partout en France.",
    context:
      "L'expérience est conçue pour les parents qui réservent un voyage pour leur enfant : le parcours jusqu'à un trajet confirmé doit être simple et rassurant.",
    imageAlt: "Page d'accueil de Junior & Cie avec le formulaire de recherche de trajet accompagné",
    urlLabel: "Visiter Junior & Cie",
  },
  "barnes-lyon": {
    category: "Immobilier de luxe",
    role: webDev,
    platform: "Web",
    tagline: "BARNES, adapté au marché immobilier lyonnais.",
    description:
      "Un site régional du réseau BARNES, adapté au marché immobilier de Lyon avec du contenu local et la recherche de biens.",
    summary:
      "BARNES Lyon est une agence régionale du réseau BARNES, avec un site centré sur les besoins spécifiques du marché immobilier lyonnais.",
    context: "Il associe la marque BARNES à du contenu local et à une recherche de biens construite autour de la région.",
    imageAlt: "Page d'accueil de BARNES Lyon avec une vue de la ville et la recherche de biens",
    urlLabel: "Visiter barnes-lyon.com",
  },
  taalim: {
    category: "Plateforme d'apprentissage",
    role: webDev,
    platform: "Web",
    tagline: "Des ressources d'apprentissage accessibles pour les élèves.",
    description:
      "Une plateforme éducative avec gestion des cours, suivi de la progression des élèves et quiz interactifs, créée avec Next.js et Firebase.",
    summary:
      "Taalim est une plateforme éducative dédiée à des ressources d'apprentissage accessibles. Elle comprend la gestion des cours, le suivi de la progression des élèves et des quiz interactifs.",
    context: "Les cours sont organisés par niveau scolaire, et l'interface est disponible en plusieurs langues, dont l'arabe.",
    imageAlt: "Page d'accueil de Taalim avec un appel à commencer à apprendre et la liste des niveaux scolaires",
  },
  orthozinith: {
    category: "Catalogue de produits",
    role: webDev,
    platform: "Web",
    tagline: "Un catalogue de produits orthodontiques pour les professionnels.",
    description:
      "Un site et un catalogue de produits pour Ortho Zenith, présentant des solutions orthodontiques comme les brackets, tubes, bagues et fils aux professionnels dentaires.",
    summary:
      "Ortho Zenith présente des solutions orthodontiques pour les professionnels et leurs patients, avec un catalogue organisé par catégorie, des brackets et tubes aux bagues, fils et auxiliaires.",
    context: "Le site offre aux praticiens un moyen clair de parcourir le catalogue et de prendre contact.",
    imageAlt: "Page d'accueil d'Ortho Zenith avec le menu des produits orthodontiques",
  },
};

export default projects;
