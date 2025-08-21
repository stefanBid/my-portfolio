<script setup lang="ts">
import { computed } from 'vue';
import { useStyleStore } from '@/stores';

interface SkillDotsProps {
  value: number;
}

const props = defineProps<SkillDotsProps>();

const styleStore = useStyleStore();

const MAX = 5;

const rounded = computed(() => Math.round(props.value * 2) / 2);

const fillPercentFor = (n: number): string | number => {
  const full = Math.floor(rounded.value);
  if (n <= full) return '100%';
  if (n === full + 1 && !Number.isInteger(rounded.value)) return '50%';
  return '0%';
};
</script>

<template>
  <div class="flex gap-1 w-fit">
    <div
      v-for="n in MAX"
      key="n"
      :class="{
        'size-4':
          styleStore.activeBreakpoint !== 'xs' &&
          styleStore.activeBreakpoint !== 'sm' &&
          styleStore.activeBreakpoint !== 'md',
        'size-3':
          styleStore.activeBreakpoint === 'xs' ||
          styleStore.activeBreakpoint === 'sm' ||
          styleStore.activeBreakpoint === 'md',
      }"
      class="relative overflow-hidden transition-all duration-300 ease-in-out border rounded-full border-sb-tertiary-200 bg-sb-tertiary-200/50"
    >
      <div
        class="absolute inset-y-0 left-0 border-none bg-sb-tertiary-100"
        :style="{
          width: fillPercentFor(n),
        }"
      ></div>
    </div>
  </div>
</template>
