<script setup lang="ts">
import { BaseButton } from '@/components';
import { ICONS } from '@/constants';
import { useStyleStore } from '@/stores';

// Store Declarations
const styleStore = useStyleStore();
</script>

<template>
  <div
    tabindex="0"
    class="box-border relative flex flex-col items-center justify-center w-full transition-all duration-300 ease-in-out border-2 rounded-lg outline-none h-72 border-sb-secondary-200 group ring-0 focus-visible:ring-0 focus-visible:outline-none hover:scale-105 focus-visible:scale-105"
  >
    <!--Black Filter-->
    <div class="absolute inset-0 rounded-md bg-black/60 z-sb-base-2"></div>
    <img
      class="absolute object-cover transition-all duration-300 ease-in-out rounded-md size-full z-sb-base-1 grayscale group-hover:grayscale-0 group-focus-visible:grayscale-0"
      src="https://picsum.photos/1000"
      alt="placeholder"
    />
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
      Test
    </h4>
    <BaseButton
      content-size="small"
      spacing-size="small"
      :icon="ICONS.GithubIcon"
      variant="white"
      :class="{
        'right-4 bottom-4':
          styleStore.activeBreakpoint === 'xs' || styleStore.activeBreakpoint === 'sm',
        'right-5 bottom-5': styleStore.activeBreakpoint === 'md',
        'right-6 bottom-6':
          styleStore.activeBreakpoint !== 'xs' &&
          styleStore.activeBreakpoint !== 'sm' &&
          styleStore.activeBreakpoint !== 'md',
      }"
      class="absolute z-sb-base-3"
    >
      Show on
    </BaseButton>
  </div>
</template>
