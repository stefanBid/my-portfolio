import { defineStore } from 'pinia';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import type { StrapiLocale } from '@/types';
import { CACHE_CMS, makeCacheKey } from '@/lib/cache/cache-helpers';
import { TTL } from '@/config/cache.config';
import { getLocales } from '@/services';

export const useLocaleStore = defineStore('locale', () => {
  // Dependencies
  const { locale } = useI18n();

  // State

  const locales = ref<StrapiLocale[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const setLocale = (newLocale: string): void => {
    locale.value = newLocale;
  };

  const loadLocales = async (): Promise<void> => {
    isLoading.value = true;
    error.value = null;

    //1) Try cache
    const cacheKey = makeCacheKey('/i18n/locales');
    const cached = CACHE_CMS.get<StrapiLocale[]>(cacheKey);

    if (cached) {
      locales.value = cached;
      isLoading.value = false;
      return;
    }

    //2) Fetch
    try {
      const data = await getLocales();
      CACHE_CMS.set(cacheKey, data, TTL.locale);
      locales.value = [...data];
    } catch (err) {
      error.value = (err as Error).message;
      throw new Error(`LocaleStore: loadLocales failed: ${error.value}`);
    } finally {
      isLoading.value = false;
    }
  };

  const hasLocalesInCache = (): boolean => {
    const cacheKey = makeCacheKey('/i18n/locales');
    const cached = CACHE_CMS.get<StrapiLocale[]>(cacheKey);
    return !!cached;
  };

  return {
    locales,
    locale,
    isLoading,
    error,
    setLocale,
    loadLocales,
    hasLocalesInCache,
  };
});
