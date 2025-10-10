<script setup lang="ts">
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

import { useLocaleStore } from '@/stores';

import BaseButton from '@/components/base/button/BaseButton.vue';

import MdiHomeFlood from '~icons/mdi/home-flood';

// Stores declarations
const { locale } = storeToRefs(useLocaleStore());

// Hooks declarations
const router = useRouter();
</script>

<template>
  <div
    class="flex flex-col items-center justify-center h-screen pt-20 text-center text-white transition-all duration-300 ease-in-out container-p"
  >
    <h1 class="whitespace-normal transition-all duration-300 ease-in-out font-bebas text-size-xxl">
      {{ locale === 'en' ? '404 - Page Not Found' : '404 - Pagina Non Trovata' }}
    </h1>
    <p
      class="font-medium whitespace-normal transition-all duration-300 ease-in-out font-roboto text-size-m mb-3 sm:mb-4 md:mb-5 lg:mb-6"
    >
      {{
        locale === 'en'
          ? 'Sorry, the page you are looking for does not exist.'
          : 'Spiacente, la pagina che stai cercando non esiste.'
      }}
    </p>

    <BaseButton
      id="goHomeButton"
      name="go_home_button"
      aria-label="click to go to the home page"
      :icon="MdiHomeFlood"
      @click.stop="() => router.push({ name: 'home' })"
    >
      {{ locale === 'en' ? 'Go to Home' : 'Vai alla Home' }}
    </BaseButton>
  </div>
</template>
