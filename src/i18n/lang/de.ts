// German
export const de = {
  auth: {
    login: {
      default: 'Login',
      pending: 'Login...',
    },
    logout: 'Logout',
    password: 'Passwort',
    authFactorToken: 'Zwei-Faktor Token',
  },
  app: {
    appName: '[placeholder name]',
    loading: 'Lädt...',
    loadMore: 'Mehr laden',
    blueskyHandle: 'Bluesky handle z.B. @alice.bsky.social',
    following: 'Folgt',
    followers: 'Follower',
    posts: 'Posts',
    replies: 'Antworten',
    reposts: 'Reposts',
    likes: 'Likes',
    settings: 'Einstellungen',
    notFound: 'Nicht gefunden',
    save: 'Speichern',
    optional: 'Optional'
  },
  settings: {
    developerMode: {
      name: 'Entwicklermodus',
      description: 'Zusätzliche Debugging-Tools aktivieren.'
    },
    streamerMode: {
      name: 'Streamermodus',
      description: 'Sensible Informationen verbergen und Medieninhalte unkenntlich machen.'
    },
    zenMode: {
      name: 'Zen-Modus',
      description: 'Alle Kennzahlen verbergen.'
    },
    columns: {
      name: 'Spalten',
      description: 'Anzahl der Spalten für die Anzeige der Posts.'
    },
    responsiveUI: {
      name: 'Responsive UI',
      description: 'Soll die UI vollständig responsiv sein oder eine feste Breite haben.'
    },
    language: {
      name: 'Sprache',
      description: 'Sprache der App ändern.'
    },
    font: {
      family: {
        name: 'Schriftart',
        description: 'Schriftart der App ändern.'
      },
      size: {
        name: 'Schriftgröße',
        description: 'Schriftgröße der App ändern.'
      }
    },
    cleanHandles: {
      name: 'Handles bereinigen',
      description: 'Entfernt .bsky.social der Handles.'
    },
  },
  image: {
    noImage: 'Kein Bild'
  },
  profile: {
    profile: 'Profil',
    notFound: 'Profil nicht gefunden',
    tabs: {
      all: 'Alle',
      posts: 'Posts',
      media: 'Medien',
      feeds: 'Feeds',
      reposts: 'Reposts',
      likes: 'Likes',
      lists: 'Listen',
      starterpacks: 'Starterpacks'
    },
  },
  post: {
    notFound: 'Post nicht gefunden',
    createPost: 'Post erstellen',
    blockedAuthor: 'Dieser Post ist versteckt, weil du den Autor blockiert hast.',
    blockedByAuthor: 'Dieser Post ist versteckt, der Autor dich blockiert hat.'
  },
  error: {
    somethingWentWrong: 'Etwas ist schief gelaufen.',
    reloadComponent: 'Komponente neu laden'
  },
  handleSearch: {
    noResultsFound: 'Keine Ergebnisse gefunden'
  },
  debug: {
    notImplemented: 'NICHT IMPLEMENTIERT: {{value}}'
  },
  notifications: {
    notifications: 'Benachrichtigungen',
    noNotifications: 'Keine Benachrichtigungen',
    followedYou: 'folgt dir',
    likedYourPost: 'hat deinen Post geliked',
    repostedYourPost: 'hat deinen Post repostet',
    repliedToYourPost: 'hat auf deinen Post geantwortet',
    mentionedYou: 'hat dich erwähnt',
    quotedYourPost: 'hat deinen Post zitiert',
    joinedYourStarterpack: 'ist deinem Starterpack beigetreten',
    tabs: {
      all: 'Alle',
      mentions: 'Erwähnungen',
      grouped: 'Gruppiert'
    },
  },
  messages: {
    messages: 'Nachrichten',
    noMessages: 'Keine Nachrichten'
  },
  dialog: {
    close: 'Schließen'
  },
  editor: {
    toolbar: {
      link: {
        edit: 'Link bearbeiten',
        openInNewTab: 'In neuem Tab öffnen',
        displayText: 'Anzeigetext'
      },
    },
    image: {
      title: 'Ein Bild hochladen',
      description: 'Lade ein Bild von deinem Computer hoch',
      failedToLoad: 'Fehler beim Laden des Bildes',
      submit: 'Hochladen'
    },
  },
} as const;