import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Pseudo from 'i18next-pseudo';
import { initReactI18next } from 'react-i18next';
import { en } from './lang/en';
import { ja } from './lang/ja';
import { nl } from './lang/nl';
import { ur } from './lang/ur';
import { yue } from './lang/yue';
import { zh_hans } from './lang/zh-hans';
import { zh_hant } from './lang/zh-hant';

export const defaultNS = 'app';

export const languages = {
  en,
  ja,
  nl,
  ur,
  yue,
  zh_hans,
  zh_hant,
};

i18n
  .use(
    new Pseudo({
      enabled: process.env.NODE_ENV !== 'production',
      wrapped: true,
    }),
  )
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: languages,
    fallbackLng: 'en',
    supportedLngs: Object.keys(languages),
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    postProcess: ['pseudo'],
  });

export default i18n;
