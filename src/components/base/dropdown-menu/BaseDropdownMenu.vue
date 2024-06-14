<script setup lang="ts">
import { ChevronDownIcon } from '@heroicons/vue/24/solid';

import { BaseButton } from '@/components';
import { useFloatingPanel, useCommonStyleSingleton, useClickOutside } from '@/hooks';

interface BaseDropdownMenuProps {
  customWidth?: number | 'fit-content';
  customHeight?: number | 'fit-content';
}

const props = withDefaults(defineProps<BaseDropdownMenuProps>(), {
	customWidth: 'fit-content',
	customHeight: 'fit-content',
});

defineOptions({ inheritAttrs: false });

// Feature 0: Manage Style Classes
const { xs, sm, md } = useCommonStyleSingleton();

// Feature 0: Manage Open <--> Close State
const { isOpen, anchor, popper, popperStyle, changeToolTipVisibility } = useFloatingPanel('dropdownMenu');

const { vOnClickOutside, functionToInvoke, listOfIgnoredElementsRef } = useClickOutside([anchor], () => changeToolTipVisibility('close'));

const closeMenu = () => {
	changeToolTipVisibility('close');
};

const openMenu = () => {
	changeToolTipVisibility('open');
};

const handleClick = () => {
	if (isOpen.value) {
		closeMenu();
	} else {
		openMenu();
	}
};

</script>

<template>
  <div class="w-fit">
    <BaseButton
      v-bind="$attrs"
      ref="anchor"
      no-style
      content-horizontal-orientation="between"
      class="px-3.5 py-1.5 border-2 rounded-full border-slate-700 group gap-x-3"
      :class="[
        {
          ' border-white bg-white text-black': isOpen,
          ' text-white hover:border-slate-700 hover:bg-slate-700 hover:text-white bg-secondary': !isOpen,
        },
        {
          'text-sb-base': !xs && !sm && !md,
          'text-sb-sm': md,
          'text-sb-xs': sm || xs,
        }
      ]"
      @click.stop="handleClick()"
    >
      <slot name="dropdown-button-content"></slot>
      <ChevronDownIcon
        class="transition-all duration-300 ease-in-out size-4 shrink-0"
        :class="{
          'rotate-180 text-black': isOpen,
          'rotate-0 text-white  ': !isOpen,
        }"
      />
    </BaseButton>
  </div>
  <teleport to="body">
    <transition name="scale-and-fade-fast">
      <div
        v-if="isOpen"
        ref="popper"
        v-on-click-outside="[(_: Event) => functionToInvoke(), { ignore: listOfIgnoredElementsRef }]"
        :style="{
          ...popperStyle,
          width: typeof props.customWidth === 'number' ? `${props.customWidth}px` : 'fit-content',
          height: typeof props.customHeight === 'number' ? `${props.customHeight}px` : 'fit-content',
        }"
        class="box-border absolute z-50 border-2 rounded-lg border-slate-700 bg-secondary w-fit shadow-sb-light"
      >
        <slot
          name="dropdown-section-content"
          :open-menu="openMenu"
          :close-menu="closeMenu"
        ></slot>
      </div>
    </transition>
  </teleport>
</template>
