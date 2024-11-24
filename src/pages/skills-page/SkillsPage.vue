<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import { vIntersectionObserver } from '@vueuse/components';
import { computed, ref, watch } from 'vue';

import { SKILLS_ICONS_MAP, type SkillIcon, RocketIcon } from '@/assets';
import { ThePageContainer, BaseButton, BaseSection } from '@/components';
import { useStarEffect } from '@/hooks';
import { useI18nStore, useStyleStore, useTitleStore } from '@/stores';
import SkillsDialog from '@/pages/skills-page/components/SkillsDialog.vue';
import SolarSystem from '@/pages/skills-page/components/SolarSystem.vue';

// Store Declarations
const styleStore = useStyleStore();
const i18nStore = useI18nStore();
const titleStore = useTitleStore();

// Hooks Declarations
const { stars, starsContainerStyle } = useStarEffect(150);

// Feature 1: Page Title
watch(
  () => i18nStore.currentLanguage,
  (newValue) => {
    titleStore.setTitleSuffix(newValue === 'it' ? 'Abilità' : 'Skills');
  },
  { immediate: true },
);

// Feature 2: Manage Skills for Solar System Component
const skillsList = computed(() => i18nStore.skillsPageI18nContent.skillsList);
const feIcons = computed(() =>
  skillsList.value
    .filter((skill) => skill.type === 'feLanguage' || skill.type === 'feFramework')
    .map((skill) => SKILLS_ICONS_MAP[skill.icon as SkillIcon]),
);

const beIcons = computed(() =>
  skillsList.value
    .filter(
      (skill) =>
        skill.type === 'beLanguage' || skill.type === 'beFramework' || skill.type === 'beDb',
    )
    .map((skill) => SKILLS_ICONS_MAP[skill.icon as SkillIcon]),
);

// Feature 2: Manage Intersection Observer
const isVisible = ref(false);

const onIntersectionObserver = ([{ isIntersecting }]: IntersectionObserverEntry[]): void => {
  if (isIntersecting !== isVisible.value) {
    isVisible.value = isIntersecting;
  }
};

// Feature 3: Manage Modal State
const isModalOpen = ref(false);
const changeVisibility = (newVisibility: boolean): void => {
  if (newVisibility === isModalOpen.value) {
    return;
  }
  isModalOpen.value = newVisibility;
};
</script>

<template>
  <ThePageContainer :page-intro-text="i18nStore.skillsPageI18nContent.pageHeading">
    <template #page-content>
      <div
        v-intersection-observer="[
          onIntersectionObserver,
          { root: null, threshold: 0.15, rootMargin: '-80px 0px 0px 0px' },
        ]"
        class="relative flex flex-col items-center justify-center w-full p-8 border-2 border-dashed rounded-lg transition-sb-slow border-sb-secondary-200"
        :class="{
          'opacity-0': !isVisible,
          'opacity-100': isVisible,
        }"
      >
        <div :style="starsContainerStyle">
          <div v-for="(star, index) in stars" :key="index" :style="star"></div>
        </div>
        <span
          :class="[styleStore.textSizeXL]"
          class="text-center z-sb-base-1 font-bebas text-sb-tertiary-100 transition-sb-slow"
        >
          {{ i18nStore.skillsPageI18nContent.callToActionFirstHeading }}
        </span>
        <span
          :class="[styleStore.textSizeL]"
          class="text-center text-white z-sb-base-1 font-bebas transition-sb-slow"
        >
          {{ i18nStore.skillsPageI18nContent.callToActionSecondHeading }}
        </span>
        <RocketIcon class="my-4 transition-sb-slow z-sb-base-1" :class="[styleStore.iconSizeXXL]" />
        <BaseButton
          id="exploreSkillsButton"
          name="explore_skills_button"
          aria-label="click to explore skills"
          class="z-sb-base-1 w-fit"
          :icon="MagnifyingGlassIcon"
          @click="changeVisibility(!isModalOpen)"
        >
          {{ i18nStore.skillsPageI18nContent.exploreSkillsButton.text }}
        </BaseButton>
      </div>
      <BaseSection
        v-for="(section, index) in i18nStore.skillsPageI18nContent.skillsSections"
        :key="index"
        :inverted="index % 2 === 0 ? false : true"
        :title="section.titleHeading"
        :subtitle="section.subTitleHeading"
        :paragraph="section.contentParagraph"
        :intersection-observer-settings="{
          rootElement: null,
          threshold: 0.1,
          rootMargin: '-80px 0px 0px 0px',
        }"
      >
        <template #extra-content>
          <SolarSystem
            v-if="index !== 2"
            :planets-icons="index === 0 ? feIcons : beIcons"
            :star-name="index === 0 ? 'Frontend' : 'Backend'"
          />
        </template>
      </BaseSection>
    </template>
  </ThePageContainer>
  <SkillsDialog
    :is-modal-open="isModalOpen"
    :handle-close-modal="(falsyValue) => changeVisibility(falsyValue)"
  />
</template>
