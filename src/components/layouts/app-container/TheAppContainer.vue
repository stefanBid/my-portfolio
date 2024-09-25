<script setup lang="ts">
import { inject, Ref } from 'vue';
import { RouterView } from 'vue-router';

import { TheHeader, BaseLoadingPagePanel } from '@/components';

const isLoading = inject<Ref<boolean>>('isLoading');

</script>

<template>
  <div class="flex flex-col min-h-screen">
    <TheHeader />

    <main class="flex-grow">
      <BaseLoadingPagePanel v-if="isLoading" />
      <RouterView v-else />
    </main>
  </div>
</template>
