<script setup lang="ts">

import { XMarkIcon, Bars3Icon } from '@heroicons/vue/24/outline';
import { vOnClickOutside } from '@vueuse/components';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

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
const route = useRoute();

const getBackgroundByRoute = computed(() => {
	if (route.path === '/' || route.path === '/home') {
		return 'bg-transparent';
	} else {
		return 'bg-sb-main';
	}
});
// Feaure 3: Manage Breakpoints and Style Classes
const { containerPadding, activeBreakpoint } = useCommonStyleSingleton();

// Feature 3.1: Manage Menu Visibility
const headerRef = ref();
const buttonRef = ref();
const isMenuOpen = ref(false);

// Computed Properties for Screen Size and Menu State

const isMenuCollapsed = computed(() => {
	if (activeBreakpoint.value === 'xs' || activeBreakpoint.value === 'sm' || activeBreakpoint.value === 'md') {
		return true;
	} else {
		return false;
	}
});

const onChangeMenuVisibility = (newVisibility: boolean) => {
	if (!isMenuCollapsed.value) { return; }
	isMenuOpen.value = newVisibility;
};

watch(isMenuCollapsed, () => {
	if (!isMenuCollapsed.value) {
		isMenuOpen.value = false;
	}
});

</script>

<template>
  <header
    ref="headerRef"
    :class="[containerPadding, getBackgroundByRoute]"
    class="fixed left-0 z-40 w-full h-20 transition-all duration-300 ease-in-out transform"
  >
    <div
      class="flex items-center justify-between h-20 p-sb-side gap-x-4"
    >
      <!-- Logo Section-->
      <router-link
        to="/"
        class="flex items-center text-white gap-x-4 group"
        @click="onChangeMenuVisibility(false)"
      >
        <img
          src="@/assets/logo/logo.png"
          alt="logo"
          class="object-cover object-center h-auto transition-all duration-300 ease-in-out"
          :class="{
            'size-10': activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm' && activeBreakpoint !== 'md',
            'size-8': activeBreakpoint === 'md',
            'size-6': activeBreakpoint === 'sm' || activeBreakpoint === 'xs',
          }"
        />

        <span
          class="flex-1 font-semibold transition-all duration-300 ease-in-out font-bebas group-hover:text-shadow-luminous"
          :class="{
            'text-sb-3xl': activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm' && activeBreakpoint !== 'md',
            'text-sb-2xl': activeBreakpoint === 'md',
            'text-sb-xl': activeBreakpoint === 'sm' || activeBreakpoint === 'xs',
          }"
        >
          Stefano Biddau
        </span>
      </router-link>
      <!-- Menu Mobile Section -->
      <div ref="buttonRef">
        <component
          :is="isMenuOpen ? XMarkIcon : Bars3Icon"
          v-if="isMenuCollapsed"
          class="flex-none text-white transition-all duration-300 ease-in-out cursor-pointer active:rotate-90"
          :class="{
            'size-8': activeBreakpoint === 'md',
            'size-6': activeBreakpoint === 'sm' || activeBreakpoint === 'xs',
          }"
          @click.stop="onChangeMenuVisibility(!isMenuOpen) "
        />
      </div>

      <!-- Route Section and Menu -->
      <div
        v-if="!isMenuCollapsed"
        class="flex items-center w-fit gap-x-4"
      >
        <!-- Route -->
        <TheNavbar
          :routes="headerI18nContent.navbarRoutes"
          class="flex-1"
          variant="horizontal"
        />

        <!-- Menu -->
        <BaseDropdownMenu class="w-20 shrink-0 ">
          <template #dropdown-button-content>
            <component
              :is="currentLanguage === 'it' ? ItalyIcon : UkIcon"
              class="shrink-0 size-5"
            />
          </template>
          <template #dropdown-section-content="{closeMenu}">
            <div class="p-2 text-sm break-words whitespace-normal w-44">
              <span
                v-for="lang in languageOptions"
                :key="lang.name"
                :tabindex="0"
                class="flex items-center p-2 transition-all duration-500 ease-in-out outline-none cursor-pointer rounded-xl gap-x-2 hover:bg-sb-secondary-100 group ring-0 focus-visible:bg-sb-secondary-100 "
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
                  class="flex-1 text-white text-roboto"
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
  <transition name="slide-left">
    <div
      v-if="isMenuCollapsed && isMenuOpen"
      v-on-click-outside="[(_: Event) => onChangeMenuVisibility(false), { ignore: [headerRef, buttonRef] }]"
      class="fixed left-0 z-30 w-full h-full pt-20 bg-sb-main "
    >
      <TheNavbar
        :routes="headerI18nContent.navbarRoutes"
        variant="vertical"
        @close-menu="onChangeMenuVisibility(false)"
      />
      <div
        :class="[containerPadding, (activeBreakpoint === 'xs' || activeBreakpoint === 'sm') ? 'py-4 text-sb-sm' : 'py-6 text-sb-base']"
        class="inline-flex items-center w-full text-white gap-x-4 "
      >
        {{ currentLanguage === 'it' ? 'Cambia lingua' : 'Change Language' }}
        <BaseDropdownMenu class="w-20 shrink-0">
          <template #dropdown-button-content>
            <component
              :is="currentLanguage === 'it' ? ItalyIcon : UkIcon"
              class="shrink-0 size-5"
            />
          </template>
          <template #dropdown-section-content="{ closeMenu }">
            <div class="p-2 text-sm break-words w-44 whitespace-normals">
              <span
                v-for="lang in languageOptions"
                :key="lang.name"
                :tabindex="0"
                :class="{
                  'text-sb-sm': activeBreakpoint === 'xs' || activeBreakpoint === 'sm',
                  'text-sb-base': activeBreakpoint === 'md'
                }"
                class="flex items-center p-2 transition-all duration-500 ease-in-out outline-none cursor-pointer rounded-xl gap-x-2 hover:bg-sb-secondary-100 group ring-0 focus-visible:bg-sb-secondary-100 "
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
                  class="flex-1 text-white text-roboto"
                >
                  {{ lang.label }}
                </span>
              </span>
            </div>
          </template>
        </BaseDropdownMenu>
      </div>
    </div>
  </transition>
</template>