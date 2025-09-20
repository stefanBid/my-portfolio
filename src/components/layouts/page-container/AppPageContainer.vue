<script setup lang="ts">
import { onMounted, ref } from 'vue';

import MdiChevronDoubleDown from '~icons/mdi/chevron-double-down';

interface PageContainerProps {
  pageIntroText?: string;
}

const props = withDefaults(defineProps<PageContainerProps>(), {
  pageIntroText: 'Page Intro Text',
});

// Feature 1: Transition
const show = ref(false);

onMounted(() => {
  show.value = true;
});
</script>

<template>
  <div class="container-p transition-all duration-300 ease-in-out">
    <div
      class="flex h-screen flex-col items-center justify-center pt-14 sm:pt-[3.75rem] md:pt-16 lg:pt-20"
    >
      <transition name="stretch">
        <h1
          v-if="show"
          class="text-center text-white whitespace-normal transition-all duration-300 ease-in-out font-bebas text-size-xxl"
        >
          {{ props.pageIntroText }}
        </h1>
      </transition>
      <transition name="shutter">
        <MdiChevronDoubleDown
          v-if="show"
          class="transition-all duration-300 ease-in-out text-sb-tertiary-100 animate-pulse icon-size-xxl"
        />
      </transition>
    </div>
    <div
      class="flex flex-col py-14 sm:py-[3.75rem] md:py-16 lg:py-20 gap-20 sm:gap-26 md:gap-32 lg:gap-40"
    >
      <slot name="page-content"></slot>
    </div>
  </div>
</template>
