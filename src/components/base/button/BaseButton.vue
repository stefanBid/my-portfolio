<script setup lang="ts">
import type { Component, FunctionalComponent } from 'vue';
import { ArrowPathIcon } from '@heroicons/vue/24/outline';

import { useCommonStyleSingleton } from '@/hooks';

interface BaseButtonProps {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  variant?: 'white' | 'tertiary';
  loading?: boolean;
  icon?: FunctionalComponent | Component | string;
  noStyle?: boolean;
  contentSize?: 'small' | 'medium';
}

const props = withDefaults(defineProps<BaseButtonProps>(), {
  type: 'button',
  variant: 'tertiary',
  disabled: false,
  loading: false,
  icon: undefined,
  noStyle: false,
  contentSize: 'medium',
});

// Feature 0: Manage Style Classes
const { activeBreakpoint, textSizeS, textSizeXS, iconSizeS, iconSizeXS } =
  useCommonStyleSingleton();
</script>

<template>
  <button
    v-bind="$attrs"
    :type="props.type"
    class="inline-flex items-center outline-none ring-0 focus-visible:ring-0 transition-sb-slow"
    :tabindex="props.disabled || props.loading ? -1 : 0"
    y
    :class="[
      props.contentSize === 'medium' ? textSizeS : textSizeXS,
      {
        'gap-x-2 font-medium justify-center border-2 rounded-full font-roboto': !props.noStyle,
        'pointer-events-none opacity-50': props.disabled || props.loading,
        'bg-transparent/50 text-white border-white hover:text-black hover:bg-sb-tertiary-100 hover:border-sb-tertiary-100 hover:shadow-sb-ring hover:shadow-sb-tertiary-100/80 active:text-black active:bg-sb-tertiary-200 active:border-sb-tertiary-200 active:shadow-sb-ring active:shadow-sb-tertiary-200/80 focus-visible:text-black focus-visible:bg-sb-tertiary-100 focus-visible:border-sb-tertiary-100 focus-visible:shadow-sb-ring focus-visible:shadow-sb-tertiary-100/80':
          props.variant === 'tertiary' && !props.noStyle,
        'bg-white text-black border-white border-2 hover:text-white hover:bg-sb-secondary-100 hover:border-sb-secondary-100 hover:shadow-sb-ring hover:shadow-sb-secondary-100/80 active:text-white active:bg-sb-secondary-200 active:border-sb-secondary-200 active:shadow-sb-ring active:shadow-sb-secondary-200/80 focus-visible:text-white focus-visible:bg-sb-secondary-100 focus-visible:border-sb-secondary-100 focus-visible:shadow-sb-ring focus-visible:shadow-sb-secondary-100/80':
          props.variant === 'white' && !props.noStyle,
        'py-4 px-8':
          !props.noStyle &&
          props.contentSize === 'medium' &&
          activeBreakpoint !== 'xs' &&
          activeBreakpoint !== 'sm' &&
          activeBreakpoint !== 'md',
        'py-3 px-6': !props.noStyle && props.contentSize === 'medium' && activeBreakpoint === 'md',
        'py-2 px-4':
          !props.noStyle &&
          props.contentSize === 'medium' &&
          (activeBreakpoint === 'xs' || activeBreakpoint === 'sm'),
        'py-2.5 px-5':
          !props.noStyle &&
          props.contentSize === 'small' &&
          activeBreakpoint !== 'xs' &&
          activeBreakpoint !== 'sm' &&
          activeBreakpoint !== 'md',
        'py-2 px-3.5': !props.noStyle && props.contentSize === 'small' && activeBreakpoint === 'md',
        'py-2 px-3':
          !props.noStyle &&
          props.contentSize === 'small' &&
          (activeBreakpoint === 'xs' || activeBreakpoint === 'sm'),
      },
    ]"
  >
    <slot></slot>
    <component
      :is="props.loading ? ArrowPathIcon : props.icon"
      class="shrink-0"
      :class="[
        props.contentSize === 'medium' ? iconSizeS : iconSizeXS,
        { 'animate-spin': props.loading },
      ]"
    />
  </button>
</template>
