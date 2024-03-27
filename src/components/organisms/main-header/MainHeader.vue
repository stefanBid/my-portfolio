<script setup lang="ts">

import { RouterLink, useRoute } from 'vue-router';
import { CodeBracketIcon, XMarkIcon, Bars3Icon } from '@heroicons/vue/24/outline';
import { useGlobalBreakpoints } from '@/hooks';
import { ref, watch } from 'vue';

const WEBSITE_ROUTES = [
	{
		id: 'ce16c95b-1e14-4c63-8fa1-ebc4897a742a',
		title: 'Home',
		path: '/',
	},
	{
		id: 'ce16c95b-1e14-4c63-8fa1-ebc4897a742b',
		title: 'About Me',
		path: '/about',
	},
	{
		id: 'ce16c95b-1e14-4c63-8fa1-ebc4897a742c',
		title: 'My Skills',
		path: '/skills',
	},
	{
		id: 'ce16c95b-1e14-4c63-8fa1-ebc4897a742d',
		title: 'My Projects',
		path: '/projects',
	},
];

const route = useRoute();
const { xs, sm, md } = useGlobalBreakpoints();

const isMenuOpen = ref(false);
const isMenuCollapsed = ref(true);

const onChangeMenuVisibility = (newVisibility: boolean) => {
	if (isMenuOpen.value === newVisibility) { return; }
	isMenuOpen.value = newVisibility;
};

watch([xs, sm, md], () => {
	if (xs.value || sm.value || md.value) {
		isMenuCollapsed.value = true;
		isMenuOpen.value = false;
	} else {
		isMenuCollapsed.value = false;
	}
}, {
	immediate: true,
});

</script>

<template>
  <header class="fixed top-0 left-0 z-50 w-full h-20 shadow-md bg-main">
    <div class="relative flex items-center justify-between h-20 px-8 gap-x-4">
      <!-- Sezione Logo a Sinistra -->
      <div class="flex items-center text-white ">
        <CodeBracketIcon class="flex-none transition-all duration-300 ease-in-out size-12 me-4 md:size-8 sm:size-8 xs:size-8" />

        <router-link
          class="flex-1 text-[2rem] font-semibold transition-all duration-300 ease-in-out font-bebas md:text-[1.5rem] sm:text-[1.5rem] xs:text-[1.5rem]"
          to="/"
          @click="onChangeMenuVisibility(false)"
        >
          Stefano Biddau
        </router-link>
      </div>
      <component
        :is="isMenuOpen ? XMarkIcon : Bars3Icon"
        v-if="isMenuCollapsed"
        class="flex-none text-white transition-all duration-300 ease-in-out cursor-pointer size-10 sm:size-8 xs:size-8 active:rotate-90 "
        @click="onChangeMenuVisibility(!isMenuOpen) "
      />

      <!-- Sezione Navigazione a Destra -->
      <nav
        v-if="!isMenuCollapsed"
        class="flex items-center justify-end px-4 py-2 space-x-6 transition-all duration-300 ease-in-out rounded-full bg-secondary"
      >
        <router-link
          v-for="routeItem in WEBSITE_ROUTES"
          :key="routeItem.id"
          :to="routeItem.path"
          class="inline-flex items-center justify-center p-1 px-4 transition-all duration-300 ease-in-out rounded-full min-w-20 "
          :class="{
            'text-main bg-white': route.path === routeItem.path,
            'text-white hover:bg-slate-700': route.path !== routeItem.path,
          }"
        >
          {{ routeItem.title }}
        </router-link>
      </nav>
    </div>
  </header>
  <nav
    v-if="isMenuCollapsed "
    class="fixed inset-0 z-40 flex flex-col w-full h-full py-20 transition-all duration-300 ease-in-out bg-secondary"
    :class="{
      'translate-x-0': isMenuOpen,
      '-translate-x-full': !isMenuOpen,
    }"
  >
    <router-link
      v-for="routeItem in WEBSITE_ROUTES"
      :key="routeItem.id"
      :to="routeItem.path"
      class="inline-flex items-center justify-start w-full px-8 py-6 transition-all duration-300 ease-in-out"
      :class="{
        'text-main bg-white': route.path === routeItem.path,
        'text-white hover:bg-slate-700': route.path !== routeItem.path,
      }"
      @click="onChangeMenuVisibility(false)"
    >
      {{ routeItem.title }}
    </router-link>
  </nav>
</template>