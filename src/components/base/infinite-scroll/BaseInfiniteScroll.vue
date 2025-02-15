<script setup lang="ts">
import { type Component, type FunctionalComponent, computed, onMounted, ref, watch } from 'vue';
import { nanoid } from 'nanoid';
import { useInfiniteScroll } from '@vueuse/core';
import { useStyleStore } from '@/stores';
import { ArchiveBoxXMarkIcon } from '@heroicons/vue/24/outline';

interface InfiniteScrollProps {
  items: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }[];
  initialCount?: number;
  batchSize?: number;
  delayLoadTime?: number;
  noDataSettings?: {
    message: string;
    icon?: Component | FunctionalComponent | string;
  };
}

const props = withDefaults(defineProps<InfiniteScrollProps>(), {
  initialCount: 10,
  batchSize: 10,
  delayLoadTime: 1000,
  onLoadMore: undefined,
  elementsLayoutOrganizations: 'flex-wrap',
  noDataSettings: () => ({
    message: 'No data found',
    icon: ArchiveBoxXMarkIcon,
  }),
});

// Store Declarations
const styleStore = useStyleStore();

// Feature 1: Manage Infinite Scroll Properties
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const visibleItems = ref<{ id: string; item: any }[]>([]);
const containerRef = ref<HTMLElement | null>(null);
const isLoading = ref(false);

const showLoader = computed(() => {
  return isLoading.value && visibleItems.value.length !== props.items.length;
});

const loadMoreItems = (): void => {
  if (isLoading.value || visibleItems.value.length >= props.items.length) {
    return; // Stop se già in caricamento o tutti gli elementi sono stati caricati
  }

  isLoading.value = true;

  setTimeout(() => {
    const currentLength = visibleItems.value.length;
    const nextItems = props.items
      .slice(currentLength, currentLength + props.batchSize)
      .map((item) => ({
        id: nanoid(),
        item,
      }));

    visibleItems.value = [...visibleItems.value, ...nextItems];
    isLoading.value = false;
  }, props.delayLoadTime); // Ritardo configurabile
};

useInfiniteScroll(
  containerRef,
  () => {
    loadMoreItems();
  },
  { distance: 100 },
);

// Lifecycle Hooks

watch(
  () => [props.items, props.initialCount, props.batchSize],
  () => {
    visibleItems.value = props.items.slice(0, props.initialCount).map((item) => ({
      id: nanoid(),
      item,
    }));
  },
  { deep: true },
);

onMounted(() => {
  if (props.items.length > 0) {
    visibleItems.value = props.items.slice(0, props.initialCount).map((item) => ({
      id: nanoid(),
      item,
    }));
  }
});
</script>

<template>
  <div
    ref="containerRef"
    v-bind="$attrs"
    :class="[styleStore.elementTotalGapM, styleStore.elementTotalPaddingM]"
    class="flex flex-col w-full h-full overflow-x-hidden overflow-y-auto transition-all duration-300 ease-in-out scrollbar-gutter-stable"
  >
    <!-- Items -->
    <div
      v-if="visibleItems.length > 0"
      class="grid"
      :class="[
        styleStore.elementTotalGapM,
        {
          'grid-cols-1':
            styleStore.activeBreakpoint === 'xs' || styleStore.activeBreakpoint === 'sm',
          'grid-cols-2':
            styleStore.activeBreakpoint === 'md' || styleStore.activeBreakpoint === 'lg',
          'grid-cols-3':
            styleStore.activeBreakpoint !== 'xs' &&
            styleStore.activeBreakpoint !== 'sm' &&
            styleStore.activeBreakpoint !== 'md' &&
            styleStore.activeBreakpoint !== 'lg',
        },
      ]"
    >
      <slot
        v-for="item in visibleItems"
        :key="item.id"
        :item="item.item"
        :container-root-ref="containerRef"
      ></slot>
    </div>
    <transition-group name="scale-and-fade-fast">
      <!-- Loader -->
      <div v-if="showLoader">
        <slot name="loading-section"></slot>
      </div>
      <!-- No data message -->
      <div
        v-if="visibleItems.length === 0 && !showLoader"
        class="flex flex-col items-center justify-center flex-1"
      >
        <component
          :is="props.noDataSettings.icon"
          :class="[styleStore.iconSizeL]"
          class="transition-all duration-300 ease-in-out text-sb-tertiary-100 shrink-0"
        />
        <span
          :class="[styleStore.textSizeXL]"
          class="w-full text-center text-white truncate transition-all duration-300 ease-in-out font-bebas"
        >
          {{ props.noDataSettings.message }}
        </span>
      </div>
    </transition-group>
  </div>
</template>
