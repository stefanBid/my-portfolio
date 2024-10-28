<script setup lang="ts">
import { inject, Ref, watch } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import { useTitle } from '@vueuse/core';
import { useNotificationStore, useI18nStore } from '@/stores';

import { TheHeader, ThePageLoader, TheNotificationBanner } from '@/components';

// Store Declarations
const i18nStore = useI18nStore();
const notificationStore = useNotificationStore();

// Composable Declarations
const route = useRoute();
const title = useTitle();

const isLoading = inject<Ref<boolean>>('isLoading');

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
  return ROUTER_TITLE_MAP[routeName]?.[i18nStore.currentLanguage as 'it' | 'en'] || '';
};

watch(
  () => [route.name, i18nStore.currentLanguage],
  () => {
    title.value = `Stefano Biddau | ${getTitleFromRoute()}`;
  },
  { immediate: true },
);
</script>

<template>
  <TheHeader />

  <ThePageLoader v-if="isLoading" />
  <div v-if="!isLoading" class="min-h-screen">
    <RouterView />
  </div>

  <TheNotificationBanner
    :show="notificationStore.isNotificationVisible"
    :type="notificationStore.notificationType"
    :message="notificationStore.notificationMessage"
  />
</template>
