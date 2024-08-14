<script setup lang="ts">

import { ref } from 'vue';

import { useCommonStyleSingleton } from '@/hooks';

// Feature 0: Manage Style Classes
const { containerPadding, containerGapElements } = useCommonStyleSingleton();
const root = ref<HTMLElement | null>(null);
</script>

<template>
  <div
    ref="root"
    v-bind="$attrs"
    class="flex flex-col min-h-0 overflow-x-hidden overflow-y-auto"
    :class="[containerPadding]"
  >
    <div class="min-h-full">
      <slot name="intro-section"></slot>
    </div>
    <div
      class="flex flex-col flex-1 pt-5 pb-10"
      :class="[containerGapElements]"
    >
      <slot
        name="main-content"
        :root="root"
      ></slot>
    </div>
  </div>
</template>
