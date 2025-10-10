<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import type { StrapiLocale, UILink } from '@/types';

import { Icon } from '@iconify/vue';

import BaseDropdownMenu from '@/components/base/dropdown-menu/BaseDropdownMenu.vue';

import MdiClose from '~icons/mdi/close';
import MdiHamburgerMenu from '~icons/mdi/hamburger-menu';
import MdiLanguage from '~icons/mdi/language';

// Input / Output (Props / Emits)
const props = withDefaults(
  defineProps<{
    routes: UILink[];
    locales: StrapiLocale[];
    currentLocale: string;
    showNav?: boolean;
  }>(),
  {
    showNav: true,
  },
);

const emits = defineEmits<{
  (e: 'change-locale', newLocale: string): void;
}>();

// Dependencies
const route = useRoute();

// State
const isMenuOpen = ref(false);

const routesAreVisible = computed(() => props.routes.length > 0 && props.showNav);
const languageOptions = computed(
  () =>
    props.locales.map((loc) => ({
      id: loc.code,
      label: loc.name,
      icon: `circle-flags:${loc.code.toLowerCase()}`,
    })) || [],
);

// Events
const onChangeLocale = (newLocale: string): void => {
  emits('change-locale', newLocale);
};
const onChangeMenuVisibility = (newVisibility: boolean): void => {
  isMenuOpen.value = newVisibility;

  if (isMenuOpen.value) {
    document.documentElement.classList.add('no-scroll');
  } else {
    document.documentElement.classList.remove('no-scroll');
  }
};

watch(
  () => route.path,
  () => {
    // Close menu on route change (if open)
    if (isMenuOpen.value) {
      onChangeMenuVisibility(false);
    }
  },
);

onMounted(() => {
  if (typeof window !== 'undefined') {
    mq = window.matchMedia('(min-width: 1024px)');
    if (mq.matches) onChangeMenuVisibility(false);
    if ('addEventListener' in mq) mq.addEventListener('change', handleMQ);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    else (mq as any).addListener(handleMQ);
  }
});

onBeforeUnmount(() => {
  if (mq) {
    if ('removeEventListener' in mq) mq.removeEventListener('change', handleMQ);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    else (mq as any).removeListener(handleMQ);
  }
  onChangeMenuVisibility(false);
});

// Helpers
let mq: MediaQueryList | null = null;

