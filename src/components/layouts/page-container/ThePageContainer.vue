<script setup lang="ts">

import { ChevronDoubleDownIcon } from '@heroicons/vue/24/solid';
import { onMounted, ref, useSlots } from 'vue';

import { useCommonStyleSingleton } from '@/hooks';

interface PageContainerProps {
  pageIntroText?: string;
}

const props = withDefaults(defineProps<PageContainerProps>(), {
	pageIntroText: 'Page Intro Text',
});

// Feature 0: Manage Style Classes
const { containerPadding, containerGapElements, textSizeXXL, iconSizeL } = useCommonStyleSingleton();
const slots = useSlots();

// Feature 1: Transition
const show = ref(false);

onMounted(() => {
	show.value = true;
});
</script>

<template>
  <div
    class="flex flex-col min-h-0"
    :class="[containerPadding]"
  >
    <div class="flex flex-col items-center justify-center h-screen px-8 pt-20 pb-8 ">
      <transition name="stretch">
        <h1
          v-if="show"
          :class="[textSizeXXL]"
          class="text-center text-white whitespace-normal font-bebas "
        >
          {{ props.pageIntroText }}
        </h1>
      </transition>
      <transition name="shutter">
        <ChevronDoubleDownIcon
          v-if="show"
          :class="[iconSizeL]"
          class="mt-4 text-sb-tertiary-100 animate-pulse"
        />
      </transition>
    </div>
    <div
      class="flex flex-col"
      :class="[containerGapElements, {
        'pb-20 mt-8': slots['page-content'],
      }]"
    >
      <slot
        name="page-content"
      ></slot>
    </div>
  </div>
</template>
