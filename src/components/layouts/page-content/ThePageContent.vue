<script setup lang="ts">

import { useCommonStyleSingleton } from '@/hooks';

// Feature 0: Manage Style Classes
const { containerStyle, containerPadding, containerGapElements } = useCommonStyleSingleton();

</script>

<template>
  <div
    v-bind="$attrs"
    :style="containerStyle"
    class="h-full mt-20"
    :class="[containerPadding]"
  >
    <slot name="intro-section"></slot>
    <div
      class="flex flex-col pt-5 pb-10"
      :class="[containerGapElements]"
    >
      <slot
        name="main-content"
      ></slot>
    </div>
  </div>
</template>