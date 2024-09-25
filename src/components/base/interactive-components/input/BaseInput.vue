<script setup lang="ts">
import { AdjustmentsVerticalIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import { vOnClickOutside } from '@vueuse/components';
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';

import { BaseButton } from '@/components';
import { useFloatingPanel, useCommonStyleSingleton } from '@/hooks';

interface BaseInputProps {
  placeholder?: string;
  type?: 'text' | 'search';
  customZIndex?: number;
  withMenu?: boolean;
}

const props = withDefaults(defineProps<BaseInputProps>(), {
	variant: 'primary',
	placeholder: undefined,
	type: 'text',
	customZIndex: 40,
	withMenu: false,
});

const inputValue = defineModel<string>('inputValue', { required: true });

// Feature 0: Manage Style Classes
const { activeBreakpoint } = useCommonStyleSingleton();

// Feature 1: Manage Input Menu
const { isOpen, anchor, popper, popperStyle, changeToolTipVisibility } = useFloatingPanel('inputSettings');

const buttonMenuRef = ref();
const inputWidth = ref('auto');
const isInputFocused = ref(false);

const getPlaceholder = computed(() => {
	if (!props.placeholder) {
		return props.type === 'search' ? 'Search a value' : 'Enter text';
	}
	return props.placeholder;
});

const updateInputWidth = () => {
	if (anchor.value) {
		let width = anchor.value.offsetWidth;
		inputWidth.value = `${width * 0.97}px`; // Set width to 90% of input width
	}
};

const toggleMenu = (open?: boolean) => {
	changeToolTipVisibility(open ? 'open' : 'close');
	if (open) {
		nextTick();
		updateInputWidth();
	}
};

const handleClick = () => {
	if (!props.withMenu) { return; }
	toggleMenu(!isOpen.value);
};

const handleFocusBlur = (focused: boolean) => {
	isInputFocused.value = focused;
	if (props.withMenu && focused && isOpen.value) {
		toggleMenu(false);
	}
};

onMounted(() => {
	updateInputWidth();
	window.addEventListener('resize', updateInputWidth);
});

onUnmounted(() => {
	window.removeEventListener('resize', updateInputWidth);
});
</script>

<template>
  <div class="relative">
    <input
      ref="anchor"
      v-model="inputValue"
      tabindex="0"
      :type="props.type"
      :class="
        {
          'text-sb-sm': activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm' && activeBreakpoint !== 'md',
          'text-sb-xs': activeBreakpoint === 'xs' || activeBreakpoint === 'sm' || activeBreakpoint === 'md',
        }
      "
      class="w-full py-2 pl-4 pr-12 text-white truncate transition-all duration-300 ease-in-out bg-transparent border-2 border-white rounded-full outline-none focus:ring-0 focus:ring-offset-0 ring-0 ring-offset-0 hover:bg-slate-700 focus:bg-white focus:text-black"
      :placeholder="getPlaceholder"
      @focus="handleFocusBlur(true)"
      @blur="handleFocusBlur(false)"
    />
    <BaseButton
      v-if="props.withMenu"
      ref="buttonMenuRef"
      no-style
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
        ref="popper"
        v-on-click-outside="[(_: Event) => toggleMenu(false), { ignore: [anchor, buttonMenuRef] }]"
        :style="{
          ...popperStyle,
          width: inputWidth,
          zIndex: props.customZIndex,
        }"
        class="box-border absolute border-2 rounded-lg shadow-2xl border-slate-400 bg-secondary shadow-slate-400 h-fit"
      >
        <slot
          name="input-menu-box"
          :open-menu="() => toggleMenu(true)"
          :close-menu="() => toggleMenu(false)"
        ></slot>
      </div>
    </transition>
  </teleport>
</template>