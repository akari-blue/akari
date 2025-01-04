// Spanish
export const es = {
  auth: {
    login: {
      default: 'iniciar sesión',
      pending: 'iniciando sesión...',
    },
    logout: 'cerrar sesión',
    password: 'contraseña',
    authFactorToken: 'token de autenticación',
  },
  app: {
    appName: '[placeholder name]',
    loading: 'cargando...',
    loadMore: 'cargar más',
    blueskyHandle: 'nombre de usuario, ej.: @alice.bsky.social',
    following: 'siguiendo',
    followers: 'seguidores',
    posts: 'publicaciones',
    replies: 'respuestas',
    reposts: 'republicaciones',
    likes: 'me gusta',
    settings: 'ajustes',
    notFound: 'no encontrado',
    save: 'guardar',
    cancel: 'cancelar',
    optional: 'opcional',
  },
  settings: {
    developerMode: {
      name: 'modo de desarrollador',
      description: 'activar herramientas de depuración adicionales.',
    },
    streamerMode: {
      name: 'modo de streamer', // anglicismo
      description: 'ocultar información sensible y difuminar todo el contenido multimedia.',
    },
    zenMode: {
      name: 'modo zen',
      description: 'ocultar todos los números.',
    },
    columns: {
      name: 'columnas',
      description: 'cantidad de columnas en la vista principal.',
    },
    responsiveUI: {
      name: 'interfaz responsiva',
      description: 'Interfaz completamente adaptable o de ancho fijo.',
    },
    language: {
      name: 'idioma',
      description: 'cambiar el idioma de la aplicación.',
    },
    font: {
      family: {
        name: 'fuente',
        description: 'cambiar el tipo de letra de la aplicación.',
      },
      size: {
        name: 'tamaño de letra',
        description: 'cambiar el tamaño de letra de la aplicación.',
      },
    },
    cleanHandles: {
      name: 'limpiar nombres de usuario',
      description: 'ocultar .bsky.social en los nombres de usuario.',
    },
  },
  image: {
    noImage: 'sin imagen',
  },
  profile: {
    profile: 'perfil',
    notFound: 'perfil no encontrado',
    tabs: {
      all: 'general',
      posts: 'publicaciones',
      media: 'multimedia',
      feeds: 'fuentes',
      reposts: 'republicaciones',
      likes: 'me gusta',
      lists: 'listas',
      starterpacks: 'kits de inicio',
    },
  },
  post: {
    notFound: 'publicación no encontrada',
    createPost: 'crear publicación',
    blockedAuthor: 'esta publicación está oculta porque has bloqueado a esta cuenta.',
    blockedByAuthor: 'esta publicación está oculta porque esta cuenta te ha bloqueado',
  },
  error: {
    somethingWentWrong: 'algo salió mal',
    reloadComponent: 'recargar componente',
  },
  handleSearch: {
    noResultsFound: 'no se hallaron resultados',
  },
  debug: {
    notImplemented: 'NO IMPLEMENTADO: {{value}}',
  },
  notifications: {
    notifications: 'notificaciones',
    noNotifications: 'no hay notificaciones',
    followedYou: 'te ha seguido',
    likedYourPost: 'le gustó tu publicación', // leading 'A ' is desirable
    repostedYourPost: 'republicó tu publicación',
    repliedToYourPost: 'respondió a tu publicación',
    mentionedYou: 'te ha mencionado',
    quotedYourPost: 'citó tu publicación',
    joinedYourStarterpack: 'se unió a tu kit de inicio',
    tabs: {
      all: 'todo',
      mentions: 'menciones',
      grouped: 'agrupado',
    },
  },
  messages: {
    messages: 'mensajes',
    noMessages: 'no hay mensajes',
  },
  dialog: {
    close: 'cerrar',
  },
  editor: {
    toolbar: {
      link: {
        edit: 'editar enlace',
        openInNewTab: 'abrir en pestaña nueva',
        displayText: 'mostrar texto',
      },
      image: {
        title: 'subir imagen',
        description: 'subir imagen desde tu dispositivo',
        failedToLoad: 'error al cargar imagen',
        submit: 'enviar',
      },
    },
  },
} as const;
