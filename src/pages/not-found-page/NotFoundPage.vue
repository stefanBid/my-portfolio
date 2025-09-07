<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';

import { useI18nStore } from '@/stores';
import { usePageMeta } from '@/hooks';

import BaseButton from '@/components/base/button/BaseButton.vue';

import MdiHomeFlood from '~icons/mdi/home-flood';

// Stores declarations
const i18nStore = useI18nStore();

// Hooks declarations
const router = useRouter();

// SEO Feature Manage Meta Tags
usePageMeta({
  meta: computed(() => i18nStore.notFoundPageI18nContent.metaDescription),
  currentLang: computed(() => i18nStore.currentLanguage),
});
</script>

<template>
  <div
    class="flex flex-col items-center justify-center h-screen pt-20 text-center text-white transition-all duration-300 ease-in-out container-p"
  >
    <h1 class="whitespace-normal transition-all duration-300 ease-in-out font-bebas text-size-xxl">
      {{ i18nStore.notFoundPageI18nContent.firstHeading }}
    </h1>
    <p
      class="font-medium whitespace-normal transition-all duration-300 ease-in-out font-roboto text-size-m mb-3 sm:mb-4 md:mb-5 lg:mb-6"
    >
      {{ i18nStore.notFoundPageI18nContent.secondHeading }}
    </p>

    <BaseButton
      id="goHomeButton"
      name="go_home_button"
      aria-label="click to go to the home page"
      :icon="MdiHomeFlood"
      @click.stop="() => router.push({ name: i18nStore.notFoundPageI18nContent.goHomeButton.link })"
    >
      {{ i18nStore.notFoundPageI18nContent.goHomeButton.text }}
    </BaseButton>
  </div>
</template>
