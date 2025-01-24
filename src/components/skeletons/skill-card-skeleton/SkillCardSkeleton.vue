<script setup lang="ts">
import { useStyleStore } from '@/stores';

// Store Declarations
const styleStore = useStyleStore();
</script>

<template>
  <div
    :class="{
      'w-80 h-64':
        styleStore.activeBreakpoint !== 'xs' &&
        styleStore.activeBreakpoint !== 'sm' &&
        styleStore.activeBreakpoint !== 'md',
      'w-72 h-60': styleStore.activeBreakpoint === 'md',
      'w-64 h-56': styleStore.activeBreakpoint === 'xs' || styleStore.activeBreakpoint === 'sm',
    }"
    class="relative flex flex-col items-center justify-between p-4 border-2 rounded-lg animate-pulse bg-sb-secondary-300/60 border-sb-secondary-200/60"
  >
    <!-- Titolo Placeholder -->
    <div class="w-32 h-6 mb-4 rounded bg-sb-secondary-100/60"></div>

    <!-- Icona Placeholder -->
    <div
      :class="[styleStore.iconSizeXL]"
      class="w-16 h-16 my-4 rounded-full bg-sb-secondary-100/60"
    ></div>

    <!-- Testo Placeholder -->
    <div class="w-48 h-4 rounded bg-sb-secondary-100/60"></div>
  </div>
</template>
