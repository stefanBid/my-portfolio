<script setup lang="ts">

import { CodeBracketIcon, XMarkIcon, Bars3Icon } from '@heroicons/vue/24/outline';
import { ref, watch, } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

import { ItalyIcon, UkIcon } from '@/assets';
import { DropdownButton } from '@/components';
import { useCommonStyleSingleton, useTypedI18nSingleton } from '@/hooks';

// Feature 0: Internationalization (i18n)
const { changeLanguage, currentLanguage, headerI18nContent } = useTypedI18nSingleton();

const languageOptions = {
	it: {
		label: 'Italiano',
		icon: ItalyIcon,
	},
	en: {
		label: 'English',
		icon: UkIcon,
	},
};

// Feature 1: Manage Routes

const route = useRoute();

// Feaure 3: Manage Breakpoints and Style Classes
const { xs, sm, md, containerPadding } = useCommonStyleSingleton();

// Feature 3.1: Manage Menu Visibility
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
    <div
      :class="[containerPadding]"
      class="relative flex items-center justify-between h-20 p-sb-side gap-x-4"
    >
      <!-- Sezione Logo a Sinistra -->
      <div class="flex items-center text-white gap-x-4">
        <CodeBracketIcon
          class="transition-all duration-300 ease-in-out shrink-0"
          :class="{
            'size-12': !xs && !sm && !md,
            'size-10': md,
            'size-8': xs || sm,
          }"
        />

        <router-link
          class="flex-1 font-semibold transition-all duration-300 ease-in-out font-bebas "
          :class="{
            'text-sb-3xl': !xs && !sm && !md,
            'text-sb-2xl': md,
            'text-sb-xl': xs || sm,
          }"
          to="/"
          @click="onChangeMenuVisibility(false)"
        >
          Stefano Biddau
        </router-link>
      </div>
      <component
        :is="isMenuOpen ? XMarkIcon : Bars3Icon"
        v-if="isMenuCollapsed"
        class="flex-none text-white transition-all duration-300 ease-in-out cursor-pointer active:rotate-90"
        :class="{
          'size-10': !xs && !sm && !md,
          'size-8': md,
          'size-6': xs || sm,
        }"
        @click="onChangeMenuVisibility(!isMenuOpen) "
      />

      <!-- Sezione Destra -->
      <div
        v-if="!isMenuCollapsed"
        class="flex items-center w-fit gap-x-4"
      >
        <!-- Sezione Navigazione a Destra -->
        <nav
          id="navbarRoutes"
          class="flex items-center justify-end px-4 py-2 transition-all duration-300 ease-in-out border-2 rounded-full gap-x-6 bg-secondary border-slate-700"
        >
          <router-link
            v-for="(routeItem, index) in headerI18nContent.navbarRoutes"
            :key="index"
            :to="routeItem.path"
            class="inline-flex items-center justify-center px-2 py-1 transition-all duration-300 ease-in-out rounded-full min-w-24 font-roboto"
            :class="{
              'text-main bg-white': route.path === routeItem.path,
              'text-white bg-slate-700/50 hover:bg-slate-700': route.path !== routeItem.path,
              'text-sb-base': !xs && !sm && !md,
            }"
          >
            {{ routeItem.text }}
          </router-link>
        </nav>
        <!-- Sezione Cambio Lingua -->
        <DropdownButton
          class="w-24 "
          :menu-options="languageOptions"
          :selected-option="currentLanguage"
          :icon="currentLanguage === 'it' ? ItalyIcon : UkIcon"
          :on-get-selected-option="(op) => changeLanguage(op as 'it' | 'en')"
        />
      </div>
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
      v-for="(routeItem, index) in headerI18nContent.navbarRoutes"
      :key="index"
      :to="routeItem.path"
      class="inline-flex items-center w-full py-6 text-lg transition-all duration-300 ease-in-out font-roboto"
      :class="[containerPadding,{
        'text-main bg-white': route.path === routeItem.path,
        'text-white hover:bg-slate-700': route.path !== routeItem.path,
      }]"
      @click="onChangeMenuVisibility(false)"
    >
      {{ routeItem.text }}
    </router-link>
    <div
      :class="[containerPadding]"
      class="inline-flex items-center w-full py-6 text-white gap-x-4"
    >
      {{ currentLanguage === 'it' ? 'Cambia lingua' : 'Change Language' }}
      <DropdownButton
        class="w-24 "
        :menu-options="languageOptions"
        :selected-option="currentLanguage"
        :icon="currentLanguage === 'it' ? ItalyIcon : UkIcon"
        :on-get-selected-option="(op) => changeLanguage(op as 'it' | 'en')"
      />
    </div>
  </nav>
</template>