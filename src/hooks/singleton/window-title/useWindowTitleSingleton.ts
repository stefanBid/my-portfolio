import { useTitle } from '@vueuse/core';
import { watch } from 'vue';
import { useRoute } from 'vue-router';

import { useTypedI18nSingleton } from '../typed-i18n/useTypedI18nSingleton';

const ROUTER_TITLE_MAP = {
	homePage: {
		en: 'Home',
		it: 'Home'
	},
	aboutPage: {
		en: 'About Me',
		it: 'Chi sono'
	},
	skillsPage: {
		en: 'Skills',
		it: 'Competenze'
	},
	projectsPage: {
		en: 'Projects',
		it: 'Progetti'
	},
	notFoundPage: {
		en: '404 Not Found',
		it: '404 Pagina non trovata'
	}
};

let instance: ReturnType<typeof createWindowTitle> | undefined;

function createWindowTitle() {
	const route = useRoute();
	const { currentLanguage } = useTypedI18nSingleton();
	const title = useTitle();

	const getTitleFromRoute = () => {
		const routeName = route.name as keyof typeof ROUTER_TITLE_MAP;
		const language = currentLanguage.value as 'en' | 'it';
		return ROUTER_TITLE_MAP[routeName]?.[language] || '';
	};

	watch(() => [route.name, currentLanguage.value], () => {
		title.value = `Stefano Biddau | ${getTitleFromRoute()}`;
	}, { immediate: true });

}

export function useWindowTitleSingleton() {
	if (!instance) {
		instance = createWindowTitle();
	}
	return instance;
}