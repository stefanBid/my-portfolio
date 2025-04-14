<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';
import { useStyleStore } from '@/stores';

interface SideNavbarProps {
  routes: {
    path: string;
    text: string;
  }[];
  onCloseMenu: () => void;
}

const props = defineProps<SideNavbarProps>();

// Store Declarations
const styleStore = useStyleStore();

// Hooks Declarations
const route = useRoute();
</script>

<template>
  <nav v-bind="$attrs" class="flex flex-col w-full bg-sb-secondary-300">
    <RouterLink
      v-for="(routeItem, index) in props.routes"
      :key="index"
      :to="routeItem.path"
      tabindex="0"
      class="inline-flex items-center transition-all duration-300 ease-in-out outline-none min-w-24 font-roboto ring-0 focus-visible:ring-0"
      :class="[
        styleStore.containerPadding,
        styleStore.textSizeS,
        {
          'py-5': styleStore.activeBreakpoint === 'md',
          'py-4': styleStore.activeBreakpoint === 'xs' || styleStore.activeBreakpoint === 'sm',
        },
        {
          'text-black bg-sb-tertiary-100 shadow-sb-ring-sm shadow-sb-tertiary-100/80':
            route.path === routeItem.path,
          'text-white bg-sb-secondary-200 hover:bg-sb-tertiary-200 focus-visible:bg-sb-tertiary-200 focus-visible:border-sb-tertiary-200':
            route.path !== routeItem.path,
        },
      ]"
      @click="() => props.onCloseMenu()"
    >
      {{ routeItem.text }}
    </RouterLink>
  </nav>
</template>
