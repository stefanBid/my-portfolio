<script setup lang="ts">
import { inject, Ref, watch } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import { useTitle } from '@vueuse/core';
import { useTypedI18nSingleton } from '@/hooks';

import { TheHeader, ThePageLoader } from '@/components';

const isLoading = inject<Ref<boolean>>('isLoading');
const route = useRoute();
const { currentLanguage } = useTypedI18nSingleton();
const title = useTitle();

const ROUTER_TITLE_MAP = {
  homePage: {
    en: 'Home',
    it: 'Home',
  },
  aboutPage: {
    en: 'About Me',
    it: 'Chi sono',
  },
  skillsPage: {
    en: 'Skills',
    it: 'Competenze',
  },
  projectsPage: {
    en: 'Projects',
    it: 'Progetti',
  },
  notFoundPage: {
    en: '404 Not Found',
    it: '404 Pagina non trovata',
  },
};

const getTitleFromRoute = (): string => {
  const routeName = route.name as keyof typeof ROUTER_TITLE_MAP;
  const language = currentLanguage.value as 'en' | 'it';
  return ROUTER_TITLE_MAP[routeName]?.[language] || '';
};

watch(
  () => [route.name, currentLanguage.value],
  () => {
    title.value = `Stefano Biddau | ${getTitleFromRoute()}`;
  },
  { immediate: true },
);
</script>

<template>
  <TheHeader />
  <ThePageLoader v-if="isLoading" />
  <div v-else class="min-h-screen">
    <RouterView />
  </div>
</template>
