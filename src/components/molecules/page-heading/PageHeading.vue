<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getTransition } from '@/utils';
import { useGlobalBreakpoints } from '@/hooks';

import { ChevronDoubleDownIcon } from '@heroicons/vue/24/solid';

interface PageHeadingProps {
  title: string;
}

const props = defineProps<PageHeadingProps>();

const { xs, sm, md } = useGlobalBreakpoints();

const show = ref(false);

const transitionObj = getTransition('stretch');
const transitionObj2 = getTransition('shutter');

onMounted(() => {
	show.value = true;
});
</script>

<template>
  <div class="h-screen pt-20 ">
    <div class="flex flex-col items-center justify-center h-full p-8 bg-main gap-x-4">
      <transition
        :enter-active-class="transitionObj.enterActiveClass"
        :enter-from-class="transitionObj.enterFromClass"
        :enter-to-class="transitionObj.enterToClass"
        :leave-active-class="transitionObj.leaveActiveClass"
        :leave-from-class="transitionObj.leaveFromClass"
        :leave-to-class="transitionObj.leaveToClass"
      >
        <h1
          v-if="show"
          :class="{
            'text-[5rem]': !xs && !sm && !md,
            'text-[4rem]': xs || sm || md,
          }"
          class="text-center text-white whitespace-normal transition-all duration-300 ease-in-out font-bebas "
        >
          {{ props.title }}
        </h1>
      </transition>
      <transition
        :enter-active-class="transitionObj2.enterActiveClass"
        :enter-from-class="transitionObj2.enterFromClass"
        :enter-to-class="transitionObj2.enterToClass"
        :leave-active-class="transitionObj2.leaveActiveClass"
        :leave-from-class="transitionObj2.leaveFromClass"
        :leave-to-class="transitionObj2.leaveToClass"
      >
        <ChevronDoubleDownIcon
          v-if="show"
          class="mt-4 text-white transform size-14 animate-pulse"
        />
      </transition>
    </div>
  </div>
</template>
