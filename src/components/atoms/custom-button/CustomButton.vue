<script setup lang="ts">
import type { Component, FunctionalComponent } from 'vue';

import { useCommonStyleSingleton } from '@/hooks';

interface CustomButtonProps {
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  icon?: FunctionalComponent | Component | string;
  customDimensions?: boolean;
}

const props = withDefaults(defineProps<CustomButtonProps>(), {
	disabled: false,
	variant: 'primary',
	icon: undefined,
	customDimensions: false,
});

// Feature 0: Manage Style Classes
const { xs, sm, md } = useCommonStyleSingleton();
</script>

<template>
  <button
    v-bind="$attrs"
    type="button"
    class="inline-flex items-center justify-center overflow-x-hidden font-medium truncate transition-all duration-300 ease-in-out border-2 border-white rounded-full outline-none gap-x-2 ring-0 font-roboto"
    :class="[
      {
        'pointer-events-none opacity-50': props.disabled,
        'bg-secondary text-white hover:text-main hover:bg-white ': props.variant === 'primary',
        'bg-white text-main hover:text-white hover:bg-secondary': props.variant === 'secondary',
      },

      {
        'py-4 px-8': !props.customDimensions && !xs && !sm && !md,
        'py-3 px-6': !props.customDimensions && md,
        'py-2 px-4': !props.customDimensions && xs || sm,
        'text-sb-lg': !xs && !sm && !md,
        'text-sb-base': md,
        'text-sb-sm': sm || xs,
      }
    ]"
  >
    <slot></slot>
    <component
      :is="props.icon"
      class="shrink-0"
      :class="{
        'size-6': !xs && !sm && !md,
        'size-5': md,
        'size-4': xs || sm,
      }"
    />
  </button>
</template>