<script setup lang="ts">
import { XMarkIcon, Bars3Icon } from '@heroicons/vue/24/outline';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import { ItalyIcon, UkIcon } from '@/assets';
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
    name: 'it' as Locale,
    label: 'Italiano',
    icon: ItalyIcon,
  },
  {
    name: 'en' as Locale,
    label: 'English',
    icon: UkIcon,
  },
];

// Feature 2: Manage Header Style
const isMenuOpen = ref(false);

const getBackgroundByRoute = computed(() => {
  if (route.path === '/' || route.path === '/home') {
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
    class="fixed left-0 w-full h-20 z-sb-header"
  >
    <div class="flex items-center h-20 p-sb-side gap-x-4">
      <!-- Logo Section-->
      <div class="inline-flex items-center flex-1 transition-sb-slow">
        <router-link
          to="/"
          class="flex items-center text-white gap-x-4 group"
          @click="onChangeMenuVisibility(false)"
        >
          <img
            src="@/assets/logo/logo.png"
            alt="logo"
            class="object-cover object-center h-auto transition-sb-slow"
            :class="[styleStore.iconSizeM]"
          />

          <span
            class="flex-1 font-semibold transition-sb-slow font-bebas group-hover:text-shadow-luminous"
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
          <TheInlineNavbar :routes="i18nStore.headerI18nContent.navbarRoutes" class="flex-1" />

          <!-- Menu -->
          <BaseDropdownMenu
            id="changeLanguageButton"
            menu-strategy="fixed"
            :intersection-observer-settings="{
              rootElement: null,
              threshold: 0.05,
            }"
            aria-label="change Language with this button"
            :icon="i18nStore.currentLanguage === 'it' ? ItalyIcon : UkIcon"
          >
            <template #dropdown-section-content="{ closeMenu }">
              <div class="flex flex-col p-2 break-words whitespace-normal w-36 gap-y-2">
                <span
                  v-for="lang in languageOptions"
                  :key="lang.name"
                  :tabindex="0"
                  :class="{
                    'bg-sb-secondary-200': i18nStore.currentLanguage === lang.name,
                  }"
                  class="flex items-center p-2 rounded-lg outline-none cursor-pointer transition-sb-slow gap-x-2 hover:bg-sb-secondary-200 group ring-0 focus-visible:bg-sb-secondary-200"
                  @keydown.enter="
                    () => {
                      i18nStore.changeLanguage(lang.name);
                      closeMenu();
                    }
                  "
                  @click="
                    () => {
                      i18nStore.changeLanguage(lang.name);
                      closeMenu();
                    }
                  "
                >
                  <component :is="lang.icon" :class="[styleStore.iconSizeXS]" class="shrink-0" />
                  <span :class="[styleStore.textSizeXS]" class="flex-1 text-white text-roboto">
                    {{ lang.label }}
                  </span>
                </span>
              </div>
            </template>
          </BaseDropdownMenu>
        </div>
      </transition>
      <!-- Menu Mobile Section -->
      <div v-if="isMenuCollapsed">
        <component
          :is="isMenuOpen ? XMarkIcon : Bars3Icon"
          class="flex-none text-white cursor-pointer active:rotate-90 transition-sb-slow"
          :class="[styleStore.iconSizeM]"
          @click.stop="onChangeMenuVisibility(!isMenuOpen)"
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
        :routes="i18nStore.headerI18nContent.navbarRoutes"
        @close-menu="onChangeMenuVisibility(false)"
      />
      <div
        :class="[
          styleStore.containerPadding,
          styleStore.textSizeXS,
          styleStore.activeBreakpoint === 'xs' || styleStore.activeBreakpoint === 'sm'
            ? 'py-4'
            : 'py-6',
        ]"
        class="inline-flex items-center w-full text-white gap-x-4"
      >
        {{ i18nStore.currentLanguage === 'it' ? 'Cambia lingua' : 'Change Language' }}
        <BaseDropdownMenu
          id="changeLanguageButton"
          menu-strategy="fixed"
          :intersection-observer-settings="{
            rootElement: null,
            threshold: 0.05,
          }"
          aria-label="change Language with this button"
          :icon="i18nStore.currentLanguage === 'it' ? ItalyIcon : UkIcon"
        >
          <template #dropdown-section-content="{ closeMenu }">
            <div class="flex flex-col p-2 break-words whitespace-normal w-36 gap-y-2">
              <span
                v-for="lang in languageOptions"
                :key="lang.name"
                :tabindex="0"
                :class="{
                  'bg-sb-secondary-200': i18nStore.currentLanguage === lang.name,
                }"
                class="flex items-center p-2 rounded-lg outline-none cursor-pointer transition-sb-slow gap-x-2 hover:bg-sb-secondary-200 group ring-0 focus-visible:bg-sb-secondary-200"
                @keydown.enter="
                  () => {
                    i18nStore.changeLanguage(lang.name);
                    closeMenu();
                  }
                "
                @click="
                  () => {
                    i18nStore.changeLanguage(lang.name);
                    closeMenu();
                  }
                "
              >
                <component :is="lang.icon" :class="[styleStore.iconSizeXS]" class="shrink-0" />
                <span :class="[styleStore.textSizeXS]" class="flex-1 text-white text-roboto">
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
