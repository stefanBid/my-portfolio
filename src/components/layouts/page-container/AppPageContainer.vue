<script setup lang="ts">
import { onMounted, ref } from 'vue';

import MdiChevronDoubleDown from '~icons/mdi/chevron-double-down';

interface PageContainerProps {
  pageIntroText?: string;
}

// Input / Output (Props / Emits)
const props = withDefaults(defineProps<PageContainerProps>(), {
  pageIntroText: 'Page Intro Text',
});

// State
const show = ref(false);

// Events
onMounted(() => {
  show.value = true;
});
</script>

<template>
  <div class="container-p">
    <div
      class="flex h-dvh flex-col items-center justify-center pt-14 sm:pt-[3.75rem] md:pt-16 lg:pt-20 animate-scale-in-big"
    >
      <h1
        class="text-center text-white whitespace-normal font-bebas text-size-xxl transition-all duration-300 ease-in-out"
      >
        {{ props.pageIntroText }}
      </h1>

      <MdiChevronDoubleDown
        v-if="show"
        class="transition-all duration-300 ease-in-out text-sb-tertiary-100 icon-size-xxl animate-bounce mt-6"
      />
    </div>
    <div
      class="flex flex-col py-14 sm:py-[3.75rem] md:py-16 lg:py-20 gap-20 sm:gap-26 md:gap-32 lg:gap-40"
    >
      <slot name="page-content"></slot>
    </div>
  </div>
</template>
