<script setup lang="ts">
import { FaceFrownIcon, CursorArrowRaysIcon } from '@heroicons/vue/24/solid';
import { computed, ref, watch } from 'vue';

import { BaseDialog, BaseInput } from '@/components';
import { useCommonStyleSingleton } from '@/hooks';
import { useI18nStore } from '@/stores';
import type { SkillInfo } from '@/types';

import SkillCard from '@/pages/skills-page/components/SkillCard.vue';

interface SkillsModalProps {
  isModalOpen: boolean;
  handleCloseModal: (falsyValue: false) => void;
}

const props = defineProps<SkillsModalProps>();

const skillContainerRef = ref<HTMLElement | null>(null);

// Feature 0: Manage Style Classes
const { activeBreakpoint, textSizeXL, textSizeXS, iconSizeXS, iconSizeL } =
  useCommonStyleSingleton();

// Feature 1: Internationalization (i18n)
const i18nStore = useI18nStore();
const skillsList = computed(() => i18nStore.skillsPageI18nContent.skillsList);

// Feature 2: Manage Skills Search
const searchSkillKey = ref('');
const debouncedSearchSkillKey = ref('');

const filteredSkillsList = computed<SkillInfo[]>(() => {
  if (!debouncedSearchSkillKey.value) {
    return skillsList.value;
  }
  return skillsList.value.filter((skill) =>
    skill.name.toLowerCase().includes(debouncedSearchSkillKey.value.toLowerCase()),
  );
});

watch(
  () => props.isModalOpen,
  (newValue) => {
    if (newValue) {
      searchSkillKey.value = '';
      debouncedSearchSkillKey.value = '';
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
    :dialog-title="i18nStore.skillsPageI18nContent.skillsDialog.title"
    :on-close-modal="(falsyValue) => props.handleCloseModal(falsyValue)"
  >
    <template #modal-content>
      <div class="flex flex-col items-center w-full h-full pt-6 overflow-hidden gap-y-6">
        <div
          :class="{
            'w-4/6':
              activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm' && activeBreakpoint !== 'md',
            'w-5/6': activeBreakpoint === 'md',
            'w-full': activeBreakpoint === 'xs' || activeBreakpoint === 'sm',
          }"
        >
          <BaseInput
            id="searchSkillKey"
            v-model:input-value="searchSkillKey"
            name="search_skill_key"
            :label="i18nStore.skillsPageI18nContent.skillsDialog.searchField.label"
            :placeholder="i18nStore.skillsPageI18nContent.skillsDialog.searchField.placeholder"
            :custom-z-index="60"
            :with-menu="false"
          >
            <template #input-menu-box>
              <div class="h-56">Prova</div>
            </template>
          </BaseInput>
        </div>
        <div
          class="inline-flex items-center justify-center w-full text-white gap-x-2 animate-pulse"
        >
          <CursorArrowRaysIcon :class="[iconSizeXS]" />
          <span
            :class="[textSizeXS]"
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
            :class="[iconSizeL]"
            class="text-sb-tertiary-100 shrink-0 transition-sb-slow"
          />
          <span
            :class="[textSizeXL]"
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
