<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue';

import { useI18nStore } from '@/stores';
import type { SkillInfo } from '@/types';

import AppDivider from '@/components/layouts/divider/AppDivider.vue';
import BaseDialog from '@/components/base/dialog/BaseDialog.vue';
import BaseInput from '@/components/base/input/BaseInput.vue';
import BaseSwitch from '@/components/base/switch/BaseSwitch.vue';

import SkillCard from '@/pages/skills-page/components/SkillCard.vue';

import MdiCursorDefaultClick from '~icons/mdi/cursor-default-click';

interface SkillsModalProps {
  isModalOpen: boolean;
  handleCloseModal: (falsyValue: false) => void;
}

const props = defineProps<SkillsModalProps>();
const skillContainerRef = ref<HTMLElement | null>(null);

// Store Declarations
const i18nStore = useI18nStore();

// Feature 1: Manage Skills Filters
const searchSkillKey = ref('');
const debouncedSearchSkillKey = ref('');

const filters = ref<Record<string, boolean>>({
  feLanguage: true,
  beLanguage: true,
  feFramework: true,
  beFramework: true,
  beDb: true,
});

const getFiltersLabel = computed<Record<string, string>>(() => {
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

let timeoutId: ReturnType<typeof setTimeout> | undefined;

watch(
  () => searchSkillKey.value,
  (newValue) => {
    timeoutId = setTimeout(() => {
      debouncedSearchSkillKey.value = newValue;
    }, 300);
  },
  {},
);

onUnmounted(() => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
});
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
        class="flex flex-col items-center w-full h-full overflow-hidden tot-gap-m pt-2.5 sm:pt-3 md:pt-3 lg:pt-4 transition-all duration-300 ease-in-out"
      >
        <div class="px-2 w-full sm:w-5/6 md:w-5/6 lg:w-4/6 transition-all duration-300 ease-in-out">
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
                class="grid h-fit tot-gap-s tot-pad-s grid-cols-1 sm:grid-cols-2 transition-all duration-300 ease-in-out"
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
        <div class="inline-flex items-center justify-center w-full gap-1 text-white animate-pulse">
          <MdiCursorDefaultClick class="shrink-0 stroke-[2.5px] icon-size-xs" />
          <span
            class="text-justify text-white transition-all duration-300 ease-in-out font-roboto text-shadow-luminous text-size-xs"
          >
            {{ i18nStore.skillsPageI18nContent.skillsDialog.info }}
          </span>
        </div>
        <div
          ref="skillContainerRef"
          class="relative flex flex-col w-full h-full overflow-y-auto transition-all duration-300 ease-in-out scrollbar-gutter-stable"
        >
          <div
            v-if="filteredSkillsList.length > 0"
            class="grid transition-all duration-300 ease-in-out tot-gap-m tot-pad-m grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
          >
            <AppDivider
              v-for="skill in filteredSkillsList"
              :key="skill.id"
              :intersection-observer-settings="{
                rootElement: skillContainerRef,
                threshold: 0.25,
              }"
              animation="scaleAndFade"
            >
              <SkillCard :skill="skill" />
            </AppDivider>
          </div>
          <span
            v-else
            class="w-full text-center text-white truncate transition-all duration-300 ease-in-out font-bebas text-size-l mt-2.5 sm:mt-3 md:mt-3 lg:mt-4"
          >
            {{
              i18nStore.currentLanguage === 'en'
                ? 'No skills found for "'
                : 'Nessuna competenza trovata per "'
            }}
            <span class="underline text-sb-tertiary-200 text-size-l">
              {{ debouncedSearchSkillKey }}
            </span>
            "
          </span>
        </div>
      </div>
    </template>
  </BaseDialog>
</template>
