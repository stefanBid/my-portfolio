<script setup lang="ts">

import { vIntersectionObserver } from '@vueuse/components';
import { onMounted, ref } from 'vue';

import { ICONS_MAP, type CustomIcon } from '@/assets';
import { IntroSection, ThePageContainer, TheDataListContainer, BaseCard } from '@/components';
import BaseInput from '@/components/base/input/BaseInput.vue';
import PageUnderConstructionAlert from '@/components/temp/page-under-construction-alert/PageUnderConstructionAlert.vue';
import { useTypedI18nSingleton } from '@/hooks';

// Feature 0: Internationalization (i18n)
const { currentLanguage } = useTypedI18nSingleton();

// Feature 2: Manage Skills

const feSkills = [
	{
		id: '1',
		name: 'Angular',
		icon: 'AngularIcon',
	},
	{
		id: '2',
		name: 'Vue',
		icon: 'VueIcon',
	},
	{
		id: '3',
		name: 'React',
		icon: 'ReactIcon',
	},
	{
		id: '4',
		name: 'TypeScript',
		icon: 'TsIcon',
	},
	{
		id: '5',
		name: 'JavaScript',
		icon: 'JsIcon',
	},
	{
		id: '6',
		name: 'Html',
		icon: 'HtmlIcon',
	},
	{
		id: '7',
		name: 'Css',
		icon: 'CssIcon',
	},
	{
		id: '8',
		name: 'Sass',
		icon: 'SassIcon',
	},
	{
		id: '9',
		name: 'Tailwind',
		icon: 'TailwindIcon',
	},

] as { id:string, name: string; icon: string }[];

const key = ref('');

// Feature 3: Manage Visibility for effects
const root = ref();
const skillsRoot = ref();

const alertVisibility = ref(new Map<string, boolean>());
const skillsVisibilityMap = ref(new Map<string, boolean>());

const onIntersectionObserverAlert = () => ([{ isIntersecting }]: IntersectionObserverEntry[]) => {
	alertVisibility.value.set('page-under-construction', isIntersecting);
};

const onIntersectionObserverSkills = (id: string) => ([{ isIntersecting }]: IntersectionObserverEntry[]) => {
	skillsVisibilityMap.value.set(id, isIntersecting);
};

onMounted(() => {
	alertVisibility.value.set('page-under-construction', false);
	feSkills.forEach((skill) => {
		skillsVisibilityMap.value.set(skill.id, false);
	});
});
</script>

<template>
  <ThePageContainer
    ref="root"
  >
    <template #intro-section>
      <IntroSection
        :title="currentLanguage === 'en' ? 'Get to know me!' : 'Conoscimi meglio!'"
      />
    </template>

    <template #main-content>
      <PageUnderConstructionAlert
        v-intersection-observer="[onIntersectionObserverAlert(), {root, threshold: 0.5}]"
        class="transition-all duration-500 ease-in-out"
        :class="{
          'opacity-0': !alertVisibility.get('page-under-construction'),
          'opacity-100': alertVisibility.get('page-under-construction'),
        }"
      />
      <div class="flex justify-center">
        <TheDataListContainer :height-px="900">
          <template #left-side-header>
            <BaseInput
              v-model:input-value="key"
              with-menu
              placeholder="Search a skill"
            />
          </template>
          <template #left-side>
            <div
              ref="skillsRoot"
              class="flex flex-col h-full pr-2 overflow-y-auto gap-y-6"
            >
              <BaseCard
                v-for="skill in [...feSkills, ...feSkills]"
                :key="skill.id"
                v-intersection-observer="[onIntersectionObserverSkills(skill.id), {root: skillsRoot, threshold: 0.5}]"
                :class="{
                  'opacity-0 w-0': !skillsVisibilityMap.get(skill.id),
                  'opacity-100 w-full': skillsVisibilityMap.get(skill.id),
                }"
                :icon="ICONS_MAP[skill.icon as CustomIcon]"
                :text-content="skill.name"
              />
            </div>
          </template>
          <template #right-side></template>
        </TheDataListContainer>
      </div>
    </template>
  </ThePageContainer>
</template>