<script setup lang="ts">
import type { FunctionalComponent } from 'vue';

interface PageHeadingProps {
  title: string;
  icon: FunctionalComponent
}

const props = defineProps<PageHeadingProps>();

</script>

<template>
  <div class="flex items-center p-8 bg-secondary gap-x-4">
    <div class="border-e-2 pe-4">
      <component
        :is="props.icon"
        class="text-white size-12"
      />
    </div>
    <h1 class="text-4xl font-semibold text-white">
      {{ props.title }}
    </h1>
  </div>
</template>