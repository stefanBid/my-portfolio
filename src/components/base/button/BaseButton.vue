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
const { textSizeS, textSizeXS, iconSizeS, iconSizeXS } = useCommonStyleSingleton();
</script>

<template>
  <button
    v-bind="$attrs"
    :type="props.type"
    class="inline-flex items-center outline-none ring-0 focus-visible:ring-0 transition-sb-slow"
    :tabindex="props.disabled || props.loading ? -1 : 0"
    :class="[
      props.contentSize === 'medium' ? textSizeS : textSizeXS,
      {
        'font-medium justify-center border-2 rounded-full font-roboto': !props.noStyle,
        'px-6 py-4 gap-x-3 hover:shadow-sb-ring focus-visible:shadow-sb-ring active:shadow-sb-ring':
          !props.noStyle && props.contentSize === 'medium',
        'px-4 py-2 gap-x-2 hover:shadow-sb-ring-sm focus-visible:shadow-sb-ring-sm active:shadow-sb-ring-sm':
          !props.noStyle && props.contentSize === 'small',
        'pointer-events-none opacity-50': props.disabled || props.loading,
        'bg-transparent/50 text-white border-white hover:text-black hover:bg-sb-tertiary-100 hover:border-sb-tertiary-100  hover:shadow-sb-tertiary-100/80 active:text-black active:bg-sb-tertiary-200 active:border-sb-tertiary-200 active:shadow-sb-tertiary-200/80 focus-visible:text-black focus-visible:bg-sb-tertiary-100 focus-visible:border-sb-tertiary-100  focus-visible:shadow-sb-tertiary-100/80':
          props.variant === 'tertiary' && !props.noStyle,
        'bg-white text-black border-white border-2 hover:text-white hover:bg-sb-secondary-100 hover:border-sb-secondary-100  hover:shadow-sb-secondary-100/80 active:text-white active:bg-sb-secondary-200 active:border-sb-secondary-200 active:shadow-sb-secondary-200/80 focus-visible:text-white focus-visible:bg-sb-secondary-100 focus-visible:border-sb-secondary-100 focus-visible:shadow-sb-secondary-100/80':
          props.variant === 'white' && !props.noStyle,
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
