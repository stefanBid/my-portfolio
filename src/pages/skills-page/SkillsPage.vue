<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import { vIntersectionObserver } from '@vueuse/components';
import { computed, ref, } from 'vue';

import { SKILLS_ICONS_MAP, type SkillIcon, RocketIcon } from '@/assets';
import { ThePageContainer, BaseButton, BaseSection } from '@/components';
import { useCommonStyleSingleton, useTypedI18nSingleton, useStarEffect } from '@/hooks';
import SkillsDialog from '@/pages/skills-page/components/SkillsDialog.vue';
import SolarSystem from '@/pages/skills-page/components/SolarSystem.vue';

// Feature 1: Manage Style Classes
const { textSizeXL, textSizeL, iconSizeXXL } = useCommonStyleSingleton();

// Feature 2: Internationalization (i18n)
const { skillsPageI18nContent, currentLanguage } = useTypedI18nSingleton();
const skillsList = computed(() => skillsPageI18nContent.value.skillsList);

// Feature 3: Manage Skills for Solar System Component
const feIcons = computed(() => skillsList.value
	.filter((skill) => skill.type === 'feLanguage' || skill.type === 'feFramework')
	.map((skill) => SKILLS_ICONS_MAP[skill.icon as SkillIcon]));

const beIcons = computed(() => skillsList.value
	.filter((skill) => skill.type === 'beLanguage' || skill.type === 'beFramework' || skill.type === 'beDb')
	.map((skill) => SKILLS_ICONS_MAP[skill.icon as SkillIcon]));

// Feature 4: Manage Stars Effect
const isVisible = ref(false);
const { stars, starsContainerStyle } = useStarEffect(150);

const onIntersectionObserver = ([{ isIntersecting }]: IntersectionObserverEntry[]) => {
	if (isIntersecting !== isVisible.value) {
		isVisible.value = isIntersecting;
	}
};

// Feature 5: Manage Modal State
const isModalOpen = ref(false);
const changeVisibility = (newVisibility: boolean) => {
	if (newVisibility === isModalOpen.value) { return; }
	isModalOpen.value = newVisibility;
};
</script>

<template>
  <ThePageContainer :page-intro-text="skillsPageI18nContent.pageHeading">
    <template #page-content>
      <div
        v-intersection-observer="[onIntersectionObserver, { root: null, threshold: 0.2, rootMargin: '-80px 0px 0px 0px' }]"
        class="relative flex flex-col items-center justify-center w-full p-8 border-2 border-dashed rounded-lg  transition-sb-slow border-sb-secondary-200"
        :class=" {
          'opacity-0': !isVisible,
          'opacity-100': isVisible
        }"
      >
        <div :style="starsContainerStyle">
          <div
            v-for="(star, index) in stars"
            :key="index"
            :style="star"
          ></div>
        </div>
        <span
          :class="[textSizeXL]"
          class="text-center z-sb-base-1 font-bebas text-sb-tertiary-100 transition-sb-slow "
        >
          {{ currentLanguage === 'en' ? `Looking for a skilled professional?`: `Cerchi un professionista qualificato?` }}
        </span>
        <span
          :class="[textSizeL]"
          class="text-center text-white z-sb-base-1 font-bebas transition-sb-slow "
        >
          {{ currentLanguage === 'en' ? `Discover my top skills and how I can add value to your team`: `Scopri le mie principali competenze e come posso contribuire alla tua squadra` }}
        </span>
        <RocketIcon
          class="my-4 transition-sb-slow z-sb-base-1 "
          :class="[iconSizeXXL]"
        />
        <BaseButton
          variant="primary"
          class="z-sb-base-1 w-fit"
          :icon="MagnifyingGlassIcon"
          @click="changeVisibility(!isModalOpen)"
        >
          {{ currentLanguage === 'en' ? `Explore My Skills`: `Esplora le mie competenze` }}
        </BaseButton>
      </div>
      <BaseSection
        v-for="(section, index) in skillsPageI18nContent.skillsSections"
        :id="`skillsSection-${index}`"
        :key="index"
        :inverted="index % 2 === 0 ? false : true"
        :title="section.titleHeading"
        :subtitle="section.subTitleHeading"
        :paragraph="section.contentParagraph"
        :intersection-observer-settings="{ rootElement: null, threshold: 0.2, rootMargin: '-80px 0px 0px 0px'}"
      >
        <template #extra-content>
          <SolarSystem
            v-if="section.sectionType === 'BE' || section.sectionType === 'FE'"
            :planets-icons="section.sectionType === 'FE' ? feIcons : beIcons"
            :star-name="section.sectionType === 'FE' ? 'Frontend' : 'Backend'"
          />
        </template>
      </BaseSection>
    </template>
  </ThePageContainer>
  <SkillsDialog
    :is-modal-open="isModalOpen"
    :skills-list="skillsList"
    :handle-close-modal="falsyValue => changeVisibility(falsyValue)"
  />
</template>