import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Pseudo from 'i18next-pseudo';

export const defaultNS = 'app';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
export const resources = {
  en: {
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
  },
  fr: {
    app: {},
  },
};

i18n
  .use(
    new Pseudo({
      enabled: process.env.NODE_ENV !== 'production',
    }),
  )
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    postProcess: ['pseudo'],
  });

i18n.use(initReactI18next).init({
  lng: 'en',
  ns: ['app'],
  defaultNS,
  resources,
});

export default i18n;
