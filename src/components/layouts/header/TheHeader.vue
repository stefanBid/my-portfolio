<script setup lang="ts">
import { XMarkIcon, Bars3Icon } from '@heroicons/vue/24/outline';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import { ItalyIcon, UkIcon } from '@/assets';
import { BaseDropdownMenu, TheSideNavbar, TheInlineNavbar } from '@/components';
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

const handleChangeLanguage = (newLanguage: 'it' | 'en'): void => {
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
const { containerPadding, activeBreakpoint, textSizeXS, iconSizeM, iconSizeXS } =
  useCommonStyleSingleton();

// Feature 3.1: Manage Menu Visibility
const isMenuOpen = ref(false);

// Computed Properties for Screen Size and Menu State

const isMenuCollapsed = computed(() => {
  if (
    activeBreakpoint.value === 'xs' ||
    activeBreakpoint.value === 'sm' ||
    activeBreakpoint.value === 'md'
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

watch(isMenuCollapsed, () => {
  if (!isMenuCollapsed.value) {
    isMenuOpen.value = false;
    document.body.classList.remove('no-scroll');
  }
});
</script>

<template>
  <header
    :class="[containerPadding, getBackgroundByRoute]"
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
            :class="[iconSizeM]"
          />

          <span
            class="flex-1 font-semibold transition-sb-slow font-bebas group-hover:text-shadow-luminous"
            :class="{
              'text-sb-3xl':
                activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm' && activeBreakpoint !== 'md',
              'text-sb-2xl': activeBreakpoint === 'md',
              'text-sb-xl': activeBreakpoint === 'sm' || activeBreakpoint === 'xs',
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
          <TheInlineNavbar :routes="headerI18nContent.navbarRoutes" class="flex-1" />

          <!-- Menu -->
          <BaseDropdownMenu
            menu-strategy="fixed"
            :icon="currentLanguage === 'it' ? ItalyIcon : UkIcon"
          >
            <template #dropdown-section-content="{ closeMenu }">
              <div class="flex flex-col p-2 break-words whitespace-normal w-36 gap-y-2">
                <span
                  v-for="lang in languageOptions"
                  :key="lang.name"
                  :tabindex="0"
                  :class="{
                    'bg-sb-secondary-200': currentLanguage === lang.name,
                  }"
                  class="flex items-center p-2 rounded-lg outline-none cursor-pointer transition-sb-slow gap-x-2 hover:bg-sb-secondary-200 group ring-0 focus-visible:bg-sb-secondary-200"
                  @keydown.enter="
                    () => {
                      handleChangeLanguage(lang.name as 'it' | 'en');
                      closeMenu();
                    }
                  "
                  @click="
                    () => {
                      handleChangeLanguage(lang.name as 'it' | 'en');
                      closeMenu();
                    }
                  "
                >
                  <component :is="lang.icon" :class="[iconSizeXS]" class="shrink-0" />
                  <span :class="[textSizeXS]" class="flex-1 text-white text-roboto">
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
          :class="[iconSizeM]"
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
        :routes="headerI18nContent.navbarRoutes"
        @close-menu="onChangeMenuVisibility(false)"
      />
      <div
        :class="[
          containerPadding,
          textSizeXS,
          activeBreakpoint === 'xs' || activeBreakpoint === 'sm' ? 'py-4' : 'py-6',
        ]"
        class="inline-flex items-center w-full text-white gap-x-4"
      >
        {{ currentLanguage === 'it' ? 'Cambia lingua' : 'Change Language' }}
        <BaseDropdownMenu
          menu-strategy="fixed"
          :icon="currentLanguage === 'it' ? ItalyIcon : UkIcon"
        >
          <template #dropdown-section-content="{ closeMenu }">
            <div class="flex flex-col p-2 break-words whitespace-normal w-36 gap-y-2">
              <span
                v-for="lang in languageOptions"
                :key="lang.name"
                :tabindex="0"
                :class="{
                  'bg-sb-secondary-200': currentLanguage === lang.name,
                }"
                class="flex items-center p-2 rounded-lg outline-none cursor-pointer transition-sb-slow gap-x-2 hover:bg-sb-secondary-200 group ring-0 focus-visible:bg-sb-secondary-200"
                @keydown.enter="
                  () => {
                    handleChangeLanguage(lang.name as 'it' | 'en');
                    closeMenu();
                  }
                "
                @click="
                  () => {
                    handleChangeLanguage(lang.name as 'it' | 'en');
                    closeMenu();
                  }
                "
              >
                <component :is="lang.icon" :class="[iconSizeXS]" class="shrink-0" />
                <span :class="[textSizeXS]" class="flex-1 text-white text-roboto">
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
