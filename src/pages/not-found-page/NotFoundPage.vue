<script setup lang="ts">
import { HomeIcon, WindowIcon } from '@heroicons/vue/24/outline';
import { useRouter } from 'vue-router';

import { BaseButton } from '@/components';
import { useCommonStyleSingleton } from '@/hooks';
import { useI18nStore } from '@/stores';

// Stores declarations
const i18nStore = useI18nStore();

// Hooks declarations
const { activeBreakpoint, textSizeXXL, textSizeL, containerPadding } = useCommonStyleSingleton();
const router = useRouter();
</script>

<template>
  <div
    :class="[containerPadding]"
    class="flex flex-col items-center justify-center h-screen pt-20 text-center text-white gap-y-4"
  >
    <h1 :class="[textSizeXXL]" class="whitespace-normal transition-sb-slow font-bebas">
      {{ i18nStore.notFoundPageI18nContent.firstHeading }}
    </h1>
    <p :class="[textSizeL]" class="font-medium whitespace-normal transition-sb-slow font-roboto">
      {{ i18nStore.notFoundPageI18nContent.secondHeading }}
    </p>
    <WindowIcon
      class="transition-sb-slow text-slate-700"
      :class="{
        'size-72':
          activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm' && activeBreakpoint !== 'md',
        'size-52': activeBreakpoint === 'md',
        'size-32': activeBreakpoint === 'xs' || activeBreakpoint === 'sm',
      }"
    />

    <BaseButton
      id="goHomeButton"
      name="go_home_button"
      :icon="HomeIcon"
      @click="router.push({ name: 'homePage' })"
    >
      {{ i18nStore.notFoundPageI18nContent.goHomeButton.text }}
    </BaseButton>
  </div>
</template>
