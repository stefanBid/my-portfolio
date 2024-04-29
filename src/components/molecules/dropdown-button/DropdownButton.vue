<script setup lang="ts">
import { ChevronDownIcon } from '@heroicons/vue/24/solid';
import { vOnClickOutside } from '@vueuse/components';
import type { FunctionalComponent, Component } from 'vue';

import { useFloatingPanel, useGlobalBreakpoints } from '@/hooks';

interface DropdownButtonProps {
  icon?: FunctionalComponent | Component;
  customDimensions?: boolean;
}

const props = withDefaults(defineProps<DropdownButtonProps>(), {
	icon: undefined,
	customDimensions: false,
});

defineOptions({ inheritAttrs: false });

// Feature 0: Manage Style Classes
const { xs, sm, md } = useGlobalBreakpoints();

// Feature 0: Manage Open <--> Close State
const { isOpen, anchor, popper, popperStyle, changeToolTipVisibility } = useFloatingPanel('dropdownButton');

const handleClick = () => {
	if (isOpen.value) {
		changeToolTipVisibility('close');
		return;
	}
	changeToolTipVisibility('open');
};

</script>

<template>
  <div
    ref="anchor"
    class="w-fit"
  >
    <button
      v-bind="$attrs"
      class="flex items-center justify-between transition-all duration-300 ease-in-out border-2 rounded-full outline-none border-slate-700 group gap-x-3 font-roboto focus:outline-none ring-0 focus:ring-0"
      :class="[
        {
          ' border-white bg-white text-black': isOpen,
          ' text-white hover:border-slate-700 hover:bg-slate-700 hover:text-white bg-secondary': !isOpen,
        },
        {
          'px-4 py-2': !props.customDimensions,
          'text-sb-base': !xs && !sm && !md,
          'text-sb-sm': md,
          'text-sb-xs': sm || xs,
        }
      ]"
      @click="handleClick"
    >
      <div class="inline-flex items-center gap-x-1.5 flex-1">
        <component
          :is="props.icon"
          class="shrink-0"
          :class="{
            'size-6': !xs && !sm && !md,
            'size-5': md,
            'size-4': xs || sm,
          }"
        />
        <slot name="button-content"></slot>
      </div>
      <ChevronDownIcon
        class="transition-all duration-300 ease-in-out size-4 shrink-0"
        :class="{
          'rotate-180 text-black': isOpen,
          'rotate-0 text-white  ': !isOpen,
        }"
      />
    </button>
  </div>
  <teleport to="body">
    <transition name="scale-and-fade-fast">
      <div
        v-if="isOpen"
        ref="popper"
        v-on-click-outside="[(_: Event) => changeToolTipVisibility('close'), { ignore: [anchor] }]"
        :style="popperStyle"
        class="absolute z-50 p-2 text-sm break-words whitespace-normal border-2 rounded-lg shadow-lg border-slate-700 bg-secondary w-fit shadow-black/30"
      >
        <slot name="popper-content"></slot>
      </div>
    </transition>
  </teleport>
</template>
