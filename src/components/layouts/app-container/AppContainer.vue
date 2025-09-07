<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { RouterView } from 'vue-router';

import { useLoadingPageStore } from '@/stores';

import AppHeader from '@/components/layouts/header/AppHeader.vue';
import AppFooter from '@/components/layouts/footer/AppFooter.vue';
import AppNotificationContainer from '@/components/layouts/notification-container/AppNotificationContainer.vue';

import SvgSpinnersRingResize from '~icons/svg-spinners/ring-resize';

const route = useRoute();

const { isLoading } = useLoadingPageStore();

const showRouterView = computed(() => {
  return route.name !== 'homePage' && route.name !== 'notFoundPage';
});
</script>

<template>
  <div class="flex flex-col min-h-screen overflow-x-hidden">
    <AppHeader />
    <!--PAGE LOADER-->
    <div
      v-if="isLoading"
      class="fixed inset-0 flex flex-col items-center justify-center w-full h-screen transition-all duration-300 ease-in-out z-[500] bg-sb-main"
      role="alert"
      aria-live="assertive"
    >
      <SvgSpinnersRingResize class="w-32 h-32 text-sb-tertiary-100 animate-pulse" />
    </div>

    <!--MAIN CONTENT-->
    <main class="min-h-screen">
      <RouterView />
      <AppFooter v-if="showRouterView" />
    </main>

    <!--NOTIFICATION BANNERS-->
    <AppNotificationContainer />
  </div>
</template>
