<script setup lang="ts">
import { ref, watch } from 'vue';

import { BaseModal, BaseInput } from '@/components';
import { useCommonStyleSingleton, useTypedI18nSingleton } from '@/hooks';
import type { SkillInfo } from '@/types';

import SkillCard from './SkillCard.vue';

interface SkillsModalProps {
  isModalOpen: boolean;
  skillsList: SkillInfo[];
  // eslint-disable-next-line no-unused-vars
  handleCloseModal: (falsyValue: false) => void;
}

const props = defineProps<SkillsModalProps>();

const skillContainerRef = ref<HTMLElement | null>(null);

// Feature 0: Manage Style Classes
const { activeBreakpoint } = useCommonStyleSingleton();
// Feature 1: Internationalization (i18n)
const { currentLanguage } = useTypedI18nSingleton();

// Feature 2: Manage Skills Search
const searchSkillKey = ref('');
const debouncedSearchSkillKey = ref('');

watch(() => props.isModalOpen, newValue => {
	if (newValue) {
		searchSkillKey.value = '';
		debouncedSearchSkillKey.value = '';
	}
});

</script>

<template>
  <BaseModal
    :is-open="isModalOpen"
    header-orientation="left"
    :modal-title="currentLanguage === 'en' ? 'Skills' : 'Competenze '"
    :modal-subtitle="currentLanguage === 'en' ? 'List of skills' : 'Lista delle competenze'"
    :on-close-modal=" falsyValue => props.handleCloseModal(falsyValue)"
  >
    <template #modal-content>
      <div class="flex flex-col items-center h-full pt-6 overflow-hidden gap-y-6">
        <BaseInput
          v-model:input-value="searchSkillKey"
          class="w-3/5"
          :class="{
            'w-4/6': activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm' && activeBreakpoint !== 'md',
            'w-5/6': activeBreakpoint === 'xs' || activeBreakpoint === 'sm' || activeBreakpoint === 'md',
          }"
          placeholder="Search a specific skill"
          :custom-z-index="60"
          :with-menu="true"
        >
          <template #input-menu-box>
            <div class="h-56">
              Prova
            </div>
          </template>
        </BaseInput>

        <div
          ref="skillContainerRef"
          class="flex flex-wrap justify-center flex-1 w-full gap-8 p-6 overflow-y-auto"
        >
          <SkillCard
            v-for="skill in props.skillsList"
            :key="skill.id"
            :root-element="skillContainerRef"
            :skill="skill"
          />
        </div>
      </div>
    </template>
  </BaseModal>
</template>