<script setup lang="ts">
import type { Component, FunctionalComponent } from 'vue';

import { useCommonStyleSingleton } from '@/hooks';

interface BaseCardProps {
  variant?: 'rounded' | 'square';
  icon: Component | FunctionalComponent | string;
  textContent: string;
}

const props = withDefaults(defineProps<BaseCardProps>(), {
	variant: 'rounded'
});

// Feature 1: Manage Style Classes
const { xs, sm, md } = useCommonStyleSingleton();

</script>

<template>
  <div
    v-bind="$attrs"
    :class="{
      'rounded-full': props.variant === 'rounded',
      'rounded-md': props.variant === 'square',
    }"
    class="box-border inline-flex items-center px-8 py-4 text-white transition-all duration-300 ease-in-out border-2 shadow-md font-roboto border-slate-700 bg-secondary hover:cursor-pointer gap-x-6"
  >
    <component
      :is="props.icon"
      :class="{
        'size-10': !xs && !sm && !md,
        'size-8': md,
        'size-6': xs || sm,

      }"
      class="text-white transition-all duration-300 ease-in-out shrink-0"
    />
    <span
      :class="{
        'text-sb-lg': !xs && !sm && !md,
        'text-sb-base': md,
        'text-sb-sm': xs || sm,
      }"
      class="flex-1 truncate"
    >
      {{ props.textContent }}
    </span>
  </div>
</template>