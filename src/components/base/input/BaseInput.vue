<script setup lang="ts">
import MdiKeyboardArrowDown from '~icons/mdi/keyboard-arrow-down';
import { vOnClickOutside, vIntersectionObserver } from '@vueuse/components';
import { computed, ref } from 'vue';
import { nanoid } from 'nanoid';
import { useSbFloatingPanel } from 'sb-floating-panel-vue';

import BaseButton from '@/components/base/button/BaseButton.vue';

interface InputProps {
  ariaLabel?: string;
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
  mandatory?: boolean;
  validation?: { show: boolean; message?: string };
}

// Input / Output (Props / Emits)
const props = withDefaults(defineProps<InputProps>(), {
  ariaLabel: 'general input',
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
  mandatory: false,
  validation: undefined,
});

const inputValue = defineModel<string>('inputValue', { required: true });

// Dependencies
const { isOpen, reference, floating, floatingStyle, toggle, close } = useSbFloatingPanel({
  placement: 'bottom',
  strategy: 'absolute',
  offsetValue: 15,
  hasResize: true,
});

// State
const uniqueId = nanoid();
const buttonMenuRef = ref();
const isInputFocused = ref(false);

const inputAttrs = computed(() => {
  return {
    id: props.id || `${uniqueId}-input-id`,
    name: props.name || `${uniqueId}-input-name`,
    'aria-label': props.ariaLabel,
  };
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

const inputLabel = computed(() => {
  if (props.label) {
    if (props.mandatory) return `${props.label} *`;
    else return props.label;
  } else return undefined;
});

// Events
const onIntersectionObserver = ([{ isIntersecting }]: IntersectionObserverEntry[]): void => {
  if (!isIntersecting && isOpen.value && props.withMenu) {
    close();
  }
};

const onClick = (): void => {
  if (!props.withMenu) {
    return;
  }
  toggle();
};

const onFocusBlur = (focused: boolean): void => {
  isInputFocused.value = focused;
  if (props.withMenu && focused && isOpen.value) {
    close();
  }
};
</script>

<template>
  <div class="flex flex-col w-full">
    <label
      v-if="props.label"
      :for="inputAttrs.id"
      :class="[
        {
          'text-white hover:text-shadow-luminous': !props.validation?.show,
          'text-sb-error hover:text-shadow-luminous-error ': props.validation?.show,
        },
      ]"
      class="text-size-xs mb-1 font-medium transition-all duration-300 ease-in-out cursor-pointer font-roboto w-fit"
    >
      {{ inputLabel }}
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
        :id="inputAttrs.id"
        ref="reference"
        v-model="inputValue"
        :aria-label="inputAttrs['aria-label']"
        :name="inputAttrs.name"
        :tabindex="0"
        :type="props.type === 'email' ? 'text' : props.type"
        :class="[
          {
            'bg-sb-secondary-100/50': inputValue.length > 0,
            'bg-transparent': inputValue.length === 0,
            'border-white': inputValue.length === 0 && !props.validation?.show,
            'border-sb-secondary-100': inputValue.length > 0 && !props.validation?.show,
            'border-sb-error focus:border-sb-error focus:shadow-sb-error': props.validation?.show,
            'focus:border-white focus:shadow-white': !props.validation?.show,
            'input-spacing-with-menu': props.withMenu,
            'input-spacing-no-menu': !props.withMenu,
          },
        ]"
        class="text-size-xs w-full text-white truncate transition-all duration-300 ease-in-out border-2 rounded-lg outline-none focus:ring-offset-0 ring-0 ring-offset-0 focus:bg-white focus:shadow-sb-ring-sm focus:text-black py-1.5 sm:py-2 md:py-2 lg:py-2.5"
        :placeholder="inputPlaceholder"
        @focus="onFocusBlur(true)"
        @blur="onFocusBlur(false)"
      />
      <BaseButton
        v-if="props.withMenu"
        ref="buttonMenuRef"
        aria-label="open input menu"
        variant="custom"
        size="custom"
        :class="[]"
        class="absolute right-0 h-full pr-2 rounded-e-lg"
        @click.stop="onClick"
      >
        <MdiKeyboardArrowDown
          class="icon-size-s transition-all duration-300 ease-in-out shrink-0 stroke-[2.5px]"
          :class="[
            isOpen ? 'rotate-180' : 'rotate-0',
            isInputFocused ? 'text-black' : 'text-white',
          ]"
        />
      </BaseButton>
    </div>
    <transition name="scale-and-fade-fast">
      <div
        v-if="isOpen"
        ref="floating"
        v-on-click-outside="[(_: Event) => close(), { ignore: [reference, buttonMenuRef] }]"
        :style="floatingStyle"
        class="absolute border-2 rounded-lg shadow-2xl z-[1200] border-sb-secondary-100 bg-sb-secondary-100 shadow-sb-secondary-300 h-fit"
      >
        <slot name="input-menu-box"></slot>
      </div>
    </transition>
    <small
      v-if="props.validation?.show && props.validation.message"
      class="text-size-xs mt-1 text-right transition-all duration-300 ease-in-out text-sb-error font-roboto"
    >
      {{ props.validation.message }}
    </small>
  </div>
</template>

<style scoped>
@reference "@/style/index.css";

.input-spacing-with-menu {
  @apply pl-2 pr-8 sm:pl-2.5 md:pl-2.5 lg:pl-3 lg:pr-10;
}

.input-spacing-no-menu {
  @apply px-2 sm:px-2.5 md:px-2.5 lg:px-3;
}
</style>
