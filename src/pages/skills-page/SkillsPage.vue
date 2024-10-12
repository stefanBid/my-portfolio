<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import { computed, ref, } from 'vue';

import { SKILLS_ICONS_MAP, type SkillIcon, RocketIcon } from '@/assets';
import { BaseHero, ThePageContainer, BaseButton, BaseSection, BaseDiv } from '@/components';
import { useCommonStyleSingleton, useTypedI18nSingleton, useStarEffect } from '@/hooks';
import SkillsModal from '@/pages/skills-page/components/SkillsModal.vue';
import SolarSystem from '@/pages/skills-page/components/SolarSystem.vue';

// Feature 1: Manage Style Classes
const { textSizeXL, textSizeL, activeBreakpoint } = useCommonStyleSingleton();

const { stars } = useStarEffect(150);

// Feature 2: Internationalization (i18n)
const { skillsPageI18nContent, currentLanguage } = useTypedI18nSingleton();
const skillsList = ref(skillsPageI18nContent.value.skillsList);

// Feature 3: Manage Skills for Solar System Component
const feIcons = computed(() => skillsList.value
	.filter((skill) => skill.type === 'feLanguage' || skill.type === 'feFramework')
	.map((skill) => SKILLS_ICONS_MAP[skill.icon as SkillIcon]));

const beIcons = computed(() => skillsList.value
	.filter((skill) => skill.type === 'beLanguage' || skill.type === 'beFramework' || skill.type === 'beDb')
	.map((skill) => SKILLS_ICONS_MAP[skill.icon as SkillIcon]));

// Feature 4: Manage Modal State
const isModalOpen = ref(false);

const changeVisibility = (newVisibility: boolean) => {
	if (newVisibility === isModalOpen.value) { return; }
	isModalOpen.value = newVisibility;
};
</script>

<template>
  <ThePageContainer>
    <template #intro-section>
      <BaseHero
        :title="skillsPageI18nContent.pageHeading"
      />
    </template>

    <template #page-content>
      <BaseDiv
        :intersection-observer-settings="{ root: null, threshold: 0.35, visibilityCss: 'fade' }"
        class="relative flex flex-col items-center justify-center w-full p-8 mb-32 border-2 border-dashed rounded-lg border-sb-secondary-100"
      >
        <div class="absolute top-0 left-0 z-10 w-full h-full overflow-hidden border rounded-lg pointer-events-none ">
          <div
            v-for="(star, index) in stars"
            :key="index"
            :style="star"
          ></div>
        </div>
        <span
          :class="[textSizeXL]"
          class="z-20 text-center font-bebas text-sb-tertiary-100 "
        >
          {{ currentLanguage === 'en' ? `Looking for a skilled professional?`: `Cerchi un professionista qualificato?` }}
        </span>
        <span
          :class="[textSizeL]"
          class="z-20 text-center text-white font-bebas "
        >
          {{ currentLanguage === 'en' ? `Discover my top skills and how I can add value to your team`: `Scopri le mie principali competenze e come posso contribuire alla tua squadra` }}
        </span>
        <RocketIcon
          class="z-20 my-4 transition-all duration-500 ease-in-out "
          :class="{
            'size-16': activeBreakpoint === 'xs' || activeBreakpoint === 'sm',
            'size-20': activeBreakpoint === 'md',
            'size-32': activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm' && activeBreakpoint !== 'md',
          }"
        />
        <BaseButton
          variant="primary"
          class="z-20 w-fit"
          :icon="MagnifyingGlassIcon"
          @click="changeVisibility(!isModalOpen)"
        >
          {{ currentLanguage === 'en' ? `Explore My Skills`: `Esplora le mie competenze` }}
        </BaseButton>
      </BaseDiv>
      <BaseSection
        v-for="(section, index) in skillsPageI18nContent.skillsSections"
        :id="`skillsSection-${index}`"
        :key="index"
        :extra-side-position="index % 2 === 0 ? 'left' : 'right'"
        :title="section.titleHeading"
        :subtitle="section.subTitleHeading"
        :paragraph="section.contentParagraph"
      >
        <template #extra-side-content>
          <SolarSystem
            v-if="section.sectionType === 'BE' || section.sectionType === 'FE'"
            :planets-icons="section.sectionType === 'FE' ? feIcons : beIcons"
            :star-name="section.sectionType === 'FE' ? 'Frontend' : 'Backend'"
          />
        </template>
      </BaseSection>
    </template>
  </ThePageContainer>
  <SkillsModal
    :is-modal-open="isModalOpen"
    :skills-list="skillsList"
    :handle-close-modal="falsyValue => changeVisibility(falsyValue)"
  />
</template>