const handleMQ = (e: MediaQueryListEvent): void => {
  if (e.matches) onChangeMenuVisibility(false);
};
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 h-14 sm:h-[3.75rem] md:h-16 lg:h-20 z-[1000] border-b text-white transition-all duration-300 ease-in-out"
    :class="{
      'bg-sb-main border-transparent': !routesAreVisible,
      'bg-transparent border-transparent': routesAreVisible && route.path === '/' && !isMenuOpen,
      'border-sb-secondary-200 bg-sb-main': routesAreVisible && (isMenuOpen || route.path !== ''),
    }"
    role="banner"
  >
    <div class="mx-auto h-full container-p flex items-center justify-between">
      <!-- Left: Logo -->
      <component
        :is="routesAreVisible ? 'router-link' : 'div'"
        to="/"
        class="flex items-center gap-2 group outline-none"
        aria-label="Go to homepage"
      >
        <!-- Replace with your logo -->
        <img
          src="/logo.png"
          loading="lazy"
          decoding="async"
          alt="logo"
          class="object-contain w-auto transition-all duration-300 ease-in-out h-6 sm:h-8 md:h-10 lg:h-14"
        />
        <span
          :class="{
            'group-hover:text-shadow-luminous group-focus-visible:text-shadow-luminous':
              routesAreVisible,
          }"
          class="font-semibold transition-all duration-300 ease-in-out font-bebas text-size-l"
          >Stefano Biddau</span
        >
      </component>

      <template v-if="routesAreVisible">
        <!-- Right: Desktop navigation (visible ≥ lg) -->
        <div class="hidden lg:inline-flex items-center gap-4">
          <nav
            class="flex items-center gap-4 px-4 py-2 border-2 rounded-full bg-sb-secondary-300 border-sb-secondary-200"
            aria-label="Primary"
          >
            <router-link
              v-for="ir in props.routes"
              :key="ir.href"
              :to="ir.href"
              class="px-2 py-1 transition-all duration-300 ease-in-out rounded-full outline-none min-w-24 font-roboto ring-0 text-sb-base text-center"
              :class="{
                'text-black bg-sb-tertiary-100 shadow-sb-ring-sm shadow-sb-tertiary-100/80':
                  route.name === ir.name,
                'text-white bg-sb-secondary-200 hover:bg-sb-tertiary-200 focus-visible:bg-sb-tertiary-200 focus-visible:border-sb-tertiary-200':
                  route.name !== ir.name,
              }"
            >
              {{ ir.label }}
            </router-link>
          </nav>
          <BaseDropdownMenu
            id="changeLanguageButton"
            :z-index="1200"
            menu-strategy="fixed"
            :intersection-observer-settings="{
              rootElement: null,
              threshold: 0.05,
            }"
            aria-label="change Language with this button"
            :icon="MdiLanguage"
          >
            <template #options="{ closeMenu }">
              <div class="w-48 p-2 gap-2 bg-sb-secondary-200 flex flex-col rounded-lg">
                <button
                  v-for="lang in languageOptions"
                  :key="lang.id"
                  class="inline-flex items-center gap-2 p-2 rounded-lg cursor-pointer font-roboto ring-0 outline-none transition-all duration-300 ease-in-out"
                  :class="{
                    'bg-sb-secondary-100': props.currentLocale === lang.id,
                    'hover:bg-sb-secondary-100 focus-visible:bg-sb-secondary-100':
                      props.currentLocale !== lang.id,
                  }"
                  @click.stop="
                    () => {
                      onChangeLocale(lang.id);
                      closeMenu();
                    }
                  "
                >
                  <Icon
                    :icon="lang.icon"
                    class="icon-size-xs transition-all duration-300 ease-in-out"
                  />
                  <span class="text-size-xs transition-all-300 ease-in-out">
                    {{ lang.label }}
                  </span>
                </button>
              </div>
            </template>
          </BaseDropdownMenu>
        </div>

        <!-- Mobile toggle button (visible < lg) -->
        <button
          type="button"
          class="lg:hidden inline-flex items-center justify-center rounded-md cursor-pointer"
          aria-controls="mobile-nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          @click.stop="onChangeMenuVisibility(!isMenuOpen)"
        >
          <!-- Simple hamburger icon -->
          <component
            :is="isMenuOpen ? MdiClose : MdiHamburgerMenu"
            class="text-white transition-all duration-300 ease-in-out icon-size-m"
          />
        </button>
      </template>
    </div>
  </header>
  <!-- MOBILE MENU OUTSIDE HEADER -->
  <div
    v-if="routesAreVisible"
    class="lg:hidden fixed inset-x-0 top-14 md:top-16 bottom-0 z-[950] bg-sb-main transform-gpu transition-transform duration-300 ease-in-out overflow-y-auto pr-4 pl-8 sm:pr-5 sm:pl-9 md:pr-5 md:pl-9"
    :class="
      isMenuOpen ? 'translate-x-0 pointer-events-auto' : '-translate-x-full pointer-events-none'
    "
  >
    <div class="py-2 border-b border-sb-secondary-200 my-2">
      <h2 class="text-size-l font-bebas transition-all duration-300 ease-in-out text-white">
        - Menu
      </h2>
    </div>

    <nav aria-label="Mobile">
      <ul class="flex flex-col gap-2 py-2">
        <li
          v-for="mr in props.routes"
          :key="mr.href"
          class="w-full py-1 px-2 rounded-lg"
          :class="{
            'text-black bg-sb-tertiary-100 shadow-sb-ring-sm shadow-sb-tertiary-100/80':
              route.name === mr.name,
            'text-white bg-sb-secondary-200 hover:bg-sb-tertiary-200 focus-visible:bg-sb-tertiary-200 focus-visible:border-sb-tertiary-200':
              route.name !== mr.name,
          }"
        >
          <router-link
            :to="mr.href"
            class="w-full py-1 block rounded-lg text-size-xs transition-all duration-300 ease-in-out outline-none"
          >
            {{ mr.label }}
          </router-link>
        </li>
      </ul>
    </nav>

    <div class="py-2 border-b border-sb-secondary-200 my-4">
      <h2 class="text-size-l font-bebas transition-all duration-300 ease-in-out text-white">
        - Settings
      </h2>
    </div>

    <BaseDropdownMenu
      id="changeLanguageButton"
      :z-index="1200"
      menu-strategy="fixed"
      :intersection-observer-settings="{
        rootElement: null,
        threshold: 0.05,
      }"
      aria-label="change Language with this button"
      :icon="MdiLanguage"
    >
      <template #options="{ closeMenu }">
        <div class="w-40 p-2 gap-2 bg-sb-secondary-200 flex flex-col rounded-lg">
          <button
            v-for="lang in languageOptions"
            :key="lang.id"
            class="inline-flex text-size-xs items-center gap-2 p-2 rounded-lg cursor-pointer font-roboto ring-0 outline-none transition-all duration-300 ease-in-out"
            :class="{
              'bg-sb-secondary-100': props.currentLocale === lang.id,
              'hover:bg-sb-secondary-100 focus-visible:bg-sb-secondary-100':
                props.currentLocale !== lang.id,
            }"
            @click.stop="
              () => {
                onChangeLocale(lang.id);
                closeMenu();
              }
            "
          >
            <Icon :icon="lang.icon" class="icon-size-xs transition-all duration-300 ease-in-out" />
            <span class="transition-all duration-300 ease-in-out text-size-xs">
              {{ lang.label }}
            </span>
          </button>
        </div>
      </template>
    </BaseDropdownMenu>
  </div>
</template>
