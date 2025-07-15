<script setup lang="ts">
import MdiKeyboardArrowDown from '~icons/mdi/keyboard-arrow-down';
import { vOnClickOutside, vIntersectionObserver } from '@vueuse/components';
import { ref, type Ref } from 'vue';
import { SbContainer, SbFloating, SbReference } from 'sb-floating-panel-vue';
import { useStyleStore } from '@/stores';
import { BaseIcon } from '@/components';

interface DropdownMenuProps {
  options: {
    id: string;
    label: string;
    icon?: string;
    onClick: () => void;
  }[];
  defaultStarterOption?: string;
  label?: string;
  icon?: string;
  zIndex?: 'z-sb-base-5' | 'z-sb-dropdown';
  menuStrategy?: 'absolute' | 'fixed';
  intersectionObserverSettings?: {
    rootElement: HTMLElement | null;
    rootMargin?: string;
    threshold?: number;
  };
  ariaLabel?: string;
}

const props = withDefaults(defineProps<DropdownMenuProps>(), {
  defaultStarterOption: undefined,
  label: undefined,
  icon: undefined,
  zIndex: 'z-sb-dropdown',
  menuStrategy: 'absolute',
  intersectionObserverSettings: () => ({
    rootElement: null,
    rootMargin: '-80px 0px 0px 0px',
    threshold: 0.05,
  }),
  ariaLabel: 'general dropdown menu',
});

// Store Declarations
const styleStore = useStyleStore();

const createOnIntersectionObserver = (isOpen: Ref<boolean>, close: () => void) => {
  return ([{ isIntersecting }]: IntersectionObserverEntry[]) => {
    if (!isIntersecting && isOpen.value) {
      close();
    }
  };
};

const selectedOption = ref<string | undefined>(props.defaultStarterOption);

const onSelectOption = (optionId: string, optionOnClick: () => void): void => {
  selectedOption.value = optionId;
  optionOnClick();
};
</script>

<template>
  <SbContainer :strategy="props.menuStrategy" v-slot="context">
    <SbReference
      v-intersection-observer="[
        createOnIntersectionObserver(context.isOpen, context.close),
        {
          root: props.intersectionObserverSettings.rootElement,
          threshold: props.intersectionObserverSettings.threshold,
          rootMargin: props.intersectionObserverSettings.rootMargin,
        },
      ]"
      :reference-ref="context.reference"
      :on-click="() => context.toggle()"
      :aria-label="props.ariaLabel"
      class="inline-flex items-center gap-2 transition-all duration-300 ease-in-out border-2 rounded-full outline-none ring-0"
      :class="{
        'border-sb-tertiary-100 bg-sb-tertiary-100 shadow-sb-ring-sm shadow-sb-tertiary-100/80 ':
          context.isOpen.value,
        ' hover:bg-sb-tertiary-200 hover:border-sb-tertiary-200 bg-sb-secondary-300  border-sb-secondary-200 focus-visible:bg-sb-tertiary-200 focus-visible:border-sb-tertiary-200':
          !context.isOpen.value,
        'px-4 h-8':
          styleStore.activeBreakpoint !== 'md' &&
          styleStore.activeBreakpoint !== 'sm' &&
          styleStore.activeBreakpoint !== 'xs',
        'px-3 h-7': styleStore.activeBreakpoint === 'md',
        'px-2.5 h-7': styleStore.activeBreakpoint === 'sm' || styleStore.activeBreakpoint === 'xs',
      }"
    >
      <span
        v-if="props.label"
        class="transition-all duration-300 ease-in-out font-roboto"
        :class="[
          styleStore.textSizeXS,
          {
            'text-black': context.isOpen.value,
            'text-white ': !context.isOpen.value,
          },
        ]"
      >
        {{ props.label }}
      </span>
      <BaseIcon
        v-if="props.icon"
        :icon="props.icon"
        class="transition-all duration-300 ease-in-out shrink-0 stroke-[2.5px]"
        :class="[
          styleStore.iconSizeXS,
          {
            'text-black': context.isOpen.value,
            'text-white ': !context.isOpen.value,
          },
        ]"
      />
      <MdiKeyboardArrowDown
        class="ml-2 transition-all duration-300 ease-in-out shrink-0"
        :class="[
          styleStore.iconSizeS,
          {
            'rotate-180 text-black': context.isOpen.value,
            'rotate-0 text-white ': !context.isOpen.value,
          },
        ]"
      />
    </SbReference>
    <SbFloating
      :floating-ref="context.floating"
      :is-open="context.isOpen.value"
      :floating-placement="context.floatingPlacement.value"
      :floating-style="context.floatingStyle.value"
      :class="[props.zIndex]"
      class="box-border border-2 rounded-lg shadow-2xl border-sb-secondary-100 bg-sb-secondary-100 shadow-black size-fit"
    >
      <div
        v-on-click-outside="[(_: Event) => context.close(), { ignore: [context.reference] }]"
        class="flex flex-col p-1.5 w-36 gap-1.5"
      >
        <span
          v-for="op in props.options"
          :key="op.id"
          :tabindex="0"
          :class="[
            styleStore.elementTotalPaddingXS,
            {
              'bg-sb-secondary-200 focus-visible:border-white': selectedOption === op.id,
              'hover:bg-sb-secondary-200/60 focus-visible:bg-sb-secondary-200/60':
                selectedOption !== op.id,
            },
          ]"
          class="flex items-center gap-2 p-1.5 transition-all duration-300 ease-in-out border border-transparent rounded-lg cursor-pointer outline-none group ring-0"
          @keydown.enter="onSelectOption(op.id, op.onClick)"
          @click="onSelectOption(op.id, op.onClick)"
        >
          <BaseIcon
            v-if="op.icon"
            :icon="op.icon"
            :class="[styleStore.iconSizeXS]"
            class="shrink-0"
          />
          <span :class="[styleStore.textSizeXS]" class="flex-1 text-white text-roboto">
            {{ op.label }}
          </span>
        </span>
      </div>
    </SbFloating>
  </SbContainer>
</template>
