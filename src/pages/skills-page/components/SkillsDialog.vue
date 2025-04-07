<script setup lang="ts">
import { CursorArrowRaysIcon } from '@heroicons/vue/24/solid';
import { computed, ref, watch } from 'vue';

import {
  TheDivider,
  BaseDialog,
  BaseInput,
  BaseSwitch,
  BaseInfiniteScroll,
  SkillCardSkeleton,
} from '@/components';
import { useI18nStore, useStyleStore } from '@/stores';
import type { SkillInfo, SkillType } from '@/types';

import SkillCard from '@/pages/skills-page/components/SkillCard.vue';

interface SkillsModalProps {
  isModalOpen: boolean;
  handleCloseModal: (falsyValue: false) => void;
}

const props = defineProps<SkillsModalProps>();

// Store Declarations
const styleStore = useStyleStore();
const i18nStore = useI18nStore();

// Feature 1: Manage Skills Filters
const searchSkillKey = ref('');
const debouncedSearchSkillKey = ref('');

const filters = ref<Record<SkillType, boolean>>({
  feLanguage: true,
  beLanguage: true,
  feFramework: true,
  beFramework: true,
  beDb: true,
});

const getFiltersLabel = computed<Record<SkillType, string>>(() => {
  if (i18nStore.currentLanguage === 'en') {
    return {
      feLanguage: 'Show Frontend Language',
      beLanguage: 'Show Backend Language',
      feFramework: 'Show Frontend Framework',
      beFramework: 'Show Backend Framework',
      beDb: 'Show Backend Database',
    };
  } else {
    return {
      feLanguage: 'Visualizza Frontend Language',
      beLanguage: 'Visualizza Backend Language',
      feFramework: 'Visualizza Frontend Framework',
      beFramework: 'Visualizza Backend Framework',
      beDb: 'Visualizza Backend Database',
    };
  }
});

const skillsList = computed(() => i18nStore.skillsPageI18nContent.skillsList);

const filteredSkillsList = computed<SkillInfo[]>(() => {
  return skillsList.value.filter(
    (skill) =>
      (debouncedSearchSkillKey.value === '' ||
        skill.name.toLowerCase().includes(debouncedSearchSkillKey.value.toLowerCase())) &&
      filters.value[skill.type],
  );
});

watch(
  () => props.isModalOpen,
  (newValue) => {
    if (newValue) {
      searchSkillKey.value = '';
      debouncedSearchSkillKey.value = '';
      filters.value = {
        feLanguage: true,
        beLanguage: true,
        feFramework: true,
        beFramework: true,
        beDb: true,
      };
    }
  },
);

watch(
  () => searchSkillKey.value,
  (newValue) => {
    setTimeout(() => {
      debouncedSearchSkillKey.value = newValue;
    }, 300);
  },
  {},
);
</script>

<template>
  <BaseDialog
    :is-open="isModalOpen"
    header-orientation="left"
    block-dialog-height
    :dialog-title="i18nStore.skillsPageI18nContent.skillsDialog.title"
    :on-close-dialog="(falsyValue) => props.handleCloseModal(falsyValue)"
  >
    <template #modal-content>
      <div
        :class="[
          styleStore.elementTotalGapM,
          {
            'pt-2.5': styleStore.activeBreakpoint === 'xs' || styleStore.activeBreakpoint === 'sm',
            'pt-3': styleStore.activeBreakpoint === 'md',
            'pt-4':
              styleStore.activeBreakpoint !== 'xs' &&
              styleStore.activeBreakpoint !== 'sm' &&
              styleStore.activeBreakpoint !== 'md',
          },
        ]"
        class="flex flex-col items-center w-full h-full overflow-hidden"
      >
        <div
          :class="{
            'w-4/6':
              styleStore.activeBreakpoint !== 'xs' &&
              styleStore.activeBreakpoint !== 'sm' &&
              styleStore.activeBreakpoint !== 'md',
            'w-5/6': styleStore.activeBreakpoint === 'md',
            'w-full': styleStore.activeBreakpoint === 'xs' || styleStore.activeBreakpoint === 'sm',
          }"
          class="px-2"
        >
          <BaseInput
            id="searchSkillKey"
            v-model:input-value="searchSkillKey"
            name="search_skill_key"
            aria-label="search skill key"
            type="search"
            :label="i18nStore.skillsPageI18nContent.skillsDialog.searchField.label"
            :placeholder="i18nStore.skillsPageI18nContent.skillsDialog.searchField.placeholder"
            with-menu
          >
            <template #input-menu-box>
              <div
                class="grid h-fit"
                :class="[
                  styleStore.elementTotalGapS,
                  styleStore.elementTotalPaddingS,
                  {
                    'grid-cols-2': styleStore.activeBreakpoint !== 'xs',
                    'grid-cols-1': styleStore.activeBreakpoint === 'xs',
                  },
                ]"
              >
                <div
                  v-for="(_, filterKey) in filters"
                  :key="filterKey"
                  class="inline-flex items-center w-full"
                >
                  <BaseSwitch
                    v-model:enabled="filters[filterKey]"
                    :label="getFiltersLabel[filterKey]"
                  />
                </div>
              </div>
            </template>
          </BaseInput>
        </div>
        <div class="inline-flex items-center justify-center w-full gap-2 text-white animate-pulse">
          <CursorArrowRaysIcon :class="[styleStore.iconSizeXS]" class="shrink-0" />
          <span
            :class="[styleStore.textSizeXS]"
            class="text-justify text-white transition-all duration-300 ease-in-out font-roboto text-shadow-luminous"
          >
            {{ i18nStore.skillsPageI18nContent.skillsDialog.info }}
          </span>
        </div>
        <BaseInfiniteScroll
          :items="filteredSkillsList"
          :initial-count="6"
          :batch-size="3"
          :no-data-message="
            i18nStore.currentLanguage === 'en'
              ? 'No skills found !'
              : 'Nessuna competenza trovata !'
          "
        >
          <template #default="{ item: skill, containerRootRef: skillContainerRef }">
            <TheDivider
              :intersection-observer-settings="{
                rootElement: skillContainerRef,
                threshold: 0.25,
              }"
              animation="scaleAndFade"
            >
              <SkillCard :skill="skill" />
            </TheDivider>
          </template>
          <template #loading-section>
            <div
              :class="[
                styleStore.elementTotalGapM,
                {
                  'grid-cols-1':
                    styleStore.activeBreakpoint === 'xs' || styleStore.activeBreakpoint === 'sm',
                  'grid-cols-2':
                    styleStore.activeBreakpoint === 'md' || styleStore.activeBreakpoint === 'lg',
                  'grid-cols-3':
                    styleStore.activeBreakpoint !== 'xs' &&
                    styleStore.activeBreakpoint !== 'sm' &&
                    styleStore.activeBreakpoint !== 'md' &&
                    styleStore.activeBreakpoint !== 'lg',
                },
              ]"
              class="grid"
            >
              <SkillCardSkeleton v-for="_ in 3" />
            </div>
          </template>
        </BaseInfiniteScroll>
      </div>
    </template>
  </BaseDialog>
</template>
