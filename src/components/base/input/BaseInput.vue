<script setup lang="ts">
import { AdjustmentsVerticalIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import { vOnClickOutside, vIntersectionObserver } from '@vueuse/components';
import { computed, ref } from 'vue';
import { nanoid } from 'nanoid';

import { BaseButton } from '@/components';
import { useFloatingPanel, useCommonStyleSingleton } from '@/hooks';

interface InputProps {
  label?: string;
  id?: string;
  name?: string;
  placeholder?: string;
  type?: 'text' | 'search' | 'email';
  withMenu?: boolean;
  intersectionObserverSettings?: {
    rootElement: HTMLElement | null;
    rootMargin?: string;
    threshold?: number;
  };
}

const props = withDefaults(defineProps<InputProps>(), {
  label: undefined,
  id: undefined,
  name: undefined,
  placeholder: undefined,
  type: 'text',
  withMenu: false,
  intersectionObserverSettings: () => ({
    rootElement: null,
    rootMargin: '-80px 0px 0px 0px',
    threshold: 0.05,
  }),
});

const inputValue = defineModel<string>('inputValue', { required: true });

// Feature 0: Manage Style Classes
const { textSizeXS } = useCommonStyleSingleton();

// Feature 1: Manage Input Properties
const uniqueId = nanoid();

const inputId = computed(() => {
  return props.id || `${uniqueId}-input-id`;
});

const inputName = computed(() => {
  return props.name || `${uniqueId}-input-name`;
});

const inputPlaceholder = computed(() => {
  if (!props.placeholder) {
    if (props.type === 'search') {
      return 'Search a value';
    }
    if (props.type === 'email') {
      return 'Enter an email address (ex: example@ex.com)';
    }
    return 'Enter a value';
  }
  return props.placeholder;
});

// Feature 2: Manage Input Menu
const { isOpen, reference, floating, floatingStyles, changeFloatingVisibility } = useFloatingPanel({
  placement: 'bottom',
  strategy: 'absolute',
  offsetValue: 15,
  hasResize: true,
});

const buttonMenuRef = ref();
const isInputFocused = ref(false);

const handleClick = (): void => {
  if (!props.withMenu) {
    return;
  }
  changeFloatingVisibility(isOpen.value ? false : true);
};

const handleFocusBlur = (focused: boolean): void => {
  isInputFocused.value = focused;
  if (props.withMenu && focused && isOpen.value) {
    changeFloatingVisibility(false);
  }
};

const onIntersectionObserver = ([{ isIntersecting }]: IntersectionObserverEntry[]): void => {
  if (!isIntersecting && isOpen.value && props.withMenu) {
    changeFloatingVisibility(false);
  }
};
</script>

<template>
  <div class="flex flex-col w-full gap-y-2">
    <label
      v-if="props.label"
      :for="inputId"
      tabindex="0"
      :class="[textSizeXS]"
      class="font-medium text-white outline-none cursor-pointer font-roboto w-fit hover:text-shadow-luminous focus-visible:text-shadow-luminous focus-visible:ring-0 transition-sb-slow ring-0"
    >
      {{ props.label }}
    </label>
    <div
      v-intersection-observer="[
        onIntersectionObserver,
        {
          root: props.intersectionObserverSettings.rootElement,
          threshold: props.intersectionObserverSettings.threshold,
          rootMargin: props.intersectionObserverSettings.rootMargin,
        },
      ]"
      class="relative w-full"
      v-bind="$attrs"
    >
      <input
        :id="inputId"
        ref="reference"
        v-model="inputValue"
        :name="inputName"
        tabindex="0"
        :type="props.type"
        :class="[
          textSizeXS,
          {
            'bg-sb-secondary-100/50 border-sb-secondary-100 ': inputValue.length > 0,
            'bg-transparent border-white': inputValue.length === 0,
          },
        ]"
        class="w-full px-3 py-2 pr-12 text-white truncate border-2 rounded-lg outline-none transition-sb-slow focus:ring-0 focus:ring-offset-0 ring-0 ring-offset-0 focus:bg-white focus:shadow-sb-ring-sm focus:border-white focus:shadow-white focus:text-black"
        :placeholder="inputPlaceholder"
        @focus="handleFocusBlur(true)"
        @blur="handleFocusBlur(false)"
      />
      <BaseButton
        v-if="props.withMenu"
        ref="buttonMenuRef"
        no-style
        content-size="small"
        class="absolute inset-y-1.5 right-0 mr-4 rounded-lg hover:opacity-60"
        :class="[isOpen ? 'rotate-180' : 'rotate-0', isInputFocused ? 'text-black' : 'text-white']"
        :icon="isOpen ? XMarkIcon : AdjustmentsVerticalIcon"
        @click.stop="handleClick()"
      />
    </div>
    <teleport to="body">
      <transition name="scale-and-fade-fast">
        <div
          v-if="isOpen"
          ref="floating"
          v-on-click-outside="[
            (_: Event) => changeFloatingVisibility(false),
            { ignore: [reference, buttonMenuRef] },
          ]"
          :style="floatingStyles"
          class="absolute border-2 rounded-lg shadow-lg z-sb-dropdown border-sb-secondary-100 bg-sb-secondary-100 shadow-sb-secondary-300 h-fit"
        >
          <slot name="input-menu-box"></slot>
        </div>
      </transition>
    </teleport>
  </div>
</template>