<script setup lang="ts">
import { ChevronDoubleDownIcon } from '@heroicons/vue/24/solid';
import { onMounted, ref } from 'vue';

import { useCommonStyleSingleton } from '@/hooks';

interface BaseHeroProps {
  title: string;
}

const props = defineProps<BaseHeroProps>();

// Feature 0: Transition
const show = ref(false);

onMounted(() => {
	show.value = true;
});

// Feature 1: Manage Style Classes
const { textSizeXXL, activeBreakpoint } = useCommonStyleSingleton();

</script>

<template>
  <div
    class="flex flex-col items-center justify-center w-full h-full p-8"
  >
    <transition name="stretch">
      <h1
        v-if="show"
        :class="[textSizeXXL]"
        class="text-center text-white whitespace-normal transition-all duration-300 ease-in-out font-bebas "
      >
        {{ props.title }}
      </h1>
    </transition>
    <transition name="shutter">
      <ChevronDoubleDownIcon
        v-if="show"
        :class="{
          'size-12': activeBreakpoint === 'xs' || activeBreakpoint === 'sm',
          'size-14': activeBreakpoint === 'md',
          'size-16': activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm' && activeBreakpoint !== 'md',
        }"
        class="mt-4 transform text-sb-tertiary-100 animate-pulse"
      />
    </transition>
  </div>
</template>
