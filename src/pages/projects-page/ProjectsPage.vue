<script setup lang="ts">
import { ThePageContainer, TheDivider } from '@/components';
import { useI18nStore, useTitleStore, useStyleStore } from '@/stores';
import { watch } from 'vue';

import ProjectCard from '@/pages/projects-page/components/ProjectCard.vue';

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
  <ThePageContainer
    :page-intro-text="i18nStore.currentLanguage === 'en' ? 'My projects' : 'I miei progetti'"
  >
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
          Alcuni dei miei clienti con cui ho lavorato
        </h2>
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
            v-for="i in 100"
            :key="i"
            :intersection-observer-settings="{
              rootElement: null,
              threshold: 0.25,
            }"
            animation="scaleAndFade"
          >
            <ProjectCard />
          </TheDivider>
        </div>
      </div>
    </template>
  </ThePageContainer>
</template>
