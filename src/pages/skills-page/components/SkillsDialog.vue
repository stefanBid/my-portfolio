<script setup lang="ts">
import type { SkillInfo } from '@/types';
import { computed, onUnmounted, ref, watch } from 'vue';
import { TheDivider, BaseDialog, BaseInput, BaseSwitch } from '@/components';
import SkillCard from '@/pages/skills-page/components/SkillCard.vue';
import MdiCursorDefaultClick from '~icons/mdi/cursor-default-click';
import { useI18nStore, useStyleStore } from '@/stores';

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
        <div class="inline-flex items-center justify-center w-full gap-1 text-white animate-pulse">
          <MdiCursorDefaultClick :class="[styleStore.iconSizeXS]" class="shrink-0 stroke-[2.5px]" />
          <span
            :class="[styleStore.textSizeXS]"
            class="text-justify text-white transition-all duration-300 ease-in-out font-roboto text-shadow-luminous"
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
            class="grid transition-all duration-300 ease-in-out"
            :class="[
              styleStore.elementTotalPaddingM,
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
          >
            <TheDivider
              v-for="skill in filteredSkillsList"
              :key="skill.id"
              :intersection-observer-settings="{
                rootElement: skillContainerRef,
                threshold: 0.25,
              }"
              animation="scaleAndFade"
            >
              <SkillCard :skill="skill" />
            </TheDivider>
          </div>
          <span
            v-else
            :class="[
              styleStore.textSizeL,
              {
                'mt-4':
                  styleStore.activeBreakpoint !== 'xs' &&
                  styleStore.activeBreakpoint !== 'sm' &&
                  styleStore.activeBreakpoint !== 'md',
                'mt-3': styleStore.activeBreakpoint === 'md',
                'mt-2.5':
                  styleStore.activeBreakpoint === 'sm' || styleStore.activeBreakpoint === 'xs',
              },
            ]"
            class="w-full text-center text-white truncate transition-all duration-300 ease-in-out font-bebas"
          >
            {{
              i18nStore.currentLanguage === 'en'
                ? 'No skills found for "'
                : 'Nessuna competenza trovata per "'
            }}
            <span :class="[styleStore.textSizeL]" class="underline text-sb-tertiary-200">
              {{ debouncedSearchSkillKey }}
            </span>
            "
          </span>
        </div>
      </div>
    </template>
  </BaseDialog>
</template>
