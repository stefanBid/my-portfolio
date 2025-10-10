import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import type {
  Portfolio,
  BFooter,
  HomePage,
  AboutMePage,
  MySkillsPage,
  MyProjectsPage,
  PrivacyPolicyPage,
  TermsAndConditionsPage,
  Lang,
  StrapiV5Single,
} from '@/types';

import { getPortfolio, buildPortfolioParams } from '@/services';
import { CACHE_CMS, makeCacheKey } from '@/lib/cache/cache-helpers';
import { TTL } from '@/config/cache.config';

const PORTFOLIO_SAFE_MOCK: Portfolio = {
  id: 1,
  documentId: 'mocked-document-id',
  locale: 'en',
  pages: [],
  routes: [],
  footer: {} as BFooter,
};

export const usePortfolioStore = defineStore('portfolio', () => {
  // state

  const portfolio = ref<Portfolio>(PORTFOLIO_SAFE_MOCK);
  const isLoading = ref(false);
  const isDataCached = ref(false);
  const error = ref<string | null>(null);

  // Getters
  const pages = computed(() => portfolio.value.pages ?? []);

  const homeData = computed(
    () =>
      pages.value.find((p) => p.__component === 'page-elements.home') as HomePage | {} as HomePage,
  );
  const aboutMeData = computed(
    () =>
      pages.value.find((p) => p.__component === 'page-elements.about-me') as
        | AboutMePage
        | {} as AboutMePage,
  );
  const skillsData = computed(
    () =>
      pages.value.find((p) => p.__component === 'page-elements.my-skills') as
        | MySkillsPage
        | {} as MySkillsPage,
  );
  const projectsData = computed(
    () =>
      pages.value.find((p) => p.__component === 'page-elements.my-projects') as
        | MyProjectsPage
        | {} as MyProjectsPage,
  );
  const privacyPolicyData = computed(
    () =>
      pages.value.find((p) => p.__component === 'page-elements.privacy-policy') as
        | PrivacyPolicyPage
        | {} as PrivacyPolicyPage,
  );
  const termsAndConditionsData = computed(
    () =>
      pages.value.find((p) => p.__component === 'page-elements.terms-and-conditions') as
        | TermsAndConditionsPage
        | {} as TermsAndConditionsPage,
  );

  // Exportable functions

  const hasPortfolioInCache = (lang: Lang): boolean => {
    const params = buildPortfolioParams(lang);
    const cacheKey = makeCacheKey('/portfolio', params, lang);
    const cached = CACHE_CMS.get<StrapiV5Single<Portfolio>>(cacheKey);
    return !!cached;
  };

  const loadPortfolio = async (lang: Lang): Promise<void> => {
    isLoading.value = true;
    error.value = null;

    // 1) Try cache
    const params = buildPortfolioParams(lang);
    const cacheKey = makeCacheKey('/portfolio', params, lang);
    const cached = CACHE_CMS.get<StrapiV5Single<Portfolio>>(cacheKey);

    if (cached) {
      _fillFromResponse(cached);
      isLoading.value = false;
      isDataCached.value = true;
      return;
    }
    try {
      // 2) Try fetch
      const data = await getPortfolio(lang);
      CACHE_CMS.set(cacheKey, data, TTL.portfolio);
      _fillFromResponse(data);
    } catch (e: Error | unknown) {
      error.value = (e as Error)?.message ?? 'Unable to fetch portfolio data';
    } finally {
      isLoading.value = false;
    }
  };

  // functions

  function _fillFromResponse(payload: StrapiV5Single<Portfolio>): void {
    portfolio.value = { ...payload.data };
  }

  return {
    isLoading,
    isDataCached,
    portfolio,
    homeData,
    aboutMeData,
    skillsData,
    projectsData,
    privacyPolicyData,
    termsAndConditionsData,
    pages,
    error,
    loadPortfolio,
    hasPortfolioInCache,
  };
});
