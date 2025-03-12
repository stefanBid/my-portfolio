<script setup lang="ts">
import { useStyleStore, useI18nStore } from '@/stores';
import { openLink } from '@/utils';
import { PlayIcon } from '@heroicons/vue/24/solid';
import { BaseButton } from '@/components';
import type { Component, FunctionalComponent } from 'vue';

interface ProjectCardProps {
  title: string;
  imageUrl: {
    jpg: string;
    webp?: string;
  };
  playButtonLink?: string;
  codeButtonLink: {
    iconCode: FunctionalComponent | Component | string;
    link: string;
  };
}

const props = withDefaults(defineProps<ProjectCardProps>(), {
  playButtonLink: undefined,
});

// Store Declarations
const styleStore = useStyleStore();
const i18nStore = useI18nStore();
</script>

<template>
  <div
    tabindex="0"
    class="box-border relative flex flex-col items-center justify-center w-full overflow-hidden transition-all duration-300 ease-in-out border-2 rounded-lg outline-none h-72 border-sb-secondary-200 group ring-0 focus-visible:ring-0 focus-visible:outline-none hover:scale-105 focus-visible:scale-105"
  >
    <!--Black Filter-->
    <div class="absolute inset-0 rounded-md bg-black/50 z-sb-base-2"></div>
    <!--Image-->
    <picture>
      <source :srcset="props.imageUrl.webp || undefined" type="image/webp" />
      <img
        loading="lazy"
        decoding="async"
        :alt="`${props.title} project image`"
        class="absolute inset-0 object-cover transition-all duration-300 ease-in-out rounded-md size-full z-sb-base-1 grayscale group-hover:grayscale-0 group-focus-visible:grayscale-0"
        :src="props.imageUrl.jpg"
      />
    </picture>

    <!--Title-->
    <h4
      :class="[
        styleStore.textSizeL,

        {
          'left-4 top-4':
            styleStore.activeBreakpoint === 'xs' || styleStore.activeBreakpoint === 'sm',
          'left-5 top-5': styleStore.activeBreakpoint === 'md',
          'left-6 top-6':
            styleStore.activeBreakpoint !== 'xs' &&
            styleStore.activeBreakpoint !== 'sm' &&
            styleStore.activeBreakpoint !== 'md',
        },
      ]"
      class="absolute text-center text-white transition-all duration-300 ease-in-out group-hover:text-sb-tertiary-100 group-focus-visible:text-sb-tertiary-100 font-bebas z-sb-base-3"
    >
      {{ props.title }}
    </h4>

    <!--Buttons-->
    <div
      class="absolute flex items-center z-sb-base-3"
      :class="[
        styleStore.elementTotalGapS,
        {
          'right-4 bottom-4':
            styleStore.activeBreakpoint === 'xs' || styleStore.activeBreakpoint === 'sm',
          'right-5 bottom-5': styleStore.activeBreakpoint === 'md',
          'right-6 bottom-6':
            styleStore.activeBreakpoint !== 'xs' &&
            styleStore.activeBreakpoint !== 'sm' &&
            styleStore.activeBreakpoint !== 'md',
        },
      ]"
    >
      <BaseButton
        v-if="props.playButtonLink"
        content-size="small"
        spacing-size="small"
        :icon="PlayIcon"
        variant="white"
        @click="() => (props.playButtonLink ? openLink(props.playButtonLink) : null)"
      />
      <BaseButton
        content-size="small"
        spacing-size="small"
        :icon="props.codeButtonLink.iconCode"
        variant="white"
        @click="() => openLink(props.codeButtonLink.link)"
      >
        {{ i18nStore.currentLanguage === 'en' ? 'View Code' : 'Vedi Codice' }}
      </BaseButton>
    </div>
  </div>
</template>
