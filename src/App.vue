<script setup lang="ts">
import { RouterView } from 'vue-router';

import { MainHeader } from '@/components';
import { useWindowTitleSingleton } from '@/hooks';

useWindowTitleSingleton();

</script>

<template>
  <MainHeader />
  <router-view />
</template>
