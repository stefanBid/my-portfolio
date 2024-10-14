<script setup lang="ts">
import { PhotoIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline';
import { XMarkIcon } from '@heroicons/vue/24/solid';
import { computed, ref } from 'vue';

import { SKILLS_ICONS_MAP } from '@/assets';
import { BaseDiv, BaseLevelBar } from '@/components';
import { useCommonStyleSingleton, useTypedI18nSingleton } from '@/hooks';
import type { SkillInfo } from '@/types';

interface SkillCardProps {
  rootElement: HTMLElement | null;
  skill: SkillInfo
}

const props = defineProps<SkillCardProps>();

// Feature 0: Manage Style Classes
const { textSizeM, textSizeS, activeBreakpoint } = useCommonStyleSingleton();

// Feature 1: Manage I18n
const { currentLanguage } = useTypedI18nSingleton();

const detailsPanelIsOpen = ref(false);
const ratingsKeys = ref(Object.keys(props.skill.overAllRating) as Array<keyof typeof props.skill.overAllRating>);
const paginationIndex = ref(0);

const changeVisibilityOfDetailsPanel = (newVisibility: boolean) => {
	if (newVisibility === detailsPanelIsOpen.value) { return; }
	detailsPanelIsOpen.value = newVisibility;
	paginationIndex.value = 0;
};

const getSkillValutationAverage = computed(() => {
	const total = ratingsKeys.value.reduce((acc, key) => {
		const ratingValue = props.skill.overAllRating[key]?.value ?? 0;
		return acc + ratingValue;
	}, 0);
	const average = total / 5;
	return average.toFixed(1);
});

const getPaginatedSkillRating = computed(() => {
	return ratingsKeys.value.slice(paginationIndex.value * 2, (paginationIndex.value + 1) * 2);

});
</script>

<template>
  <BaseDiv
    :id="props.skill.id"
    class="cursor-pointer w- flex flex-col transition-all duration-500 ease-in-out hover:shadow-[0_0_10px_3px_rgba(66,74,110,0.8)] box-border relative overflow-hidden border-2 rounded-lg bg-sb-secondary-200   border-sb-secondary-100"
    :class="{
      'w-80 h-64': activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm' && activeBreakpoint !== 'md',
      'w-72 h-60': activeBreakpoint === 'md',
      'w-64 h-56': activeBreakpoint === 'xs' || activeBreakpoint === 'sm',
    }"
    :intersection-observer-settings="{ root: props.rootElement, threshold: 0.35, visibilityCss: 'fade' }"
    @click.stop="changeVisibilityOfDetailsPanel(true)"
  >
    <div class="absolute flex flex-col items-center justify-between w-full h-full p-4">
      <h4
        :class="[textSizeM]"
        class="font-medium z-[2] text-white font-roboto transition-all duration-300 ease-in-out"
      >
        {{ props.skill.name }}
      </h4>
      <component
        :is="props.skill.icon? SKILLS_ICONS_MAP[props.skill.icon] : PhotoIcon"
        :class="{
          'text-white': !props.skill.icon,
          'size-20': activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm' && activeBreakpoint !== 'md',
          'size-16': activeBreakpoint === 'md',
          'size-14': activeBreakpoint === 'xs' || activeBreakpoint === 'sm',
        }
        "
        class="my-4 transition-all duration-500 ease-in-out shrink-0"
      />
      <span
        :class="[textSizeS]"
        class="text-white font-roboto"
      >
        {{ currentLanguage === 'en' ? 'Skill level: ' : 'Livello di competenza: ' }}
        <span
          :class="[textSizeM]"
          class="font-medium "
        >{{ getSkillValutationAverage }}</span>
      </span>
    </div>
    <transition name="slide-fade">
      <div
        v-if="detailsPanelIsOpen"
        class="absolute px-4 pb-4 pt-[75px]  z-[1] w-full h-full flex flex-col bg-sb-secondary-100 border-2 border-sb-secondary-100"
      >
        <XMarkIcon
          class="absolute text-white transition-all duration-500 ease-in-out cursor-pointer top-4 right-4 hover:rotate-90"
          :class="{
            'size-6': activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm' && activeBreakpoint !== 'md',
            'size-5': activeBreakpoint === 'md',
            'size-4': activeBreakpoint === 'xs' || activeBreakpoint === 'sm',
          }"
          @click.stop="changeVisibilityOfDetailsPanel(false)"
        />
        <div class="flex flex-col flex-1 gap-y-5">
          <BaseLevelBar
            v-for="rating in getPaginatedSkillRating"
            :key="rating"
            scale="decimal"
            :label="props.skill.overAllRating[rating]?.name ?? ''"
            :level="props.skill.overAllRating[rating]?.value ?? 0"
          />
        </div>
        <div class="inline-flex items-center justify-end gap-x-2">
          <ChevronLeftIcon
            :class="{
              'size-6': activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm' && activeBreakpoint !== 'md',
              'size-5': activeBreakpoint === 'md',
              'size-4': activeBreakpoint === 'xs' || activeBreakpoint === 'sm',
              'cursor-pointer hover:text-sb-tertiary-200': paginationIndex > 0,
              'pointer-events-none opacity-30': paginationIndex === 0,
            }"
            class="text-white transition-all duration-300 ease-in-out"
            @click.stop="paginationIndex -= 1"
          />
          <ChevronRightIcon
            :class="{
              'size-6': activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm' && activeBreakpoint !== 'md',
              'size-5': activeBreakpoint === 'md',
              'size-4': activeBreakpoint === 'xs' || activeBreakpoint === 'sm',
              'cursor-pointer hover:text-sb-tertiary-200': paginationIndex < Math.ceil(ratingsKeys.length / 2) - 1,
              'pointer-events-none opacity-30': paginationIndex === Math.ceil(ratingsKeys.length / 2) - 1,
            }"
            class="text-white transition-all duration-300 ease-in-out"
            @click.stop="paginationIndex += 1"
          />
        </div>
      </div>
    </transition>
  </BaseDiv>
</template>

<style scoped>
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(100%);
}

.slide-fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.slide-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
</style>