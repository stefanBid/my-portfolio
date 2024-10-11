<script setup lang="ts">
import { PhotoIcon } from '@heroicons/vue/24/outline';
import { computed, ref } from 'vue';

import { SKILLS_ICONS_MAP } from '@/assets';
import { BaseDiv } from '@/components';
import { useCommonStyleSingleton } from '@/hooks';
import type { SkillInfo } from '@/types';

interface SkillCardProps {
  rootElement: HTMLElement | null;
  skill: SkillInfo
}

const props = defineProps<SkillCardProps>();

// Feature 0: Manage Style Classes
const { textSizeM, textSizeS, activeBreakpoint } = useCommonStyleSingleton();

const detailsPanelIsOpen = ref(false);

const changeVisibilityOfDetailsPanel = (newVisibility: boolean) => {
	if (newVisibility === detailsPanelIsOpen.value) { return; }
	detailsPanelIsOpen.value = newVisibility;
};

const getSkillValutationAverage = computed(() => {
	const ratings = props.skill.overAllRating;
	const total = ratings.syntaxAndSemantics + ratings.librariesAndFrameworks + ratings.debuggingAndProblemSolving + ratings.bestPracticesAndDesignPatterns + ratings.practicalExperience;
	const average = total / 5;
	return average.toFixed(1);
});

</script>

<template>
  <BaseDiv
    :id="props.skill.id"
    class="cursor-pointer w- flex flex-col transition-all duration-500 ease-in-out hover:shadow-[0_0_10px_3px_rgba(66,74,110,0.8)] box-border relative overflow-hidden border-2 rounded-lg bg-sb-secondary-200   border-sb-secondary-100"
    :class="{
      'w-72 h-60': activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm' && activeBreakpoint !== 'md',
      'w-64 h-56': activeBreakpoint === 'md',
      'w-60 h-52': activeBreakpoint === 'xs' || activeBreakpoint === 'sm',
    }"
    :intersection-observer-settings="{ root: props.rootElement, threshold: 0.35, visibilityCss: 'fade' }"
    @click="changeVisibilityOfDetailsPanel(!detailsPanelIsOpen)"
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
        class="text-white text-sb-base font-roboto"
      >
        Skill level:
        <span
          :class="[textSizeM]"
          class="font-medium text-sb-lg"
        >{{ getSkillValutationAverage }}</span>
      </span>
    </div>
    <transition name="slide-fade">
      <div
        v-if="detailsPanelIsOpen"
        class="absolute z-[1] w-full h-full bg-sb-secondary-100"
      >
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