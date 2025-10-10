<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';

import { usePortfolioStore, useLocaleStore, useSkillsStore, useNotificationStore } from '@/stores';
import type { Lang } from '@/types';

import AppDivider from '@/components/layouts/divider/AppDivider.vue';
import BaseDialog from '@/components/base/dialog/BaseDialog.vue';
import BaseInput from '@/components/base/input/BaseInput.vue';
import BaseSwitch from '@/components/base/switch/BaseSwitch.vue';

import SkillCard from '@/pages/skills-page/components/skill-card/SkillCard.vue';
import SkillCardSkeleton from '@/pages/skills-page/components/skill-card/SkillCardSkeleton.vue';

import { Icon } from '@iconify/vue';

interface SkillsModalProps {
  isModalOpen: boolean;
  handleCloseModal: (falsyValue: false) => void;
}

// Input / Output (Props / Emits)
const props = defineProps<SkillsModalProps>();
const skillContainerRef = ref<HTMLElement | null>(null);

// Dependencies
const notificationStore = useNotificationStore();
const { locale } = storeToRefs(useLocaleStore());
const { skillsData } = storeToRefs(usePortfolioStore());
const sStore = useSkillsStore();
const { skills, isLoading, error } = storeToRefs(sStore);
// State

const searchSkillKey = ref('');
const debouncedSearchSkillKey = ref('');
const filters = ref<Record<string, boolean>>({
  feLanguage: true,
  beLanguage: true,
  feFramework: true,
  beFramework: true,
  database: true,
  tool: true,
  other: true,
});

const getInfoMessages = computed<{ icon?: string; info: string }>(() => {
  let infoMessage = '';

  if (skills.value.length === 0) {
    infoMessage =
      locale.value === 'en'
        ? `No skills found ${searchSkillKey.value ? 'for "' + searchSkillKey.value + '"' : ''}`
        : `Nessuna competenza trovata ${
            searchSkillKey.value ? 'per "' + searchSkillKey.value + '"' : ''
          }`;
  } else {
    infoMessage = skillsData.value.skillsModal?.info || '';
  }

  const infoIcon = skills.value.length ? skillsData.value.skillsModal?.icon : 'mdi:magnify-close';

  return {
    icon: infoIcon,
    info: infoMessage,
  };
});

// Events
watch(
  () => props.isModalOpen,
  async (newValue) => {
    if (newValue) {
      searchSkillKey.value = '';
      debouncedSearchSkillKey.value = '';
      filters.value = {
        feLanguage: true,
        beLanguage: true,
        feFramework: true,
        beFramework: true,
        database: true,
        tool: true,
        other: true,
      };
      await sStore.loadSkills(locale.value as Lang);
    }
  },
);

let timeoutId: ReturnType<typeof setTimeout> | undefined;

watch(
  () => searchSkillKey.value,
  (newValue, oldValue) => {
    if (oldValue.length !== 1 && newValue.length === 0) {
      sStore.setSearchKey('');
      return;
    }
    timeoutId = setTimeout(() => {
      sStore.setSearchKey(newValue);
    }, 300);
  },
);

watch(
  () => filters.value,
  (newValue) => {
    sStore.setFilterType(newValue);
  },
  { deep: true },
);

watch(
  () => error.value,
  (err) => {
    if (err) {
      notificationStore.pushNotification(
        'Skills are not available at the moment. Please try again later.',
        'error',
      );
    }
  },
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
    :dialog-title="skillsData.skillsModal.title"
    @close-dialog="(falsyValue) => props.handleCloseModal(falsyValue)"
  >
    <template #modal-content>
      <div
        class="flex flex-col items-center w-full h-full overflow-hidden tot-gap-m pt-2.5 sm:pt-3 md:pt-3 lg:pt-4 transition-all duration-300 ease-in-out"
      >
        <div
          v-if="skillsData.skillsModal.extra"
          class="px-2 w-full sm:w-5/6 md:w-5/6 lg:w-4/6 transition-all duration-300 ease-in-out"
        >
          <BaseInput
            id="searchSkillKey"
            v-model:input-value="searchSkillKey"
            name="search_skill_key"
            aria-label="search skill key"
            type="search"
            :label="skillsData.skillsModal.extra.searchField.label"
            :placeholder="skillsData.skillsModal.extra.searchField.placeholder"
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
                    :label="skillsData.skillsModal.extra?.filters[filterKey] || 'Option'"
                  />
                </div>
              </div>
            </template>
          </BaseInput>
        </div>
        <div class="inline-flex items-center justify-center w-full gap-1 text-white animate-pulse">
          <Icon
            v-if="getInfoMessages.icon"
            :icon="getInfoMessages.icon"
            class="shrink-0 stroke-[2.5px] icon-size-xs"
          />
          <span
            class="text-justify text-white transition-all duration-300 ease-in-out font-roboto text-shadow-luminous text-size-xs"
          >
            {{ getInfoMessages.info }}
          </span>
        </div>
        <div
          ref="skillContainerRef"
          class="relative flex flex-col w-full h-full overflow-y-auto transition-all duration-300 ease-in-out scrollbar-gutter-stable"
        >
          <div
            class="grid transition-all duration-300 ease-in-out tot-gap-m tot-pad-m grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
          >
            <template v-if="!isLoading && !error">
              <AppDivider
                v-for="s in skills"
                :key="s.id"
                :intersection-observer-settings="{
                  rootElement: skillContainerRef,
                  threshold: 0.25,
                }"
                animation="scaleAndFade"
              >
                <SkillCard :skill="s" />
              </AppDivider>
            </template>
            <template v-else>
              <SkillCardSkeleton v-for="n in 6" :key="`skill-card-skeleton-${n}`" />
            </template>
          </div>
        </div>
      </div>
    </template>
  </BaseDialog>
</template>
