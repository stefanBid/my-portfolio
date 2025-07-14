<script setup lang="ts">
import { h } from 'vue';
import { useStyleStore, useI18nStore } from '@/stores';
import { openLink } from '@/utils';
import MdiPlayCircle from '~icons/mdi/play-circle';
import { BaseButton, BaseIcon } from '@/components';
import type { Image } from '@/types';

interface ProjectCardProps {
  title: string;
  imagePath: Image;
  platformIcon?: string;
  playButtonLink?: string;
  codeButtonLink: string;
}

const props = withDefaults(defineProps<ProjectCardProps>(), {
  playButtonLink: undefined,
  platformIcon: undefined,
});

// Store Declarations
const styleStore = useStyleStore();
const i18nStore = useI18nStore();
</script>

<template>
  <div
    :tabindex="0"
    class="box-border relative flex flex-col items-center justify-center w-full overflow-hidden transition-all duration-300 ease-in-out border-2 rounded-lg outline-none h-72 border-sb-secondary-200 group ring-0 hover:scale-105 focus-visible:scale-105"
  >
    <!--Black Filter-->
    <div class="absolute inset-0 rounded-md bg-black/60 z-sb-base-2"></div>
    <!--Image-->
    <picture>
      <source :srcset="props.imagePath.webp || undefined" type="image/webp" />
      <img
        :alt="`${props.title} project image`"
        class="absolute inset-0 object-cover transition-all duration-300 ease-in-out rounded-md size-full z-sb-base-1 grayscale group-hover:grayscale-0 group-focus-visible:grayscale-0"
        :src="props.imagePath.jpg"
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
      class="absolute flex items-center transition-all duration-300 ease-in-out z-sb-base-3"
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
        variant="white"
        size="small"
        :icon="MdiPlayCircle"
        @click="() => (props.playButtonLink ? openLink(props.playButtonLink) : null)"
      />

      <BaseButton
        variant="white"
        size="small"
        :icon="() => (props.platformIcon ? h(BaseIcon, { icon: props.platformIcon }) : undefined)"
        @click="openLink(props.codeButtonLink)"
      >
        {{ i18nStore.currentLanguage === 'en' ? 'View Code' : 'Vedi Codice' }}
      </BaseButton>
    </div>
  </div>
</template>
