/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref, watch, } from 'vue';
import { useI18n } from 'vue-i18n';

// Global interfaces
interface Section {
	titleHeading: string;
	subTitleHeading: string;
	contentParagraph: string;
	imagePath?: string;
	imageDescription?: string;
}

// Interface for the content of the header
interface HeaderContent {
	navbarRoutes: {
		text: string;
		path: string;
	}[]
}

// Interface for the content of the home page
interface HomePageContent {
	firstHeading: string;
	secondHeading: string;
	thirdHeading: string[];
	firstButton: {text: string, link: string};
	secondButton: {text:string, link: string};
}

// Interface for the content of the about me page
interface AboutMePageContent {
	pageHeading: string;
	bioSections: Section[];
}

// Interfaces and types for the content of the skills page
type skillSection = 'FE' | 'BE' | 'WD';
type SkillType = 'feLanguage' | 'beLanguage' | 'feFramework' | 'beFramework' | 'beDb';
type Rating = 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5 | 5.5 | 6 | 6.5 | 7 | 7.5 | 8 | 8.5 | 9 | 9.5 | 10;

interface SkillInfo {
  id: string;
  name: string;
  icon?: string;
	type: SkillType;
  overAllRating: {
    syntaxAndSemantics: Rating;
    librariesAndFrameworks: Rating;
    debuggingAndProblemSolving: Rating;
    bestPracticesAndDesignPatterns: Rating;
    practicalExperience: Rating;
  }
}

interface SkillsPageContent {
	pageHeading: string;
	skillsSections: (Section & { sectionType: skillSection })[];
	skillsList: SkillInfo[];
}

const updateHeaderI18nContent = (localeMessages: any): HeaderContent => {
	return localeMessages.headerContent;
};

const updateHomePageI18nContent = (localeMessages: any): HomePageContent => {
	return localeMessages.homePageContent;
};

const updateAboutMePageI18nContent = (localeMessages: any): AboutMePageContent => {
	return localeMessages.aboutMePageContent;
};

const updateSkillsPageContent = (localeMessages: any): SkillsPageContent => {
	return localeMessages.skillsPageContent;
};

let instance: ReturnType<typeof createTypedI18n> | undefined;

function createTypedI18n() {

	const { locale, messages } = useI18n();

	const headerI18nContent = ref<HeaderContent>(updateHeaderI18nContent(messages.value[locale.value]));
	const homePageI18nContent = ref<HomePageContent>(updateHomePageI18nContent(messages.value[locale.value]));
	const aboutMePageI18nContent = ref<AboutMePageContent>(updateAboutMePageI18nContent(messages.value[locale.value]));
	const skillsPageI18nContent = ref<SkillsPageContent>(updateSkillsPageContent(messages.value[locale.value]));

	const changeLanguage = (lang: 'it' | 'en') => {
		locale.value = lang;
	};

	watch(() => locale.value, () => {
		headerI18nContent.value = updateHeaderI18nContent(messages.value[locale.value]);
		homePageI18nContent.value = updateHomePageI18nContent(messages.value[locale.value]);
		aboutMePageI18nContent.value = updateAboutMePageI18nContent(messages.value[locale.value]);
		skillsPageI18nContent.value = updateSkillsPageContent(messages.value[locale.value]);
	});

	return { currentLanguage: locale, changeLanguage, headerI18nContent, homePageI18nContent, aboutMePageI18nContent, skillsPageI18nContent };

}

export function useTypedI18nSingleton() {
	if (!instance) { instance = createTypedI18n(); }
	return instance;
}