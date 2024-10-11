<script setup lang="ts">
import { AdjustmentsVerticalIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import { vOnClickOutside } from '@vueuse/components';
import { computed, ref } from 'vue';

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
const { isOpen, anchor, popper, popperStyle, changeToolTipVisibility } = useFloatingPanel({
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
	changeToolTipVisibility(isOpen.value ? 'close' : 'open');
};

const handleFocusBlur = (focused: boolean) => {
	isInputFocused.value = focused;
	if (props.withMenu && focused && isOpen.value) {
		changeToolTipVisibility('close');
	}
};

</script>

<template>
  <div
    class="relative"
    v-bind="$attrs"
  >
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
      class="w-full py-2 pl-4 pr-12 text-white truncate transition-all duration-300 ease-in-out bg-transparent border-2 border-white rounded-full outline-none focus:ring-0 focus:ring-offset-0 ring-0 ring-offset-0 hover:bg-slate-700 focus:bg-white focus:shadow-[0_0_10px_3px_rgba(255,255,255,0.8)] focus:text-black"
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
        v-on-click-outside="[(_: Event) => changeToolTipVisibility('close'), { ignore: [anchor, buttonMenuRef] }]"
        :style="{
          ...popperStyle,
          zIndex: props.customZIndex,
        }"
        class="box-border absolute border-2 rounded-lg shadow-lg border-sb-secondary-100 bg-sb-secondary-200 shadow-sb-secondary-100 h-fit"
      >
        <slot
          name="input-menu-box"
          :open-menu="() => changeToolTipVisibility('open')"
          :close-menu="() => changeToolTipVisibility('close')"
        ></slot>
      </div>
    </transition>
  </teleport>
</template>