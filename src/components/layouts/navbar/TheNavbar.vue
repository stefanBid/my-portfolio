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
const { containerPadding, xs, sm, md } = useCommonStyleSingleton();

</script>

<template>
  <nav
    v-bind="$attrs"
    class="flex transition-all duration-300 ease-in-out bg-secondary"
    :class="{
      'flex-col w-full': props.variant === 'vertical',
      'flex-row items-center justify-end px-4 py-2 border-2 rounded-full  gap-x-6  border-slate-700': props.variant === 'horizontal',
    }"
  >
    <router-link
      v-for="(routeItem, index) in props.routes"
      :key="index"
      :to="routeItem.path"
      tabindex="0"
      class="inline-flex items-center transition-all duration-300 ease-in-out outline-none min-w-24 font-roboto"
      :class="[
        props.variant === 'vertical' ? containerPadding : '',
        {
          'justify-center px-2 py-1 text-sb-base rounded-full hover:shadow-sb-light': props.variant === 'horizontal',
          'py-6 text-sb-base': props.variant === 'vertical' && md,
          'py-4 text-sb-sm': props.variant === 'vertical' && (sm || xs)
        },
        {
          'text-main bg-white': route.path === routeItem.path,
          'text-white bg-slate-700/50 hover:bg-slate-700': route.path !== routeItem.path,
        },
        {
          'focus-visible:ring-2 ring-white ring-0': !xs && !sm && !md,
        }
      ]"
      @click="() => emits('close-menu')"
    >
      {{ routeItem.text }}
    </router-link>
  </nav>
</template>