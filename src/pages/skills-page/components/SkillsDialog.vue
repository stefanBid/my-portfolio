<script setup lang="ts">
import { FaceFrownIcon, CursorArrowRaysIcon } from '@heroicons/vue/24/solid';
import { computed, ref, watch } from 'vue';

import { BaseDialog, BaseInput } from '@/components';
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
const { activeBreakpoint, textSizeXL, textSizeXS, iconSizeXS } = useCommonStyleSingleton();
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
  <BaseDialog
    :is-open="isModalOpen"
    header-orientation="left"
    :modal-title="currentLanguage === 'en' ? 'Skills' : 'Competenze '"
    :modal-subtitle="currentLanguage === 'en' ? 'List of skills' : 'Lista delle competenze'"
    :on-close-modal=" falsyValue => props.handleCloseModal(falsyValue)"
  >
    <template #modal-content>
      <div class="flex flex-col items-center w-full h-full pt-6 overflow-hidden gap-y-6">
        <div
          :class="{
            'w-4/6': activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm' && activeBreakpoint !== 'md',
            'w-5/6': activeBreakpoint === 'md',
            'w-full': activeBreakpoint === 'xs' || activeBreakpoint === 'sm' ,
          }"
        >
          <BaseInput
            v-model:input-value="searchSkillKey"
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
        </div>
        <div class="inline-flex items-center justify-center w-full text-white gap-x-2 animate-pulse">
          <CursorArrowRaysIcon :class="[iconSizeXS]" />
          <span
            :class="[textSizeXS]"
            class="text-white  transition-sb-slow font-roboto text-shadow-luminous"
          >
            {{ currentLanguage === 'en' ? 'Click on a skill to see its details' : 'Clicca su una competenza per vedere i dettagli' }}
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
  </BaseDialog>
</template>