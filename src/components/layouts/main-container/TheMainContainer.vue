<script setup lang="ts">
import { RouterView } from 'vue-router';

import { TheHeader } from '@/components';
import { useWindowTitleSingleton } from '@/hooks';

useWindowTitleSingleton();

defineOptions({ inheritAttrs: false });

</script>

<template>
  <TheHeader />
  <router-view />
</template>