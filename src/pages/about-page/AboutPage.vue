<script setup lang="ts">
import { ThePageContainer, TheDivider, BaseSection } from '@/components';
import { useI18nStore } from '@/stores';
import { usePageMeta } from '@/hooks';
import VintagePicture from '@/pages/about-page/components/VintagePicture.vue';
import { computed } from 'vue';

// Store Declarations
const i18nStore = useI18nStore();

// SEO Feature Manage Meta Tags
usePageMeta({
  meta: computed(() => i18nStore.aboutMePageI18nContent.metaDescription),
  currentLang: computed(() => i18nStore.currentLanguage),
  url: 'https://www.stefano-biddau.com',
  image:
    'https://media.licdn.com/dms/image/v2/D4D03AQGvfHWN3w4Vyw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1674322166521?e=1749081600&v=beta&t=LGlVPU_6C_nOJY5QkpcWvebJvEZSdCihzcHWz-IpSb4',
});
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
                v-if="section.image"
                :image-path="section.image"
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
