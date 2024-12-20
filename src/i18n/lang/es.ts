export const en = {
  auth: {
    login: {
      default: 'ingresar',
      pending: 'ingresando...',
    },
    logout: 'salir',
    password: 'contraseña',
  },
  app: {
    appName: '[placeholder name]',
    loading: 'cargando...',
    blueskyHandle: 'nombre de usuario de bluesky e.g. @alice.bsky.social',
    following: 'siguiendo',
    followers: 'seguidores',
    posts: 'publicaciones',
    replies: 'respuestas',
    reposts: 'republicaciones',
    likes: 'me gusta',
    settings: 'ajustes',
  },
  settings: {
    developerMode: {
      name: 'modo desarrollo',
      description: 'habilitar herramientas adicionales de debug.',
    },
    streamerMode: {
      name: 'modo streamer',
      description: 'ocultar información sensible y difuminar todo el contenido multimedia.',
    },
    zenMode: {
      name: 'modo zen',
      description: 'ocultar todos los números.',
    },
    columns: {
      name: 'columnas',
      description: 'cuántas columnas mostrar en la vista principal.',
    },
    responsiveUI: {
      name: 'interfaz de usuario adaptativa',
      description: 'Debe ser la interfaz de usuario adaptativa o de ancho fijo?',
    },
    language: {
      name: 'idioma',
      description: 'cambiar el idioma de la aplicación.',
    },
    font: {
      family: {
        name: 'familia de fuente',
        description: 'cambiar la familia de fuente de la aplicación.',
      },
      size: {
        name: 'tamaño de fuente',
        description: 'cambia el tamaño de fuente en la aplicación.',
      },
    },
    cleanHandles: {
      name: 'limpiar nombres de usuario',
      description: 'quitar el prefijo .bsky.social de los nombres de usuario.',
    },
  },
  image: {
    noImage: 'sin imagen',
  },
  profile: {
    profile: 'perfil',
    notFound: 'perfil no encontrado',
  },
  post: {
    notFound: 'publicación no encontrada',
    blockedAuthor: 'esta publicación está oculta porque has bloqueado al autor.',
    blockedByAuthor: 'esta publicación está oculta porque el autor te ha bloqueado.',
  },
  error: {
    somethingWentWrong: 'algo funciono mal',
    reloadComponent: 'recargar componente',
  },
  handleSearch: {
    noResultsFound: 'no se encontraron resultados',
  },
  debug: {
    notImplemented: 'No Implementado: {{value}}',
  },
  notifications: {
    notifications: 'notificaciones',
    noNotifications: 'no hay notificaciones',
    followedYou: 'te siguió',
    likedYourPost: 'le gustó tu publicación',
    repostedYourPost: 'republicó tu publicación',
    repliedToYourPost: 'respondió a tu publicación',
    mentionedYou: 'te mencionó',
    quotedYourPost: 'citó tu publicación',
    joinedYourStarterpack: 'se unió a tu pack de inicio',
  },
} as const;
