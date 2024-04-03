<script setup lang="ts">

import { useGlobalBreakpoints } from '@/hooks';

interface CustomButtonProps {
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

const props = withDefaults(defineProps<CustomButtonProps>(), {
	disabled: false,
	variant: 'primary',
});

const { xs, sm, md } = useGlobalBreakpoints();
</script>

<template>
  <button
    v-bind="$attrs"
    type="button"
    class="inline-flex items-center justify-center px-8 py-4 font-medium truncate transition-all duration-300 ease-in-out border border-white rounded-full outline-none gap-x-2 ring-0 font-roboto"
    :class="{
      'pointer-events-none opacity-50': props.disabled,
      ' bg-main text-white hover:text-main hover:bg-white ': props.variant === 'primary',
      'bg-white text-main hover:text-white hover:bg-main': props.variant === 'secondary',
      'text-xl': !xs && !sm && !md,
      'text-lg': md,
      'text-base': sm || xs,
    }"
  >
    <slot></slot>
  </button>
</template>