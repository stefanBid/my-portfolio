<script setup lang="ts">
import { computed } from 'vue';

import { useI18nStore } from '@/stores';
import { usePageMeta } from '@/hooks';

import AppPageContainer from '@/components/layouts/page-container/AppPageContainer.vue';
import AppDivider from '@/components/layouts/divider/AppDivider.vue';
import BaseSection from '@/components/base/section/BaseSection.vue';

import ProjectCard from '@/pages/projects-page/components/ProjectCard.vue';

// Store Declarations
const i18nStore = useI18nStore();

// SEO Feature Manage Meta Tags
usePageMeta({
  meta: computed(() => i18nStore.projectsPageI18nContent.metaDescription),
  currentLang: computed(() => i18nStore.currentLanguage),
  url: 'https://stefanobiddau.com/projects',
  image:
    'https://media.licdn.com/dms/image/v2/D4D03AQGvfHWN3w4Vyw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1674322166521?e=1749081600&v=beta&t=LGlVPU_6C_nOJY5QkpcWvebJvEZSdCihzcHWz-IpSb4',
});
</script>

<template>
  <AppPageContainer :page-intro-text="i18nStore.projectsPageI18nContent.pageHeading">
    <template #page-content>
      <div
        class="flex flex-col transition-all duration-300 ease-in-out gap-8 sm:gap-9 md:gap-9 lg:gap-10"
      >
        <AppDivider animation="scaleAndFade">
          <BaseSection
            :title="i18nStore.projectsPageI18nContent.firstHeading"
            :paragraph="i18nStore.projectsPageI18nContent.firstParagraph"
          />
        </AppDivider>
        <div
          class="grid transition-all duration-300 ease-in-out tot-pad-m tot-gap-m grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
        >
          <AppDivider
            v-for="project in i18nStore.projectsPageI18nContent.projects"
            :key="project.id"
            animation="scaleAndFade"
          >
            <ProjectCard
              :title="project.title"
              :image-path="project.projectCover"
              :platform-icon="project.platformIcon"
              :code-button-link="project.codeLink"
              :play-button-link="project.demoLink"
            />
          </AppDivider>
        </div>
      </div>
    </template>
  </AppPageContainer>
</template>
