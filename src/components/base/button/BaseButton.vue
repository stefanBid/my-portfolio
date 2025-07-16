<script setup lang="ts">
import { type Component, type FunctionalComponent } from 'vue';
import SvgSpinnersRingResize from '~icons/svg-spinners/ring-resize';
import { useStyleStore } from '@/stores';

interface BaseButtonProps {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'white' | 'tertiary' | 'custom';
  size?: 'medium' | 'small' | 'custom';
  disabled?: boolean;
  loading?: boolean;
  icon?: FunctionalComponent | Component | string;
  ariaLabel?: string;
}

const props = withDefaults(defineProps<BaseButtonProps>(), {
  type: 'button',
  variant: 'tertiary',
  size: 'medium',
  disabled: false,
  loading: false,
  icon: undefined,
  ariaLabel: 'general button',
});

// Store Declarations
const styleStore = useStyleStore();
</script>

<template>
  <button
    :type="props.type"
    :disabled="props.disabled || props.loading"
    :aria-label="props.ariaLabel"
    class="inline-flex items-center justify-center gap-2 transition-all duration-300 ease-in-out outline-none font-roboto ring-0"
    :tabindex="props.disabled || props.loading ? undefined : 0"
    :class="[
      props.size === 'medium' ? styleStore.textSizeS : undefined,
      props.size === 'small' ? styleStore.textSizeXS : undefined,
      {
        'rounded-full': props.variant !== 'custom',
        'px-6 h-14':
          props.size === 'medium' &&
          styleStore.activeBreakpoint !== 'md' &&
          styleStore.activeBreakpoint !== 'sm' &&
          styleStore.activeBreakpoint !== 'xs',
        'px-5 h-14': props.size === 'medium' && styleStore.activeBreakpoint === 'md',
        'px-4 h-12':
          props.size === 'medium' &&
          (styleStore.activeBreakpoint === 'sm' || styleStore.activeBreakpoint === 'xs'),
      },
      {
        'px-4 h-8':
          props.size === 'small' &&
          styleStore.activeBreakpoint !== 'md' &&
          styleStore.activeBreakpoint !== 'sm' &&
          styleStore.activeBreakpoint !== 'xs',
        'px-3 h-7': props.size === 'small' && styleStore.activeBreakpoint === 'md',
        'px-2.5 h-7':
          props.size === 'small' &&
          (styleStore.activeBreakpoint === 'sm' || styleStore.activeBreakpoint === 'xs'),
      },
      {
        'text-white hover:text-black active:text-black focus-visible:text-black bg-sb-secondary-300 border-2 border-sb-secondary-200 hover:bg-sb-tertiary-100 hover:border-sb-tertiary-100  hover:shadow-sb-tertiary-100/80  active:bg-sb-tertiary-200 active:border-sb-tertiary-200 active:shadow-sb-tertiary-200/80 focus-visible:bg-sb-tertiary-100 focus-visible:border-sb-tertiary-100  focus-visible:shadow-sb-tertiary-100/80':
          props.variant === 'tertiary',
        'text-sb-secondary-300 hover:text-white active:text-white focus-visible:text-white bg-white border-2 border-sb-secondary-100 hover:bg-sb-secondary-100 hover:border-sb-secondary-100 hover:shadow-sb-secondary-100/80 active:bg-sb-secondary-200 active:border-sb-secondary-200 active:shadow-sb-secondary-200/80 focus-visible:bg-sb-secondary-100 focus-visible:border-sb-secondary-100 focus-visible:shadow-sb-secondary-100/80':
          props.variant === 'white',
        'hover:shadow-sb-ring-sm focus-visible:shadow-sb-ring-sm active:shadow-sb-ring-sm':
          props.variant !== 'custom' && props.size === 'small',
        'hover:shadow-sb-ring focus-visible:shadow-sb-ring active:shadow-sb-ring':
          props.variant !== 'custom' && props.size === 'medium',
        'pointer-events-none opacity-40': props.disabled || props.loading,
      },
    ]"
  >
    <template v-if="$slots.default">
      <slot></slot>
    </template>
    <component
      :is="props.loading ? SvgSpinnersRingResize : props.icon"
      class="shrink-0 stroke-[2.5px]"
      :class="[
        props.size === 'medium' ? styleStore.iconSizeS : undefined,
        props.size === 'small' ? styleStore.iconSizeXS : undefined,
      ]"
    />
  </button>
</template>
