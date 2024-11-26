<script setup lang="ts">
import { computed } from 'vue';
import { useStyleStore } from '@/stores';

interface Range {
  min: number;
  max: number;
}

interface BaseLevelBarProps {
  level: number;
  scale?: 'decimal' | 'percentage';
  label?: string;
  dataTestid?: string;
}
const props = withDefaults(defineProps<BaseLevelBarProps>(), {
  scale: 'decimal',
  label: undefined,
  dataTestid: 'base-level-bar',
});

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
  <div
    v-bind="$attrs"
    tabindex="0"
    class="flex flex-col border border-transparent rounded-md outline-0 focus-visible:border-white ring-0 focus-visible:ring-0 focus-visible:outline-0 transition-sb-slow"
  >
    <span
      v-if="props.label"
      :data-testid="`${props.dataTestid}-label`"
      :class="[styleStore.textSizeXS]"
      class="text-white font-roboto"
    >
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
          :data-testid="props.dataTestid"
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
