import i18n, { InitOptions } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import translationEn from './en/translation';
import translationRu from './ru/translation';
import { IsDevelopment } from '../../constants';

const initOptions: InitOptions = {
  lng: localStorage.getItem('i18nextLng') ?? 'ru',
  detection: {
    order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
  },
  debug: IsDevelopment,
  initImmediate: false,
  fallbackLng: 'ru',
  resources: {
    ru: {
      translation: translationRu,
    },
    en: {
      translation: translationEn,
    },
  },
  interpolation: {
    escapeValue: false,
  },
};

i18n.use(LanguageDetector).use(initReactI18next).init(initOptions);

export default i18n;
