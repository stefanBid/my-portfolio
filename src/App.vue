<script setup lang="ts">
import { RouterView } from 'vue-router';

import { TheHeader, BaseLoadingPagePanel } from '@/components';
</script>

<template>
  <div
    class="flex flex-col min-h-screen"
  >
    <TheHeader class="opacity-100" />

    <main
      class="flex-grow"
    >
      <RouterView>
        <template #default="{ Component }">
          <BaseLoadingPagePanel v-if="!Component" />
          <component
            :is="Component"
            v-else
          />
        </template>
      </RouterView>
    </main>
  </div>
</template>
