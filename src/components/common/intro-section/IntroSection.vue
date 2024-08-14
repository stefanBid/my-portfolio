<script setup lang="ts">
import { ChevronDoubleDownIcon } from '@heroicons/vue/24/solid';
import { onMounted, ref } from 'vue';

import { useCommonStyleSingleton } from '@/hooks';

interface IntroSectionProps {
  title: string;
}

const props = defineProps<IntroSectionProps>();

// Feature 0: Transition
const show = ref(false);

onMounted(() => {
	show.value = true;
});

// Feature 1: Manage Style Classes
const { h1Size, containerPadding, xs, sm, md } = useCommonStyleSingleton();

</script>

<template>
  <div
    v-bind="$attrs"
    class="h-full"
  >
    <div
      :class="[containerPadding]"
      class="flex flex-col items-center justify-center h-full p-8 bg-main gap-x-4"
    >
      <transition name="stretch">
        <h1
          v-if="show"
          :class="[h1Size]"
          class="text-center text-white whitespace-normal transition-all duration-300 ease-in-out font-bebas "
        >
          {{ props.title }}
        </h1>
      </transition>
      <transition name="shutter">
        <ChevronDoubleDownIcon
          v-if="show"
          :class="{
            'size-12': xs || sm,
            'size-14': md,
            'size-16': !xs && !sm && !md,
          }"
          class="mt-4 text-white transform animate-pulse"
        />
      </transition>
    </div>
  </div>
</template>
