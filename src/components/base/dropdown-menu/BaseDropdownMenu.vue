<script setup lang="ts">
import { vOnClickOutside, vIntersectionObserver } from '@vueuse/components';
import { useSbFloatingPanel } from 'sb-floating-panel-vue';
import MdiKeyboardArrowDown from '~icons/mdi/keyboard-arrow-down';
import type { Component, FunctionalComponent } from 'vue';

interface DropdownMenuProps {
  text?: string;
  icon?: FunctionalComponent | Component | string;
  zIndex?: number;
  intersectionObserverSettings?: {
    rootElement: HTMLElement | null;
    rootMargin?: string;
    threshold?: number;
  };
  ariaLabel?: string;
}

// Input / Output (Props / Emits)
const props = withDefaults(defineProps<DropdownMenuProps>(), {
  text: undefined,
  icon: undefined,
  zIndex: 500,
  intersectionObserverSettings: () => ({
    rootElement: null,
    rootMargin: '-80px 0px 0px 0px',
    threshold: 0.05,
  }),
  ariaLabel: 'general dropdown menu',
});

// Dependencies
const { reference, floating, floatingStyle, isOpen, toggle, close } = useSbFloatingPanel({
  placement: 'bottom-end',
  strategy: 'fixed',
  offsetValue: 18,
});

// Events
const onIntersectionObserver = (entries: IntersectionObserverEntry[]): void => {
  const [{ isIntersecting }] = entries;
  if (isIntersecting && isOpen.value) {
    close();
  }
};
</script>

<template>
  <div>
    <button
      ref="reference"
      v-intersection-observer="[
        onIntersectionObserver,
        {
          root: props.intersectionObserverSettings.rootElement,
          threshold: props.intersectionObserverSettings.threshold,
          rootMargin: props.intersectionObserverSettings.rootMargin,
        },
      ]"
      class="flex items-center gap-2 transition-all duration-300 ease-in-out border-2 rounded-full outline-none ring-0 px-2 h-6 sm:h-7 md:h-7 lg:px-2.5 lg:h-8 cursor-pointer"
      :class="{
        'dropdown-menu-open': isOpen,
        'dropdown-menu-close': !isOpen,
      }"
      @click="toggle"
    >
      <span
        v-if="props.text"
        class="transition-all duration-300 ease-in-out font-roboto text-size-xs"
        :class="[
          {
            'text-black': isOpen,
            'text-white ': !isOpen,
          },
        ]"
      >
        {{ props.text }}
      </span>
      <component
        :is="props.icon"
        v-if="props.icon"
        class="transition-all duration-300 ease-in-out shrink-0 stroke-[2.5px] icon-size-xs"
        :class="[
          {
            'text-black': isOpen,
            'text-white ': !isOpen,
          },
        ]"
      />
      <MdiKeyboardArrowDown
        class="transition-all duration-300 ease-in-out shrink-0 icon-size-s stroke-[2.5px]"
        :class="[
          {
            'rotate-180 text-black': isOpen,
            'rotate-0 text-white ': !isOpen,
          },
        ]"
      />
    </button>
    <transition name="scale-and-fade-fast">
      <div
        v-if="isOpen"
        ref="floating"
        v-on-click-outside="[(_: Event) => close(), { ignore: [reference] }]"
        class="shadow-xl shadow-black rounded-lg"
        :style="[floatingStyle, { zIndex: props.zIndex }]"
      >
        <slot name="options" :close-menu="close"></slot>
      </div>
    </transition>
  </div>
</template>

<style scoped>
@reference "@/style/index.css";
.dropdown-menu-open {
  @apply border-sb-tertiary-100 bg-sb-tertiary-100 shadow-sb-ring-sm shadow-sb-tertiary-100/80;
}

.dropdown-menu-close {
  @apply hover:bg-sb-tertiary-200 hover:border-sb-tertiary-200 bg-sb-secondary-300  border-sb-secondary-200 focus-visible:bg-sb-tertiary-200 focus-visible:border-sb-tertiary-200;
}
</style>
