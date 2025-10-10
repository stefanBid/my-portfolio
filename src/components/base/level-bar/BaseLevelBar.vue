<script setup lang="ts">
import { computed } from 'vue';

interface Range {
  min: number;
  max: number;
}

interface BaseLevelBarProps {
  level: number;
  scale?: '5-base' | '10-base' | 'percentage';
  label?: string;
}

// Input / Output (Props / Emits)
const props = withDefaults(defineProps<BaseLevelBarProps>(), {
  scale: '5-base',
  label: undefined,
});

// State

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

// Template Data
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
} as const;
</script>

<template>
  <div v-bind="$attrs" class="flex flex-col">
    <span
      v-if="props.label"
      class="mb-0.5 text-white font-roboto text-size-xs transition-all duration-300 ease-in-out"
    >
      {{ props.label }}
    </span>
    <div class="flex items-center">
      <div
        class="h-2 sm:h-2.5 md:h-2.5 lg:h-3 relative flex-1 overflow-hidden border-2 rounded-full bg-sb-tertiary-200 border-sb-tertiary-200 transition-all duration-300 ease-in-out"
      >
        <div
          class="absolute top-0 left-0 h-full bg-sb-tertiary-100"
          :style="{ width: getLevelBarWidth }"
        ></div>
      </div>
      <span class="ml-2 text-white font-roboto text-size-xs">
        {{ getScore }}
      </span>
    </div>
  </div>
</template>
