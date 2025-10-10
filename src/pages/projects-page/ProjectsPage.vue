<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useHead } from '@unhead/vue';

import {
  useNotificationStore,
  useLocaleStore,
  useProjectsStore,
  usePortfolioStore,
} from '@/stores';

import AppPageContainer from '@/components/layouts/page-container/AppPageContainer.vue';
import AppDivider from '@/components/layouts/divider/AppDivider.vue';
import BaseSection from '@/components/base/section/BaseSection.vue';

import ProjectCard from '@/pages/projects-page/components/ProjectCard.vue';
import ProjectCardSkeleton from '@/pages/projects-page/components/ProjectCardSkeleton.vue';
import type { Lang } from '@/types';

// Dependencies
const nStore = useNotificationStore();
const { projectsData } = storeToRefs(usePortfolioStore());
const { locale } = storeToRefs(useLocaleStore());
const pStore = useProjectsStore();
const { projects, isLoading, error } = storeToRefs(pStore);

// State
useHead({
  title: computed(() => projectsData.value.pageMeta.title),
  meta: computed(() => [
    {
      name: 'description',
      content: projectsData.value.pageMeta.description,
    },
  ]),
});

// Events

onMounted(() => {
  pStore.loadProjects(locale.value as Lang);
});

watch(
  () => locale.value,
  (newLang) => {
    pStore.loadProjects(newLang as Lang);
  },
);

watch(
  () => error.value,
  (newError) => {
    if (newError) {
      nStore.pushNotification(
        'Projects are not available at the moment. Please try again later.',
        'error',
      );
    }
  },
);
</script>

<template>
  <AppPageContainer :page-intro-text="projectsData.startTitle">
    <template #page-content>
      <div
        class="flex flex-col transition-all duration-300 ease-in-out gap-8 sm:gap-9 md:gap-9 lg:gap-10"
      >
        <AppDivider animation="scaleAndFade">
          <BaseSection
            :title="projectsData.presentation.title"
            :paragraph="projectsData.presentation.paragraph || ''"
          />
        </AppDivider>
        <div
          class="grid transition-all duration-300 ease-in-out tot-pad-m tot-gap-m grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
        >
          <template v-if="!isLoading && !error">
            <AppDivider v-for="p in projects" :key="p.id" animation="scaleAndFade">
              <ProjectCard :project="p" />
            </AppDivider>
          </template>
          <template v-else>
            <AppDivider v-for="n in 6" :key="n" animation="scaleAndFade">
              <ProjectCardSkeleton />
            </AppDivider>
          </template>
        </div>
      </div>
    </template>
  </AppPageContainer>
</template>
