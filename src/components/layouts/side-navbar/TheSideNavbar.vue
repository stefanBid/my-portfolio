<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';

import { useCommonStyleSingleton } from '@/hooks';

interface SideNavbarProps {
  routes: {
    path: string;
    text: string;
  }[];
}

const props = defineProps<SideNavbarProps>();
const emits = defineEmits(['close-menu']);
const route = useRoute();

// Feaure 0: Manage Breakpoints and Style Classes
const { containerPadding, activeBreakpoint, textSizeS } = useCommonStyleSingleton();

</script>

<template>
  <nav
    v-bind="$attrs"
    class="flex flex-col w-full bg-sb-secondary-300"
  >
    <router-link
      v-for="(routeItem, index) in props.routes"
      :key="index"
      :to="routeItem.path"
      tabindex="0"
      class="inline-flex items-center outline-none transition-sb-slow min-w-24 font-roboto ring-0 focus-visible:ring-0"
      :class="[
        containerPadding, textSizeS,
        {
          'py-6': activeBreakpoint === 'md',
          'py-4': activeBreakpoint === 'xs' || activeBreakpoint === 'sm',
        },
        {
          'text-black bg-sb-tertiary-100 shadow-sb-ring-sm shadow-sb-tertiary-100/80': route.path === routeItem.path,
          'text-white bg-sb-secondary-200 hover:bg-sb-tertiary-200 focus-visible:bg-sb-tertiary-200 focus-visible:border-sb-tertiary-200': route.path !== routeItem.path,
        },

      ]"
      @click="() => emits('close-menu')"
    >
      {{ routeItem.text }}
    </router-link>
  </nav>
</template>