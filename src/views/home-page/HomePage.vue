<script setup lang="ts">
import { PageHeading } from '@/components';
import { HomeIcon } from '@heroicons/vue/16/solid';

</script>

<template>
  <div class="h-screen border">
    <PageHeading
      title="Home Page"
      :icon="HomeIcon"
    />
  </div>
</template>