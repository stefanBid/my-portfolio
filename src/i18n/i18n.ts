// i18n/index.ts (I18n Configuration File)

import { createI18n } from 'vue-i18n';
import enMessages from './locales/en.json';
import itMessages from './locales/it.json';

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'it',
  warnHtmlMessage: false,
  messages: {
    it: itMessages,
    en: enMessages,
  },
});

export default i18n;
