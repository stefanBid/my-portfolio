<script setup lang="ts">
import { CubeTransparentIcon } from '@heroicons/vue/24/outline';
import type { Component, FunctionalComponent } from 'vue';

import { useCommonStyleSingleton } from '@/hooks';

interface SkillCardProps {
  skillIcon?: Component | FunctionalComponent | string;
  textContent: string;
  isSelected?: boolean;
}

const props = withDefaults(defineProps<SkillCardProps>(), {
	isSelected: false,
	skillIcon: CubeTransparentIcon
});

// Feature 1: Manage Style Classes
const { activeBreakpoint } = useCommonStyleSingleton();

</script>

<template>
  <div
    v-bind="$attrs"
    :class="{
      'bg-white text-black border-white scale-95': props.isSelected,
      'text-white border-slate-700 bg-secondary hover:bg-slate-700 hover:border-secondary': !props.isSelected,
    }"
    class="box-border inline-flex items-center px-8 py-4 transition-all duration-300 ease-in-out border-2 rounded-full shadow-md font-roboto hover:cursor-pointer gap-x-6"
  >
    <component
      :is="props.skillIcon"
      :class="{
        'size-10': activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm' && activeBreakpoint !== 'md',
        'size-8': activeBreakpoint === 'md',
        'size-6': activeBreakpoint === 'xs' || activeBreakpoint === 'sm',
        'text-white': !props.isSelected,
        'text-black': props.isSelected,
      }"
      class="transition-all duration-300 ease-in-out shrink-0"
    />
    <span
      :class="{
        'text-sb-lg': activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm' && activeBreakpoint !== 'md',
        'text-sb-base': activeBreakpoint === 'md',
        'text-sb-sm': activeBreakpoint === 'xs' || activeBreakpoint === 'sm',
      }"
      class="flex-1 truncate"
    >
      {{ props.textContent }}
    </span>
  </div>
</template>