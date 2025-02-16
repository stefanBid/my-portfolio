import { defineStore } from 'pinia';
import { useI18n } from 'vue-i18n';
import type {
  Locale,
  HeaderContent,
  FooterContent,
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

  // Header content initialization
  const headerI18nContent = ref(messages.value[locale.value].header as HeaderContent);

  // Footer content initialization
  const footerI18nContent = ref(messages.value[locale.value].footer as FooterContent);

  // Pages content initialization

  // Home page content initialization
  const homePageI18nContent = ref(messages.value[locale.value].homePage as HomePageContent);

  // About me page content initialization
  const aboutMePageI18nContent = ref(
    messages.value[locale.value].aboutMePage as AboutMePageContent,
  );

  // Skills page content initialization
  const skillsPageI18nContent = ref(messages.value[locale.value].skillsPage as SkillsPageContent);

  // Privacy policy page content initialization
  const privacyPolicyPageI18nContent = ref(
    messages.value[locale.value].privacyPolicyPage as PrivacyPolicyPageContent,
  );

  // Terms and conditions page content initialization
  const termsAndConditionsPageI18nContent = ref(
    messages.value[locale.value].termsAndConditionsPage as TermsAndConditionsPageContent,
  );

  // Not found page content initialization
  const notFoundPageI18nContent = ref(
    messages.value[locale.value].notFoundPage as NotFoundPageContent,
  );

  // Action to change the language
  const changeLanguage = (newLang: Locale): void => {
    if (newLang !== locale.value) {
      locale.value = newLang;
      // Update the content of the pages

      // Update the header content
      headerI18nContent.value = messages.value[locale.value].header as HeaderContent;

      // Update the footer content
      footerI18nContent.value = messages.value[locale.value].footer as FooterContent;

      // Update the pages content

      // Home page content update
      homePageI18nContent.value = messages.value[locale.value].homePage as HomePageContent;

      // About me page content update
      aboutMePageI18nContent.value = messages.value[locale.value].aboutMePage as AboutMePageContent;

      // Skills page content update
      skillsPageI18nContent.value = messages.value[locale.value].skillsPage as SkillsPageContent;

      // Privacy policy page content
      privacyPolicyPageI18nContent.value = messages.value[locale.value]
        .privacyPolicyPage as PrivacyPolicyPageContent;

      // Terms and conditions page content
      termsAndConditionsPageI18nContent.value = messages.value[locale.value]
        .termsAndConditionsPage as TermsAndConditionsPageContent;

      // Not found page content
      notFoundPageI18nContent.value = messages.value[locale.value]
        .notFoundPage as NotFoundPageContent;
    }
  };

  return {
    currentLanguage: locale,
    headerI18nContent,
    footerI18nContent,
    homePageI18nContent,
    aboutMePageI18nContent,
    skillsPageI18nContent,
    privacyPolicyPageI18nContent,
    termsAndConditionsPageI18nContent,
    notFoundPageI18nContent,
    changeLanguage,
  };
});
