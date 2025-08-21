<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import MdiCloseThick from '~icons/mdi/close-thick';
import FluentEmojiFlatSportsMedal from '~icons/fluent-emoji-flat/sports-medal';
import MdiKeyboardArrowRight from '~icons/mdi/keyboard-arrow-right';
import MdiKeyboardArrowLeft from '~icons/mdi/keyboard-arrow-left';
import SkillDots from '@/pages/skills-page/components/SkillDots.vue';
import { BaseLevelBar, BaseButton, BaseIcon } from '@/components';
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

const paginationIndex = ref(0);

const changeVisibilityOfDetailsPanel = (newVisibility: boolean): void => {
  if (newVisibility === detailsPanelIsOpen.value) {
    return;
  }
  detailsPanelIsOpen.value = newVisibility;
  paginationIndex.value = 0;
};

const getSkillValutationAverage = computed(() => {
  const total = props.skill.stats.reduce((acc, stat) => {
    return acc + (stat.value ?? 0);
  }, 0);
  const average = total / props.skill.stats.length;
  return Number(average.toFixed(1));
});

const getPaginatedSkillRating = computed(() => {
  if (styleStore.activeBreakpoint === 'xs') {
    return props.skill.stats.slice(paginationIndex.value, paginationIndex.value + 1);
  }
  return props.skill.stats.slice(paginationIndex.value * 2, (paginationIndex.value + 1) * 2);
});

const goNext = (): void => {
  if (
    (styleStore.activeBreakpoint !== 'xs' &&
      paginationIndex.value === Math.ceil(props.skill.stats.length / 2) - 1) ||
    (styleStore.activeBreakpoint === 'xs' && paginationIndex.value === props.skill.stats.length - 1)
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
    :tabindex="0"
    class="relative flex flex-col items-center justify-between overflow-hidden transition-all duration-300 ease-in-out border-2 rounded-lg outline-none cursor-pointer group bg-sb-secondary-300 border-sb-secondary-200 ring-0"
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
    <FluentEmojiFlatSportsMedal
      v-if="props.skill.mastered"
      :class="[
        styleStore.iconSizeM,
        {
          '-top-[12px] -left-[16px]':
            styleStore.activeBreakpoint !== 'xs' &&
            styleStore.activeBreakpoint !== 'sm' &&
            styleStore.activeBreakpoint !== 'md',
          '-top-[10px] -left-[13px]': styleStore.activeBreakpoint === 'md',
          '-top-[8px] -left-[9px]':
            styleStore.activeBreakpoint === 'xs' || styleStore.activeBreakpoint === 'sm',
        },
      ]"
      class="fixed text-sb-tertiary-200 z-sb-base-3 -rotate-12"
    />
    <h4
      :class="[styleStore.textSizeM]"
      class="font-medium text-white transition-all duration-300 ease-in-out z-sb-base-3 font-roboto"
    >
      {{ props.skill.name }}
    </h4>
    <BaseIcon
      v-if="props.skill.icon"
      :icon="props.skill.icon"
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
    <div
      :class="[styleStore.textSizeS]"
      class="flex flex-col gap-1.5 text-white font-roboto items-center"
    >
      {{ i18nStore.currentLanguage === 'en' ? 'Skill level' : 'Livello di competenza' }}
      <SkillDots :value="getSkillValutationAverage" />
    </div>

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
        class="absolute top-0 flex flex-col w-full h-full transition-all duration-300 ease-in-out z-sb-base-2 bg-sb-secondary-300"
      >
        <BaseButton
          :class="{
            'top-5 right-4':
              styleStore.activeBreakpoint !== 'xs' &&
              styleStore.activeBreakpoint !== 'sm' &&
              styleStore.activeBreakpoint !== 'md',
            'top-4 right-3': styleStore.activeBreakpoint === 'md',
            'top-3.5 right-2.5':
              styleStore.activeBreakpoint === 'xs' || styleStore.activeBreakpoint === 'sm',
          }"
          class="absolute text-white border border-transparent rounded-md w-fit h-fit hover:rotate-90 focus-visible:border-white"
          size="custom"
          variant="custom"
          :aria-label="`close ${props.skill.name} details panel`"
          @click.stop="changeVisibilityOfDetailsPanel(false)"
        >
          <MdiCloseThick :class="[styleStore.iconSizeXS]" class="stroke-[2.5px]" />
        </BaseButton>
        <div
          :class="[styleStore.elementTotalGapS]"
          class="flex flex-col justify-center flex-1 transition-all duration-300 ease-in-out"
        >
          <BaseLevelBar
            v-for="rating in getPaginatedSkillRating"
            :key="rating.name"
            scale="5-base"
            :label="rating.name ?? ''"
            :level="rating.value ?? 0"
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
            :icon="MdiKeyboardArrowLeft"
            @click.stop="goPrevious"
          />
          <BaseButton
            aria-label="click to go to next paginated skill rating elements"
            variant="white"
            size="small"
            :disabled="
              (styleStore.activeBreakpoint !== 'xs' &&
                paginationIndex === Math.ceil(props.skill.stats.length / 2) - 1) ||
              (styleStore.activeBreakpoint === 'xs' &&
                paginationIndex === props.skill.stats.length - 1)
            "
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
