<script setup lang="ts">
import { PhotoIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline';
import { XMarkIcon } from '@heroicons/vue/24/solid';
import { computed, ref, watch } from 'vue';

import { SKILL_ICONS } from '@/constants';
import { BaseLevelBar, BaseButton } from '@/components';
import type { SkillInfo } from '@/types';
import { useI18nStore, useStyleStore } from '@/stores';

interface SkillCardProps {
  skill: SkillInfo;
}

const props = defineProps<SkillCardProps>();

// Store Declarations
const styleStore = useStyleStore();
const i18nStore = useI18nStore();

const detailsPanelIsOpen = ref(false);
const ratingsKeys = ref(
  Object.keys(props.skill.overAllRating) as Array<keyof typeof props.skill.overAllRating>,
);
const paginationIndex = ref(0);

const changeVisibilityOfDetailsPanel = (newVisibility: boolean): void => {
  if (newVisibility === detailsPanelIsOpen.value) {
    return;
  }
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
  if (styleStore.activeBreakpoint === 'xs') {
    return ratingsKeys.value.slice(paginationIndex.value, paginationIndex.value + 1);
  }
  return ratingsKeys.value.slice(paginationIndex.value * 2, (paginationIndex.value + 1) * 2);
});

const goNext = (): void => {
  if (
    (styleStore.activeBreakpoint !== 'xs' &&
      paginationIndex.value === Math.ceil(ratingsKeys.value.length / 2) - 1) ||
    (styleStore.activeBreakpoint === 'xs' && paginationIndex.value === ratingsKeys.value.length - 1)
  ) {
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

watch(
  () => styleStore.activeBreakpoint,
  (oldValue, newValue) => {
    if (oldValue === 'xs' || newValue === 'xs') {
      paginationIndex.value = 0;
    }
  },
);
</script>

<template>
  <div
    :id="props.skill.id"
    class="relative flex flex-col items-center justify-between overflow-hidden transition-all duration-300 ease-in-out border-2 rounded-lg outline-none cursor-pointer bg-sb-secondary-300 border-sb-secondary-200 ring-0"
    :class="[
      styleStore.elementTotalPaddingS,
      {
        'h-64':
          styleStore.activeBreakpoint !== 'xs' &&
          styleStore.activeBreakpoint !== 'sm' &&
          styleStore.activeBreakpoint !== 'md',
        'h-56': styleStore.activeBreakpoint === 'md',
        'h-52': styleStore.activeBreakpoint === 'xs' || styleStore.activeBreakpoint === 'sm',
        'hover:shadow-sb-ring-sm hover:shadow-sb-secondary-200 focus-visible:shadow-sb-ring-sm focus-visible:shadow-sb-secondary-200':
          !detailsPanelIsOpen,
      },
    ]"
    @keydown.enter="changeVisibilityOfDetailsPanel(true)"
    @click="changeVisibilityOfDetailsPanel(true)"
  >
    <h4
      :class="[styleStore.textSizeM]"
      class="font-medium text-white transition-all duration-300 ease-in-out z-sb-base-3 font-roboto"
    >
      {{ props.skill.name }}
    </h4>
    <component
      :is="props.skill.icon ? SKILL_ICONS[props.skill.icon] : PhotoIcon"
      :class="[
        styleStore.iconSizeXL,
        {
          'text-white': !props.skill.icon,
          'my-4':
            styleStore.activeBreakpoint !== 'xs' &&
            styleStore.activeBreakpoint !== 'sm' &&
            styleStore.activeBreakpoint !== 'md',
          'my-3': styleStore.activeBreakpoint === 'md',
          'my-2.5': styleStore.activeBreakpoint === 'xs' || styleStore.activeBreakpoint === 'sm',
        },
      ]"
      class="transition-all duration-300 ease-in-out shrink-0"
    />
    <span :class="[styleStore.textSizeS]" class="text-center text-white font-roboto">
      {{ i18nStore.currentLanguage === 'en' ? 'Skill level: ' : 'Livello di competenza: ' }}
      <span :class="[styleStore.textSizeM]" class="font-medium">{{
        getSkillValutationAverage
      }}</span>
    </span>

    <transition name="slide-fade">
      <div
        v-if="detailsPanelIsOpen"
        :class="{
          'px-4 pb-4 pt-[37px]':
            styleStore.activeBreakpoint !== 'xs' &&
            styleStore.activeBreakpoint !== 'sm' &&
            styleStore.activeBreakpoint !== 'md',
          'px-3 pb-3 pt-[41px]': styleStore.activeBreakpoint === 'md',
          'px-2.5 pb-2.5 pt-[43px]':
            styleStore.activeBreakpoint === 'xs' || styleStore.activeBreakpoint === 'sm',
        }"
        class="absolute top-0 flex flex-col w-full h-full transition-all duration-300 ease-in-out z-sb-base-2 bg-sb-secondary-200"
      >
        <BaseButton
          :class="{
            'top-4 right-4':
              styleStore.activeBreakpoint !== 'xs' &&
              styleStore.activeBreakpoint !== 'sm' &&
              styleStore.activeBreakpoint !== 'md',
            'top-3 right-3': styleStore.activeBreakpoint === 'md',
            'top-2.5 right-2.5':
              styleStore.activeBreakpoint === 'xs' || styleStore.activeBreakpoint === 'sm',
          }"
          class="absolute text-white border border-transparent rounded-md w-fit h-fit hover:rotate-90 focus-visible:border-white"
          size="custom"
          variant="custom"
          :aria-label="`close ${props.skill.name} details panel`"
          @click.stop="changeVisibilityOfDetailsPanel(false)"
        >
          <XMarkIcon :class="[styleStore.iconSizeS]" />
        </BaseButton>
        <div
          :class="[styleStore.elementTotalGapS]"
          class="flex flex-col justify-center flex-1 transition-all duration-300 ease-in-out"
        >
          <BaseLevelBar
            v-for="rating in getPaginatedSkillRating"
            :key="rating"
            scale="decimal"
            :label="props.skill.overAllRating[rating]?.name ?? ''"
            :level="props.skill.overAllRating[rating]?.value ?? 0"
          />
        </div>
        <div
          :class="[styleStore.elementTotalGapS]"
          class="inline-flex items-center justify-end transition-all duration-300 ease-in-out"
        >
          <BaseButton
            aria-label="click to go to previous paginated skill rating elements"
            variant="white"
            size="small"
            :disabled="paginationIndex === 0"
            :icon="ChevronLeftIcon"
            @click.stop="goPrevious"
          />
          <BaseButton
            aria-label="click to go to next paginated skill rating elements"
            variant="white"
            size="small"
            :disabled="
              (styleStore.activeBreakpoint !== 'xs' &&
                paginationIndex === Math.ceil(ratingsKeys.length / 2) - 1) ||
              (styleStore.activeBreakpoint === 'xs' && paginationIndex === ratingsKeys.length - 1)
            "
            :icon="ChevronRightIcon"
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
