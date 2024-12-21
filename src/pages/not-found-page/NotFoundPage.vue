<script setup lang="ts">
import { HomeIcon, WindowIcon } from '@heroicons/vue/24/outline';
import { useRouter } from 'vue-router';
import { watch } from 'vue';

import { BaseButton } from '@/components';
import { useI18nStore, useStyleStore, useTitleStore } from '@/stores';

// Stores declarations
const styleStore = useStyleStore();
const i18nStore = useI18nStore();
const titleStore = useTitleStore();

// Hooks declarations
const router = useRouter();

// Feature 1: Page Title
watch(
  () => i18nStore.currentLanguage,
  (newValue) => {
    titleStore.setTitleSuffix(newValue === 'it' ? '404 Pagina non trovata' : '404 Page Not Found');
  },
  { immediate: true },
);
</script>

<template>
  <div
    :class="[styleStore.containerPadding]"
    class="flex flex-col items-center justify-center h-screen pt-20 text-center text-white gap-y-4"
  >
    <h1
      :class="[styleStore.textSizeXXL]"
      class="whitespace-normal transition-all duration-300 ease-in-out font-bebas"
    >
      {{ i18nStore.notFoundPageI18nContent.firstHeading }}
    </h1>
    <p
      :class="[styleStore.textSizeL]"
      class="font-medium whitespace-normal transition-all duration-300 ease-in-out font-roboto"
    >
      {{ i18nStore.notFoundPageI18nContent.secondHeading }}
    </p>
    <WindowIcon
      class="transition-all duration-300 ease-in-out text-sb-tertiary-100"
      :class="{
        'size-72':
          styleStore.activeBreakpoint !== 'xs' &&
          styleStore.activeBreakpoint !== 'sm' &&
          styleStore.activeBreakpoint !== 'md',
        'size-52': styleStore.activeBreakpoint === 'md',
        'size-32': styleStore.activeBreakpoint === 'xs' || styleStore.activeBreakpoint === 'sm',
      }"
    />

    <BaseButton
      id="goHomeButton"
      name="go_home_button"
      aria-label="click to go to the home page"
      :icon="HomeIcon"
      @click="router.push({ name: 'homePage' })"
    >
      {{ i18nStore.notFoundPageI18nContent.goHomeButton.text }}
    </BaseButton>
  </div>
</template>
