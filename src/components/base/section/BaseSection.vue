<script setup lang="ts">
import { stringPurifier } from '@/utils';

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
</script>

<template>
  <div
    v-bind="$attrs"
    :class="{
      'xl:flex-row': !props.inverted,
      'xl:flex-row-reverse': props.inverted,
    }"
    class="flex flex-col items-center gap-12 transition-all duration-300 ease-in-out"
  >
    <slot name="extra-content"></slot>
    <div class="flex flex-col justify-center flex-1">
      <h2
        :id="`${$attrs.id || 'section'}-titleHeading`"
        :class="[
          {
            'sm:text-left': !props.inverted,
            'sm:text-right': props.inverted,
          },
        ]"
        class="text-size-xl text-center whitespace-normal transition-all duration-300 ease-in-out text-sb-tertiary-100 font-bebas"
      >
        {{ props.title }}
      </h2>
      <h3
        v-if="props.subtitle"
        :id="`${$attrs.id || 'section'}-subTitleHeading`"
        :class="[
          {
            'sm:text-left': !props.inverted,
            'sm:text-right': props.inverted,
          },
        ]"
        class="text-size-l text-center font-medium text-white whitespace-normal transition-all duration-300 ease-in-out font-roboto"
      >
        ({{ props.subtitle }})
      </h3>
      <div
        :id="`${$attrs.id || 'section'}-contentParagraph`"
        class="text-size-s tot-pad-s mt-2.5 sm:mt-3 md:mt-3 lg:mt-4 text-justify text-white whitespace-normal transition-all duration-300 ease-in-out border-2 rounded-lg font-roboto bg-sb-secondary-300 border-sb-secondary-200"
        v-html="stringPurifier(props.paragraph)"
      ></div>
    </div>
  </div>
</template>
