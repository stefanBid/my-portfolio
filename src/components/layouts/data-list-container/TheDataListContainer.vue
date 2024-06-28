<script setup lang="ts">
import { BookmarkSlashIcon } from '@heroicons/vue/24/outline';
import { BookmarkIcon } from '@heroicons/vue/24/solid';
import { onBeforeMount, ref, useSlots } from 'vue';

import { useCommonStyleSingleton } from '@/hooks';
interface TheDataListContainerProps {
  heightPx?: number;
  widthPx?: number | 'full';
  initialMenuState?: boolean;
}
const props = withDefaults(defineProps<TheDataListContainerProps>(), {
	widthPx: 'full',
	heightPx: 500,
	initialMenuState: true,
});

const slot = useSlots();

// Feature 1: Manage Style Classes
const { xs, sm, md } = useCommonStyleSingleton();

const isOpenMenu = ref(false);

const toggleMenu = () => {
	isOpenMenu.value = !isOpenMenu.value;
};

onBeforeMount(() => {
	isOpenMenu.value = props.initialMenuState;
});

</script>

<template>
  <div
    id="main-content"
    :style="{ height: `${props.heightPx}px`, width: props.widthPx !== 'full' ? `${props.widthPx}px` : '100%' }"
    class="flex overflow-hidden border-2 rounded-lg bg-secondary border-slate-700 "
  >
    <div
      id="left-side"
      :class="{
        'w-full p-6': isOpenMenu && (sm || xs || md),
        'w-0  border-none p-0': !isOpenMenu && (sm || xs || md),
        'w-1/3 p-6 ': !md && !sm && !xs,
      }"
      class="box-border relative flex flex-col h-full transition-all duration-200 ease-in-out rounded-r-md bg-slate-700 border-slate-700"
    >
      <div
        v-if="sm || xs || md"
        :class="{
          '-right-5 w-8': isOpenMenu,
          '-right-10 w-12': !isOpenMenu,
        }"
        class="absolute z-20 inline-flex items-center justify-center px-2 py-1 transition-all duration-300 ease-in-out bg-white rounded-r-lg rounded-l-md size-fit top-6 hover:cursor-pointer"
        @click="toggleMenu"
      >
        <component
          :is="isOpenMenu ? BookmarkSlashIcon : BookmarkIcon"

          class="-rotate-90 text-slate-700 size-6 shrink-0"
        />
      </div>
      <div
        v-if="slot['left-side-header']"
        :class="{
          'opacity-0': !isOpenMenu && (sm || xs || md),
          'opacity-100': isOpenMenu && (sm || xs || md),
        }"
        class="w-full mb-6 transition-all duration-300 ease-in-out"
      >
        <slot name="left-side-header"></slot>
      </div>
      <div
        :class="{
          'opacity-0': !isOpenMenu && (sm || xs || md),
          'opacity-100': isOpenMenu && (sm || xs || md),
        }"
        class="flex flex-col flex-1 w-full overflow-hidden transition-all duration-300 ease-in-out"
      >
        <slot name="left-side"></slot>
      </div>
    </div>
    <div
      id="right-side"
      :class="{
        'opacity-0': !isOpenMenu && (sm || xs || md),
        'opacity-100': isOpenMenu && (sm || xs || md),
      }"
      class="flex flex-col flex-1 h-full py-2 pl-6 overflow-hidden"
    >
      <slot name="right-side"></slot>
    </div>
  </div>
</template>
