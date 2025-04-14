<script setup lang="ts">
import { ThePageContainer, TheDivider, BaseSection } from '@/components';
import { useI18nStore, useStyleStore } from '@/stores';
import { computed } from 'vue';

import ProjectCard from '@/pages/projects-page/components/ProjectCard.vue';
import { ICONS, IMAGES } from '@/constants';
import { usePageMeta } from '@/hooks';

// Store Declarations
const styleStore = useStyleStore();
const i18nStore = useI18nStore();

// SEO Feature Manage Meta Tags
usePageMeta({
  meta: computed(() => i18nStore.projectsPageI18nContent.metaDescription),
  currentLang: computed(() => i18nStore.currentLanguage),
  url: 'https://www.stefano-biddau.com',
  image:
    'https://media.licdn.com/dms/image/v2/D4D03AQGvfHWN3w4Vyw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1674322166521?e=1749081600&v=beta&t=LGlVPU_6C_nOJY5QkpcWvebJvEZSdCihzcHWz-IpSb4',
});
</script>

<template>
  <ThePageContainer :page-intro-text="i18nStore.projectsPageI18nContent.pageHeading">
    <template #page-content>
      <div
        :class="{
          'gap-8': styleStore.activeBreakpoint === 'xs' || styleStore.activeBreakpoint === 'sm',
          'gap-9': styleStore.activeBreakpoint === 'md',
          'gap-10':
            styleStore.activeBreakpoint !== 'xs' &&
            styleStore.activeBreakpoint !== 'sm' &&
            styleStore.activeBreakpoint !== 'md',
        }"
        class="flex flex-col transition-all duration-300 ease-in-out"
      >
        <TheDivider animation="scaleAndFade">
          <BaseSection
            :title="i18nStore.projectsPageI18nContent.firstHeading"
            :paragraph="i18nStore.projectsPageI18nContent.firstParagraph"
          />
        </TheDivider>
        <div
          class="grid transition-all duration-300 ease-in-out"
          :class="[
            styleStore.elementTotalPaddingM,
            styleStore.elementTotalGapM,
            {
              'grid-cols-1':
                styleStore.activeBreakpoint === 'xs' || styleStore.activeBreakpoint === 'sm',
              'grid-cols-2':
                styleStore.activeBreakpoint === 'md' || styleStore.activeBreakpoint === 'lg',
              'grid-cols-3':
                styleStore.activeBreakpoint !== 'xs' &&
                styleStore.activeBreakpoint !== 'sm' &&
                styleStore.activeBreakpoint !== 'md' &&
                styleStore.activeBreakpoint !== 'lg',
            },
          ]"
        >
          <TheDivider
            v-for="project in i18nStore.projectsPageI18nContent.projects"
            :key="project.id"
            animation="scaleAndFade"
          >
            <ProjectCard
              :title="project.title"
              :image-url="IMAGES[project.imagePath]"
              :code-button-link="{
                iconCode: ICONS[project.platformIcon],
                link: project.codeLink,
              }"
              :play-button-link="project.demoLink"
            />
          </TheDivider>
        </div>
      </div>
    </template>
  </ThePageContainer>
</template>
