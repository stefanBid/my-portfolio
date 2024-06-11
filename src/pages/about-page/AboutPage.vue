<script setup lang="ts">

import { IntroSection, ThePageContent } from '@/components';
import VintagePicture from '@/components/page-components/about/vintage-picture/VintagePicture.vue';
import { useTypedI18nSingleton, useCommonStyleSingleton, useIntersectionObserver } from '@/hooks';

// Feature 1: Manage Style Classes
const { xs, sm, md, h2Size, h3Size, pSize } = useCommonStyleSingleton();

// Feature 2: Internationalization (i18n)
const { aboutMePageI18nContent } = useTypedI18nSingleton();

// Feature 3: Manage Visibility for effects
const { root, isVisible, onIntersectionObserver, vIntersectionObserver } = useIntersectionObserver(aboutMePageI18nContent.value.bioSections.length);

</script>

<template>
  <ThePageContent
    ref="root"
  >
    <template #intro-section>
      <IntroSection
        :title="aboutMePageI18nContent.pageHeading"
      />
    </template>
    <template #main-content>
      <section
        v-for="(section, index) in aboutMePageI18nContent.bioSections"
        :id="`bioSection-${index}`"
        :key="index"
        v-intersection-observer="[onIntersectionObserver(index), {root, threshold: 0.2}]"
        :class=" {
          'flex-row': index % 2 === 0 && !xs && !sm && !md,
          'flex-row-reverse': index % 2 !== 0 && !xs && !sm && !md,
          'flex-col items-center': xs || sm || md,
          'opacity-0': !isVisible[index],
          'opacity-100': isVisible[index],
        }"
        class="flex items-start gap-12 px-4 transition-all duration-500 ease-in-out"
      >
        <VintagePicture
          :id="`bioSection-${index}-image`"
          :image-url="section.imagePath"
          :text="section.imageDescription"
          :class="{
            '-rotate-2': index % 2 === 0,
            'rotate-2': index % 2 !== 0,
          }"
          class="mt-2 shrink-0"
        />
        <div class="flex flex-col justify-center flex-1 ">
          <h2
            :id="`bioSection-${index}-titleHeading`"
            :class="[ h2Size, {
              'text-center': xs || sm,
              'text-left': !xs && !sm,
            }]"
            class="text-white whitespace-normal transition-all duration-300 ease-in-out font-bebas"
          >
            {{ section.titleHeading }}
          </h2>
          <h3
            :id="`bioSection-${index}-subTitleHeading`"
            :class="[ h3Size, {
              'text-center': xs || sm,
              'text-left': !xs && !sm,
            }]"
            class="font-medium text-white whitespace-normal transition-all duration-300 ease-in-out font-roboto"
          >
            ({{ section.subTitleHeading }})
          </h3>
          <p
            :id="`bioSection-${index}-contentParagraph`"
            :class="[ pSize]"
            class="mt-4 text-justify text-white whitespace-normal transition-all duration-300 ease-in-out font-roboto"
          >
            {{ section.contentParagraph }}
          </p>
        </div>
      </section>
    </template>
  </ThePageContent>
</template>
