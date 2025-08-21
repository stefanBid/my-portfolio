<script setup lang="ts">
import { computed } from 'vue';
import { useStyleStore } from '@/stores';

interface Range {
  min: number;
  max: number;
}

interface BaseLevelBarProps {
  level: number;
  scale?: '5-base' | '10-base' | 'percentage';
  label?: string;
}
const props = withDefaults(defineProps<BaseLevelBarProps>(), {
  scale: '5-base',
  label: undefined,
});

// Store Declarations
const styleStore = useStyleStore();

// Feature 1: Level Bar

const RANGE_MAP: Record<string, Range> = {
  percentage: {
    min: 0,
    max: 100,
  },
  '10-base': {
    min: 0,
    max: 10,
  },
  '5-base': {
    min: 0,
    max: 5,
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
    if (level === r.max || level === r.min) {
      return `${level}%`;
    }
    return `${level.toFixed(1)}%`;
  } else {
    if (level === r.max || level === r.min) {
      return `${level} / ${r.max}`;
    }
    return `${level.toFixed(1)} / ${r.max}`;
  }
});
</script>

<template>
  <div v-bind="$attrs" class="flex flex-col transition-all duration-300 ease-in-out">
    <span v-if="props.label" :class="[styleStore.textSizeXS]" class="mb-0.5 text-white font-roboto">
      {{ props.label }}
    </span>
    <div class="flex items-center">
      <div
        :class="{
          'h-3':
            styleStore.activeBreakpoint !== 'xs' &&
            styleStore.activeBreakpoint !== 'sm' &&
            styleStore.activeBreakpoint !== 'md',
          'h-2.5': styleStore.activeBreakpoint === 'md',
          'h-2': styleStore.activeBreakpoint === 'sm' || styleStore.activeBreakpoint === 'xs',
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
