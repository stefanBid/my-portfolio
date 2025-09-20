<script setup lang="ts">
import { h } from 'vue';

import type { Image } from '@/types';
import { useI18nStore } from '@/stores';
import { openLink } from '@/utils';

import { Icon } from '@iconify/vue';

import BaseButton from '@/components/base/button/BaseButton.vue';

import MdiPlayCircle from '~icons/mdi/play-circle';

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
const i18nStore = useI18nStore();
</script>

<template>
  <div
    :tabindex="0"
    class="box-border relative flex flex-col items-center justify-center w-full overflow-hidden transition-all duration-300 ease-in-out border-2 rounded-lg outline-none h-72 border-sb-secondary-200 group ring-0 hover:scale-105 focus-visible:scale-105"
  >
    <!--Black Filter-->
    <div class="absolute inset-0 rounded-md bg-black/50 z-[200]"></div>
    <!--Image-->
    <picture>
      <source :srcset="props.imagePath.webp || undefined" type="image/webp" />
      <img
        :alt="`${props.title} project image`"
        class="absolute inset-0 object-cover transition-all duration-300 ease-in-out rounded-md size-full z-[100]"
        :src="props.imagePath.jpg"
      />
    </picture>

    <!--Title-->
    <h4
      class="absolute text-size-l left-4 top-4 sm:left-5 sm:top-5 md:left-5 md:top-5 lg:left-6 lg:top-6 text-center text-white transition-all duration-300 ease-in-out group-hover:text-sb-tertiary-100 group-focus-visible:text-sb-tertiary-100 font-bebas z-[300]"
    >
      {{ props.title }}
    </h4>

    <!--Buttons-->
    <div
      class="absolute flex items-center transition-all duration-300 ease-in-out z-[300] tot-gap-s right-4 bottom-4 sm:right-5 sm:bottom-5 md:right-5 md:bottom-5 lg:right-6 lg:bottom-6"
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
        :icon="() => (props.platformIcon ? h(Icon, { icon: props.platformIcon }) : undefined)"
        @click="openLink(props.codeButtonLink)"
      >
        {{ i18nStore.currentLanguage === 'en' ? 'View Code' : 'Vedi Codice' }}
      </BaseButton>
    </div>
  </div>
</template>
