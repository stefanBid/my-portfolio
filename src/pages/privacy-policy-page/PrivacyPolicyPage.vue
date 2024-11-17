<script setup lang="ts">
import { ThePageContainer } from '@/components';
import { useI18nStore, useTitleStore } from '@/stores';
import { watch } from 'vue';

// Store Declarations
const i18nStore = useI18nStore();
const titleStore = useTitleStore();

// Feature 1: Page Title
watch(
  () => i18nStore.currentLanguage,
  (newValue) => {
    if (newValue === 'it') {
      titleStore.setTitleSuffix('Privacy Policy');
    } else {
      titleStore.setTitleSuffix('Politica sulla riservatezza');
    }
  },
  { immediate: true },
);
</script>

<template>
  <ThePageContainer :page-intro-text="i18nStore.aboutMePageI18nContent.pageHeading">
    <template #page-content>
      <div class="border border-white font-roboto"></div>
    </template>
  </ThePageContainer>
</template>
