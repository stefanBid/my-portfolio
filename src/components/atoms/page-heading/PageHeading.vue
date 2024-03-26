<script setup lang="ts">
import type { FunctionalComponent } from 'vue';

interface PageHeadingProps {
  title: string;
  icon: FunctionalComponent
}

const props = defineProps<PageHeadingProps>();

</script>

<template>
  <div class="flex items-center p-8 sm:justify-center xs:justify-center h-1/4 bg-secondary gap-x-4">
    <div class="border-e-2 pe-4">
      <component
        :is="props.icon"
        class="text-white transition-all duration-200 ease-in-out size-12 md:size-10 sm:size-8 xs:size-8"
      />
    </div>
    <h1 class="text-4xl font-thin text-white duration-200 ease-in-out md:text-2xl sm:text-xl xs:text-xl ransition-all ">
      {{ props.title }}
    </h1>
  </div>
</template>