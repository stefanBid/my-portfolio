<script setup lang="ts">
// import { CodeBracketSquareIcon } from '@heroicons/vue/24/outline';
import { computed, ref, /* watch */ } from 'vue';

import { SKILLS_ICONS_MAP, type SkillIcon } from '@/assets';
import { BaseHero, ThePageContainer, /* BaseDiv, BaseButton, BaseModal, BaseInput, BaseToggle, */ BaseSection } from '@/components';
import { /* useCommonStyleSingleton, */ useTypedI18nSingleton } from '@/hooks';
import SolarSystem from '@/pages/skills-page/components/SolarSystem.vue';

// const SkillsRootRef = ref<HTMLElement | null>(null);

// Feature 1: Manage Style Classes
// const { activeBreakpoint } = useCommonStyleSingleton();

// Feature 2: Internationalization (i18n)
const { skillsPageI18nContent, /* currentLanguage */ } = useTypedI18nSingleton();
const skillsList = ref(skillsPageI18nContent.value.skillsList);

// Feature 3: Manage Skills for Solar System Component
const feIcons = computed(() => skillsList.value
	.filter((skill) => skill.type === 'feLanguage' || skill.type === 'feFramework')
	.map((skill) => SKILLS_ICONS_MAP[skill.icon as SkillIcon]));

const beIcons = computed(() => skillsList.value
	.filter((skill) => skill.type === 'beLanguage' || skill.type === 'beFramework' || skill.type === 'beDb')
	.map((skill) => SKILLS_ICONS_MAP[skill.icon as SkillIcon]));

// Feature 4: Manage Modal State
/*
const isModalOpen = ref(false);

const handleOpenModal = () => {
	isModalOpen.value = true;
};
const handleCloseModal = () => {
	isModalOpen.value = false;
};

// Feature 5: Mnaage Skills Search
interface FiltersSkills {
  feLanguages: boolean;
  feFrameworks: boolean;
  beLanguages: boolean;
  beFrameworks: boolean;
  beDbs: boolean;
}
const searchSkillKey = ref('');

const filtersSkills = ref<FiltersSkills>({
	feLanguages: true,
	feFrameworks: true,
	beLanguages: true,
	beFrameworks: true,
	beDbs: true,
}
);

const FILTERS_MAP: Record<keyof FiltersSkills, string> = {
	feLanguages: 'Show Frontend Languages',
	feFrameworks: 'Show Frontend Frameworks',
	beLanguages: 'Show Backend Languages',
	beFrameworks: 'Show Backend Frameworks',
	beDbs: 'Show Backend Databases',
};
const debouncedSkillSearchKey = ref('');
let searchTimeout: ReturnType<typeof setTimeout> | null = null;

const filteredSkillsList = computed(() => {
	return skillsList.value.filter((skill) => {
		return skill.name.toLowerCase().includes(searchSkillKey.value.toLowerCase());
	});
});

const handleSearchInput = (newValue: string) => {
	// Clear the timeout if the user is still typing
	if (searchTimeout) {
		clearTimeout(searchTimeout);
	}

	// Set a new timeout to update the debounced value after 300ms
	searchTimeout = setTimeout(() => {
		searchSkillKey.value = newValue;
	}, 300);
};

watch(debouncedSkillSearchKey, (newValue) => {
	handleSearchInput(newValue);
});
*/
</script>

<template>
  <ThePageContainer>
    <template #intro-section>
      <BaseHero
        :title="skillsPageI18nContent.pageHeading"
      />
    </template>

    <template #page-content>
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
      <!--
      <BaseButton
        variant="secondary"
        class="mt-4 w-fit"
        :icon="CodeBracketSquareIcon"
        @click="handleOpenModal()"
      >
        {{ currentLanguage === 'en' ? `Show Skills`: `Mostra le competenze` }}
      </BaseButton>
      -->
    </template>
  </ThePageContainer>
<!--
  <BaseModal
    :is-open="isModalOpen"
    header-orientation="left"
    :modal-title="currentLanguage === 'en' ? 'Skills' : 'Competenze '"
    :modal-subtitle="currentLanguage === 'en' ? 'List of skills' : 'Lista delle competenze'"
    @close-modal="() => handleCloseModal()"
  >
    <template #modal-content>
      <div class="flex h-full overflow-hidden border border-white">
        <div
          :class="{
            'w-full': activeBreakpoint === 'xs' || activeBreakpoint === 'sm',
            'w-1/3': activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm',
          }"
          class="flex flex-col p-4 transition-all duration-300 ease-in-out transform"
        >
          <BaseInput
            v-model:input-value="searchSkillKey"
            placeholder="Search a specific skill"
            :custom-z-index="60"
            :with-menu="true"
          >
            <template #input-menu-box>
              <div
                class="flex flex-wrap gap-3 p-2 rounded-lg bg-secondary"
              >
                <template
                  v-for="filterKey in (Object.keys(FILTERS_MAP) as (keyof FiltersSkills)[])"
                  :key="filterKey"
                >
                  <BaseToggle
                    v-model:enabled="filtersSkills[filterKey as keyof typeof filtersSkills]"
                    :label="FILTERS_MAP[filterKey]"
                  />
                </template>
              </div>
            </template>
          </BaseInput>
          <div
            ref="SkillsRootRef"
            class="flex flex-col w-full gap-4 mt-8 overflow-y-auto"
          >
            <BaseDiv
              v-for="(skill, index) in filteredSkillsList"
              :key="index"
              class="p-4 bg-white rounded-full "
              :intersection-observer-settings="{root: SkillsRootRef, threshold: 0.4, visibilityCss: 'fade-and-slide'}"
            >
              {{ skill.name }}
            </BaseDiv>
          </div>
        </div>
        <transition name="fade">
          <div
            v-if="activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm'"
            class="w-2/3 bg-slate-400"
          >
            <p class="text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget
            </p>
          </div>
        </transition>
      </div>
    </template>
  </BaseModal>
  -->
</template>