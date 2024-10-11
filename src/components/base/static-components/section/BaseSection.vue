<script setup lang="ts">
import { computed } from 'vue';

import { BaseDiv } from '@/components';
import { useCommonStyleSingleton } from '@/hooks';
interface BaseSectionProps {
  id: string;
  extraSidePosition?: 'left' | 'right';
  rootElement?: HTMLElement;
  title: string;
  subtitle?: string;
  paragraph: string;
}

const props = withDefaults(defineProps<BaseSectionProps>(), {
	rootElement: undefined,
	extraSidePosition: 'left',
	subtitle: '',
	paragraph: '',
});

// Feature 1: Manage Style Classes
const { activeBreakpoint, textSizeXL, textSizeL, textSizeS } = useCommonStyleSingleton();

// Feature 2:  Other Features
const getIds = computed(() => {
	return {
		container: `${props.id}`,
		titleHeading: `${props.id}-titleHeading`,
		subTitleHeading: `${props.id}-subTitleHeading`,
		contentParagraph: `${props.id}-contentParagraph`,
	};
});

const getRootElement = computed(() => {
	return props.rootElement ?? null;
});
</script>

<template>
  <BaseDiv
    :id="getIds.container"
    :class=" {
      'flex-row': (props.extraSidePosition === 'left') && (activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm' && activeBreakpoint !== 'md' && activeBreakpoint !== 'lg'),
      'flex-row-reverse': (props.extraSidePosition === 'right') && (activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm' && activeBreakpoint !== 'md' && activeBreakpoint !== 'lg'),
      'flex-col items-center': activeBreakpoint === 'xs' || activeBreakpoint === 'sm' || activeBreakpoint === 'md' || activeBreakpoint === 'lg',
    }"
    class="flex items-center gap-12"
    :intersection-observer-settings="{root: getRootElement, threshold: 0.2, visibilityCss: 'fade'}"
  >
    <slot name="extra-side-content"></slot>
    <div class="flex flex-col justify-center flex-1 ">
      <h2
        :id="getIds.titleHeading"
        :class="[ textSizeXL, {
          'text-center': activeBreakpoint === 'xs' || activeBreakpoint === 'sm',
          'text-left': (props.extraSidePosition === 'left') && (activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm'),
          'text-right': (props.extraSidePosition === 'right') && (activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm'),
        }]"
        class="whitespace-normal transition-all duration-300 ease-in-out text-sb-tertiary-100 font-bebas"
      >
        {{ props.title }}
      </h2>
      <h3
        v-if="props.subtitle"
        :id="getIds.subTitleHeading"
        :class="[ textSizeL, {
          'text-center': activeBreakpoint === 'xs' || activeBreakpoint === 'sm',
          'text-left': (props.extraSidePosition === 'left') && (activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm'),
          'text-right': (props.extraSidePosition === 'right') && (activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm'),
        }]"
        class="font-medium text-white whitespace-normal transition-all duration-300 ease-in-out font-roboto"
      >
        ({{ props.subtitle }})
      </h3>
      <div
        :id="getIds.contentParagraph"
        :class="[ textSizeS]"
        class="p-4 mt-4 text-justify text-white whitespace-normal transition-all duration-300 ease-in-out border-2 rounded-lg font-roboto bg-sb-secondary-200 border-sb-secondary-100"
      >
        {{ props.paragraph }}
      </div>
    </div>
  </BaseDiv>
</template>