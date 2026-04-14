import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en';
import es from './locales/es';
import { getStoredLanguage } from './storage';

const storedLanguage = getStoredLanguage();
const deviceLanguage = Localization.getLocales()[0]?.languageCode ?? 'en';
const initialLanguage = storedLanguage ?? (deviceLanguage === 'es' ? 'es' : 'en');

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
  },
  lng: initialLanguage,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

// Type augmentation for fully-typed t() keys
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: typeof en;
    };
  }
}
