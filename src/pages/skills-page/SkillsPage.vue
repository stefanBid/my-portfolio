<script setup lang="ts">
import { computed } from 'vue';

import { SKILLS_ICONS_MAP, type SkillIcon } from '@/assets';
import { BaseHero, ThePageContainer, BaseDiv } from '@/components';
import { useCommonStyleSingleton, useTypedI18nSingleton } from '@/hooks';
import SolarSystem from '@/pages/skills-page/components/SolarSystem.vue';

// Feature 1: Manage Style Classes
const { activeBreakpoint, h2Size, h3Size, pSize } = useCommonStyleSingleton();

// Feature 2: Internationalization (i18n)
const { skillsPageI18nContent } = useTypedI18nSingleton();

const feIcons = computed(() => skillsPageI18nContent.value.skillsList
	.filter((skill) => skill.type === 'feLanguage' || skill.type === 'feFramework')
	.map((skill) => SKILLS_ICONS_MAP[skill.icon as SkillIcon]));

const beIcons = computed(() => skillsPageI18nContent.value.skillsList
	.filter((skill) => skill.type === 'beLanguage' || skill.type === 'beFramework' || skill.type === 'beDb')
	.map((skill) => SKILLS_ICONS_MAP[skill.icon as SkillIcon]));

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
        v-for="(section, index) in skillsPageI18nContent.skillsSections"
        :key="index"
        :intersection-observer-settings="{root: null, threshold: 0.2}"
      >
        <section
          :id="`skillsSection-${index}`"
          :class=" {
            'flex-row': index % 2 === 0 && activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm' && activeBreakpoint !== 'md' && activeBreakpoint !== 'lg',
            'flex-row-reverse': index % 2 !== 0 && activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm' && activeBreakpoint !== 'md' && activeBreakpoint !== 'lg',
            'flex-col items-center': activeBreakpoint === 'xs' || activeBreakpoint === 'sm' || activeBreakpoint === 'md' || activeBreakpoint === 'lg',
          }"
          class="flex items-center w-full gap-12 px-4"
        >
          <SolarSystem
            v-if="index !== skillsPageI18nContent.skillsSections.length -1"
            :planets-icons="index % 2 === 0 ? feIcons : beIcons"
            :star-name="index % 2 === 0 ? 'Frontend' : 'Backend'"
          />
          <div class="flex flex-col justify-center flex-1 ">
            <h2
              :id="`skillsSection-${index}-titleHeading`"
              :class="[ h2Size, {
                'text-center': activeBreakpoint === 'xs' || activeBreakpoint === 'sm',
                'text-left': (index % 2 === 0) && (activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm'),
                'text-right': (index % 2 !== 0) && (activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm'),
              }]"
              class="text-white whitespace-normal transition-all duration-300 ease-in-out font-bebas"
            >
              {{ section.titleHeading }}
            </h2>
            <h3
              :id="`skillsSection-${index}-subTitleHeading`"
              :class="[ h3Size, {
                'text-center': activeBreakpoint === 'xs' || activeBreakpoint === 'sm',
                'text-left': (index % 2 === 0) && (activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm'),
                'text-right': (index % 2 !== 0) && (activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm'),
              }]"
              class="font-medium text-white whitespace-normal transition-all duration-300 ease-in-out font-roboto"
            >
              ({{ section.subTitleHeading }})
            </h3>
            <div
              :id="`skillsSection-${index}-contentParagraph`"
              :class="[ pSize]"
              class="p-4 mt-4 text-justify text-white whitespace-normal transition-all duration-300 ease-in-out rounded-lg font-roboto bg-secondary"
            >
              {{ section.contentParagraph }}
            </div>
          </div>
        </section>
      </BaseDiv>
    </template>
  </ThePageContainer>
</template>