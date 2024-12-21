// French
export const fr = {
  auth: {
    login: {
      default: 'connexion',
      pending: 'connexion...',
    },
    logout: 'déconnexion',
    password: 'mot de passe',
  },
  app: {
    appName: '[pantonymie]',
    loading: 'chargement...',
    blueskyHandle: 'pseudo bluesky e.g. @alice.bsky.social',
    following: 'abonnements',
    followers: 'abonné·e·s',
    posts: 'posts',
    replies: 'réponses',
    reposts: 'republications',
    likes: 'aimés',
    settings: 'paramètres',
  },
  settings: {
    developerMode: {
      name: 'mode développeur',
      description: 'activer des outils de débogage supplémentaires.',
    },
    streamerMode: {
      name: 'mode streamer',
      description: 'masquer les informations sensibles et flouter tout le contenu média.',
    },
    zenMode: {
      name: 'mode zen',
      description: 'masquer tous les chiffres.',
    },
    columns: {
      name: 'colonnes',
      description: 'combien de colonnes afficher dans la vue principale.',
    },
    responsiveUI: {
      name: 'interface utilisateur responsive',
      description: "L'interface utilisateur doit-elle être entièrement responsive ou à largeur fixe.",
    },
    language: {
      name: 'langue',
      description: "changer la langue de l'application.",
    },
    font: {
      family: {
        name: "police d'écriture",
        description: "changer la police d'écriture de l'application.",
      },
      size: {
        name: 'taille de police',
        description: "changer la taille de police d'écriture de l'application.",
      },
    },
    cleanHandles: {
      name: 'simplifier les pseudos',
      description: 'retire le .bsky.social des pseudos.',
    },
  },
  image: {
    noImage: 'aucune image',
  },
  profile: {
    profile: 'profil',
    notFound: 'profil non trouvé',
  },
  post: {
    notFound: 'post non trouvé',
    blockedAuthor: "ce post est masqué car vous avez bloqué l'auteur.",
    blockedByAuthor: "ce post est masqué car l'auteur vous a bloqué.",
  },
  error: {
    somethingWentWrong: "quelque chose s'est mal passé",
    reloadComponent: 'rechargement du composant',
  },
  handleSearch: {
    noResultsFound: 'aucun résultat trouvé',
  },
  debug: {
    notImplemented: 'NON IMPLÉMENTÉ: {{value}}',
  },
} as const;
