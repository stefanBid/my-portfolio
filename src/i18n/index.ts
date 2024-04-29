import { createI18n } from 'vue-i18n';

import en from './locales/en.json';
import it from './locales/it.json';

const messages = {
	en,
	it
};

const i18n = createI18n({
	legacy: false,
	locale: 'en',
	fallbackLocale: 'en',
	messages,
});

export default i18n;