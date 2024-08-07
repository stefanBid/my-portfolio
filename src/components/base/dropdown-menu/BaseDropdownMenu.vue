<script setup lang="ts">
import { ChevronDownIcon } from '@heroicons/vue/24/solid';
import { vOnClickOutside } from '@vueuse/components';

import { BaseButton } from '@/components';
import { useFloatingPanel, useCommonStyleSingleton } from '@/hooks';

interface BaseDropdownMenuProps {
  customWidth?: number | 'auto';
  customHeight?: number | 'auto';
  customZIndex?: number;
}

const props = withDefaults(defineProps<BaseDropdownMenuProps>(), {
	customZIndex: 40,
	customWidth: 'auto',
	customHeight: 'auto',
});

defineOptions({ inheritAttrs: false });

// Feature 0: Manage Style Classes
const { xs, sm, md } = useCommonStyleSingleton();

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
  <div class="w-fit">
    <BaseButton
      v-bind="$attrs"
      ref="anchor"
      no-style
      content-horizontal-orientation="between"
      class="border-2 rounded-full border-slate-700 group gap-x-3"
      :class="[
        {
          ' border-white bg-white text-black': isOpen,
          ' text-white hover:border-slate-700 hover:bg-slate-700 hover:text-white bg-secondary': !isOpen,
        },
        {
          'text-sb-base px-3.5 py-1.5': !xs && !sm && !md,
          'text-sb-sm px-3 py-1': md,
          'text-sb-xs px-2.5 py-1': xs || sm ,
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
        v-on-click-outside="[(_: Event) => toggleMenu(false), { ignore: [anchor] }]"
        :style="{
          ...popperStyle,
          width: typeof props.customWidth === 'number' ? `${props.customWidth}px` : 'auto',
          height: typeof props.customHeight === 'number' ? `${props.customHeight}px` : 'auto',
          zIndex: props.customZIndex,
        }"
        class="box-border absolute border-2 rounded-lg border-slate-700 bg-secondary shadow-sb-light"
      >
        <slot
          name="dropdown-section-content"
          :open-menu="() => toggleMenu(true)"
          :close-menu="() => toggleMenu(false)"
        ></slot>
      </div>
    </transition>
  </teleport>
</template>
