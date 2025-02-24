<script setup lang="ts">
import { ChevronDownIcon } from '@heroicons/vue/24/solid';
import { vOnClickOutside, vIntersectionObserver } from '@vueuse/components';
import type { Component, FunctionalComponent } from 'vue';

import { BaseButton } from '@/components';
import { useFloatingPanel } from '@/hooks';
import { useStyleStore } from '@/stores';

interface DropdownMenuProps {
  label?: string;
  icon?: FunctionalComponent | Component | string;
  zIndex?: 'z-sb-base-5' | 'z-sb-dropdown';
  menuStrategy?: 'absolute' | 'fixed';
  intersectionObserverSettings?: {
    rootElement: HTMLElement | null;
    rootMargin?: string;
    threshold?: number;
  };
  ariaLabel?: string;
}

const props = withDefaults(defineProps<DropdownMenuProps>(), {
  label: undefined,
  icon: undefined,
  zIndex: 'z-sb-dropdown',
  menuStrategy: 'absolute',
  intersectionObserverSettings: () => ({
    rootElement: null,
    rootMargin: '-80px 0px 0px 0px',
    threshold: 0.05,
  }),
  ariaLabel: 'general dropdown menu',
});

// Store Declarations
const styleStore = useStyleStore();

// Feature 1: Manage Open <--> Close State
const { isOpen, reference, floating, floatingStyles, changeFloatingVisibility } = useFloatingPanel({
  placement: 'bottom-start',
  strategy: props.menuStrategy,
  offsetValue: 15,
});

const handleClick = (): void => {
  changeFloatingVisibility(isOpen.value ? false : true);
};

const onIntersectionObserver = ([{ isIntersecting }]: IntersectionObserverEntry[]): void => {
  if (!isIntersecting && isOpen.value) {
    changeFloatingVisibility(false);
  }
};
</script>

<template>
  <div class="w-fit">
    <BaseButton
      v-bind="$attrs"
      ref="reference"
      v-intersection-observer="[
        onIntersectionObserver,
        {
          root: props.intersectionObserverSettings.rootElement,
          threshold: props.intersectionObserverSettings.threshold,
          rootMargin: props.intersectionObserverSettings.rootMargin,
        },
      ]"
      :aria-label="props.ariaLabel"
      content-size="small"
      spacing-size="small"
      variant="custom"
      class="group !justify-between border-2"
      :class="{
        'border-sb-tertiary-100 bg-sb-tertiary-100 shadow-sb-ring-sm shadow-sb-tertiary-100/80 ':
          isOpen,
        ' hover:bg-sb-tertiary-200 hover:border-sb-tertiary-200 bg-sb-secondary-300  border-sb-secondary-200 focus-visible:bg-sb-tertiary-200 focus-visible:border-sb-tertiary-200':
          !isOpen,
      }"
      @click.stop="handleClick()"
    >
      <span class="flex items-center h-full gap-2">
        <span
          v-if="props.label"
          class="transition-all duration-300 ease-in-out"
          :class="{
            'text-black': isOpen,
            'text-white ': !isOpen,
          }"
        >
          {{ props.label }}
        </span>
        <component
          :is="props.icon"
          v-if="props.icon"
          class="shrink-0"
          :class="[styleStore.iconSizeXS]"
        />

        <ChevronDownIcon
          class="ml-2 transition-all duration-300 ease-in-out shrink-0"
          :class="[
            styleStore.iconSizeXS,
            {
              'rotate-180 text-black': isOpen,
              'rotate-0 text-white ': !isOpen,
            },
          ]"
        />
      </span>
    </BaseButton>
    <teleport to="body">
      <transition name="scale-and-fade-fast">
        <div
          v-if="isOpen"
          ref="floating"
          v-on-click-outside="[
            (_: Event) => changeFloatingVisibility(false),
            { ignore: [reference] },
          ]"
          :style="floatingStyles"
          :class="[props.zIndex]"
          class="box-border border-2 rounded-lg shadow-2xl z-sb-dropdown border-sb-secondary-100 bg-sb-secondary-100 shadow-black w-fit h-fit"
        >
          <slot
            name="dropdown-section-content"
            :open-menu="() => changeFloatingVisibility(true)"
            :close-menu="() => changeFloatingVisibility(false)"
          ></slot>
        </div>
      </transition>
    </teleport>
  </div>
</template>
