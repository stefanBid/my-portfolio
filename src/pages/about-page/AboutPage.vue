<script setup lang="ts">
import { IMAGES } from '@/constants';
import { ThePageContainer, TheDivider, BaseSection } from '@/components';
import { useI18nStore, useTitleStore } from '@/stores';
import VintagePicture from '@/pages/about-page/components/VintagePicture.vue';
import { watch } from 'vue';

// Store Declarations
const i18nStore = useI18nStore();
const titleStore = useTitleStore();

// Feature 1: Page Title
watch(
  () => i18nStore.currentLanguage,
  (newValue) => {
    titleStore.setTitleSuffix(newValue === 'it' ? 'Chi sono' : 'About Me');
  },
  { immediate: true },
);
</script>

<template>
  <ThePageContainer :page-intro-text="i18nStore.aboutMePageI18nContent.pageHeading">
    <template #page-content>
      <TheDivider
        v-for="(section, index) in i18nStore.aboutMePageI18nContent.bioSections"
        :key="index"
        animation="scaleAndFade"
      >
        <template #default="{ isVisible }">
          <BaseSection
            :inverted="index % 2 === 0 ? false : true"
            :title="section.titleHeading"
            :subtitle="section.subTitleHeading"
            :paragraph="section.contentParagraph"
          >
            <template #extra-content>
              <VintagePicture
                v-if="section.imagePath"
                :image-url="IMAGES[section.imagePath]"
                :text="section.imageDescription"
                :is-visible="isVisible"
                :class="{
                  '-rotate-2': index % 2 === 0,
                  'rotate-2': index % 2 !== 0,
                }"
                class="shrink-0"
              />
            </template>
          </BaseSection>
        </template>
      </TheDivider>
    </template>
  </ThePageContainer>
</template>
