<script setup lang="ts">
import { FaceFrownIcon, CursorArrowRaysIcon } from '@heroicons/vue/24/solid';
import { computed, ref, watch } from 'vue';

import { BaseDialog, BaseInput, BaseToggle } from '@/components';
import { useI18nStore, useStyleStore } from '@/stores';
import type { SkillInfo, SkillType } from '@/types';

import SkillCard from '@/pages/skills-page/components/SkillCard.vue';

interface SkillsModalProps {
  isModalOpen: boolean;
  handleCloseModal: (falsyValue: false) => void;
}

const props = defineProps<SkillsModalProps>();

const skillContainerRef = ref<HTMLElement | null>(null);

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
    :on-close-modal="(falsyValue) => props.handleCloseModal(falsyValue)"
  >
    <template #modal-content>
      <div class="flex flex-col items-center w-full h-full pt-6 overflow-hidden gap-y-6">
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
            :label="i18nStore.skillsPageI18nContent.skillsDialog.searchField.label"
            :placeholder="i18nStore.skillsPageI18nContent.skillsDialog.searchField.placeholder"
            :custom-z-index="60"
            with-menu
          >
            <template #input-menu-box>
              <div
                class="grid gap-6 p-3 h-fit"
                :class="{
                  'grid-cols-2': styleStore.activeBreakpoint !== 'xs',
                  'grid-cols-1': styleStore.activeBreakpoint === 'xs',
                }"
              >
                <div
                  v-for="(_, filterKey) in filters"
                  :key="filterKey"
                  class="inline-flex items-center w-full"
                >
                  <BaseToggle
                    v-model:enabled="filters[filterKey]"
                    :label="getFiltersLabel[filterKey]"
                  />
                </div>
              </div>
            </template>
          </BaseInput>
        </div>
        <div
          class="inline-flex items-center justify-center w-full text-white gap-x-2 animate-pulse"
        >
          <CursorArrowRaysIcon :class="[styleStore.iconSizeXS]" />
          <span
            :class="[styleStore.textSizeXS]"
            class="text-white transition-sb-slow font-roboto text-shadow-luminous"
          >
            {{ i18nStore.skillsPageI18nContent.skillsDialog.info }}
          </span>
        </div>
        <div
          v-if="filteredSkillsList.length !== 0"
          ref="skillContainerRef"
          class="flex flex-wrap justify-center flex-1 w-full gap-8 p-6 overflow-y-auto"
        >
          <SkillCard
            v-for="skill in filteredSkillsList"
            :key="skill.id"
            :root-element="skillContainerRef"
            :skill="skill"
          />
        </div>
        <div v-else class="flex flex-col items-center justify-center flex-1 w-full p-6">
          <FaceFrownIcon
            :class="[styleStore.iconSizeL]"
            class="text-sb-tertiary-100 shrink-0 transition-sb-slow"
          />
          <span
            :class="[styleStore.textSizeXL]"
            class="w-full text-center text-white truncate font-bebas transition-sb-slow"
          >
            {{
              i18nStore.currentLanguage === 'en'
                ? 'No skills found !'
                : 'Nessuna competenza trovata !'
            }}
          </span>
        </div>
      </div>
    </template>
  </BaseDialog>
</template>
