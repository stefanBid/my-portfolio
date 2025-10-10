<script setup lang="ts">
import { computed, ref, h } from 'vue';
import { storeToRefs } from 'pinia';
import { useHead } from '@unhead/vue';

import { useStarEffect } from '@/hooks';
import { usePortfolioStore } from '@/stores';

import { Icon } from '@iconify/vue';

import AppPageContainer from '@/components/layouts/page-container/AppPageContainer.vue';
import AppDivider from '@/components/layouts/divider/AppDivider.vue';
import BaseButton from '@/components/base/button/BaseButton.vue';
import BaseSection from '@/components/base/section/BaseSection.vue';

import SkillsDialog from '@/pages/skills-page/components/SkillsDialog.vue';
import SolarSystem from '@/pages/skills-page/components/SolarSystem.vue';

// Dependencies
const { skillsData } = storeToRefs(usePortfolioStore());
const { stars, starsContainerStyle } = useStarEffect(150);

// State
useHead({
  title: computed(() => skillsData.value.pageMeta.title),
  meta: computed(() => [
    {
      name: 'description',
      content: skillsData.value.pageMeta.description,
    },
  ]),
});

const getInfoPanelExtraInfoButton = computed(() => {
  if (
    !skillsData.value.skillsInfoPanel.extraInfo ||
    !skillsData.value.skillsInfoPanel.extraInfo['button']
  )
    return undefined;

  return skillsData.value.skillsInfoPanel.extraInfo['button'] as { text: string; icon: string };
});

const getInfoPanelExtraInfoIcon = computed(() => {
  if (
    !skillsData.value.skillsInfoPanel.extraInfo ||
    !skillsData.value.skillsInfoPanel.extraInfo['icon']
  )
    return undefined;

  return skillsData.value.skillsInfoPanel.extraInfo['icon'] as string;
});

const getSkillBio = computed(() => [
  ...skillsData.value.skillsBio.map((section) => ({
    ...section,
    extraInfo: section.extraInfo as { sunTitle: string; bestSkillsIcons: string[] } | null,
  })),
]);
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
  <AppPageContainer :page-intro-text="skillsData.startTitle">
    <template #page-content>
      <AppDivider
        animation="scaleAndFade"
        class="relative flex flex-col items-center justify-center w-full border-2 border-dashed rounded-lg border-sb-secondary-200 tot-pad-m"
      >
        <div :style="starsContainerStyle">
          <div v-for="(star, index) in stars" :key="index" :style="star"></div>
        </div>
        <span
          class="text-center transition-all duration-300 ease-in-out z-[100] font-bebas text-sb-tertiary-100 text-size-xl"
        >
          {{ skillsData.skillsInfoPanel.title }}
        </span>
        <span
          class="text-center text-white transition-all duration-300 ease-in-out z-[100] font-bebas text-size-l"
        >
          {{ skillsData.skillsInfoPanel.subtitle }}
        </span>
        <Icon
          v-if="getInfoPanelExtraInfoIcon"
          :icon="getInfoPanelExtraInfoIcon"
          class="transition-all duration-300 ease-in-out z-[100] text-sb-tertiary-100 icon-size-xxl my-2.5 sm:my-3 md:my-3 lg:my-4"
        />
        <BaseButton
          v-if="getInfoPanelExtraInfoButton"
          id="exploreSkillsButton"
          name="explore_skills_button"
          aria-label="click to explore skills"
          class="z-[100] w-fit"
          :icon="h(Icon, { icon: getInfoPanelExtraInfoButton.icon || '' })"
          @click="changeVisibility(!isModalOpen)"
        >
          {{ getInfoPanelExtraInfoButton.text }}
        </BaseButton>
      </AppDivider>
      <AppDivider v-for="(section, index) in getSkillBio" :key="index" animation="scaleAndFade">
        <BaseSection
          :inverted="index % 2 === 0 ? false : true"
          :title="section.title"
          :subtitle="section.subtitle"
          :paragraph="section.paragraph || ''"
        >
          <template #extra-content>
            <SolarSystem
              v-if="section.extraInfo"
              :planets-icons="section.extraInfo.bestSkillsIcons"
              :star-name="section.extraInfo.sunTitle"
            />
          </template>
        </BaseSection>
      </AppDivider>
    </template>
  </AppPageContainer>
  <SkillsDialog
    :is-modal-open="isModalOpen"
    :handle-close-modal="(falsyValue) => changeVisibility(falsyValue)"
  />
</template>
