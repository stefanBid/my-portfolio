// i18n/index.ts (I18n Configuration File)

import { createI18n } from 'vue-i18n';

import en from '@/i18n/locales/en.json';
import it from '@/i18n/locales/it.json';
const messages = {
  en,
  it,
};

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages,
});

/*
export const i18n = createI18n({
  legacy: false,
  locale: 'it',
  fallbackLocale: 'en',
  messages: {
    it: { ui: { retry: 'Riprova', offline: 'Contenuti offline' } },
    en: { ui: { retry: 'Retry',  offline: 'Offline content' } },
  },
});
*/

export default i18n;
