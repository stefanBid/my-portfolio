<script setup lang="ts">
import { computed } from 'vue';

import { useI18nStore } from '@/stores';
import { usePageMeta } from '@/hooks';

import AppPageContainer from '@/components/layouts/page-container/AppPageContainer.vue';
import AppDivider from '@/components/layouts/divider/AppDivider.vue';
import BaseSection from '@/components/base/section/BaseSection.vue';
import VintagePicture from '@/pages/about-page/components/VintagePicture.vue';

// Store Declarations
const i18nStore = useI18nStore();

// SEO Feature Manage Meta Tags
usePageMeta({
  meta: computed(() => i18nStore.aboutMePageI18nContent.metaDescription),
  currentLang: computed(() => i18nStore.currentLanguage),
  url: 'https://stefanobiddau.com/about',
  image:
    'https://media.licdn.com/dms/image/v2/D4D03AQGvfHWN3w4Vyw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1674322166521?e=1749081600&v=beta&t=LGlVPU_6C_nOJY5QkpcWvebJvEZSdCihzcHWz-IpSb4',
});
</script>

<template>
  <AppPageContainer :page-intro-text="i18nStore.aboutMePageI18nContent.pageHeading">
    <template #page-content>
      <AppDivider
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
      </AppDivider>
    </template>
  </AppPageContainer>
</template>
