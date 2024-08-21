<script setup lang="ts">

import { useCommonStyleSingleton } from '@/hooks';

// Feature 0: Manage Style Classes
const { containerPadding, containerGapElements } = useCommonStyleSingleton();
</script>

<template>
  <div
    class="flex flex-col min-h-0 gap-y-8"
    :class="[containerPadding]"
  >
    <div class="h-screen pt-20">
      <slot name="intro-section"></slot>
    </div>
    <div
      class="flex flex-col pb-20"
      :class="[containerGapElements]"
    >
      <slot
        name="main-content"
      ></slot>
    </div>
  </div>
</template>
