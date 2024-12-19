export const en = {
  auth: {
    login: {
      default: 'aanmelden',
      pending: 'aanmelden...',
    },
    logout: 'afmelden',
    password: 'wachtwoord',
  },
  app: {
    appName: '[placeholder name]',
    loading: 'laden...',
    blueskyHandle: 'bluesky handle b.v. @alice.bsky.social',
    following: 'volgen',
    followers: 'volgers',
    posts: 'posts',
    replies: 'antwoorden',
    reposts: 'reposts',
    likes: 'likes',
    settings: 'instellingen',
  },
  settings: {
    developerMode: {
      name: 'developer Mode',
      description: 'zet extra debug tools aan.',
    },
    streamerMode: {
      name: 'streamer Mode',
      description: 'verbergt gevoelige informatie en blurt alle media inhoud.',
    },
    zenMode: {
      name: 'zen Mode',
      description: 'verbergt alle nummbers.',
    },
    columns: {
      name: 'kolommen',
      description: 'hoeveel kolommen weergeven op het home view.',
    },
    responsiveUI: {
      name: 'responsieve UI',
      description: 'Moet de gebruikersinterface volledig responsief zijn, of een vaste breedte hebben.',
    },
    language: {
      name: 'taal',
      description: 'verander de taal van de app.',
    },
    font: {
      family: {
        name: 'lettertype',
        description: 'verander het lettertype van de app.',
      },
      size: {
        name: 'lettergrootte',
        description: 'verander de lettergrootte van de app.',
      },
    },
    cleanHandles: {
      name: 'korte handles',
      description: 'verwijdert .bsky.social van alle handles.',
    },
  },
  image: {
    noImage: 'geen media',
  },
  profile: {
    profile: 'profiel',
    notFound: 'profiel niet gevonden',
  },
  post: {
    notFound: 'post niet gevonden',
    blockedAuthor: 'deze post is verborgen omdat je de auteur hebt geblokkeerd.',
    blockedByAuthor: 'deze post is verborgen omdat de auteur jou heeft geblokkeerd.',
  },
  error: {
    somethingWentWrong: 'er is iets fout gegaan',
    reloadComponent: 'component opnieuw laden',
  },
} as const;
