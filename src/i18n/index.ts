import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Pseudo from 'i18next-pseudo';
import { initReactI18next } from 'react-i18next';
import { en } from './lang/en';
import { es } from './lang/es';
import { fr } from './lang/fr';
import { fil } from './lang/fil';
import { ja } from './lang/ja';
import { nl } from './lang/nl';
import { ur } from './lang/ur';
import { yue } from './lang/yue';
import { zh_Hans } from './lang/zh-Hans';
import { zh_Hant } from './lang/zh-Hant';
import { de } from './lang/de';

export const defaultNS = 'app';

export const languages = {
  en,
  es,
  de,
  fr,
  fil,
  ja,
  nl,
  ur,
  yue,
  'zh-Hans': zh_Hans,
  'zh-Hant': zh_Hant,
};

const isProduction = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';

i18n
  .use(
    new Pseudo({
      enabled: !isProduction && !isTest,
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
