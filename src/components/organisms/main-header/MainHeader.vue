<script setup lang="ts">

import { RouterLink, useRoute } from 'vue-router';
import { CodeBracketIcon, XMarkIcon, Bars3Icon } from '@heroicons/vue/24/outline';
import { useGlobalBreakpoints } from '@/hooks';
import { computed, ref } from 'vue';

const WEBSITE_ROUTES = [
	{
		id: 'ce16c95b-1e14-4c63-8fa1-ebc4897a742a',
		title: 'Home',
		path: '/',
	},
	{
		id: 'ce16c95b-1e14-4c63-8fa1-ebc4897a742b',
		title: 'About',
		path: '/about',
	},
	{
		id: 'ce16c95b-1e14-4c63-8fa1-ebc4897a742c',
		title: 'Skills',
		path: '/skills',
	},
	{
		id: 'ce16c95b-1e14-4c63-8fa1-ebc4897a742d',
		title: 'Projects',
		path: '/projects',
	},
];

const route = useRoute();

const { xs, sm, md } = useGlobalBreakpoints();

const isMenuOpen = ref(false);

const isMenuCollapsed = computed(() => {
	if (xs.value || sm.value || md.value) {
		return true;
	}
	return false;
});

const onChangeMenuVisibility = (newVisibility:boolean) => {
	isMenuOpen.value = newVisibility;
};

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
            @click="isMenuOpen ? onChangeMenuVisibility(false) : undefined"
          >
            Stefano Biddau
          </router-link>
        </span>
      </div>
      <component
        :is="isMenuOpen ? XMarkIcon : Bars3Icon"
        v-if="isMenuCollapsed"
        class="text-white transition-all duration-200 ease-in-out cursor-pointer size-8 active:rotate-90"
        @click="isMenuOpen = !isMenuOpen"
      />

      <!-- Sezione Navigazione a Destra -->
      <nav
        class="transition-all duration-200 ease-in-out bg-secondary"
        :class="{
          'flex items-center justify-end px-4 py-2 space-x-8 rounded-full ': !isMenuCollapsed,
          'absolute flex flex-col space-y-8 left-0 w-full top-full rounded-none ': isMenuCollapsed,
          'left-0': isMenuCollapsed ? isMenuOpen : undefined,
          '-left-full': isMenuCollapsed ? !isMenuOpen : undefined,
        }"
      >
        <router-link
          v-for="routeItem in WEBSITE_ROUTES"
          :key="routeItem.id"
          :to="routeItem.path"
          class="inline-flex items-center justify-center p-1 transition-all duration-200 ease-in-out rounded-full min-w-20 "
          :class="{
            'text-main bg-white': route.path === routeItem.path,
            'text-white hover:text-main  hover:bg-white': route.path !== routeItem.path,
          }"
          @click="isMenuOpen ? onChangeMenuVisibility(false) : undefined"
        >
          {{ routeItem.title }}
        </router-link>
      </nav>
    </div>
  </header>
</template>