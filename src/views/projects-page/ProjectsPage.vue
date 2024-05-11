<script setup lang="ts">
import { vIntersectionObserver } from '@vueuse/components';
import { useTitle } from '@vueuse/core';
import { onMounted, ref } from 'vue';

import { PageHeading, CustomAlert } from '@/components';
import { useCommonStyle, useTypedI18n } from '@/hooks';

// Feature 0: Manage Page Title
const title = useTitle();

onMounted(() => {
	title.value = ` ${title.value} | Projects`;
});

// Feature 1: Internationalization (i18n)
const { currentLanguage } = useTypedI18n();

// Feature 2: Manage Style Classes
const { containerStyle } = useCommonStyle();

// Feature 3: Manage Visibility for effects
const root = ref(null);
const isVisible = ref<boolean[]>([false]);

const onIntersectionObserver = (index: number) => ([{ isIntersecting }]: IntersectionObserverEntry[]) => {
	isVisible.value[index] = isIntersecting;
};

</script>

<template>
  <div
    ref="root"
    :style="containerStyle"
  >
    <PageHeading
      :title="currentLanguage === 'en' ? 'My projects' : 'I miei progetti'"
    />
    <CustomAlert
      v-intersection-observer="[onIntersectionObserver(0), {root, threshold: 0.5}]"
      class="transition-all duration-500 ease-in-out"
      :class="{
        'opacity-0': !isVisible[0],
        'opacity-100': isVisible[0],
      }"
    />
  </div>
</template>