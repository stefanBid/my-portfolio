<script setup lang="ts">

import { CodeBracketIcon, XMarkIcon, Bars3Icon } from '@heroicons/vue/24/outline';
import { ref, watchEffect, } from 'vue';

import { ItalyIcon, UkIcon } from '@/assets';
import { BaseDropdownMenu, TheNavbar } from '@/components';
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
const { xs, sm, md, lg, xl, xxl, containerPadding } = useCommonStyleSingleton();

// Feature 3.1: Manage Menu Visibility
const isMenuOpen = ref(false);
const isMenuCollapsed = ref(false);

const onChangeMenuVisibility = (newVisibility: boolean) => {
	if (isMenuOpen.value === newVisibility) { return; }
	isMenuOpen.value = newVisibility;
};

watchEffect(() => {

	if (xs.value || sm.value || md.value) {
		isMenuCollapsed.value = true;
	} else {
		isMenuCollapsed.value = false;
	}

	if (!xs.value && !sm.value && !md.value && (lg.value || xl.value || xxl.value) && isMenuOpen.value) {
		isMenuOpen.value = false;
	}
});

</script>

<template>
  <header class="w-full h-20 border-b-2 shadow-md bg-main">
    <div
      :class="[containerPadding]"
      class="flex items-center justify-between h-20 p-sb-side gap-x-4"
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
          class="flex-1 font-semibold transition-all duration-300 ease-in-out font-bebas hover:text-shadow-luminous "
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
        <BaseDropdownMenu
          class="w-22 shrink-0 "
          :custom-width="200"
          :custom-z-index="90"
        >
          <template #dropdown-button-content>
            <component
              :is="currentLanguage === 'it' ? ItalyIcon : UkIcon"
              class="shrink-0 size-6"
            />
          </template>
          <template #dropdown-section-content="{closeMenu}">
            <div class="w-full h-full p-2 text-sm break-words whitespace-normals">
              <span
                v-for="lang in languageOptions"
                :key="lang.name"
                :tabindex="0"
                class="flex items-center p-2 transition-all duration-300 ease-in-out outline-none cursor-pointer rounded-xl gap-x-2 hover:bg-slate-200 group ring-0 focus-visible:ring-2 ring-white"
                @keydown.enter="() => {
                  handleChangeLanguage(lang.name as 'it' | 'en')
                  closeMenu()
                }"
                @click="() => {
                  handleChangeLanguage(lang.name as 'it' | 'en')
                  closeMenu()
                }"
              >
                <component
                  :is="lang.icon"
                  class="shrink-0 size-6"
                />
                <span
                  :class="{ 'font-semibold underline': currentLanguage === lang.name}"
                  class="flex-1 text-white transition-all duration-100 ease-in-out group-hover:text-black text-roboto"
                >
                  {{ lang.label }}
                </span>
              </span>
            </div>
          </template>
        </BaseDropdownMenu>
      </div>
    </div>
  </header>

  <header
    v-if="isMenuCollapsed "
    class="fixed top-0 left-0 z-40 w-full h-full mt-20 transition-all duration-300 ease-in-out bg-secondary"
    :class="{
      'translate-x-0': isMenuOpen,
      '-translate-x-full': !isMenuOpen,
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
      <BaseDropdownMenu
        class="w-22 shrink-0 "
        :custom-width="200"
        :custom-z-index="90"
      >
        <template #dropdown-button-content>
          <component
            :is="currentLanguage === 'it' ? ItalyIcon : UkIcon"
            class="shrink-0 size-5"
          />
        </template>
        <template #dropdown-section-content="{ closeMenu }">
          <div class="w-full h-full p-2 text-sm break-words whitespace-normals">
            <span
              v-for="lang in languageOptions"
              :key="lang.name"
              :tabindex="0"
              :class="{
                'text-sb-sm': xs || sm,
                'text-sb-base': md,
              }"
              class="flex items-center p-2 transition-all duration-300 ease-in-out outline-none cursor-pointer rounded-xl gap-x-2 hover:bg-slate-200 group ring-0 focus-visible:ring-2 ring-white"
              @keydown.enter="() => {
                handleChangeLanguage(lang.name as 'it' | 'en')
                closeMenu()
              }"
              @click="() => {
                handleChangeLanguage(lang.name as 'it' | 'en')
                closeMenu()
              }"
            >
              <component
                :is="lang.icon"
                class="shrink-0 size-5"
              />
              <span
                :class="{ 'font-semibold underline': currentLanguage === lang.name}"
                class="flex-1 text-white transition-all duration-100 ease-in-out group-hover:text-black text-roboto"
              >
                {{ lang.label }}
              </span>
            </span>
          </div>
        </template>
      </BaseDropdownMenu>
    </div>
  </header>
</template>