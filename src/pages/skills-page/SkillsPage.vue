<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import { computed, ref, watch } from 'vue';
import { ICONS, SKILL_ICONS } from '@/constants';
import { ThePageContainer, TheDivider, BaseButton, BaseSection } from '@/components';
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
    .map((skill) => SKILL_ICONS[skill.icon]),
);

const beIcons = computed(() =>
  skillsList.value
    .filter(
      (skill) =>
        skill.type === 'beLanguage' || skill.type === 'beFramework' || skill.type === 'beDb',
    )
    .map((skill) => SKILL_ICONS[skill.icon]),
);

// Feature 2: Manage Modal State
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
      <TheDivider
        animation="scaleAndFade"
        class="relative flex flex-col items-center justify-center w-full border-2 border-dashed rounded-lg border-sb-secondary-200"
        :class="[styleStore.elementTotalPaddingM]"
      >
        <div :style="starsContainerStyle">
          <div v-for="(star, index) in stars" :key="index" :style="star"></div>
        </div>
        <span
          :class="[styleStore.textSizeXL]"
          class="text-center transition-all duration-300 ease-in-out z-sb-base-1 font-bebas text-sb-tertiary-100"
        >
          {{ i18nStore.skillsPageI18nContent.callToActionFirstHeading }}
        </span>
        <span
          :class="[styleStore.textSizeL]"
          class="text-center text-white transition-all duration-300 ease-in-out z-sb-base-1 font-bebas"
        >
          {{ i18nStore.skillsPageI18nContent.callToActionSecondHeading }}
        </span>
        <component
          :is="ICONS.RocketIcon"
          class="transition-all duration-300 ease-in-out z-sb-base-1"
          :class="[
            styleStore.iconSizeXXL,
            {
              'my-4':
                styleStore.activeBreakpoint !== 'xs' &&
                styleStore.activeBreakpoint !== 'sm' &&
                styleStore.activeBreakpoint !== 'md',
              'my-3': styleStore.activeBreakpoint === 'md',
              'my-2.5':
                styleStore.activeBreakpoint === 'sm' || styleStore.activeBreakpoint === 'xs',
            },
          ]"
        />
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
      </TheDivider>
      <TheDivider
        v-for="(section, index) in i18nStore.skillsPageI18nContent.skillsSections"
        :key="index"
        animation="scaleAndFade"
      >
        <BaseSection
          :inverted="index % 2 === 0 ? false : true"
          :title="section.titleHeading"
          :subtitle="section.subTitleHeading"
          :paragraph="section.contentParagraph"
        >
          <template #extra-content>
            <SolarSystem
              v-if="index !== 2"
              :planets-icons="index === 0 ? feIcons : beIcons"
              :star-name="index === 0 ? 'Frontend' : 'Backend'"
            />
          </template>
        </BaseSection>
      </TheDivider>
    </template>
  </ThePageContainer>
  <SkillsDialog
    :is-modal-open="isModalOpen"
    :handle-close-modal="(falsyValue) => changeVisibility(falsyValue)"
  />
</template>
