export const en = {
  auth: {
    login: {
      default: 'login',
      pending: 'logging in...',
    },
    logout: 'logout',
    password: 'password',
  },
  app: {
    appName: '[placeholder name]',
    loading: 'loading...',
    blueskyHandle: 'bluesky handle e.g. @alice.bsky.social',
    following: 'following',
    followers: 'followers',
    posts: 'posts',
    replies: 'replies',
    reposts: 'reposts',
    likes: 'likes',
    settings: 'settings',
  },
  settings: {
    developerMode: {
      name: 'developer Mode',
      description: 'enable additional debugging tools.',
    },
    streamerMode: {
      name: 'streamer Mode',
      description: 'hide sensitive information and blur all media content.',
    },
    zenMode: {
      name: 'zen Mode',
      description: 'hide all numbers.',
    },
    columns: {
      name: 'columns',
      description: 'how many columns to display in the home view.',
    },
    responsiveUI: {
      name: 'responsive UI',
      description: 'Should the UI be fully responsive or fixed width.',
    },
    language: {
      name: 'language',
      description: 'change the language of the app.',
    },
    font: {
      family: {
        name: 'font family',
        description: 'change the font family of the app.',
      },
      size: {
        name: 'font size',
        description: 'change the font size of the app.',
      },
    },
    cleanHandles: {
      name: 'clean handles',
      description: 'remove the .bsky.social from handles.',
    },
  },
  image: {
    noImage: 'no image',
  },
  profile: {
    profile: 'profile',
    notFound: 'profile not found',
  },
  post: {
    notFound: 'post not found',
    blockedAuthor: 'this post is hidden because you have blocked the author.',
    blockedByAuthor: 'this post is hidden because the author has blocked you.',
  },
  error: {
    somethingWentWrong: 'something went wrong',
    reloadComponent: 'reload component',
  },
  handleSearch: {
    noResultsFound: 'no results found',
  },
} as const;
