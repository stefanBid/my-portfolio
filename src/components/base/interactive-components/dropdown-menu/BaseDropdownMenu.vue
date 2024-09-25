<script setup lang="ts">
import { ChevronDownIcon } from '@heroicons/vue/24/solid';
import { vOnClickOutside } from '@vueuse/components';

import { BaseButton } from '@/components';
import { useFloatingPanel, useCommonStyleSingleton } from '@/hooks';

interface BaseDropdownMenuProps {
  customZIndex?: number;
}

const props = withDefaults(defineProps<BaseDropdownMenuProps>(), {
	customZIndex: 40,
});

defineOptions({ inheritAttrs: false });

// Feature 0: Manage Style Classes
const { activeBreakpoint } = useCommonStyleSingleton();

// Feature 1: Manage Open <--> Close State
const { isOpen, anchor, popper, popperStyle, changeToolTipVisibility } = useFloatingPanel('dropdownMenu');

const toggleMenu = (open?: boolean) => {
	changeToolTipVisibility(open ? 'open' : 'close');
};

const handleClick = () => {
	toggleMenu(!isOpen.value);
};

</script>

<template>
  <BaseButton
    v-bind="$attrs"
    ref="anchor"
    no-style
    content-horizontal-orientation="between"
    class="py-1 border-2 rounded-full group gap-x-3 focus-visible:ring-0 ring-0"
    :class="[
      {
        ' border-sb-tertiary-100 bg-sb-tertiary-100 text-black shadow-[0_0_10px_3px_rgba(233,89,5,0.8)] ': isOpen,
        ' text-white hover:bg-sb-tertiary-200 hover:border-sb-tertiary-200 bg-sb-secondary-200  border-sb-secondary-100 focus-visible:bg-sb-tertiary-200 focus-visible:border-sb-tertiary-200': !isOpen,
      },
      {
        'text-sb-base px-3.5': activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm' && activeBreakpoint !== 'md',
        'text-sb-sm px-3': activeBreakpoint === 'md',
        'text-sb-xs px-2.5': activeBreakpoint === 'xs' || activeBreakpoint === 'sm',
      }
    ]"
    @click.stop="handleClick()"
  >
    <slot name="dropdown-button-content"></slot>
    <ChevronDownIcon
      class="transition-all duration-200 ease-in-out transform size-4 shrink-0 "
      :class="{
        'rotate-180 text-black': isOpen,
        'rotate-0 text-white ': !isOpen,
      }"
    />
  </BaseButton>
  <transition name="scale-and-fade-fast">
    <div
      v-if="isOpen"
      ref="popper"
      v-on-click-outside="[(_: Event) => toggleMenu(false), { ignore: [anchor] }]"
      :style="{
        ...popperStyle,
        zIndex: props.customZIndex,
      }"
      class="box-border absolute border-2 rounded-lg shadow-lg border-sb-secondary-100 bg-sb-secondary-200 shadow-sb-secondary-100 w-fit h-fit"
    >
      <slot
        name="dropdown-section-content"
        :open-menu="() => toggleMenu(true)"
        :close-menu="() => toggleMenu(false)"
      ></slot>
    </div>
  </transition>
</template>
