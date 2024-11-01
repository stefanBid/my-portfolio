<script setup lang="ts">
import { ThePageContainer } from '@/components';
import { useI18nStore, useNotificationStore, useTitleStore } from '@/stores';
import { onMounted, watch } from 'vue';

// Store Declarations
const i18nStore = useI18nStore();
const notificationStore = useNotificationStore();
const titleStore = useTitleStore();

// Feature 1: Page Title
watch(
  () => i18nStore.currentLanguage,
  (newValue) => {
    if (newValue === 'it') {
      titleStore.setTitleSuffix('Progetti');
    } else {
      titleStore.setTitleSuffix('Projects');
    }
  },
  { immediate: true },
);

// Lifecycle Hooks
onMounted(() => {
  notificationStore.pushNotification(
    i18nStore.currentLanguage === 'en'
      ? 'This page is under construction'
      : 'Questa pagina è in costruzione',
    'info',
  );
});
</script>

<template>
  <ThePageContainer
    :page-intro-text="i18nStore.currentLanguage === 'en' ? 'My projects' : 'I miei progetti'"
  />
</template>
