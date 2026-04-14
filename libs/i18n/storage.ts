import { createMMKV } from 'react-native-mmkv';

const i18nStorage = createMMKV({ id: 'i18n' });

export const LANGUAGE_KEY = 'app_language';

export function getStoredLanguage(): string | undefined {
  return i18nStorage.getString(LANGUAGE_KEY);
}

export function setStoredLanguage(lang: string): void {
  i18nStorage.set(LANGUAGE_KEY, lang);
}
