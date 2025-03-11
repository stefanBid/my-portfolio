<script setup lang="ts">
import { ThePageContainer, TheDivider } from '@/components';
import { useI18nStore, useTitleStore, useStyleStore } from '@/stores';
import { watch } from 'vue';

import ProjectCard from '@/pages/projects-page/components/ProjectCard.vue';
import { ICONS, IMAGES } from '@/constants';

// Store Declarations
const styleStore = useStyleStore();
const i18nStore = useI18nStore();
const titleStore = useTitleStore();

// Feature 1: Page Title
watch(
  () => i18nStore.currentLanguage,
  (newValue) => {
    titleStore.setTitleSuffix(newValue === 'it' ? 'Progetti' : 'Projects');
  },
  { immediate: true },
);
</script>

<template>
  <ThePageContainer :page-intro-text="i18nStore.projectsPageI18nContent.pageHeading">
    <template #page-content>
      <div :class="[styleStore.elementTotalGapM]" class="flex flex-col">
        <h2
          :id="`${$attrs.id || 'section'}-titleHeading`"
          :class="[
            styleStore.textSizeXL,
            {
              'text-center':
                styleStore.activeBreakpoint === 'xs' || styleStore.activeBreakpoint === 'sm',
              'text-left':
                styleStore.activeBreakpoint !== 'xs' && styleStore.activeBreakpoint !== 'sm',
            },
          ]"
          class="whitespace-normal transition-all duration-300 ease-in-out text-sb-tertiary-100 font-bebas"
        >
          {{ i18nStore.projectsPageI18nContent.firstHeading }}
        </h2>
        <p
          :id="`${$attrs.id || 'section'}-paragraph`"
          :class="[
            styleStore.textSizeS,
            {
              'text-center':
                styleStore.activeBreakpoint === 'xs' || styleStore.activeBreakpoint === 'sm',
              'text-left':
                styleStore.activeBreakpoint !== 'xs' && styleStore.activeBreakpoint !== 'sm',
            },
          ]"
          class="text-white whitespace-normal transition-all duration-300 ease-in-out"
        >
          {{ i18nStore.projectsPageI18nContent.firstParagraph }}
        </p>
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
            :intersection-observer-settings="{
              rootElement: null,
              threshold: 0.25,
            }"
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
