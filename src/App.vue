<script setup lang="ts">
import { inject } from 'vue';
import { RouterView } from 'vue-router';

import { TheHeader, BaseLoadingPagePanel } from '@/components';

const isLoading = inject('isLoading');
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <TheHeader class="opacity-100" />

    <main class="flex-grow">
      <BaseLoadingPagePanel v-if="isLoading" />
      <RouterView v-else />
    </main>
  </div>
</template>
