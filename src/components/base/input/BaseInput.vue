<script setup lang="ts">
import { ChevronDownIcon } from '@heroicons/vue/24/outline';
import { vOnClickOutside, vIntersectionObserver } from '@vueuse/components';
import { computed, ref } from 'vue';
import { nanoid } from 'nanoid';

import { BaseButton } from '@/components';
import { useSbFloatingPanel } from 'sb-floating-panel-vue';
import { useStyleStore } from '@/stores';

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

// Store Declarations
const styleStore = useStyleStore();

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

const inputLabel = computed(() => {
  if (props.label) {
    if (props.mandatory) return `${props.label} *`;
    else return props.label;
  } else return undefined;
});

// Feature 2: Manage Input Menu
const { isOpen, reference, floating, floatingStyle, toggle, close } = useSbFloatingPanel({
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
  toggle();
};

const handleFocusBlur = (focused: boolean): void => {
  isInputFocused.value = focused;
  if (props.withMenu && focused && isOpen.value) {
    close();
  }
};

const onIntersectionObserver = ([{ isIntersecting }]: IntersectionObserverEntry[]): void => {
  if (!isIntersecting && isOpen.value && props.withMenu) {
    close();
  }
};
</script>

<template>
  <div class="flex flex-col w-full">
    <label
      v-if="props.label"
      :for="inputId"
      tabindex="0"
      :class="[
        styleStore.textSizeXS,
        {
          'text-white hover:text-shadow-luminous focus-visible:text-shadow-luminous':
            !props.validation?.show,
          'text-sb-error hover:text-shadow-luminous-error focus-visible:text-shadow-luminous-error':
            props.validation?.show,
        },
      ]"
      class="mb-1 font-medium transition-all duration-300 ease-in-out outline-none cursor-pointer font-roboto w-fit focus-visible:ring-0 ring-0"
      @keydown.enter.stop.prevent="() => reference?.focus()"
      @click.stop.prevent="() => reference?.focus()"
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
        :id="inputId"
        ref="reference"
        v-model="inputValue"
        :aria-label="props.ariaLabel"
        :name="inputName"
        tabindex="0"
        :type="props.type === 'email' ? 'text' : props.type"
        :class="[
          styleStore.textSizeXS,
          {
            'bg-sb-secondary-100/50': inputValue.length > 0,
            'bg-transparent': inputValue.length === 0,
            'border-white': inputValue.length === 0 && !props.validation?.show,
            'border-sb-secondary-100': inputValue.length > 0 && !props.validation?.show,
            'border-sb-error focus:border-sb-error focus:shadow-sb-error': props.validation?.show,
            'focus:border-white focus:shadow-white': !props.validation?.show,
            'px-3':
              !props.withMenu &&
              styleStore.activeBreakpoint !== 'xs' &&
              styleStore.activeBreakpoint !== 'sm' &&
              styleStore.activeBreakpoint !== 'md',
            'px-2.5': !props.withMenu && styleStore.activeBreakpoint === 'md',
            'px-2':
              !props.withMenu &&
              (styleStore.activeBreakpoint === 'sm' || styleStore.activeBreakpoint === 'xs'),
            'pl-3 pr-12':
              props.withMenu &&
              styleStore.activeBreakpoint !== 'xs' &&
              styleStore.activeBreakpoint !== 'sm' &&
              styleStore.activeBreakpoint !== 'md',
            'pl-2.5 pr-10':
              props.withMenu && props.type === 'search' && styleStore.activeBreakpoint === 'md',
            'pl-2 pr-8':
              props.withMenu &&
              (styleStore.activeBreakpoint === 'sm' || styleStore.activeBreakpoint === 'xs'),
            'py-2.5':
              styleStore.activeBreakpoint !== 'xs' &&
              styleStore.activeBreakpoint !== 'sm' &&
              styleStore.activeBreakpoint !== 'md',
            'py-2 ': styleStore.activeBreakpoint === 'md',
            'py-1.5': styleStore.activeBreakpoint === 'sm' || styleStore.activeBreakpoint === 'xs',
          },
        ]"
        class="w-full text-white truncate transition-all duration-300 ease-in-out border-2 rounded-lg outline-none focus:ring-0 focus:ring-offset-0 ring-0 ring-offset-0 focus:bg-white focus:shadow-sb-ring-sm focus:text-black"
        :placeholder="inputPlaceholder"
        @focus="handleFocusBlur(true)"
        @blur="handleFocusBlur(false)"
      />
      <BaseButton
        v-if="props.withMenu"
        ref="buttonMenuRef"
        aria-label="open input menu"
        variant="custom"
        size="custom"
        :class="[
          {
            'px-3':
              styleStore.activeBreakpoint !== 'xs' &&
              styleStore.activeBreakpoint !== 'sm' &&
              styleStore.activeBreakpoint !== 'md',
            'px-2.5': styleStore.activeBreakpoint === 'md',
            'px-2': styleStore.activeBreakpoint === 'sm' || styleStore.activeBreakpoint === 'xs',
            'bg-white text-black border-white': !isInputFocused && isOpen,
            'bg-transparent text-white hover:bg-white hover:text-black hover:border-white':
              !isInputFocused && !isOpen,
            'text-black bg-transparent border-transparent hover:bg-black hover:text-white':
              isInputFocused,
          },
        ]"
        class="absolute right-0 h-full -translate-y-1/2 border rounded-r-lg rounded-y-lg top-1/2 focus-visible:bg-white focus-visible:text-black focus-visible:border-white"
        @click.stop="handleClick"
      >
        <ChevronDownIcon
          class="transition-all duration-300 ease-in-out shrink-0 stroke-[2.5px]"
          :class="[styleStore.iconSizeXS, isOpen ? 'rotate-180' : 'rotate-0']"
        />
      </BaseButton>
    </div>
    <teleport to="body">
      <transition name="scale-and-fade-fast">
        <div
          v-if="isOpen"
          ref="floating"
          v-on-click-outside="[(_: Event) => close(), { ignore: [reference, buttonMenuRef] }]"
          :style="floatingStyle"
          class="absolute border-2 rounded-lg shadow-2xl z-sb-dropdown border-sb-secondary-100 bg-sb-secondary-100 shadow-sb-secondary-300 h-fit"
        >
          <slot name="input-menu-box"></slot>
        </div>
      </transition>
    </teleport>
    <small
      v-if="props.validation?.show && props.validation.message"
      :class="[styleStore.textSizeXS]"
      class="mt-1 transition-all duration-300 ease-in-out text-sb-error font-roboto"
    >
      {{ props.validation.message }}
    </small>
  </div>
</template>
