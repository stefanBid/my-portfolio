<script setup lang="ts">
import { ThePageContainer, BaseSection } from '@/components';
import { useTypedI18nSingleton } from '@/hooks';
import VintagePicture from '@/pages/about-page/components/VintagePicture.vue';

// Feature 1: Internationalization (i18n)
const { aboutMePageI18nContent } = useTypedI18nSingleton();
</script>

<template>
  <ThePageContainer :page-intro-text="aboutMePageI18nContent.pageHeading">
    <template #page-content>
      <BaseSection
        v-for="(section, index) in aboutMePageI18nContent.bioSections"
        :id="`bioSection-${index}`"
        :key="index"
        :inverted="index % 2 === 0 ? false : true"
        :title="section.titleHeading"
        :subtitle="section.subTitleHeading"
        :paragraph="section.contentParagraph"
        :intersection-observer-settings="{
          rootElement: null,
          threshold: 0.2,
          rootMargin: '-80px 0px 0px 0px',
        }"
      >
        <template #extra-content>
          <VintagePicture
            v-if="section.imagePath"
            :id="`bioSection-${index}-image`"
            :image-url="section.imagePath"
            :text="section.imageDescription"
            :class="{
              '-rotate-2': index % 2 === 0,
              'rotate-2': index % 2 !== 0,
            }"
            class="shrink-0"
          />
        </template>
      </BaseSection>
    </template>
  </ThePageContainer>
</template>
