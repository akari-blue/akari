// English
export const en = {
  translations: {
    auth: {
      login: {
        default: 'login',
        pending: 'logging in...',
      },
      logout: 'logout',
      password: 'password',
      authFactorToken: 'two-factor token',
    },
    app: {
      loading: 'loading...',
      loadMore: 'load more',
      blueskyHandle: 'bluesky handle e.g. @alice.bsky.social',
      following: 'following',
      followers: 'followers',
      posts: 'posts',
      replies: 'replies',
      reposts: 'reposts',
      likes: 'likes',
      settings: 'settings',
      notFound: 'not found',
      save: 'save',
      cancel: 'cancel',
      optional: 'optional',
      debug: 'debug',
    },
    settings: {
      developerMode: {
        name: 'developer mode',
        description: 'enable additional debugging tools.',
      },
      streamerMode: {
        name: 'streamer mode',
        description: 'hide sensitive information and blur all media content.',
      },
      zenMode: {
        name: 'zen mode',
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
      tabs: {
        all: 'all',
        posts: 'posts',
        media: 'media',
        feeds: 'feeds',
        reposts: 'reposts',
        likes: 'likes',
        lists: 'lists',
        starterpacks: 'starterpacks',
      },
      blockedBy: 'blocked by: {{name}}',
    },
    post: {
      notFound: 'post not found',
      createPost: 'create post',
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
    debug: {
      notImplemented: 'NOT IMPLEMENTED: {{value}}',
    },
    notifications: {
      notifications: 'notifications',
      noNotifications: 'no notifications',
      followedYou: 'followed you',
      likedYourPost: 'liked your post',
      repostedYourPost: 'reposted your post',
      repliedToYourPost: 'replied to your post',
      mentionedYou: 'mentioned you',
      quotedYourPost: 'quoted your post',
      joinedYourStarterpack: 'joined your starterpack',
      tabs: {
        all: 'all',
        mentions: 'mentions',
        grouped: 'grouped',
      },
    },
    messages: {
      messages: 'messages',
      noMessages: 'no messages',
      chat: 'chat',
    },
    dialog: {
      close: 'close',
    },
    editor: {
      toolbar: {
        link: {
          edit: 'edit link',
          openInNewTab: 'open in new tab',
          displayText: 'display text',
        },
        image: {
          title: 'upload an image',
          description: 'upload an image from your computer',
          failedToLoad: 'failed to load image',
          submit: 'submit',
        },
      },
    },
    search: {
      search: 'search',
      searching: 'searching...',
      noResults: 'no results',
    },
  },
} as const;
