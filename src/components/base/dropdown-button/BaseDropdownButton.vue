<script setup lang="ts">
import { ChevronDownIcon } from '@heroicons/vue/24/solid';
import { vOnClickOutside } from '@vueuse/components';
import type { FunctionalComponent, Component } from 'vue';

import { BaseButton } from '@/components';
import { useFloatingPanel, useCommonStyleSingleton } from '@/hooks';

interface BaseDropdownButtonProps {
  menuOptions: {
    [key: string]: {
      label: string;
      icon: FunctionalComponent | Component | string;
    };
  }
  // eslint-disable-next-line no-unused-vars
  onGetSelectedOption: (option: string) => void;
  selectedOption?: string;
  icon?: FunctionalComponent | Component | string;
}

const props = withDefaults(defineProps<BaseDropdownButtonProps>(), {
	selectedOption: undefined,
	icon: undefined,
	customDimensions: false,
});

defineOptions({ inheritAttrs: false });

// Feature 0: Manage Style Classes
const { xs, sm, md } = useCommonStyleSingleton();

// Feature 0: Manage Open <--> Close State
const { isOpen, anchor, popper, popperStyle, changeToolTipVisibility } = useFloatingPanel('dropdownButton');

const handleClick = () => {
	if (isOpen.value) {
		changeToolTipVisibility('close');
		return;
	}
	changeToolTipVisibility('open');
};

// Feature 1: Handle Option Selection
const handleOptionSelection = (option: string) => {
	props.onGetSelectedOption(option);
	changeToolTipVisibility('close');
};

</script>

<template>
  <div
    ref="anchor"
    class="w-fit"
  >
    <BaseButton
      v-bind="$attrs"
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
    </BaseButton>
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
        <div class="w-48 p-1">
          <span
            v-for="op in Object.keys(props.menuOptions)"
            :key="op"
            :tabindex="0"
            class="inline-flex items-center w-full p-2 transition-all duration-300 ease-in-out outline-none cursor-pointer rounded-xl gap-x-2 hover:bg-slate-200 group ring-0 focus-visible:ring-2 ring-white"
            @keydown.enter="handleOptionSelection(op)"
            @click="handleOptionSelection(op)"
          >
            <component
              :is="props.menuOptions[op].icon"
              class="shrink-0"
              :class="{
                'size-6': !xs && !sm && !md,
                'size-5': md,
                'size-4': xs || sm,
              }"
            />
            <span
              :class="{ 'font-semibold': props.selectedOption === op}"
              class="flex-1 text-white transition-all duration-100 ease-in-out group-hover:text-black text-roboto"
            >
              {{ props.menuOptions[op].label }}
            </span>
          </span>
        </div>
      </div>
    </transition>
  </teleport>
</template>
