<script setup lang="ts">
import { ChevronDownIcon } from '@heroicons/vue/24/solid';
import { vOnClickOutside, vIntersectionObserver } from '@vueuse/components';
import type { Component, FunctionalComponent } from 'vue';

import { BaseButton } from '@/components';
import { useFloatingPanel, useCommonStyleSingleton } from '@/hooks';

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
});

// Feature 0: Manage Style Classes
const { activeBreakpoint, iconSizeXS } = useCommonStyleSingleton();

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
      no-style
      content-size="small"
      class="justify-between py-1 border-2 rounded-full group focus-visible:ring-0 ring-0"
      :class="{
        'border-sb-tertiary-100 bg-sb-tertiary-100 text-black shadow-sb-ring-sm shadow-sb-tertiary-100/80 ':
          isOpen,
        'text-white hover:bg-sb-tertiary-200 hover:border-sb-tertiary-200 bg-sb-secondary-300  border-sb-secondary-200 focus-visible:bg-sb-tertiary-200 focus-visible:border-sb-tertiary-200':
          !isOpen,
        'px-4 ':
          activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm' && activeBreakpoint !== 'md',
        'px-3': activeBreakpoint === 'md',
        'px-2': activeBreakpoint === 'xs' || activeBreakpoint === 'sm',
      }"
      @click.stop="handleClick()"
    >
      <span class="inline-flex items-center gap-x-3">
        <span v-if="props.label">
          {{ props.label }}
        </span>
        <component :is="props.icon" v-if="props.icon" class="shrink-0" :class="[iconSizeXS]" />
      </span>
      <ChevronDownIcon
        class="ml-3 transition-sb-slow shrink-0"
        :class="[
          iconSizeXS,
          {
            'rotate-180 text-black': isOpen,
            'rotate-0 text-white ': !isOpen,
          },
        ]"
      />
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
          class="box-border absolute border-2 rounded-lg shadow-2xl z-sb-dropdown border-sb-secondary-100 bg-sb-secondary-100 shadow-black w-fit h-fit"
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
