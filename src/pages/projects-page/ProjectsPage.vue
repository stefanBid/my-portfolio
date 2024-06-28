<script setup lang="ts">

import { ThePageContainer, IntroSection } from '@/components';
import PageUnderConstructionAlert from '@/components/temp/page-under-construction-alert/PageUnderConstructionAlert.vue';
import { useTypedI18nSingleton, useIntersectionObserver } from '@/hooks';

// Feature 1: Internationalization (i18n)
const { currentLanguage } = useTypedI18nSingleton();

// Feature 3: Manage Visibility for effects
const { root, isVisible, onIntersectionObserver, vIntersectionObserver } = useIntersectionObserver(1);

</script>

<template>
  <ThePageContainer
    ref="root"
  >
    <template #intro-section>
      <IntroSection
        :title="currentLanguage === 'en' ? 'My projects' : 'I miei progetti'"
      />
    </template>
    <template #main-content>
      <PageUnderConstructionAlert
        v-intersection-observer="[onIntersectionObserver(0), {root, threshold: 0.5}]"
        class="transition-all duration-500 ease-in-out"
        :class="{
          'opacity-0': !isVisible[0],
          'opacity-100': isVisible[0],
        }"
      />
    </template>
  </ThePageContainer>
</template>