<script setup lang="ts">
import { vIntersectionObserver } from '@vueuse/components';
import { computed, ref } from 'vue';

import { PageHeading, VintagePicture } from '@/components';
import { useTypedI18n, useCommonStyle } from '@/hooks';

// Feature 0: Manage Style Classes
const { xs, sm, md, containerStyle, containerPadding, containerGapElements } = useCommonStyle();

const sectionTitleCss = computed(() => {
	if (xs.value || sm.value) { return 'text-sb-3xl text-center'; }
	if (md.value) { return 'text-sb-4xl text-left'; }
	return 'text-sb-5xl text-left';
});

const sectionSubtitleCss = computed(() => {
	if (xs.value || sm.value) { return 'text-sb-lg text-center'; }
	if (md.value) { return 'text-sb-xl text-left'; }
	return 'text-sb-2xl text-left';
});

const sectionDescriptionCss = computed(() => {
	if (xs.value || sm.value) { return 'text-sb-sm'; }
	if (md.value) { return 'text-sb-base'; }
	return 'text-sb-lg';
});

// Feature 1: Internationalization (i18n)
const { aboutMeI18nContent } = useTypedI18n();

const initializeBooleanArray = (structure: {[key:string]:string}[]) => {
	let arr: boolean[] = [];
	structure.forEach(() => arr.push(false));
	return arr;
};

const root = ref(null);
const isVisible = ref<boolean[]>(initializeBooleanArray(aboutMeI18nContent.value.bio));

const onIntersectionObserver = (index: number) => ([{ isIntersecting }]: IntersectionObserverEntry[]) => {
	isVisible.value[index] = isIntersecting;
};
</script>

<template>
  <div
    ref="root"
    :style="containerStyle"
  >
    <PageHeading
      :title="aboutMeI18nContent.pageHeading"
    />

    <div
      :class="[containerPadding, containerGapElements]"
      class="flex flex-col mt-5 mb-10"
    >
      <div
        v-for="(section, index) in aboutMeI18nContent.bio"
        :key="index"
        v-intersection-observer="[onIntersectionObserver(index), {root, threshold: 0.05}]"
        :class=" {
          'flex-row gap-x-10': index % 2 === 0 && !xs && !sm && !md,
          'flex-row-reverse gap-x-10': index % 2 !== 0 && !xs && !sm && !md,
          'flex-col items-center gap-y-5': xs || sm || md,
          'opacity-0': !isVisible[index],
          'opacity-100': isVisible[index],
        }"
        class="flex items-start px-4 transition-all duration-500 ease-in-out"
      >
        <VintagePicture
          :image-url="section.imgPath"
          :text="section.imgDescription"
          :class="{
            '-rotate-2': index % 2 === 0,
            'rotate-2': index % 2 !== 0,
          }"
          class="mt-2 shrink-0"
        />
        <div class="flex flex-col justify-center flex-1 ">
          <h1
            :class="[sectionTitleCss]"
            class="text-white whitespace-normal transition-all duration-300 ease-in-out font-bebas"
          >
            {{ section.sectionTitle }}
          </h1>
          <h2
            :class="[sectionSubtitleCss]"
            class="font-medium text-white whitespace-normal transition-all duration-300 ease-in-out font-roboto"
          >
            ({{ section.sectionSubtitle }} prova prova prova)
          </h2>
          <p
            :class="[sectionDescriptionCss]"
            class="mt-4 text-justify text-white whitespace-normal transition-all duration-300 ease-in-out font-roboto"
          >
            {{ section.sectionParagraph }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
