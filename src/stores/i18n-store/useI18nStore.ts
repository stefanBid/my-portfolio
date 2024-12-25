import { defineStore } from 'pinia';
import { useI18n } from 'vue-i18n';
import type {
  Locale,
  HeaderContent,
  HomePageContent,
  AboutMePageContent,
  SkillsPageContent,
  PrivacyPolicyPageContent,
  TermsAndConditionsPageContent,
  NotFoundPageContent,
} from '@/types';
import { ref } from 'vue';

export const useI18nStore = defineStore('i18n', () => {
  const { locale, messages } = useI18n();

  // Reactive state for localized content
  const headerI18nContent = ref(messages.value[locale.value].header as HeaderContent);
  const homePageI18nContent = ref(messages.value[locale.value].homePage as HomePageContent);
  const aboutMePageI18nContent = ref(
    messages.value[locale.value].aboutMePage as AboutMePageContent,
  );
  const skillsPageI18nContent = ref(messages.value[locale.value].skillsPage as SkillsPageContent);
  const privacyPolicyPageI18nContent = ref(
    messages.value[locale.value].privacyPolicyPage as PrivacyPolicyPageContent,
  );
  const termsAndConditionsPageI18nContent = ref(
    messages.value[locale.value].termsAndConditionsPage as TermsAndConditionsPageContent,
  );
  const notFoundPageI18nContent = ref(
    messages.value[locale.value].notFoundPage as NotFoundPageContent,
  );

  // Action to change the language
  const changeLanguage = (newLang: Locale): void => {
    if (newLang !== locale.value) {
      locale.value = newLang;
      headerI18nContent.value = messages.value[locale.value].header as HeaderContent;
      homePageI18nContent.value = messages.value[locale.value].homePage as HomePageContent;
      aboutMePageI18nContent.value = messages.value[locale.value].aboutMePage as AboutMePageContent;
      skillsPageI18nContent.value = messages.value[locale.value].skillsPage as SkillsPageContent;
      privacyPolicyPageI18nContent.value = messages.value[locale.value]
        .privacyPolicyPage as PrivacyPolicyPageContent;
      termsAndConditionsPageI18nContent.value = messages.value[locale.value]
        .termsAndConditionsPage as TermsAndConditionsPageContent;
      notFoundPageI18nContent.value = messages.value[locale.value]
        .notFoundPage as NotFoundPageContent;
    }
  };

  return {
    currentLanguage: locale,
    headerI18nContent,
    homePageI18nContent,
    aboutMePageI18nContent,
    skillsPageI18nContent,
    privacyPolicyPageI18nContent,
    termsAndConditionsPageI18nContent,
    notFoundPageI18nContent,
    changeLanguage,
  };
});
