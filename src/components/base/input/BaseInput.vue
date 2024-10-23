<script setup lang="ts">
import { AdjustmentsVerticalIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import { vOnClickOutside, vIntersectionObserver } from '@vueuse/components';
import { computed, ref } from 'vue';

import { BaseButton } from '@/components';
import { useFloatingPanel, useCommonStyleSingleton } from '@/hooks';

interface InputProps {
  placeholder?: string;
  type?: 'text' | 'search';
  withMenu?: boolean;
  intersectionObserverSettings?: {
    rootElement: HTMLElement | null;
    rootMargin?: string;
    threshold?: number;
  }
}

const props = withDefaults(defineProps<InputProps>(), {
	variant: 'primary',
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
const { activeBreakpoint } = useCommonStyleSingleton();

// Feature 1: Manage Input Menu
const { isOpen, reference, floating, floatingStyles, changeFloatingVisibility } = useFloatingPanel({
	placement: 'bottom',
	strategy: 'absolute',
	offsetValue: 15,
	hasResize: true,
});

const buttonMenuRef = ref();
const isInputFocused = ref(false);

const getPlaceholder = computed(() => {
	if (!props.placeholder) {
		return props.type === 'search' ? 'Search a value' : 'Enter text';
	}
	return props.placeholder;
});

const handleClick = () => {
	if (!props.withMenu) { return; }
	changeFloatingVisibility(isOpen.value ? false : true);
};

const handleFocusBlur = (focused: boolean) => {
	isInputFocused.value = focused;
	if (props.withMenu && focused && isOpen.value) {
		changeFloatingVisibility(false);
	}
};

const onIntersectionObserver = ([{ isIntersecting }]: IntersectionObserverEntry[]) => {
	if (!isIntersecting && isOpen.value && props.withMenu) {
		changeFloatingVisibility(false);
	}
};

</script>

<template>
  <div class="w-full ">
    <div
      v-intersection-observer="[onIntersectionObserver, { root: props.intersectionObserverSettings.rootElement, threshold: props.intersectionObserverSettings.threshold, rootMargin: props.intersectionObserverSettings.rootMargin }]"
      class="relative w-full"
      v-bind="$attrs"
    >
      <input
        ref="reference"
        v-model="inputValue"
        tabindex="0"
        :type="props.type"
        :class="
          {
            'text-sb-sm': activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm' && activeBreakpoint !== 'md',
            'text-sb-xs': activeBreakpoint === 'xs' || activeBreakpoint === 'sm' || activeBreakpoint === 'md',
          }
        "
        class="w-full py-2 pl-4 pr-12 text-white truncate bg-transparent border-2 border-white rounded-full outline-none transition-sb-slow focus:ring-0 focus:ring-offset-0 ring-0 ring-offset-0 hover:bg-slate-700 focus:bg-white focus:shadow-sb-ring-sm focus:shadow-white focus:text-black"
        :placeholder="getPlaceholder"
        @focus="handleFocusBlur(true)"
        @blur="handleFocusBlur(false)"
      />
      <BaseButton
        v-if="props.withMenu"
        ref="buttonMenuRef"
        no-style
        content-size="small"
        class="absolute inset-y-1.5 right-0 mr-4 rounded-lg hover:opacity-60"
        :class="[ isOpen ? 'rotate-180': 'rotate-0', isInputFocused ? 'text-black': 'text-white']"
        :icon="isOpen ? XMarkIcon : AdjustmentsVerticalIcon"
        @click.stop="handleClick()"
      />
    </div>
    <teleport to="body">
      <transition name="scale-and-fade-fast">
        <div
          v-if="isOpen"
          ref="floating"
          v-on-click-outside="[(_: Event) => changeFloatingVisibility(false), { ignore: [reference, buttonMenuRef] }]"
          :style="floatingStyles"
          class="absolute border-2 rounded-lg shadow-lg z-sb-dropdown border-sb-secondary-100 bg-sb-secondary-100 shadow-sb-secondary-300 h-fit"
        >
          <slot name="input-menu-box"></slot>
        </div>
      </transition>
    </teleport>
  </div>
</template>