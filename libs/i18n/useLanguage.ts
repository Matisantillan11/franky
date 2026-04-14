import { useTranslation } from 'react-i18next';
import { setStoredLanguage } from './storage';

export type Language = 'en' | 'es';

export const SUPPORTED_LANGUAGES: Array<{ code: Language; nativeLabel: string }> = [
  { code: 'en', nativeLabel: 'English' },
  { code: 'es', nativeLabel: 'Español' },
];

export function useLanguage() {
  const { i18n } = useTranslation();

  const currentLanguage = i18n.language as Language;

  const changeLanguage = async (lang: Language) => {
    await i18n.changeLanguage(lang);
    setStoredLanguage(lang);
  };

  return { currentLanguage, changeLanguage };
}
