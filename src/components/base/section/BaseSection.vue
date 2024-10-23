<script setup lang="ts">
import { vIntersectionObserver } from '@vueuse/components';
import { ref } from 'vue';

import { useCommonStyleSingleton } from '@/hooks';
interface BaseSectionProps {
  title: string;
  subtitle?: string;
  paragraph: string;
  intersectionObserverSettings?: {
    rootElement: HTMLElement | null;
    rootMargin?: string;
    threshold?: number;
  }
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
	inverted: false
});

// Feature 1: Manage Style Classes
const { activeBreakpoint, textSizeXL, textSizeL, textSizeS } = useCommonStyleSingleton();

// Feature 2:  Other Features
const isVisible = ref(false);

const onIntersectionObserver = ([{ isIntersecting }]: IntersectionObserverEntry[]) => {
	if (isIntersecting !== isVisible.value) {
		isVisible.value = isIntersecting;
	}
};
</script>

<template>
  <div
    v-intersection-observer="[onIntersectionObserver, { root: props.intersectionObserverSettings.rootElement, threshold: props.intersectionObserverSettings.threshold, rootMargin: props.intersectionObserverSettings.rootMargin }]"
    v-bind="$attrs"
    :class=" {
      'flex-row': (!props.inverted) && (activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm' && activeBreakpoint !== 'md' && activeBreakpoint !== 'lg'),
      'flex-row-reverse': (props.inverted) && (activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm' && activeBreakpoint !== 'md' && activeBreakpoint !== 'lg'),
      'flex-col items-center': activeBreakpoint === 'xs' || activeBreakpoint === 'sm' || activeBreakpoint === 'md' || activeBreakpoint === 'lg',
      'opacity-0': !isVisible,
      'opacity-100': isVisible
    }"
    class="flex items-center gap-12 transition-sb-slow"
  >
    <slot name="extra-content"></slot>
    <div class="flex flex-col justify-center flex-1 ">
      <h2
        :id="`${$attrs.id || 'section'}-titleHeading`"
        :class="[ textSizeXL, {
          'text-center': activeBreakpoint === 'xs' || activeBreakpoint === 'sm',
          'text-left': (!props.inverted) && (activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm'),
          'text-right': (props.inverted) && (activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm'),
        }]"
        class="whitespace-normal transition-sb-slow text-sb-tertiary-100 font-bebas"
      >
        {{ props.title }}
      </h2>
      <h3
        v-if="props.subtitle"
        :id="`${$attrs.id || 'section'}-subTitleHeading`"
        :class="[ textSizeL, {
          'text-center': activeBreakpoint === 'xs' || activeBreakpoint === 'sm',
          'text-left': (!props.inverted) && (activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm'),
          'text-right': (props.inverted) && (activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm'),
        }]"
        class="font-medium text-white whitespace-normal transition-sb-slow font-roboto"
      >
        ({{ props.subtitle }})
      </h3>
      <div
        :id="`${$attrs.id || 'section'}-contentParagraph`"
        :class="[ textSizeS]"
        class="p-4 mt-4 text-justify text-white whitespace-normal border-2 rounded-lg transition-sb-slow font-roboto bg-sb-secondary-300 border-sb-secondary-200"
      >
        {{ props.paragraph }}
      </div>
    </div>
  </div>
</template>