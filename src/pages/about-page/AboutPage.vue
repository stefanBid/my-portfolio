<script setup lang="ts">

import { IntroSection, ThePageContainer, BaseDiv } from '@/components';
import VintagePicture from '@/components/page-components/about-page/vintage-picture/VintagePicture.vue';
import { useTypedI18nSingleton, useCommonStyleSingleton } from '@/hooks';

// Feature 1: Manage Style Classes
const { xs, sm, md, lg, h2Size, h3Size, pSize } = useCommonStyleSingleton();

// Feature 2: Internationalization (i18n)
const { aboutMePageI18nContent } = useTypedI18nSingleton();

</script>

<template>
  <ThePageContainer>
    <template #intro-section>
      <IntroSection
        :title="aboutMePageI18nContent.pageHeading"
      />
    </template>
    <template #main-content="{root}">
      <BaseDiv
        v-for="(section, index) in aboutMePageI18nContent.bioSections"
        :key="index"
        :intersection-observer-settings="{root, threshold: 0.2}"
      >
        <section
          :id="`bioSection-${index}`"
          :class=" {
            'flex-row': index % 2 === 0 && !xs && !sm && !md && !lg,
            'flex-row-reverse': index % 2 !== 0 && !xs && !sm && !md && !lg,
            'flex-col items-center': xs || sm || md || lg,
          }"
          class="flex items-start gap-12 px-4"
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
                'text-left': (index % 2 === 0) && (md || lg),
                'text-right': (index % 2 !== 0) && (md || lg),
              }]"
              class="text-white whitespace-normal transition-all duration-300 ease-in-out font-bebas"
            >
              {{ section.titleHeading }}
            </h2>
            <h3
              :id="`bioSection-${index}-subTitleHeading`"
              :class="[ h3Size, {
                'text-center': xs || sm,
                'text-left': (index % 2 === 0) && (md || lg),
                'text-right': (index % 2 !== 0) && (md || lg),
              }]"
              class="font-medium text-white whitespace-normal transition-all duration-300 ease-in-out font-roboto"
            >
              ({{ section.subTitleHeading }})
            </h3>
            <div
              :id="`bioSection-${index}-contentParagraph`"
              :class="[ pSize]"
              class="p-4 mt-4 text-justify text-white whitespace-normal transition-all duration-300 ease-in-out rounded-lg font-roboto bg-secondary"
            >
              {{ section.contentParagraph }}
            </div>
          </div>
        </section>
      </BaseDiv>
    </template>
  </ThePageContainer>
</template>
