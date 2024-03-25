<script setup lang="ts">
import { MainHeader } from '@/components';
import { RouterView, } from 'vue-router';

</script>

<template>
  <MainHeader />
  <div class="pt-20 px-[3%]">
    <router-view />
  </div>
</template>
