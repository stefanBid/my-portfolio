<script setup lang="ts">
import { type Component, type FunctionalComponent } from 'vue';
import SvgSpinnersRingResize from '~icons/svg-spinners/ring-resize';

interface BaseButtonProps {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'white' | 'tertiary' | 'custom';
  size?: 'medium' | 'small' | 'custom';
  disabled?: boolean;
  loading?: boolean;
  icon?: FunctionalComponent | Component | string;
  ariaLabel?: string;
}

// Input / Output (Props / Emits)
const props = withDefaults(defineProps<BaseButtonProps>(), {
  type: 'button',
  variant: 'tertiary',
  size: 'medium',
  disabled: false,
  loading: false,
  icon: undefined,
  ariaLabel: 'general button',
});
</script>

<template>
  <button
    :type="props.type"
    :disabled="props.disabled || props.loading"
    :aria-label="props.ariaLabel"
    class="inline-flex items-center justify-center gap-2 transition-all duration-300 ease-in-out outline-none font-roboto ring-0"
    :tabindex="props.disabled || props.loading ? undefined : 0"
    :class="[
      {
        'rounded-full': props.variant !== 'custom',
        'text-size-s': props.size === 'medium',
        'text-size-xs': props.size === 'small',
        'button-disabled': props.disabled || props.loading,
        'button-enabled': !props.disabled && !props.loading,
        'button-medium': props.size === 'medium',
        'button-small': props.size === 'small',
        'button-not-custom-medium': props.variant !== 'custom' && props.size === 'medium',
        'button-not-custom-small': props.variant !== 'custom' && props.size === 'small',
        'button-tertiary': props.variant === 'tertiary',
        'button-white': props.variant === 'white',
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
        {
          'icon-size-s': props.size === 'medium',
          'icon-size-xs': props.size === 'small',
        },
      ]"
    />
  </button>
</template>

<style scoped>
@reference "@/style/index.css";

.button-disabled {
  @apply pointer-events-none opacity-40;
}

.button-enabled {
  @apply cursor-pointer;
}

.button-small {
  @apply px-2.5 h-6 sm:px-3 sm:h-7 md:px-3 md:h-7 lg:px-4 lg:h-8;
}

.button-medium {
  @apply px-4 h-10 sm:px-5 sm:h-12 md:px-5 md:h-12 lg:px-6 lg:h-14;
}

.button-not-custom-small {
  @apply hover:shadow-sb-ring-sm focus-visible:shadow-sb-ring-sm active:shadow-sb-ring-sm;
}
.button-not-custom-medium {
  @apply hover:shadow-sb-ring focus-visible:shadow-sb-ring active:shadow-sb-ring;
}

.button-tertiary {
  @apply text-white hover:text-black active:text-black focus-visible:text-black bg-sb-secondary-300 border-2 border-sb-secondary-200 hover:bg-sb-tertiary-100 hover:border-sb-tertiary-100  hover:shadow-sb-tertiary-100/80  active:bg-sb-tertiary-200 active:border-sb-tertiary-200 active:shadow-sb-tertiary-200/80 focus-visible:bg-sb-tertiary-100 focus-visible:border-sb-tertiary-100  focus-visible:shadow-sb-tertiary-100/80;
}

.button-white {
  @apply text-white hover:text-black active:text-black focus-visible:text-black bg-sb-secondary-100 border-2 border-sb-secondary-200 hover:bg-white hover:border-white hover:shadow-white/80 active:bg-white active:border-white active:shadow-white focus-visible:bg-white focus-visible:border-white focus-visible:shadow-white/80;
}
</style>
