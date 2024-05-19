import { ref, watch, } from 'vue';
import { useI18n } from 'vue-i18n';
import type { ComposerTranslation } from 'vue-i18n';

interface HeaderContent {
	navbarRoutes: {
		text: string;
		path: string;
	}[]
}

interface HomePageContent {
	firstHeading: string;
	secondHeading: string;
	thirdHeading: string[];
	firstButton: {text: string, link: string};
	secondButton: {text:string, link: string};
}

interface AboutMePageContent {
	pageHeading: string;
	bioSections: {
		titleHeading: string;
		subTitleHeading: string;
		contentParagraph: string;
		imagePath: string;
		imageDescription: string;
	}[];
}

const updateHeaderI18nContent = (t: ComposerTranslation): HeaderContent => ({
	navbarRoutes: [
		{ text: t('headerContent.navbarRoutes.0.text'), path: t('headerContent.navbarRoutes.0.path') },
		{ text: t('headerContent.navbarRoutes.1.text'), path: t('headerContent.navbarRoutes.1.path') },
		{ text: t('headerContent.navbarRoutes.2.text'), path: t('headerContent.navbarRoutes.2.path') },
		{ text: t('headerContent.navbarRoutes.3.text'), path: t('headerContent.navbarRoutes.3.path') }
	]
});

const updateHomePageI18nContent = (t: ComposerTranslation): HomePageContent => ({
	firstHeading: t('homePageContent.firstHeading'),
	secondHeading: t('homePageContent.secondHeading'),
	thirdHeading: [t('homePageContent.thirdHeading.0'), t('homePageContent.thirdHeading.1'), t('homePageContent.thirdHeading.2')],
	firstButton: { text: t('homePageContent.firstButton.text'), link: t('homePageContent.firstButton.link') },
	secondButton: { text: t('homePageContent.secondButton.text'), link: t('homePageContent.secondButton.link') }
});

const updateAboutMePageI18nContent = (t: ComposerTranslation): AboutMePageContent => ({
	pageHeading: t('aboutMePageContent.pageHeading'),
	bioSections: [
		{
			titleHeading: t('aboutMePageContent.bioSections.0.titleHeading'),
			subTitleHeading: t('aboutMePageContent.bioSections.0.subTitleHeading'),
			contentParagraph: t('aboutMePageContent.bioSections.0.contentParagraph'),
			imagePath: t('aboutMePageContent.bioSections.0.imagePath'),
			imageDescription: t('aboutMePageContent.bioSections.0.imageDescription')
		},
		{
			titleHeading: t('aboutMePageContent.bioSections.1.titleHeading'),
			subTitleHeading: t('aboutMePageContent.bioSections.1.subTitleHeading'),
			contentParagraph: t('aboutMePageContent.bioSections.1.contentParagraph'),
			imagePath: t('aboutMePageContent.bioSections.1.imagePath'),
			imageDescription: t('aboutMePageContent.bioSections.1.imageDescription')
		},
	]
});

let instance: ReturnType<typeof createTypedI18n> | undefined;

function createTypedI18n() {

	const { t, locale } = useI18n();

	const headerI18nContent = ref<HeaderContent>(updateHeaderI18nContent(t));
	const homePageI18nContent = ref<HomePageContent>(updateHomePageI18nContent(t));
	const aboutMePageI18nContent = ref<AboutMePageContent>(updateAboutMePageI18nContent(t));

	const changeLanguage = (lang: 'it' | 'en') => {
		locale.value = lang;
	};

	watch(() => locale.value, () => {
		headerI18nContent.value = updateHeaderI18nContent(t);
		homePageI18nContent.value = updateHomePageI18nContent(t);
		aboutMePageI18nContent.value = updateAboutMePageI18nContent(t);
	});

	return { currentLanguage: locale, changeLanguage, headerI18nContent, homePageI18nContent, aboutMePageI18nContent };

}

export function useTypedI18nSingleton() {
	if (!instance) { instance = createTypedI18n(); }
	return instance;
}