<script setup lang="ts">
import { PhotoIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline';
import { XMarkIcon } from '@heroicons/vue/24/solid';
import { vIntersectionObserver } from '@vueuse/components';
import { computed, ref, watch } from 'vue';

import { SKILLS_ICONS_MAP } from '@/assets';
import { BaseLevelBar, BaseButton } from '@/components';
import type { SkillInfo } from '@/types';
import { useI18nStore, useStyleStore } from '@/stores';

interface SkillCardProps {
  rootElement: HTMLElement | null;
  skill: SkillInfo;
}

const props = defineProps<SkillCardProps>();

// Store Declarations
const styleStore = useStyleStore();
const i18nStore = useI18nStore();

// Manage Intersection Observer
const isVisible = ref(false);

const onIntersectionObserver = ([{ isIntersecting }]: IntersectionObserverEntry[]): void => {
  if (isIntersecting !== isVisible.value) {
    isVisible.value = isIntersecting;
  }
};

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
    v-intersection-observer="[onIntersectionObserver, { root: props.rootElement, threshold: 0.35 }]"
    class="relative flex flex-col items-center justify-between p-4 overflow-hidden border-2 rounded-lg outline-none cursor-pointer transition-sb-slow bg-sb-secondary-300 border-sb-secondary-200 ring-0"
    :class="{
      'w-80 h-64':
        styleStore.activeBreakpoint !== 'xs' &&
        styleStore.activeBreakpoint !== 'sm' &&
        styleStore.activeBreakpoint !== 'md',
      'w-72 h-60': styleStore.activeBreakpoint === 'md',
      'w-64 h-56': styleStore.activeBreakpoint === 'xs' || styleStore.activeBreakpoint === 'sm',
      'opacity-0': !isVisible,
      'opacity-100': isVisible,
      'hover:shadow-sb-ring-sm hover:shadow-sb-secondary-200 focus-visible:shadow-sb-ring-sm focus-visible:shadow-sb-secondary-200':
        !detailsPanelIsOpen,
    }"
    :tabindex="isVisible ? 0 : -1"
    @keydown.enter="changeVisibilityOfDetailsPanel(true)"
    @click="changeVisibilityOfDetailsPanel(true)"
  >
    <h4
      :class="[styleStore.textSizeM]"
      class="font-medium text-white z-sb-base-3 font-roboto transition-sb-slow"
    >
      {{ props.skill.name }}
    </h4>
    <component
      :is="props.skill.icon ? SKILLS_ICONS_MAP[props.skill.icon] : PhotoIcon"
      :class="[
        styleStore.iconSizeXL,
        {
          'text-white': !props.skill.icon,
        },
      ]"
      class="my-4 transition-sb-slow shrink-0"
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
        class="absolute top-0 w-full h-full px-2 pb-2 pt-[45px] z-sb-base-2 flex flex-col bg-sb-secondary-200"
      >
        <BaseButton
          class="absolute text-white w-fit h-fit hover:rotate-90 top-2 right-2"
          content-size="small"
          spacing-size="custom"
          variant="custom"
          :icon="XMarkIcon"
          @click.stop="changeVisibilityOfDetailsPanel(false)"
        />
        <div class="flex flex-col justify-center flex-1 gap-y-5">
          <BaseLevelBar
            v-for="rating in getPaginatedSkillRating"
            :key="rating"
            scale="decimal"
            :label="props.skill.overAllRating[rating]?.name ?? ''"
            :level="props.skill.overAllRating[rating]?.value ?? 0"
          />
        </div>
        <div class="inline-flex items-center justify-end gap-x-4">
          <BaseButton
            class="text-white border-2 w-fit h-fit"
            :class="{
              'cursor-pointer hover:text-sb-tertiary-200 focus-visible:text-sb-tertiary-200':
                paginationIndex > 0,
              'pointer-events-none opacity-30': paginationIndex === 0,
            }"
            variant="custom"
            content-size="small"
            spacing-size="small"
            :icon="ChevronLeftIcon"
            @click.stop="() => goPrevious()"
          />
          <BaseButton
            class="text-white border-2 w-fit h-fit"
            :class="{
              'cursor-pointer hover:text-sb-tertiary-200 focus-visible:text-sb-tertiary-200':
                (styleStore.activeBreakpoint !== 'xs' &&
                  paginationIndex < Math.ceil(ratingsKeys.length) - 1) ||
                (styleStore.activeBreakpoint === 'xs' && paginationIndex < ratingsKeys.length - 1),
              'pointer-events-none opacity-30':
                (styleStore.activeBreakpoint !== 'xs' &&
                  paginationIndex === Math.ceil(ratingsKeys.length / 2) - 1) ||
                (styleStore.activeBreakpoint === 'xs' &&
                  paginationIndex === ratingsKeys.length - 1),
            }"
            variant="custom"
            content-size="small"
            spacing-size="small"
            :icon="ChevronRightIcon"
            @click.stop="() => goNext()"
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
