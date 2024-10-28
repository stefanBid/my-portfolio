<script setup lang="ts">
import { ThePageContainer, BaseSection } from '@/components';
import { useI18nStore } from '@/stores';
import VintagePicture from '@/pages/about-page/components/VintagePicture.vue';

// Feature 1: Internationalization (i18n)
const i18nStore = useI18nStore();
</script>

<template>
  <ThePageContainer :page-intro-text="i18nStore.aboutMePageI18nContent.pageHeading">
    <template #page-content>
      <BaseSection
        v-for="(section, index) in i18nStore.aboutMePageI18nContent.bioSections"
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
