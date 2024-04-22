import { HomePageContent, AboutMePageContent } from '@/types';

import { ref, watch, } from 'vue';
import { useI18n } from 'vue-i18n';
import type { ComposerTranslation } from 'vue-i18n';

const updateHomePageI18nContent = (t: ComposerTranslation) => ({
	welcomeText: t('homePageContent.welcomeText'),
	presentationText: t('homePageContent.presentationText'),
	presentationText2: t('homePageContent.presentationText2'),
	generalSkills: [t('homePageContent.generalSkills.0'), t('homePageContent.generalSkills.1'), t('homePageContent.generalSkills.2')],
	callToAction1: {
		text: t('homePageContent.callToAction1.text'),
		link: t('homePageContent.callToAction1.link')
	},
	callToAction2: {
		text: t('homePageContent.callToAction2.text'),
		link: t('homePageContent.callToAction2.link')
	}
});

const updateAboutMeI18nContent = (t: ComposerTranslation) => ({
	pageHeading: t('aboutMePageContent.pageHeading'),
	bio: [
		{
			sectionTitle: t('aboutMePageContent.bio.0.sectionTitle'),
			sectionSubtitle: t('aboutMePageContent.bio.0.sectionSubtitle'),
			sectionParagraph: t('aboutMePageContent.bio.0.sectionParagraph'),
			imgPath: t('aboutMePageContent.bio.0.imgPath'),
			imgDescription: t('aboutMePageContent.bio.0.imgDescription')
		},
		{
			sectionTitle: t('aboutMePageContent.bio.1.sectionTitle'),
			sectionSubtitle: t('aboutMePageContent.bio.1.sectionSubtitle'),
			sectionParagraph: t('aboutMePageContent.bio.1.sectionParagraph'),
			imgPath: t('aboutMePageContent.bio.1.imgPath'),
			imgDescription: t('aboutMePageContent.bio.1.imgDescription')
		}
	]
});

export function useTypedI18n() {

	const { t, locale } = useI18n();

	const homepageI18nContent = ref<HomePageContent>(updateHomePageI18nContent(t));

	const aboutMeI18nContent = ref<AboutMePageContent>(updateAboutMeI18nContent(t));

	const changeLanguage = (lang: 'it' | 'en') => {
		locale.value = lang;
	};

	watch(() => locale.value, () => {
		homepageI18nContent.value = updateHomePageI18nContent(t);
		aboutMeI18nContent.value = updateAboutMeI18nContent(t);
	});

	return { currentLanguage: locale, changeLanguage, homepageI18nContent, aboutMeI18nContent };

}