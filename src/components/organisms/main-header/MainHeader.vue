<script setup lang="ts">

import { RouterLink } from 'vue-router';
import { CodeBracketIcon } from '@heroicons/vue/24/outline';

const WEBSITE_ROUTES = [
	{
		id: 'ce16c95b-1e14-4c63-8fa1-ebc4897a742a',
		title: 'Home',
		url: '/',
	},
	{
		id: 'ce16c95b-1e14-4c63-8fa1-ebc4897a742b',
		title: 'About',
		url: '/about',
	},
	{
		id: 'ce16c95b-1e14-4c63-8fa1-ebc4897a742c',
		title: 'Skills',
		url: '/skills',
	},
	{
		id: 'ce16c95b-1e14-4c63-8fa1-ebc4897a742d',
		title: 'Projects',
		url: '/projects',
	},
];
</script>

<template>
  <header class="fixed top-0 left-0 z-50 w-full h-20 shadow-md bg-main">
    <div class="flex items-center justify-between h-20 gap-x-4 px-[3%]">
      <!-- Sezione Logo a Sinistra -->
      <div class="flex items-center space-x-4 text-white ">
        <CodeBracketIcon class="size-14" />
        <span>
          <router-link
            to="/"
            class="text-4xl font-semibold"
          >
            Stefano Biddau
          </router-link>
        </span>
      </div>

      <!-- Sezione Navigazione a Destra -->
      <nav class="flex items-center justify-end px-4 py-2 space-x-8 rounded-full bg-secondary">
        <span
          v-for="route in WEBSITE_ROUTES"
          :key="route.id"
          class="inline-flex items-center justify-center p-1 transition-all duration-200 ease-in-out rounded-full group hover:bg-white min-w-20 "
        >
          <router-link
            :to="route.url"
            class="text-white transition-all duration-200 ease-in-out group-hover:text-main"
          >
            {{ route.title }}
          </router-link>
        </span>
      </nav>
    </div>
  </header>
</template>