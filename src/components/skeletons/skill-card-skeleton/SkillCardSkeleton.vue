<script setup lang="ts">
import { useStyleStore } from '@/stores';

// Store Declarations
const styleStore = useStyleStore();
</script>

<template>
  <div
    :class="[
      styleStore.elementTotalPaddingS,
      {
        'h-64':
          styleStore.activeBreakpoint !== 'xs' &&
          styleStore.activeBreakpoint !== 'sm' &&
          styleStore.activeBreakpoint !== 'md',
        'h-56': styleStore.activeBreakpoint === 'md',
        'h-52': styleStore.activeBreakpoint === 'xs' || styleStore.activeBreakpoint === 'sm',
      },
    ]"
    class="relative flex flex-col items-center justify-between transition-all duration-300 ease-in-out border-2 rounded-lg animate-pulse bg-sb-secondary-300/60 border-sb-secondary-200/60"
  >
    <!-- Titolo Placeholder -->
    <div
      :class="{
        'mb-4':
          styleStore.activeBreakpoint !== 'xs' &&
          styleStore.activeBreakpoint !== 'sm' &&
          styleStore.activeBreakpoint !== 'md',
        'mb-3': styleStore.activeBreakpoint === 'md',
        'mb-2.5': styleStore.activeBreakpoint === 'xs' || styleStore.activeBreakpoint === 'sm',
      }"
      class="w-32 h-6 rounded bg-sb-secondary-100/60"
    ></div>

    <!-- Icona Placeholder -->
    <div
      :class="[
        styleStore.iconSizeXL,
        {
          'my-4':
            styleStore.activeBreakpoint !== 'xs' &&
            styleStore.activeBreakpoint !== 'sm' &&
            styleStore.activeBreakpoint !== 'md',
          'my-3': styleStore.activeBreakpoint === 'md',
          'my-2.5': styleStore.activeBreakpoint === 'xs' || styleStore.activeBreakpoint === 'sm',
        },
      ]"
      class="w-16 h-16 rounded-full bg-sb-secondary-100/60"
    ></div>

    <!-- Testo Placeholder -->
    <div class="w-48 h-4 rounded bg-sb-secondary-100/60"></div>
  </div>
</template>
