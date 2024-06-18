<script setup lang="ts">

import { AdjustmentsVerticalIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import { computed, onMounted, ref, watch } from 'vue';

import { BaseButton } from '@/components';
import { useFloatingPanel, useClickOutside, useCommonStyleSingleton } from '@/hooks';

interface BaseInputProps {
  placeholder?: string;
  type?: 'text' | 'search';
  customInputWidth?: number | 'full';
  customMenuHeight?: number | 'auto';
  customZIndex?: number;
  withMenu?: boolean;
}

const props = withDefaults(defineProps<BaseInputProps>(), {
	variant: 'primary',
	placeholder: undefined,
	type: 'text',
	customInputWidth: 'full',
	customMenuHeight: 'auto',
	customZIndex: 40,
	withMenu: false,
});

const inputValue = defineModel<string>('inputValue', { required: true });

// Feature 0: Manage Style Classes
const { xs, sm, md } = useCommonStyleSingleton();

const menuIconColor = ref<string>('text-white');

const handleFocus = () => {
	menuIconColor.value = 'text-black';
};

const handleBlur = () => {
	menuIconColor.value = 'text-white';
};

// Feature 1: Manage differt input settings
const buttonMenu = ref();
const { isOpen, anchor, popper, popperStyle, changeToolTipVisibility } = useFloatingPanel('inputSettings');
const { vOnClickOutside, functionToInvoke, listOfIgnoredElementsRef } = useClickOutside([anchor, buttonMenu], () => changeToolTipVisibility('close'));

const getPlaceholder = computed(() => {
	if (!props.placeholder) {
		return props.type === 'search' ? 'Search a value' : 'Enter text';
	}
	return props.placeholder;
});

const closeMenu = () => {
	changeToolTipVisibility('close');
};

const openMenu = () => {
	changeToolTipVisibility('open');
};

const handleClick = () => {
	if (!props.withMenu) { return; }
	if (isOpen.value) {
		closeMenu();
	} else {
		openMenu();
	}
};

// Feature 2: Manage Popper Width
const popperWidth = ref<string | number>('85%');
const calculatePopperWidth = () => {
	if (typeof props.customInputWidth === 'number') {
		popperWidth.value = props.customInputWidth * 0.95; // 80% of input width
	} else {
		popperWidth.value = '85%';
	}
};

onMounted(() => {
	calculatePopperWidth();
});

watch(() => props.customInputWidth, calculatePopperWidth);

</script>

<template>
  <div
    :style="{
      width: typeof props.customInputWidth === 'number' ? `${props.customInputWidth}px` : '100%',
    }"
    tabindex="0"
    class="relative flex items-center rounded-full"
  >
    <input
      ref="anchor"
      v-model="inputValue"
      :type="props.type"
      :class="
        {
          'text-sb-lg': !xs && !sm && !md,
          'text-sb-base': md,
          'text-sb-sm': xs || sm,
        }
      "
      class="flex-1 py-3 pl-4 pr-12 text-white transition-all duration-300 ease-in-out border-2 rounded-full outline-none focus:ring-0 focus:ring-offset-0 ring-0 ring-offset-0 border-slate-700 bg-slate-700/50 hover:bg-slate-700 focus:border-white focus:bg-white focus:text-black"
      :placeholder="getPlaceholder"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <BaseButton
      v-if="props.withMenu"
      ref="buttonMenu"
      no-style
      class="absolute inset-y-0 right-0 mr-4 rounded-lg w-fit shrink-0 "

      :class="[menuIconColor, {
        'rotate-180': isOpen,
      }]"
      :icon="isOpen ? XMarkIcon : AdjustmentsVerticalIcon"
      @click="handleClick()"
    />
  </div>
  <teleport to="body">
    <transition name="scale-and-fade-fast">
      <div
        v-if="isOpen"
        ref="popper"
        v-on-click-outside="[(_: Event) => functionToInvoke(), { ignore: listOfIgnoredElementsRef }]"
        :style="{
          ...popperStyle,
          width: typeof props.customInputWidth === 'number' ? `${popperWidth}px` : popperWidth,
          height: typeof props.customMenuHeight === 'number' ? `${props.customMenuHeight}px` : 'auto',
          zIndex: props.customZIndex,
        }"
        class="box-border absolute border-2 rounded-lg border-slate-700 bg-secondary shadow-sb-light"
      >
        <slot
          name="input-menu-box"
          :open-menu="openMenu"
          :close-menu="closeMenu"
        ></slot>
      </div>
    </transition>
  </teleport>
</template>