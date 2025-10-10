<script setup lang="ts">
import { computed, onBeforeMount, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { RouterView } from 'vue-router';
import { storeToRefs } from 'pinia';

import { CACHE_GENERAL, makeGeneralCacheKey } from '@/lib/cache/cache-helpers';

import AppHeader from '@/components/layouts/header/AppHeader.vue';
import AppFooter from '@/components/layouts/footer/AppFooter.vue';
import AppNotificationContainer from '@/components/layouts/notification-container/AppNotificationContainer.vue';

import WelcomeGate from '@/app/welcome-gate/WelcomeGate.vue';

import { usePortfolioStore, useNotificationStore, useLocaleStore } from '@/stores';
import type { Lang } from '@/types';

// dependencies
const route = useRoute();
const notificationStore = useNotificationStore();
const pStore = usePortfolioStore();
const { portfolio, error: portfolioError, isLoading } = storeToRefs(pStore);
const lStore = useLocaleStore();
const { locale, locales, error: localeError } = storeToRefs(lStore);

// globals
const WELCOME_KEY = makeGeneralCacheKey('welcome-seen');

// state
const welcomeSeen = ref<boolean>(false);
// Helpers to determine route meta
const isNotFound = computed(() => route.matched.some((r) => r.meta?.notFound));
const hideFooter = computed(() => route.matched.some((r) => r.meta?.hideFooter));
const hideHeader = computed(() => route.matched.some((r) => r.meta?.hideHeader));

const showWelcome = computed(() => !isNotFound.value && !welcomeSeen.value);

const isHeaderVisible = computed(() => !hideHeader.value && !showWelcome.value);
const isFooterVisible = computed(() => !hideFooter.value && !showWelcome.value);
const isPortfolioVisible = computed(() => isNotFound.value || !showWelcome.value);

// events
const onSwitchToMainView = (): void => {
  welcomeSeen.value = true;
  CACHE_GENERAL.set(WELCOME_KEY, true);
};

const onChangeLocale = (newLocale: string): void => {
  lStore.setLocale(newLocale as 'en' | 'it');
};

onBeforeMount(() => {
  welcomeSeen.value =
    pStore.hasPortfolioInCache(locale.value as Lang) &&
    lStore.hasLocalesInCache() &&
    !!CACHE_GENERAL.get<boolean>(WELCOME_KEY);
});

onMounted(async () => {
  await lStore.loadLocales();
  await pStore.loadPortfolio(locale.value as Lang);
});

watch(
  () => [portfolioError.value, localeError.value],
  (err) => {
    if (err.find((e) => e !== null)) {
      notificationStore.pushNotification(
        'Unable to visit portfolio completely. Refresh page or try later!',
        'error',
      );
    }
  },
);

watch(
  () => locale.value,
  async (newLocale, oldLocale) => {
    if (newLocale !== oldLocale) {
      await pStore.loadPortfolio(newLocale as Lang);
    }
  },
);
</script>

<template>
  <AppHeader
    :show-nav="isHeaderVisible"
    :routes="portfolio.routes"
    :locales="locales"
    :current-locale="locale"
    @change-locale="onChangeLocale"
  />
  <!--PAGE LOADER-->
  <transition name="fade">
    <WelcomeGate
      v-if="showWelcome"
      :error="portfolioError || localeError"
      :data-fetched="!isLoading"
      @change="onSwitchToMainView"
    />
  </transition>

  <!--MAIN CONTENT-->
  <main class="min-h-dvh">
    <div class="min-h-dvh">
      <RouterView v-if="isPortfolioVisible" />
    </div>
    <AppFooter v-if="isFooterVisible" :content="pStore.portfolio.footer" />
  </main>

  <!--NOTIFICATION BANNERS-->
  <AppNotificationContainer />
</template>
