<script setup lang="ts">
import { computed, ref } from 'vue';

import { useLocaleStore } from '@/stores';
import type { Skill } from '@/types';

import { Icon } from '@iconify/vue';

import BaseButton from '@/components/base/button/BaseButton.vue';
import BaseLevelBar from '@/components/base/level-bar/BaseLevelBar.vue';

import SkillDots from '@/pages/skills-page/components/skill-card/SkillDots.vue';

import MdiCloseThick from '~icons/mdi/close-thick';
import FluentEmojiFlatSportsMedal from '~icons/fluent-emoji-flat/sports-medal';
import MdiKeyboardArrowRight from '~icons/mdi/keyboard-arrow-right';
import MdiKeyboardArrowLeft from '~icons/mdi/keyboard-arrow-left';

interface SkillCardProps {
  skill: Skill;
}

const props = defineProps<SkillCardProps>();

// Store Declarations
const lStore = useLocaleStore();

const detailsPanelIsOpen = ref(false);

const paginationIndex = ref(0);

const changeVisibilityOfDetailsPanel = (newVisibility: boolean): void => {
  if (newVisibility === detailsPanelIsOpen.value) {
    return;
  }
  detailsPanelIsOpen.value = newVisibility;
  paginationIndex.value = 0;
};

const getSkillValutationAverage = computed(() => {
  const total = props.skill.overall.reduce((acc, stat) => {
    return acc + (stat.level ?? 0);
  }, 0);
  const average = total / props.skill.overall.length;
  return Number(average.toFixed(1));
});

const getPaginatedSkillRating = computed(() => {
  return props.skill.overall.slice(paginationIndex.value * 2, (paginationIndex.value + 1) * 2);
});

const goNext = (): void => {
  if (paginationIndex.value === Math.ceil(props.skill.overall.length / 2) - 1) {
    return;
  }
  paginationIndex.value += 1;
};

const goPrevious = (): void => {
  if (paginationIndex.value === 0) {
    return;
  }
  paginationIndex.value -= 1;
};
</script>

<template>
  <div
    :tabindex="0"
    class="relative tot-pad-s h-52 sm:h-56 md:h-56 lg:h-64 flex flex-col items-center justify-between overflow-hidden transition-all duration-300 ease-in-out border-2 rounded-lg outline-none cursor-pointer group bg-sb-secondary-300 border-sb-secondary-200 ring-0"
    :class="[
      {
        'hover:shadow-sb-ring-sm hover:shadow-sb-secondary-200 focus-visible:shadow-sb-ring-sm focus-visible:shadow-sb-secondary-200':
          !detailsPanelIsOpen,
      },
    ]"
    @keydown.enter="changeVisibilityOfDetailsPanel(true)"
    @click="changeVisibilityOfDetailsPanel(true)"
  >
    <FluentEmojiFlatSportsMedal
      v-if="props.skill.isGod"
      class="fixed text-sb-tertiary-200 z-[300] -rotate-12 icon-size-m -top-[8px] -left-[9px] sm:-top-[10px] sm:-left-[13px] md:-top-[10px] md:-left-[13px] lg:-top-[12px] lg:-left-[16px]"
    />
    <h4
      class="font-medium text-white transition-all duration-300 ease-in-out z-[300] font-roboto text-size-m"
    >
      {{ props.skill.name }}
    </h4>
    <Icon
      v-if="props.skill.icon"
      :icon="props.skill.icon"
      class="transition-all duration-300 ease-in-out shrink-0 icon-size-xl my-2.5 sm:my-3 md:my-3 lg:my-4"
    />
    <div class="flex flex-col gap-1.5 text-white font-roboto items-center text-size-s">
      {{ lStore.t('skillsPage.skillCard') }}
      <SkillDots :value="getSkillValutationAverage" />
    </div>

    <transition name="slide-fade">
      <div
        v-if="detailsPanelIsOpen"
        class="absolute p-2.5 sm:p-3 md:p-3 lg:p-4 top-0 flex flex-col w-full h-full transition-all duration-300 ease-in-out z-[200] bg-sb-secondary-300"
      >
        <BaseButton
          class="absolute top-3.5 right-2.5 sm:top-4 sm:right-3 md:top-4 md:rigt-3 lg:top-5 lg:right-4 text-white border border-transparent rounded-md w-fit h-fit hover:rotate-90 focus-visible:border-white"
          size="custom"
          variant="custom"
          :aria-label="`close ${props.skill.name} details panel`"
          @click.stop="changeVisibilityOfDetailsPanel(false)"
        >
          <MdiCloseThick class="stroke-[2.5px] icon-size-xs" />
        </BaseButton>
        <div
          class="flex flex-col justify-center flex-1 transition-all duration-300 ease-in-out tot-gap-s pt-6 sm:pt-7 md:pt-7 lg:pt-8"
        >
          <BaseLevelBar
            v-for="rating in getPaginatedSkillRating"
            :key="rating.name"
            scale="5-base"
            :label="rating.name ?? ''"
            :level="rating.level ?? 0"
          />
        </div>
        <div
          class="inline-flex items-center justify-end transition-all duration-300 ease-in-out tot-gap-s"
        >
          <BaseButton
            aria-label="click to go to previous paginated skill rating elements"
            variant="white"
            size="small"
            :disabled="paginationIndex === 0"
            :icon="MdiKeyboardArrowLeft"
            @click.stop="goPrevious"
          />
          <BaseButton
            aria-label="click to go to next paginated skill rating elements"
            variant="white"
            size="small"
            :disabled="paginationIndex === Math.ceil(props.skill.overall.length / 2) - 1"
            :icon="MdiKeyboardArrowRight"
            @click.stop="goNext"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
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
