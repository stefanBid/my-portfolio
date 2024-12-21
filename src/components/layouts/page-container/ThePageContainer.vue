<script setup lang="ts">
import { ChevronDoubleDownIcon } from '@heroicons/vue/24/solid';
import { onMounted, ref, useSlots } from 'vue';
import { useStyleStore } from '@/stores';

interface PageContainerProps {
  pageIntroText?: string;
}

const props = withDefaults(defineProps<PageContainerProps>(), {
  pageIntroText: 'Page Intro Text',
});

// Store Declarations
const styleStore = useStyleStore();

// Hooks Declarations
const slots = useSlots();

// Feature 1: Transition
const show = ref(false);

onMounted(() => {
  show.value = true;
});
</script>

<template>
  <div class="flex flex-col min-h-0" :class="[styleStore.containerPadding]">
    <div class="flex flex-col items-center justify-center h-screen px-8 pt-20 pb-8">
      <transition name="stretch">
        <h1
          v-if="show"
          :class="[styleStore.textSizeXXL]"
          class="text-center text-white whitespace-normal transition-all duration-300 ease-in-out font-bebas"
        >
          {{ props.pageIntroText }}
        </h1>
      </transition>
      <transition name="shutter">
        <ChevronDoubleDownIcon
          v-if="show"
          :class="[styleStore.iconSizeL]"
          class="mt-4 text-sb-tertiary-100 animate-pulse"
        />
      </transition>
    </div>
    <div
      class="flex flex-col"
      :class="[
        styleStore.containerGapElements,
        {
          'pb-20 mt-8': slots['page-content'],
        },
      ]"
    >
      <slot name="page-content"></slot>
    </div>
  </div>
</template>
