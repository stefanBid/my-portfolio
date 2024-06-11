<script setup lang="ts">

import { CodeBracketIcon, XMarkIcon, Bars3Icon } from '@heroicons/vue/24/outline';
import { ref, watch, } from 'vue';

import { ItalyIcon, UkIcon } from '@/assets';
import { BaseDropdownButton, TheNavbar } from '@/components';
import { useCommonStyleSingleton, useTypedI18nSingleton } from '@/hooks';

// Feature 0: Internationalization (i18n)
const { changeLanguage, currentLanguage, headerI18nContent } = useTypedI18nSingleton();

const languageOptions = [
	{
		name: 'it',
		label: 'Italiano',
		icon: ItalyIcon,
	},
	{
		name: 'en',
		label: 'English',
		icon: UkIcon,
	},
];

const handleChangeLanguage = (newLanguage: 'it' | 'en') => {
	changeLanguage(newLanguage);
};

// Feature 1: Manage Routes

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
  <header class="fixed top-0 left-0 z-50 w-full h-20 border-b-2 shadow-md bg-main">
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
        <TheNavbar
          :routes="headerI18nContent.navbarRoutes"
          class="flex-1"
          variant="horizontal"
        />

        <!-- Sezione Cambio Lingua -->
        <BaseDropdownButton
          class="w-22 shrink-0 "
          :menu-options="languageOptions"
          :selected-option="currentLanguage"
          :icon="currentLanguage === 'it' ? ItalyIcon : UkIcon"
          :on-select-option="optionSelected => handleChangeLanguage(optionSelected.option.name as 'it' | 'en')"
        />
      </div>
    </div>
  </header>

  <header
    v-if="isMenuCollapsed "

    class="fixed top-0 left-0 z-40 w-full h-full mt-20 transition-all duration-300 ease-in-out bg-secondary"
    :class="{
      'translate-y-0': isMenuOpen,
      '-translate-y-full': !isMenuOpen,
    }"
  >
    <TheNavbar
      :routes="headerI18nContent.navbarRoutes"
      variant="vertical"
      @close-menu="onChangeMenuVisibility(false)"
    />
    <div
      :class="[containerPadding, (xs || sm) ? 'py-4 text-sb-sm' : 'py-6 text-sb-base']"
      class="inline-flex items-center w-full text-white gap-x-4"
    >
      {{ currentLanguage === 'it' ? 'Cambia lingua' : 'Change Language' }}
      <BaseDropdownButton
        class="w-22 "
        :menu-options="languageOptions"
        :selected-option="currentLanguage"
        :icon="currentLanguage === 'it' ? ItalyIcon : UkIcon"
        :on-select-option="optionSelected => handleChangeLanguage(optionSelected.option.name as 'it' | 'en')"
      />
    </div>
  </header>
</template>