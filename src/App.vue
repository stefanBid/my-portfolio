<script setup lang="ts">
import { RouterView } from 'vue-router';

import { TheHeader, LoadingPagePanel } from '@/components';
import { useWindowTitleSingleton } from '@/hooks';

useWindowTitleSingleton();

</script>

<template>
  <div class="flex flex-col h-screen">
    <TheHeader />
    <LoadingPagePanel class="loading-overlay" />
    <router-view />
  </div>
</template>
