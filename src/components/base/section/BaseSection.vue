<script setup lang="ts">
import { stringPurifier } from '@/utils';
import { useStyleStore } from '@/stores';

interface BaseSectionProps {
  title: string;
  subtitle?: string;
  paragraph: string;
  inverted?: boolean;
}

const props = withDefaults(defineProps<BaseSectionProps>(), {
  subtitle: '',
  paragraph: '',
  inverted: false,
});

// Store Declarations
const styleStore = useStyleStore();
</script>

<template>
  <div
    v-bind="$attrs"
    :class="{
      'flex-row':
        !props.inverted &&
        styleStore.activeBreakpoint !== 'xs' &&
        styleStore.activeBreakpoint !== 'sm' &&
        styleStore.activeBreakpoint !== 'md' &&
        styleStore.activeBreakpoint !== 'lg',
      'flex-row-reverse':
        props.inverted &&
        styleStore.activeBreakpoint !== 'xs' &&
        styleStore.activeBreakpoint !== 'sm' &&
        styleStore.activeBreakpoint !== 'md' &&
        styleStore.activeBreakpoint !== 'lg',
      'flex-col items-center':
        styleStore.activeBreakpoint === 'xs' ||
        styleStore.activeBreakpoint === 'sm' ||
        styleStore.activeBreakpoint === 'md' ||
        styleStore.activeBreakpoint === 'lg',
    }"
    class="flex items-center gap-12 transition-all duration-300 ease-in-out"
  >
    <slot name="extra-content"></slot>
    <div class="flex flex-col justify-center flex-1">
      <h2
        :id="`${$attrs.id || 'section'}-titleHeading`"
        :class="[
          styleStore.textSizeXL,
          {
            'text-center':
              styleStore.activeBreakpoint === 'xs' || styleStore.activeBreakpoint === 'sm',
            'text-left':
              !props.inverted &&
              styleStore.activeBreakpoint !== 'xs' &&
              styleStore.activeBreakpoint !== 'sm',
            'text-right':
              props.inverted &&
              styleStore.activeBreakpoint !== 'xs' &&
              styleStore.activeBreakpoint !== 'sm',
          },
        ]"
        class="whitespace-normal transition-all duration-300 ease-in-out text-sb-tertiary-100 font-bebas"
      >
        {{ props.title }}
      </h2>
      <h3
        v-if="props.subtitle"
        :id="`${$attrs.id || 'section'}-subTitleHeading`"
        :class="[
          styleStore.textSizeL,
          {
            'text-center':
              styleStore.activeBreakpoint === 'xs' || styleStore.activeBreakpoint === 'sm',
            'text-left':
              !props.inverted &&
              styleStore.activeBreakpoint !== 'xs' &&
              styleStore.activeBreakpoint !== 'sm',
            'text-right':
              props.inverted &&
              styleStore.activeBreakpoint !== 'xs' &&
              styleStore.activeBreakpoint !== 'sm',
          },
        ]"
        class="font-medium text-white whitespace-normal transition-all duration-300 ease-in-out font-roboto"
      >
        ({{ props.subtitle }})
      </h3>
      <div
        :id="`${$attrs.id || 'section'}-contentParagraph`"
        :class="[
          styleStore.textSizeS,
          styleStore.elementTotalPaddingS,
          {
            'mt-4':
              styleStore.activeBreakpoint !== 'xs' &&
              styleStore.activeBreakpoint !== 'sm' &&
              styleStore.activeBreakpoint !== 'md',
            'mt-3': styleStore.activeBreakpoint === 'md',
            'mt-2.5': styleStore.activeBreakpoint === 'sm' || styleStore.activeBreakpoint === 'xs',
          },
        ]"
        class="text-justify text-white whitespace-normal transition-all duration-300 ease-in-out border-2 rounded-lg font-roboto bg-sb-secondary-300 border-sb-secondary-200"
        v-html="stringPurifier(props.paragraph)"
      ></div>
    </div>
  </div>
</template>
