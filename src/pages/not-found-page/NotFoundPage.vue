<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useHead } from '@unhead/vue';
import { computed } from 'vue';

import { useLocaleStore } from '@/stores';

import BaseButton from '@/components/base/button/BaseButton.vue';
import MdiHomeFlood from '~icons/mdi/home-flood';

// Dependencies
const lStore = useLocaleStore();
const router = useRouter();

// State
useHead({
  title: computed(() => lStore.t('notFoundPage.title')),
  meta: computed(() => [
    {
      name: 'description',
      content: lStore.t('notFoundPage.description'),
    },
  ]),
});
</script>

<template>
  <div
    class="flex flex-col items-center justify-center h-screen pt-20 text-center text-white transition-all duration-300 ease-in-out container-p"
  >
    <h1 class="whitespace-normal transition-all duration-300 ease-in-out font-bebas text-size-xxl">
      {{ lStore.t('notFoundPage.title') }}
    </h1>
    <p
      class="font-medium whitespace-normal transition-all duration-300 ease-in-out font-roboto text-size-m mb-3 sm:mb-4 md:mb-5 lg:mb-6"
    >
      {{ lStore.t('notFoundPage.description') }}
    </p>

    <BaseButton
      id="goHomeButton"
      name="go_home_button"
      aria-label="click to go to the home page"
      :icon="MdiHomeFlood"
      @click.stop="() => router.push({ name: 'home' })"
    >
      {{ lStore.t('notFoundPage.cta') }}
    </BaseButton>
  </div>
</template>
