<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';

import { useCommonStyleSingleton } from '@/hooks';

interface TheNavbarProps {
  routes: {
    path: string;
    text: string;
  }[];
  variant: 'horizontal' | 'vertical';
}

const props = defineProps<TheNavbarProps>();
const emits = defineEmits(['close-menu']);
const route = useRoute();

// Feaure 0: Manage Breakpoints and Style Classes
const { containerPadding, activeBreakpoint } = useCommonStyleSingleton();

</script>

<template>
  <nav
    v-bind="$attrs"
    class="flex bg-sb-secondary-200"
    :class="{
      'flex-col w-full': props.variant === 'vertical',
      'flex-row items-center justify-end px-4 py-2 border-2 rounded-full gap-x-6 border-sb-secondary-100': props.variant === 'horizontal',
    }"
  >
    <router-link
      v-for="(routeItem, index) in props.routes"
      :key="index"
      :to="routeItem.path"
      tabindex="0"
      class="inline-flex items-center transition-all duration-500 ease-in-out outline-none min-w-24 font-roboto ring-0 focus-visible:ring-0"
      :class="[
        props.variant === 'vertical' ? containerPadding : '',
        {
          'justify-center px-2 py-1 text-sb-base rounded-full': props.variant === 'horizontal',
          'py-6 text-sb-base': props.variant === 'vertical' && activeBreakpoint === 'md',
          'py-4 text-sb-sm': props.variant === 'vertical' && (activeBreakpoint === 'xs' || activeBreakpoint === 'sm'),
        },
        {
          'text-black bg-sb-tertiary-100 shadow-[0_0_10px_3px_rgba(233,89,5,0.8)]': route.path === routeItem.path,
          'text-white bg-sb-secondary-100 hover:bg-sb-tertiary-200 focus-visible:bg-sb-tertiary-200 focus-visible:border-sb-tertiary-200': route.path !== routeItem.path,
        },

      ]"
      @click="() => emits('close-menu')"
    >
      {{ routeItem.text }}
    </router-link>
  </nav>
</template>