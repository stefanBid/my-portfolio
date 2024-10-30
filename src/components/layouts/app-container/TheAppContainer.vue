<script setup lang="ts">
import { inject, Ref, watch } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import { useTitle } from '@vueuse/core';
import { useNotificationStore, useI18nStore } from '@/stores';
import { useCommonStyleSingleton } from '@/hooks';

import { TheHeader, ThePageLoader, TheNotificationBanner } from '@/components';

// Store Declarations
const i18nStore = useI18nStore();
const notificationStore = useNotificationStore();

// Composable Declarations
const route = useRoute();
const title = useTitle();
const { activeBreakpoint } = useCommonStyleSingleton();

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

  <div
    :class="{
      'bottom-5 right-[5%] w-fit': activeBreakpoint !== 'xs',
      'bottom-5 right-[6%] w-fit': activeBreakpoint === 'md',
      'bottom-5 right-[7%] w-fit':
        activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm' && activeBreakpoint !== 'md',
      'bottom-5 left-1/2 transform -translate-x-1/2 w-fit': activeBreakpoint === 'xs',
    }"
    class="fixed flex flex-col items-center z-sb-notification w-fit gap-y-6"
  >
    <transition-group name="scale-and-fade-fast">
      <TheNotificationBanner
        v-for="notification in notificationStore.notifications"
        :key="notification.id"
        :notification="notification"
      />
    </transition-group>
  </div>
</template>
