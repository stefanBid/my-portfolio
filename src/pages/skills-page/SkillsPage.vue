<script setup lang="ts">
import { computed, ref } from 'vue';

import { ICONS_MAP, type CustomIcon } from '@/assets';
import { IntroSection, ThePageContainer, TheDataListContainer, BaseCard, BaseInput, BaseToggle, BaseDiv } from '@/components';
import SolarSystem from '@/components/page-components/skills-page/solar-system/SolarSystem.vue';
import { useCommonStyleSingleton, useTypedI18nSingleton } from '@/hooks';

// Feature 1: Manage Style Classes
const { xs, sm, md, lg, h2Size, h3Size, pSize } = useCommonStyleSingleton();

// Feature 2: Internationalization (i18n)
const { skillsPageI18nContent } = useTypedI18nSingleton();

const key = ref('');
const selectedSkill = ref('');

const showingFilters = ref({
	showAll: true,
	showFe: true,
	showBe: true,
});

// Feature 3: Manage Visibility for effects
const skillsRoot = ref<HTMLElement | null>(null);

// Extract Icons from SkillsList

const feIcons = computed(() => skillsPageI18nContent.value.skillsList
	.filter((skill) => skill.type === 'feLanguage' || skill.type === 'feFramework')
	.map((skill) => ICONS_MAP[skill.icon as CustomIcon]));

const beIcons = computed(() => skillsPageI18nContent.value.skillsList
	.filter((skill) => skill.type === 'beLanguage' || skill.type === 'beFramework')
	.map((skill) => ICONS_MAP[skill.icon as CustomIcon]));

</script>

<template>
  <ThePageContainer>
    <template #intro-section>
      <IntroSection
        :title="skillsPageI18nContent.pageHeading"
      />
    </template>

    <template #main-content="{root}">
      <BaseDiv
        v-for="(section, index) in skillsPageI18nContent.skillsSections"
        :key="index"
        :intersection-observer-settings="{root, threshold: 0.2}"
      >
        <section
          :id="`skillsSection-${index}`"
          :class=" {
            'flex-row': index % 2 === 0 && !xs && !sm && !md && !lg,
            'flex-row-reverse': index % 2 !== 0 && !xs && !sm && !md && !lg,
            'flex-col items-center': xs || sm || md || lg,
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
                'text-center': xs || sm,
                'text-left': (index % 2 === 0) && (md || lg),
                'text-right': (index % 2 !== 0) && (md || lg),
              }]"
              class="text-white whitespace-normal transition-all duration-300 ease-in-out font-bebas"
            >
              {{ section.titleHeading }}
            </h2>
            <h3
              :id="`skillsSection-${index}-subTitleHeading`"
              :class="[ h3Size, {
                'text-center': xs || sm,
                'text-left': (index % 2 === 0) && (md || lg),
                'text-right': (index % 2 !== 0) && (md || lg),
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
      <div
        v-if="true"
        class="flex justify-center"
      >
        <TheDataListContainer :height-px="750">
          <template #left-side-header>
            <BaseInput
              v-model:input-value="key"
              with-menu
              placeholder="Search a skill"
            >
              <template #input-menu-box>
                <div class="grid grid-cols-1 gap-6 p-6">
                  <BaseToggle
                    v-model:enabled="showingFilters.showAll"
                    label="Show all"
                  />
                  <BaseToggle
                    v-model:enabled="showingFilters.showFe"
                    label="Show FE"
                  />
                  <BaseToggle
                    v-model:enabled="showingFilters.showBe"
                    label="Show BE"
                  />
                </div>
              </template>
            </BaseInput>
          </template>
          <template #left-side>
            <div
              ref="skillsRoot"
              class="flex flex-col pr-2 overflow-y-auto gap-y-4"
            >
              <BaseDiv
                v-for="skill in skillsPageI18nContent.skillsList"
                :key="skill.id"
                :intersection-observer-settings="{
                  root: skillsRoot,
                  threshold: 0.2,
                  cssVisibilityClassExtra: 'w-full',
                  cssNotVisibilityClassExtra: 'w-0',
                }"
              >
                <BaseCard
                  class="w-full"
                  :icon="ICONS_MAP[skill.icon as CustomIcon]"
                  :text-content="skill.name"
                  :is-selected="selectedSkill === skill.name"
                  @click="selectedSkill = skill.name"
                />
              </BaseDiv>
            </div>
          </template>
          <template #right-side>
            {{ selectedSkill }}
          </template>
        </TheDataListContainer>
      </div>
    </template>
  </ThePageContainer>
</template>