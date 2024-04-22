<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useGlobalBreakpoints } from '@/hooks';

import { ChevronDoubleDownIcon } from '@heroicons/vue/24/solid';

interface PageHeadingProps {
  title: string;
}

const props = defineProps<PageHeadingProps>();

// Feature 0: Transition
const show = ref(false);

onMounted(() => {
	show.value = true;
});

// Feature 1: Manage Style Classes
const { xs, sm, md } = useGlobalBreakpoints();

const headingPadding = computed(() => {
	if (xs.value || sm.value) { return 'p-sb-side-sm'; }
	if (md.value) { return 'p-sb-side-base'; }
	return 'p-sb-side-lg';
});

const textSize = computed(() => {
	if (xs.value || sm.value) { return 'text-sb-4xl'; }
	if (md.value) { return 'text-sb-6xl'; }
	return 'text-sb-7xl';
});

</script>

<template>
  <div
    v-bind="$attrs"
    class="h-screen pt-20 "
  >
    <div
      :class="[headingPadding]"
      class="flex flex-col items-center justify-center h-full p-8 bg-main gap-x-4"
    >
      <transition name="stretch">
        <h1
          v-if="show"
          :class="[textSize]"
          class="text-center text-white whitespace-normal transition-all duration-300 ease-in-out font-bebas "
        >
          {{ props.title }}
        </h1>
      </transition>
      <transition name="shutter">
        <ChevronDoubleDownIcon
          v-if="show"
          class="mt-4 text-white transform size-14 animate-pulse"
        />
      </transition>
    </div>
  </div>
</template>
