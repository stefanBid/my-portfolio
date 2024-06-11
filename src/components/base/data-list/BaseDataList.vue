<script setup lang="ts" generic="T extends BaseDataItems">

import { ref } from 'vue';

import { useCommonStyleSingleton, useIntersectionObserver } from '@/hooks';

import type { BaseDataItems } from './dataList.types';

interface DataListProps {
  data: T[];
  customWidthCss?: string;
  customHeightCss?: string;
}

const props = withDefaults(defineProps<DataListProps>(), {
	customWidthCss: 'w-[1200px] max-w-[1200px]',
	customHeightCss: 'h-[600px] max-h-[600px]',
});

// Feaure 0: Manage Breakpoints and Style Classes
const { xs, sm, md } = useCommonStyleSingleton();

// Feature 1: Manage Visibility for effects
const { root, isVisible, onIntersectionObserver, vIntersectionObserver } = useIntersectionObserver(props.data.length);

// Feature 2: Manage Item Selection
const selectedItem = ref<T>();
const handleSelectItem = (item: T) => {
	if (selectedItem.value && selectedItem.value?.id === item.id) {
		selectedItem.value = undefined;
	} else {
		selectedItem.value = item;
	}

};

</script>

<template>
  <div
    id="data-list"
    :class="[props.customWidthCss, props.customHeightCss]"
  >
    <div
      id="data-list-container"
      class="box-border flex w-full h-full border-2 rounded-lg border-slate-700 bg-secondary "
    >
      <div
        id="data-list-left-section"
        class="w-[35%] p-6"
      >
        <div
          ref="root"
          class="flex flex-col w-full h-full pr-6 overflow-y-auto gap-y-6"
        >
          <div
            v-for="(item, index) in props.data"
            :key="item.id"
            v-intersection-observer="[onIntersectionObserver(index), {root, threshold: 0.5}]"
            tabindex="0"
            :class="{
              'opacity-0 w-0': !isVisible[index],
              'opacity-100 w-full': isVisible[index],
              'border-white bg-white ': selectedItem && selectedItem.id === item.id,
              'border-slate-700/50 bg-slate-700/50 hover:bg-slate-700 hover:border-slayte-700 ': (selectedItem && selectedItem.id !== item.id) || !selectedItem,
              'focus-visible:ring-2 ring-white ring-0': !xs && !sm && !md,
            }"
            class="flex items-center px-6 py-4 transition-all duration-300 ease-in-out border-2 rounded-full outline-none gap-x-2 font-roboto hover:cursor-pointer hover:shadow hover:shadow-slate-700/50 "
            @click="handleSelectItem(item)"
          >
            <div class="shrink-0">
              <slot
                name="item-extra-box"
                :single-data-item="item"
              ></slot>
            </div>

            <span
              :class="{
                'text-black font-bold ': selectedItem && selectedItem.id === item.id,
                'text-white': (selectedItem && selectedItem.id !== item.id) || !selectedItem,
              }"
              class="flex-1 ml-2 truncate transition-all duration-300 ease-in-out text-sb-2xl text-kl-xs font-bebas"
            >
              {{ item.name }}
            </span>
          </div>
        </div>
      </div>
      <div
        id="data-list-right-section"
        class="relative w-[65%] p-6"
      >
        <transition name="scale-and-fade-fast">
          <div
            v-if="selectedItem"
            class="w-full h-full"
          >
            <slot
              name="content-box"
              :selected-item="selectedItem"
            ></slot>
          </div>
        </transition>
        <transition name="scale-and-fade-fast">
          <div
            v-if="!selectedItem "
            class="flex items-center justify-center h-full "
          >
            <div class="w-1/2 p-6 border border-dashed rounded-sm border-kl-gray-200">
              <p class="font-medium text-center text-white font-roboto ">
                Select an item to view details
              </p>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>