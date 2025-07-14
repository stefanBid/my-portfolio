<script setup lang="ts">
import MdiHomeFlood from '~icons/mdi/home-flood';
import { useRouter } from 'vue-router';

import { BaseButton } from '@/components';
import { useI18nStore, useStyleStore } from '@/stores';
import { usePageMeta } from '@/hooks';
import { computed } from 'vue';

// Stores declarations
const styleStore = useStyleStore();
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
    :class="[styleStore.containerPadding, styleStore.elementTotalGapS]"
    class="flex flex-col items-center justify-center h-screen pt-20 text-center text-white transition-all duration-300 ease-in-out"
  >
    <h1
      :class="[styleStore.textSizeXXL]"
      class="whitespace-normal transition-all duration-300 ease-in-out font-bebas"
    >
      {{ i18nStore.notFoundPageI18nContent.firstHeading }}
    </h1>
    <p
      :class="[styleStore.textSizeM]"
      class="font-medium whitespace-normal transition-all duration-300 ease-in-out font-roboto"
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
