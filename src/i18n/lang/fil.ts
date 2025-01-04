// Filipino
export const fil = {
  name: 'Filipino',
  translations: {
    auth: {
      login: {
        default: 'mag-login',
        pending: 'naglo-login...',
      },
      logout: 'mag-logout',
      password: 'password',
    },
    app: {
      loading: 'naglo-load...',
      blueskyHandle: 'bluesky handle hal. @alice.bsky.social',
      following: 'sinusundan',
      followers: 'sumsunod',
      posts: 'mga post',
      replies: 'mga sagot',
      reposts: 'mga repost',
      likes: 'mga gusto',
      settings: 'mga setting',
    },
    settings: {
      developerMode: {
        name: 'developer mode',
        description: 'ipakita ang karagdagang debugging tools.',
      },
      streamerMode: {
        name: 'streamer mode',
        description: 'itago ang sensitibong impormasyon at i-blur and medya.',
      },
      zenMode: {
        name: 'zen mode',
        description: 'itago ang mga numero.',
      },
      columns: {
        name: 'columns',
        description: 'ilang hanay ang makikita sa home view.',
      },
      responsiveUI: {
        name: 'responsive UI',
        description: 'umaangkop ba o hindi gumagalaw ang UI.',
      },
      language: {
        name: 'wika',
        description: 'baguhin ang lingwahe ng app.',
      },
      font: {
        family: {
          name: 'font family',
          description: 'baguhin ang itsura ng letra sa app.',
        },
        size: {
          name: 'font size',
          description: 'baguhin ang laki ng letra sa app.',
        },
      },
      cleanHandles: {
        name: 'clean handles',
        description: 'tanggalin ang .bsky.social mula sa mga handles.',
      },
    },
    image: {
      noImage: 'walang imahe',
    },
    profile: {
      profile: 'profile',
      notFound: 'hindi nahanap ang profile',
    },
    post: {
      notFound: 'hindi nahanap ang post',
      blockedAuthor: 'ang post na ito ay nakatago dahil naka-block ang sumulat.',
      blockedByAuthor: 'ang post na ito ay nakatago dahil ikaw ay binlock ng sumulat.',
    },
    error: {
      somethingWentWrong: 'may nangyaring hindi inaasahan',
      reloadComponent: 'i-reload ang component',
    },
    handleSearch: {
      noResultsFound: 'walang nahanap na resulta',
    },
    debug: {
      notImplemented: 'HINDI PA NAIPAPAGANA: {{value}}',
    },
    notifications: {
      notifications: 'mga abiso',
      noNotifications: 'walang abiso',
      followedYou: 'sinundan ka',
      likedYourPost: 'nag-like sa post mo',
      repostedYourPost: 'ni-repost ang post mo',
      repliedToYourPost: 'tumugon sa post mo',
      mentionedYou: 'binanggit ka',
      quotedYourPost: 'qinuote and post mo',
      joinedYourStarterpack: 'sumali sa iyong starterpack',
    },
  },
} as const;
