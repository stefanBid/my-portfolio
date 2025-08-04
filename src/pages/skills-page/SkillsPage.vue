<script setup lang="ts">
import MdiRocketLaunch from '~icons/mdi/rocket-launch';
import MdiClipboardTextSearch from '~icons/mdi/clipboard-text-search';
import { computed, ref } from 'vue';
import { ThePageContainer, TheDivider, BaseButton, BaseSection } from '@/components';
import { usePageMeta, useStarEffect } from '@/hooks';
import { useI18nStore, useStyleStore } from '@/stores';
import SkillsDialog from '@/pages/skills-page/components/SkillsDialog.vue';
import SolarSystem from '@/pages/skills-page/components/SolarSystem.vue';

// Store Declarations
const styleStore = useStyleStore();
const i18nStore = useI18nStore();

// Hooks Declarations
const { stars, starsContainerStyle } = useStarEffect(150);

// SEO Feature Manage Meta Tags
usePageMeta({
  meta: computed(() => i18nStore.skillsPageI18nContent.metaDescription),
  currentLang: computed(() => i18nStore.currentLanguage),
  url: 'https://stefanobiddau.com/skills',
  image:
    'https://media.licdn.com/dms/image/v2/D4D03AQGvfHWN3w4Vyw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1674322166521?e=1749081600&v=beta&t=LGlVPU_6C_nOJY5QkpcWvebJvEZSdCihzcHWz-IpSb4',
});

// Feature 1: Manage Skills for Solar System Component

const skillsList = computed(() => i18nStore.skillsPageI18nContent.skillsList);
const feIcons = computed(() =>
  skillsList.value
    .filter((skill) => skill.type === 'feLanguage' || skill.type === 'feFramework')
    .map((skill) => skill.icon),
);

const beIcons = computed(() =>
  skillsList.value
    .filter(
      (skill) =>
        skill.type === 'beLanguage' || skill.type === 'beFramework' || skill.type === 'beDb',
    )
    .map((skill) => skill.icon),
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
        <MdiRocketLaunch
          class="transition-all duration-300 ease-in-out z-sb-base-1 text-sb-tertiary-100"
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
          :icon="MdiClipboardTextSearch"
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
