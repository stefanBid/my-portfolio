<script setup lang="ts">
import { computed } from 'vue';
import { useStyleStore } from '@/stores';

interface Range {
  min: number;
  max: number;
}

interface BaseLevelBarProps {
  scale: 'decimal' | 'percentage';
  level: number;
  label?: string;
}
const props = defineProps<BaseLevelBarProps>();

// Store Declarations
const styleStore = useStyleStore();

// Feature 1: Level Bar

const RANGE_MAP: Record<string, Range> = {
  percentage: {
    min: 0,
    max: 100,
  },
  decimal: {
    min: 0,
    max: 10,
  },
};

const getLevelBarWidth = computed(() => {
  const r = RANGE_MAP[props.scale];
  const level = Math.max(r.min, Math.min(r.max, props.level));
  return `${((level - r.min) / (r.max - r.min)) * 100}%`;
});

const getScore = computed(() => {
  const r = RANGE_MAP[props.scale];
  const level = Math.max(r.min, Math.min(r.max, props.level));

  if (props.scale === 'percentage') {
    return `${level.toFixed(1)}%`;
  } else {
    if (level === r.max) {
      return `${level} / ${r.max}`;
    }
    return `${level.toFixed(1)} / ${r.max}`;
  }
});
</script>

<template>
  <div v-bind="$attrs" class="flex flex-col">
    <span v-if="props.label" :class="[styleStore.textSizeXS]" class="text-white font-roboto">
      {{ props.label }}
    </span>
    <div class="flex items-center">
      <div
        :class="{
          'h-2.5':
            styleStore.activeBreakpoint !== 'xs' &&
            styleStore.activeBreakpoint !== 'sm' &&
            styleStore.activeBreakpoint !== 'md',
          'h-2':
            styleStore.activeBreakpoint === 'md' ||
            styleStore.activeBreakpoint === 'xs' ||
            styleStore.activeBreakpoint === 'sm',
        }"
        class="relative flex-1 overflow-hidden border-2 rounded-full bg-sb-tertiary-200 border-sb-tertiary-200"
      >
        <div
          class="absolute top-0 left-0 h-full bg-sb-tertiary-100"
          :style="{ width: getLevelBarWidth }"
        ></div>
      </div>
      <span :class="[styleStore.textSizeXS]" class="ml-2 text-white font-roboto">
        {{ getScore }}
      </span>
    </div>
  </div>
</template>
