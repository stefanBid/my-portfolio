<script setup lang="ts">
import { useRoute } from 'vue-router';

interface InlineNavbarProps {
  routes: {
    path: string;
    text: string;
  }[];
}

const props = defineProps<InlineNavbarProps>();
const route = useRoute();
</script>

<template>
  <nav
    v-bind="$attrs"
    class="flex flex-row items-center justify-end px-4 py-2 border-2 rounded-full bg-sb-secondary-300 gap-x-6 border-sb-secondary-200"
  >
    <router-link
      v-for="(routeItem, index) in props.routes"
      :key="index"
      :to="routeItem.path"
      tabindex="0"
      class="inline-flex items-center justify-center px-2 py-1 rounded-full outline-none transition-sb-slow min-w-24 font-roboto ring-0 focus-visible:ring-0 text-sb-base"
      :class="[
        {
          'text-black bg-sb-tertiary-100 shadow-sb-ring-sm shadow-sb-tertiary-100/80':
            route.path === routeItem.path,
          'text-white bg-sb-secondary-200 hover:bg-sb-tertiary-200 focus-visible:bg-sb-tertiary-200 focus-visible:border-sb-tertiary-200':
            route.path !== routeItem.path,
        },
      ]"
    >
      {{ routeItem.text }}
    </router-link>
  </nav>
</template>
