<script setup lang="ts">
import { HomeIcon, WindowIcon } from '@heroicons/vue/24/outline';
import { useRouter } from 'vue-router';

import { BaseButton } from '@/components';
import { useCommonStyleSingleton, useTypedI18nSingleton } from '@/hooks';

// Feature 2: Internationalization (i18n)
const { currentLanguage } = useTypedI18nSingleton();

// Feature 3: Manage Style Classes
const { activeBreakpoint, textSizeXXL, textSizeL, containerPadding } = useCommonStyleSingleton();

// Feature 4: Navigation
const router = useRouter();
</script>

<template>
  <div
    :class="[containerPadding]"
    class="flex flex-col items-center justify-center h-screen pt-20 text-center text-white gap-y-4"
  >
    <h1
      :class="[textSizeXXL]"
      class="whitespace-normal transition-all duration-300 ease-in-out font-bebas "
    >
      {{ currentLanguage === 'en' ? '404 - Page Not Found' : '404 - Pagina Non Trovata' }}
    </h1>
    <WindowIcon
      class="transition-all duration-300 ease-in-out text-slate-700 "
      :class="{
        'size-72': activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm' && activeBreakpoint !== 'md',
        'size-52': activeBreakpoint === 'md',
        'size-32': activeBreakpoint === 'xs' || activeBreakpoint === 'sm',
      }"
    />
    <p
      :class="[textSizeL]"
      class="font-medium whitespace-normal transition-all duration-300 ease-in-out font-roboto "
    >
      {{ currentLanguage === 'en' ? 'The page you are looking for does not exist.' : 'La pagina che stai cercando non esiste.' }}
    </p>
    <BaseButton
      :icon="HomeIcon"
      variant="secondary"
      @click="router.push({ name: 'HomePage' })"
    >
      {{ currentLanguage === 'en' ? 'Go Home' : 'Torna alla Home' }}
    </BaseButton>
  </div>
</template>