<script setup lang="ts">
import { HomeIcon, WindowIcon } from '@heroicons/vue/24/outline';
import { useTitle } from '@vueuse/core';
import { onMounted, } from 'vue';
import { useRouter } from 'vue-router';

import { CustomButton } from '@/components';
import { useCommonStyle, useTypedI18n } from '@/hooks';
// Feature 0: Manage Page Title
const title = useTitle();

onMounted(() => {
	title.value = ` ${title.value} | 404 - Not Found`;
});

// Feature 2: Internationalization (i18n)
const { currentLanguage } = useTypedI18n();

// Feature 3: Manage Style Classes
const { xs, sm, md, impactTitleTextSize, subtitleTextSize, containerPadding } = useCommonStyle();

// Feature 4: Navigation
const router = useRouter();
</script>

<template>
  <div
    :class="[containerPadding]"
    class="flex flex-col items-center justify-center h-screen pt-20 text-center text-white gap-y-4"
  >
    <h1
      :class="[impactTitleTextSize]"
      class="whitespace-normal transition-all duration-300 ease-in-out font-bebas "
    >
      {{ currentLanguage === 'en' ? '404 - Page Not Found' : '404 - Pagina Non Trovata' }}
    </h1>
    <WindowIcon
      class="transition-all duration-300 ease-in-out text-slate-700 "
      :class="{
        'size-72': !xs && !sm && !md,
        'size-52': md ,
        'size-32': sm || xs,
      }"
    />
    <p
      :class="[subtitleTextSize]"
      class="font-medium whitespace-normal transition-all duration-300 ease-in-out font-roboto "
    >
      {{ currentLanguage === 'en' ? 'The page you are looking for does not exist.' : 'La pagina che stai cercando non esiste.' }}
    </p>
    <CustomButton
      :icon="HomeIcon"
      variant="secondary"
      @click="router.push({ name: 'HomePage' })"
    >
      {{ currentLanguage === 'en' ? 'Go Home' : 'Torna alla Home' }}
    </CustomButton>
  </div>
</template>