// i18n/index.ts (I18n Configuration File)

import { createI18n } from 'vue-i18n';

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'it',
  messages: {
    it: { ui: { retry: 'Riprova', offline: 'Contenuti offline' } },
    en: { ui: { retry: 'Retry', offline: 'Offline content' } },
  },
});

export default i18n;
