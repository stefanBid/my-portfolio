<script setup lang="ts">
import { FaceFrownIcon } from '@heroicons/vue/24/solid';
import { computed, ref, watch } from 'vue';

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
const { activeBreakpoint, textSizeXL } = useCommonStyleSingleton();
// Feature 1: Internationalization (i18n)
const { currentLanguage } = useTypedI18nSingleton();

// Feature 2: Manage Skills Search
const searchSkillKey = ref('');
const debouncedSearchSkillKey = ref('');

const filteredSkillsList = computed<SkillInfo[]>(() => {
	if (!debouncedSearchSkillKey.value) {
		return props.skillsList;
	}
	return props.skillsList.filter((skill) => skill.name.toLowerCase().includes(debouncedSearchSkillKey.value.toLowerCase()));
});

watch(() => props.isModalOpen, newValue => {
	if (newValue) {
		searchSkillKey.value = '';
		debouncedSearchSkillKey.value = '';
	}
});

watch(() => searchSkillKey.value, newValue => {
	setTimeout(() => {
		debouncedSearchSkillKey.value = newValue;
	}, 300);
}, {});

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
      <div class="flex flex-col items-center w-full h-full pt-6 overflow-hidden gap-y-6">
        <BaseInput
          v-model:input-value="searchSkillKey"
          class="w-3/5"
          :class="{
            'w-4/6': activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm' && activeBreakpoint !== 'md',
            'w-5/6': activeBreakpoint === 'xs' || activeBreakpoint === 'sm' || activeBreakpoint === 'md',
          }"
          placeholder="Search a specific skill"
          :custom-z-index="60"
          :with-menu="false"
        >
          <template #input-menu-box>
            <div class="h-56">
              Prova
            </div>
          </template>
        </BaseInput>

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
        <div
          v-else
          class="flex flex-col items-center justify-center flex-1 w-full p-6"
        >
          <FaceFrownIcon
            :class="{
              'size-16': activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm' && activeBreakpoint !== 'md',
              'size-12': activeBreakpoint === 'md',
              'size-10': activeBreakpoint === 'xs' || activeBreakpoint === 'sm',
            }"
            class=" text-sb-tertiary-100 shrink-0"
          />
          <span
            :class="[textSizeXL]"
            class="w-full text-center text-white truncate font-bebas"
          >
            {{ currentLanguage === 'en' ? 'No skills found !' : 'Nessuna competenza trovata !' }}
          </span>
        </div>
      </div>
    </template>
  </BaseModal>
</template>