<script setup lang="ts">
import type { Component, FunctionalComponent } from 'vue';

import { useCommonStyleSingleton } from '@/hooks';

interface BaseButtonProps {
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  icon?: FunctionalComponent | Component | string;
  noStyle?: boolean;
  contentSize?: 'small' | 'medium';
}

const props = withDefaults(defineProps<BaseButtonProps>(), {
	disabled: false,
	variant: 'primary',
	icon: undefined,
	noStyle: false,
	contentSize: 'medium',
});

// Feature 0: Manage Style Classes
const { activeBreakpoint, textSizeS, textSizeXS, iconSizeS, iconSizeXS } = useCommonStyleSingleton();
</script>

<template>
  <button
    v-bind="$attrs"
    type="button"
    class="inline-flex items-center outline-none ring-0 focus-visible:ring-0 transition-sb-slow"
    :tabindex="props.disabled ? -1 : 0"
    :class="[
      props.contentSize === 'medium' ? textSizeS: textSizeXS,{
        'gap-x-2 font-medium justify-center border-2 rounded-full font-roboto': !props.noStyle,
        'pointer-events-none opacity-50': props.disabled,
        'bg-transparent/50 text-white border-white hover:text-black hover:bg-sb-tertiary-100 hover:border-sb-tertiary-100 hover:shadow-sb-ring hover:shadow-sb-tertiary-100/80 active:text-black active:bg-sb-tertiary-200 active:border-sb-tertiary-200 active:shadow-sb-ring active:shadow-sb-tertiary-200/80 focus-visible:text-black focus-visible:bg-sb-tertiary-100 focus-visible:border-sb-tertiary-100 focus-visible:shadow-sb-ring focus-visible:shadow-sb-tertiary-100/80': props.variant === 'primary' && !props.noStyle,
        'bg-white text-main hover:text-white hover:bg-secondary': props.variant === 'secondary' && !props.noStyle,
        'py-4 px-8': !props.noStyle && (activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm' && activeBreakpoint !== 'md'),
        'py-3 px-6': !props.noStyle && activeBreakpoint === 'md',
        'py-2 px-4': !props.noStyle && (activeBreakpoint === 'xs' || activeBreakpoint === 'sm'),
      }]
    "
  >
    <slot></slot>
    <component
      :is="props.icon"
      class="shrink-0"
      :class="[props.contentSize === 'medium' ? iconSizeS : iconSizeXS]"
    />
  </button>
</template>