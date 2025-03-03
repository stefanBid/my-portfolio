<script setup lang="ts">
import { vIntersectionObserver } from '@vueuse/components';
import { ref } from 'vue';
import { stringPurifier } from '@/utils';
import { useStyleStore } from '@/stores';

interface BaseSectionProps {
  title: string;
  subtitle?: string;
  paragraph: string;
  intersectionObserverSettings?: {
    rootElement: HTMLElement | null;
    rootMargin?: string;
    threshold?: number;
  };
  inverted?: boolean;
}

const props = withDefaults(defineProps<BaseSectionProps>(), {
  subtitle: '',
  paragraph: '',
  intersectionObserverSettings: () => ({
    rootElement: null,
    rootMargin: '-80px 0px 0px 0px',
    threshold: 0.05,
  }),
  inverted: false,
});

// Store Declarations
const styleStore = useStyleStore();

// Feature 2:  Other Features
const isVisible = ref(false);

const onIntersectionObserver = ([{ isIntersecting }]: IntersectionObserverEntry[]): void => {
  if (isIntersecting !== isVisible.value) {
    isVisible.value = isIntersecting;
  }
};
</script>

<template>
  <div
    v-intersection-observer="[
      onIntersectionObserver,
      {
        root: props.intersectionObserverSettings.rootElement,
        threshold: props.intersectionObserverSettings.threshold,
        rootMargin: props.intersectionObserverSettings.rootMargin,
      },
    ]"
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
      'opacity-0': !isVisible,
      'opacity-100': isVisible,
    }"
    class="flex items-center gap-12 transition-all duration-300 ease-in-out"
  >
    <slot name="extra-content" :is-visible="isVisible"></slot>
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
