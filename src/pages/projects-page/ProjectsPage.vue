<script setup lang="ts">

import { ThePageContainer } from '@/components';
import { useTypedI18nSingleton } from '@/hooks';

// Feature 1: Internationalization (i18n)
const { currentLanguage } = useTypedI18nSingleton();

</script>

<template>
  <ThePageContainer :page-intro-text="currentLanguage === 'en' ? 'My projects' : 'I miei progetti'" />
</template>