<script setup lang="ts">
import MdiChevronDoubleDown from '~icons/mdi/chevron-double-down';
import { onMounted, ref } from 'vue';
import { useStyleStore } from '@/stores';

interface PageContainerProps {
  pageIntroText?: string;
}

const props = withDefaults(defineProps<PageContainerProps>(), {
  pageIntroText: 'Page Intro Text',
});

// Store Declarations
const styleStore = useStyleStore();

// Feature 1: Transition
const show = ref(false);

onMounted(() => {
  show.value = true;
});
</script>

<template>
  <div class="flex flex-col min-h-0" :class="[styleStore.containerPadding]">
    <div class="flex flex-col items-center justify-center h-screen py-20">
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
        <MdiChevronDoubleDown
          v-if="show"
          :class="[styleStore.iconSizeXXL]"
          class="transition-all duration-300 ease-in-out text-sb-tertiary-100 animate-pulse"
        />
      </transition>
    </div>
    <div
      class="flex flex-col"
      :class="[
        {
          'pb-20 gap-y-20': $slots['page-content'],
        },
      ]"
    >
      <slot name="page-content"></slot>
    </div>
  </div>
</template>
