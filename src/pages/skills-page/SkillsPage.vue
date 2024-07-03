<script setup lang="ts">

import { vIntersectionObserver } from '@vueuse/components';
import { computed, onMounted, ref } from 'vue';

import { ICONS_MAP, type CustomIcon } from '@/assets';
import { IntroSection, ThePageContainer, TheDataListContainer, BaseCard, BaseInput, BaseToggle } from '@/components';
import SkillSolarSystem from '@/components/page-components/skills-page/skill-solar-system/SkillSolarSystem.vue';
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
const root = ref();
const skillsRoot = ref();

const sectionsVisibilityMap = ref(new Map<string, boolean>());
const skillsVisibilityMap = ref(new Map<string, boolean>());

const onIntersectionObserver = (index: number) => ([{ isIntersecting }]: IntersectionObserverEntry[]) => {
	sectionsVisibilityMap.value.set(`skillsSection-${index}`, isIntersecting);
};

const onIntersectionObserverSkills = (id: string) => ([{ isIntersecting }]: IntersectionObserverEntry[]) => {
	skillsVisibilityMap.value.set(id, isIntersecting);
};

onMounted(() => {
	skillsPageI18nContent.value.skillsSections.forEach((_, index) => {
		sectionsVisibilityMap.value.set(`skillsSection-${index}`, false);
	});

	skillsPageI18nContent.value.skillsList.forEach((skill) => {
		skillsVisibilityMap.value.set(skill.id, false);
	});
});

// Extract Icons from SkillsList

const feIcons = computed(() => skillsPageI18nContent.value.skillsList
	.filter((skill) => skill.type === 'feLanguage' || skill.type === 'feFramework')
	.map((skill) => ICONS_MAP[skill.icon as CustomIcon]));

const beIcons = computed(() => skillsPageI18nContent.value.skillsList
	.filter((skill) => skill.type === 'beLanguage' || skill.type === 'beFramework')
	.map((skill) => ICONS_MAP[skill.icon as CustomIcon]));

</script>

<template>
  <ThePageContainer
    ref="root"
  >
    <template #intro-section>
      <IntroSection
        :title="skillsPageI18nContent.pageHeading"
      />
    </template>

    <template #main-content>
      <section
        v-for="(section, index) in skillsPageI18nContent.skillsSections"
        :id="`skillsSection-${index}`"
        :key="index"
        v-intersection-observer="[onIntersectionObserver(index), {root, threshold: 0.2}]"
        :class=" {
          'flex-row': index % 2 === 0 && !xs && !sm && !md || !lg,
          'flex-row-reverse': index % 2 !== 0 && !xs && !sm && !md || !lg,
          'flex-col items-center': xs || sm || md || lg,
          'opacity-0': !sectionsVisibilityMap.get(`skillsSection-${index}`),
          'opacity-100': sectionsVisibilityMap.get(`skillsSection-${index}`),
        }"
        class="flex items-center gap-12 px-4 transition-all duration-500 ease-in-out"
      >
        <SkillSolarSystem
          v-if="index !== skillsPageI18nContent.skillsSections.length - 1"
          :planets-icons="index % 2 === 0 ? feIcons : beIcons"
          :star-name="index % 2 === 0 ? 'Frontend' : 'Backend'"
        />
        <div class="flex flex-col justify-center flex-1 ">
          <h2
            :id="`skillsSection-${index}-titleHeading`"
            :class="[ h2Size, {
              'text-center': xs || sm,
              'text-left': !xs && !sm,
            }]"
            class="text-white whitespace-normal transition-all duration-300 ease-in-out font-bebas"
          >
            {{ section.titleHeading }}
          </h2>
          <h3
            :id="`skillsSection-${index}-subTitleHeading`"
            :class="[ h3Size, {
              'text-center': xs || sm,
              'text-left': !xs && !sm,
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
      <div
        v-if="false"
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
              <BaseCard
                v-for="skill in skillsPageI18nContent.skillsList"
                :key="skill.id"
                v-intersection-observer="[onIntersectionObserverSkills(skill.id), {root: skillsRoot, threshold: 0.2}]"
                :class="{
                  'opacity-0 w-0': !skillsVisibilityMap.get(skill.id),
                  'opacity-100 w-full': skillsVisibilityMap.get(skill.id),
                }"
                :icon="ICONS_MAP[skill.icon as CustomIcon]"
                :text-content="skill.name"
                :is-selected="selectedSkill === skill.name"
                @click="selectedSkill = skill.name"
              />
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