<script setup lang="ts">

import { useCommonStyleSingleton } from '@/hooks';

// Feature 0: Manage Style Classes
const { containerStyle, containerPadding, containerGapElements } = useCommonStyleSingleton();

</script>

<template>
  <div
    v-bind="$attrs"
    :style="containerStyle"
    :class="[containerPadding]"
  >
    <slot name="intro-section"></slot>
    <div
      class="flex flex-col mt-5 mb-10"
      :class="[containerGapElements]"
    >
      <slot
        name="main-content"
      ></slot>
    </div>
  </div>
</template>