<script setup lang="ts">
import type { Component, FunctionalComponent } from 'vue';

import { useCommonStyleSingleton } from '@/hooks';

interface BaseButtonProps {
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  icon?: FunctionalComponent | Component | string;
  contentHorizontalOrientation?: 'center' | 'between';
  noStyle?: boolean;
}

const props = withDefaults(defineProps<BaseButtonProps>(), {
	disabled: false,
	variant: 'primary',
	icon: undefined,
	contentHorizontalOrientation: 'center',
	noStyle: false,
});

// Feature 0: Manage Style Classes
const { activeBreakpoint } = useCommonStyleSingleton();
</script>

<template>
  <button
    v-bind="$attrs"
    type="button"
    class="inline-flex items-center overflow-x-hidden transition-all duration-500 ease-in-out outline-none"
    :tabindex="props.disabled ? -1 : 0"
    :class="[
      {
        'gap-x-2 font-medium truncate border-2  rounded-full ring-0 font-roboto focus-visible:ring-0': !props.noStyle,
      },
      {
        'pointer-events-none opacity-50': props.disabled,
        'justify-between': props.contentHorizontalOrientation === 'between',
        'justify-center': props.contentHorizontalOrientation === 'center',
        'bg-transparent/50 text-white border-white hover:text-black hover:bg-sb-tertiary-100 hover:border-sb-tertiary-100 hover:shadow-[0_0_15px_5px_rgba(233,89,5,0.8)] active:text-black active:bg-sb-tertiary-200 active:border-sb-tertiary-200 active:shadow-[0_0_15px_5px_rgba(163,53,3,0.8)] focus-visible:text-black focus-visible:bg-sb-tertiary-100 focus-visible:border-sb-tertiary-100 focus-visible:shadow-[0_0_15px_5px_rgba(233,89,5,0.8)] ': props.variant === 'primary' && !props.noStyle,
        'bg-white text-main hover:text-white hover:bg-secondary': props.variant === 'secondary' && !props.noStyle,
      },

      {
        'py-4 px-8 text-sb-lg': !props.noStyle && (activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm' && activeBreakpoint !== 'md'),
        'py-3 px-6 text-sb-base': !props.noStyle && activeBreakpoint === 'md',
        'py-2 px-4 text-sb-sm ': !props.noStyle && (activeBreakpoint === 'xs' || activeBreakpoint === 'sm'),
      },
    ]"
  >
    <slot></slot>
    <component
      :is="props.icon"
      class="shrink-0 "
      :class="{
        'size-7': activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm' && activeBreakpoint !== 'md',
        'size-6': activeBreakpoint === 'md',
        'size-5': activeBreakpoint === 'xs' || activeBreakpoint === 'sm',
      }"
    />
  </button>
</template>