<script setup lang="ts">
import { inject, Ref } from 'vue';
import { RouterView } from 'vue-router';

import { TheHeader, ThePageLoader } from '@/components';

const isLoading = inject<Ref<boolean>>('isLoading');

</script>

<template>
  <TheHeader />
  <ThePageLoader v-if="isLoading" />
  <div
    v-else
    class="min-h-screen "
  >
    <RouterView />
  </div>
</template>
