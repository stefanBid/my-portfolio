<script setup lang="ts">
import { AdjustmentsVerticalIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import { vOnClickOutside } from '@vueuse/components';
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';

import { BaseButton } from '@/components';
import { useFloatingPanel, useCommonStyleSingleton } from '@/hooks';

interface BaseInputProps {
  placeholder?: string;
  type?: 'text' | 'search';
  customMenuHeight?: number | 'auto';
  customZIndex?: number;
  withMenu?: boolean;
}

const props = withDefaults(defineProps<BaseInputProps>(), {
	variant: 'primary',
	placeholder: undefined,
	type: 'text',
	customMenuHeight: 'auto',
	customZIndex: 40,
	withMenu: false,
});

const inputValue = defineModel<string>('inputValue', { required: true });

// Feature 0: Manage Style Classes
const { xs, sm, md } = useCommonStyleSingleton();

// Feature 1: Manage Input Menu
const { isOpen, anchor, popper, popperStyle, changeToolTipVisibility } = useFloatingPanel('inputSettings');

const buttonMenuRef = ref();
const inputWidth = ref('auto');
const isInputFocused = ref(false);

const getMenuStyle = computed(() => {

	if (isInputFocused.value) {
		return 'text-black hover:bg-black hover:text-white';
	} else {
		return 'text-white hover:bg-white hover:text-black';
	}
});

const getPlaceholder = computed(() => {
	if (!props.placeholder) {
		return props.type === 'search' ? 'Search a value' : 'Enter text';
	}
	return props.placeholder;
});

const toggleMenu = (open?: boolean) => {
	changeToolTipVisibility(open ? 'open' : 'close');
	if (open) {
		nextTick(() => {
			updateInputWidth();
		});
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

const updateInputWidth = () => {
	if (anchor.value) {
		let width = anchor.value.offsetWidth;
		inputWidth.value = `${width * 0.97}px`; // Set width to 90% of input width
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
          'text-sb-lg': !xs && !sm && !md,
          'text-sb-base': md,
          'text-sb-sm': xs || sm,
        }
      "
      class="w-full py-2 pl-4 pr-12 text-white truncate transition-all duration-300 ease-in-out border-2 border-white rounded-full outline-none focus:ring-0 focus:ring-offset-0 ring-0 ring-offset-0 bg-slate-700/50 hover:bg-slate-700 focus:bg-white focus:text-black"
      :placeholder="getPlaceholder"
      @focus="handleFocusBlur(true)"
      @blur="handleFocusBlur(false)"
    />
    <BaseButton
      v-if="props.withMenu"
      ref="buttonMenuRef"
      no-style
      class="absolute right-0 mr-4 p-0.5 inset-y-2.5 w-fit h-fit rounded-lg "

      :class="[getMenuStyle, isOpen ? 'rotate-180': 'rotate-0']"
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
          height: typeof props.customMenuHeight === 'number' ? `${props.customMenuHeight}px` : 'auto',
          width: inputWidth,
          zIndex: props.customZIndex,
        }"
        class="box-border absolute border-2 rounded-lg border-slate-700 bg-secondary shadow-sb-light w-80"
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