<script setup lang="ts">
import { ThePageContainer } from '@/components';
import { useI18nStore, useNotificationStore } from '@/stores';
import { onMounted } from 'vue';

// Store Declarations
const i18nStore = useI18nStore();
const notificationStore = useNotificationStore();

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
