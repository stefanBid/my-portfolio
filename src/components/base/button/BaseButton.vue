<script setup lang="ts">
import { type Component, type FunctionalComponent } from 'vue';
import { ArrowPathIcon } from '@heroicons/vue/24/outline';
import { useStyleStore } from '@/stores';

interface BaseButtonProps {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  variant?: 'white' | 'tertiary' | 'custom';
  loading?: boolean;
  icon?: FunctionalComponent | Component | string;
  contentSize?: 'small' | 'medium' | 'custom';
  dataTestid?: string;
}

const props = withDefaults(defineProps<BaseButtonProps>(), {
  type: 'button',
  variant: 'tertiary',
  contentSize: 'medium',
  disabled: false,
  loading: false,
  icon: undefined,
  dataTestid: 'base-button',
});

// Store Declarations
const styleStore = useStyleStore();
</script>

<template>
  <button
    :data-testid="props.dataTestid"
    v-bind="$attrs"
    :type="props.type"
    :disabled="props.disabled || props.loading"
    class="inline-flex items-center justify-center font-medium rounded-full outline-none ring-0 focus-visible:ring-0 transition-sb-slow font-roboto"
    :tabindex="props.disabled || props.loading ? -1 : 0"
    :class="[
      props.contentSize === 'medium' ? styleStore.textSizeS : styleStore.textSizeXS,
      {
        'px-6 py-4 gap-x-3':
          props.contentSize === 'medium' &&
          styleStore.activeBreakpoint !== 'md' &&
          styleStore.activeBreakpoint !== 'sm' &&
          styleStore.activeBreakpoint !== 'xs',
        'px-5 py-3 gap-x-2.5':
          props.contentSize === 'medium' && styleStore.activeBreakpoint === 'md',
        'px-4 py-2 gap-x-2.5':
          props.contentSize === 'medium' &&
          (styleStore.activeBreakpoint === 'sm' || styleStore.activeBreakpoint === 'xs'),
      },
      {
        'px-3.5 py-1.5 gap-x-2':
          props.contentSize === 'small' &&
          styleStore.activeBreakpoint !== 'md' &&
          styleStore.activeBreakpoint !== 'sm' &&
          styleStore.activeBreakpoint !== 'xs',
        'px-3 py-1.5 gap-x-1.5':
          props.contentSize === 'small' && styleStore.activeBreakpoint === 'md',
        'px-3 py-1 gap-x-1.5':
          props.contentSize === 'small' &&
          (styleStore.activeBreakpoint === 'sm' || styleStore.activeBreakpoint === 'xs'),
      },
      {
        'bg-transparent/50 text-white border-2 border-white hover:text-black hover:bg-sb-tertiary-100 hover:border-sb-tertiary-100  hover:shadow-sb-tertiary-100/80 active:text-black active:bg-sb-tertiary-200 active:border-sb-tertiary-200 active:shadow-sb-tertiary-200/80 focus-visible:text-black focus-visible:bg-sb-tertiary-100 focus-visible:border-sb-tertiary-100  focus-visible:shadow-sb-tertiary-100/80':
          props.variant === 'tertiary',
        'bg-white text-black border-2 border-white hover:text-white hover:bg-sb-secondary-100 hover:border-sb-secondary-100  hover:shadow-sb-secondary-100/80 active:text-white active:bg-sb-secondary-200 active:border-sb-secondary-200 active:shadow-sb-secondary-200/80 focus-visible:text-white focus-visible:bg-sb-secondary-100 focus-visible:border-sb-secondary-100 focus-visible:shadow-sb-secondary-100/80':
          props.variant === 'white',
        'hover:shadow-sb-ring-sm focus-visible:shadow-sb-ring-sm active:shadow-sb-ring-sm':
          props.variant !== 'custom' && props.contentSize === 'small',
        'hover:shadow-sb-ring focus-visible:shadow-sb-ring active:shadow-sb-ring':
          props.variant !== 'custom' && props.contentSize === 'medium',
        'pointer-events-none opacity-50': props.disabled || props.loading,
      },
    ]"
  >
    <slot></slot>
    <component
      :is="props.loading ? ArrowPathIcon : props.icon"
      class="shrink-0"
      :class="[
        props.contentSize === 'medium' ? styleStore.iconSizeS : styleStore.iconSizeXS,
        { 'animate-spin': props.loading },
      ]"
    />
  </button>
</template>
