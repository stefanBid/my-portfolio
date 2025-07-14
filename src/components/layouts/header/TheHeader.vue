<script setup lang="ts">
import MdiClose from '~icons/mdi/close';
import MdiHamburgerMenu from '~icons/mdi/hamburger-menu';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { BaseDropdownMenu, TheSideNavbar, TheInlineNavbar } from '@/components';
import { useI18nStore, useStyleStore } from '@/stores';
import type { Locale } from '@/types';

// Store Declarations
const i18nStore = useI18nStore();
const styleStore = useStyleStore();

// Composable Declarations
const route = useRoute();

// Feature 1: Manage Language Options
const languageOptions = [
  {
    id: 'it' as Locale,
    label: 'Italiano',
    icon: 'circle-flags:it',
    onClick: () => i18nStore.changeLanguage('it'),
  },
  {
    id: 'en' as Locale,
    label: 'English',
    icon: 'circle-flags:gb',
    onClick: () => i18nStore.changeLanguage('en'),
  },
];

const selectedLanguageIcon = computed(() => {
  return i18nStore.currentLanguage === 'it' ? 'circle-flags:it' : 'circle-flags:gb';
});

// Feature 2: Manage Header Style
const isMenuOpen = ref(false);

const hideElementsForSomeRoutesPages = computed(() => {
  if (
    route.name === 'privacyPolicyPage' ||
    route.name === 'termsAndConditionsPage' ||
    route.name === 'notFoundPage'
  ) {
    return true;
  } else {
    return false;
  }
});

const getBackgroundByRoute = computed(() => {
  if (route.path === '/') {
    return 'bg-transparent';
  } else {
    return 'bg-sb-main';
  }
});

const isMenuCollapsed = computed(() => {
  if (
    styleStore.activeBreakpoint === 'xs' ||
    styleStore.activeBreakpoint === 'sm' ||
    styleStore.activeBreakpoint === 'md'
  ) {
    return true;
  } else {
    return false;
  }
});

const onChangeMenuVisibility = (newVisibility: boolean): void => {
  if (!isMenuCollapsed.value) {
    return;
  }

  isMenuOpen.value = newVisibility;

  if (isMenuOpen.value) {
    document.body.classList.add('no-scroll');
    document.documentElement.classList.add('no-scroll');
  } else {
    document.body.classList.remove('no-scroll');
    document.documentElement.classList.remove('no-scroll');
  }
};

watch(
  () => isMenuCollapsed.value,
  (newValue) => {
    if (!newValue) {
      isMenuOpen.value = false;
      document.documentElement.classList.remove('no-scroll');
    }
  },
);
</script>

<template>
  <header
    :class="[styleStore.containerPadding, getBackgroundByRoute]"
    class="fixed left-0 w-screen h-20 z-sb-header"
  >
    <div class="flex items-center h-20 p-sb-side gap-x-4">
      <!-- Logo Section-->
      <div class="inline-flex items-center flex-1 transition-all duration-300 ease-in-out">
        <router-link
          to="/"
          class="flex items-center gap-2 text-white border border-transparent rounded-md outline-none group ring-0 focus-visible:border-white"
          @click="onChangeMenuVisibility(false)"
        >
          <img
            src="/images/logo.png"
            loading="lazy"
            decoding="async"
            alt="logo"
            class="object-center transition-all duration-300 ease-in-out"
            :class="{
              'w-[44px] h-[53px]':
                styleStore.activeBreakpoint !== 'xs' &&
                styleStore.activeBreakpoint !== 'sm' &&
                styleStore.activeBreakpoint !== 'md',
              'w-9 h-[43px]': styleStore.activeBreakpoint === 'md',
              'w-7 h-[33px]':
                styleStore.activeBreakpoint === 'sm' || styleStore.activeBreakpoint === 'xs',
            }"
          />

          <span
            class="flex-1 font-semibold transition-all duration-300 ease-in-out font-bebas group-hover:text-shadow-luminous"
            :class="{
              'text-sb-3xl':
                styleStore.activeBreakpoint !== 'xs' &&
                styleStore.activeBreakpoint !== 'sm' &&
                styleStore.activeBreakpoint !== 'md',
              'text-sb-2xl': styleStore.activeBreakpoint === 'md',
              'text-sb-xl':
                styleStore.activeBreakpoint === 'sm' || styleStore.activeBreakpoint === 'xs',
            }"
          >
            Stefano Biddau
          </span>
        </router-link>
      </div>

      <!-- Route Section and Menu -->
      <transition name="fade">
        <div v-if="!isMenuCollapsed" class="flex items-center w-fit gap-x-4">
          <!-- Route -->
          <TheInlineNavbar
            v-if="!hideElementsForSomeRoutesPages"
            :routes="i18nStore.headerI18nContent.navbarRoutes"
            class="flex-1"
          />

          <!-- Menu -->
          <BaseDropdownMenu
            id="changeLanguageButton"
            :options="languageOptions"
            :default-starter-option="i18nStore.currentLanguage"
            menu-strategy="fixed"
            :intersection-observer-settings="{
              rootElement: null,
              threshold: 0.05,
            }"
            aria-label="change Language with this button"
            :icon="selectedLanguageIcon"
          />
        </div>
      </transition>
      <!-- Menu Mobile Section -->
      <div
        v-if="isMenuCollapsed"
        :tabindex="0"
        class="transition-all duration-300 ease-in-out border border-transparent rounded-md outline-none w-fit h-fit focus-visible:border-white active:rotate-90 ring-0"
        :aria-label="`click for ${isMenuOpen ? 'close' : 'open'} menu`"
        @click.stop="onChangeMenuVisibility(!isMenuOpen)"
        @keydown.enter="onChangeMenuVisibility(!isMenuOpen)"
      >
        <component
          :is="isMenuOpen ? MdiClose : MdiHamburgerMenu"
          class="flex-none text-white transition-all duration-300 ease-in-out cursor-pointer"
          :class="[styleStore.iconSizeM]"
        />
      </div>
    </div>
  </header>
  <transition name="slide-left">
    <div
      v-if="isMenuCollapsed && isMenuOpen"
      class="fixed left-0 w-full h-full pt-20 bg-sb-main z-sb-header-collapsed"
    >
      <TheSideNavbar
        v-if="!hideElementsForSomeRoutesPages"
        :routes="i18nStore.headerI18nContent.navbarRoutes"
        :on-close-menu="() => onChangeMenuVisibility(false)"
      />
      <div
        :class="[
          styleStore.containerPadding,
          styleStore.textSizeXS,
          styleStore.activeBreakpoint === 'xs' || styleStore.activeBreakpoint === 'sm'
            ? 'py-5'
            : 'py-6',
        ]"
        class="inline-flex items-center w-full text-white gap-x-4"
      >
        {{ i18nStore.currentLanguage === 'it' ? 'Cambia lingua' : 'Change Language' }}
        <BaseDropdownMenu
          id="changeLanguageButton"
          :options="languageOptions"
          :default-starter-option="i18nStore.currentLanguage"
          menu-strategy="fixed"
          :intersection-observer-settings="{
            rootElement: null,
            threshold: 0.05,
          }"
          aria-label="change Language with this button"
          :icon="selectedLanguageIcon"
        />
      </div>
    </div>
  </transition>
</template>
