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
const { xs, sm, md } = useCommonStyleSingleton();
</script>

<template>
  <button
    v-bind="$attrs"
    type="button"
    class="inline-flex items-center overflow-x-hidden transition-all duration-300 ease-in-out outline-none ring-0 font-roboto focus-visible:ring-2 focus-visible:ring-white"
    :tabindex="props.disabled ? -1 : 0"
    :class="[
      {
        'gap-x-2 font-medium truncate border-2 border-white rounded-full': !props.noStyle,
      },
      {
        'pointer-events-none opacity-50': props.disabled,
        'justify-between': props.contentHorizontalOrientation === 'between',
        'justify-center': props.contentHorizontalOrientation === 'center',
        'bg-secondary text-white hover:text-main hover:bg-white ': props.variant === 'primary' && !props.noStyle,
        'bg-white text-main hover:text-white hover:bg-secondary': props.variant === 'secondary' && !props.noStyle,
      },

      {
        'py-4 px-8 text-sb-lg': !props.noStyle && !xs && !sm && !md,
        'py-3 px-6 text-sb-base': !props.noStyle && md,
        'py-2 px-4 text-sb-sm': !props.noStyle && xs || sm,
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