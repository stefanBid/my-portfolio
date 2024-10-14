<script setup lang="ts">
import { computed } from 'vue';

import { useCommonStyleSingleton } from '@/hooks';

interface Rating {
  min: number;
  max: number;
}

interface BaseLevelBarProps {
  scale: 'decimal' | 'percentage';
  level: number;
  label?: string;
}
const props = defineProps<BaseLevelBarProps>();

// Feature 0: Manage Style Classes
const { activeBreakpoint, textSizeXS } = useCommonStyleSingleton();

// Feature 1: Level Bar

const RATING_MAP: Record<string, Rating> = {
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
	const rating = RATING_MAP[props.scale];
	const level = Math.max(rating.min, Math.min(rating.max, props.level));
	return `${(level - rating.min) / (rating.max - rating.min) * 100}%`;
});

const getScore = computed(() => {
	const rating = RATING_MAP[props.scale];
	const level = Math.max(rating.min, Math.min(rating.max, props.level));

	if (props.scale === 'percentage') {
		return `${level.toFixed(1)}%`;
	} else {
		if (level === rating.max) {
			return `${level} / ${rating.max}`;
		}
		return `${level.toFixed(1)} / ${rating.max}`;
	}
});
</script>

<template>
  <div
    v-bind="$attrs"
    class="flex flex-col"
  >
    <span
      v-if="props.label"
      :class="[textSizeXS]"
      class="text-white  font-roboto"
    > {{ props.label }}</span>
    <div class="flex items-center">
      <div
        :class="{
          'h-2.5': activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm' && activeBreakpoint !== 'md',
          'h-2': activeBreakpoint === 'md' || activeBreakpoint === 'xs' || activeBreakpoint === 'sm',
        }"
        class="relative flex-1 overflow-hidden border-2 rounded-full bg-sb-tertiary-200 border-sb-tertiary-200"
      >
        <div
          class="absolute top-0 left-0 h-full bg-sb-tertiary-100"
          :style="{ width: getLevelBarWidth }"
        ></div>
      </div>
      <span
        :class="[textSizeXS]"
        class="ml-2 text-white font-roboto"
      >
        {{ getScore }}
      </span>
    </div>
  </div>
</template>