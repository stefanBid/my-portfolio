<script setup lang="ts">
import { CodeIcon } from '@/assets';
import { useCommonStyleSingleton, useTypedI18nSingleton } from '@/hooks';

const { textSizeXL, textSizeL, containerPadding, activeBreakpoint } = useCommonStyleSingleton();

const { currentLanguage } = useTypedI18nSingleton();

</script>

<template>
  <div
    :class="[containerPadding]"
    class="flex flex-col items-center justify-center h-screen text-center text-white gap-y-4"
  >
    <h1
      :class="[textSizeXL]"
      class="whitespace-normal transition-all duration-300 ease-in-out font-bebas "
    >
      {{ currentLanguage === 'en' ? 'Work in progress!' : 'Lavori in corso!' }}
    </h1>
    <CodeIcon
      class="transition-all duration-300 ease-in-out"
      :class="{
        'size-80': activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm' && activeBreakpoint !== 'md',
        'size-60': activeBreakpoint === 'md',
        'size-40': activeBreakpoint === 'sm' || activeBreakpoint === 'xs',
      }"
    />
    <h3
      :class="[textSizeL]"
      class="font-medium whitespace-normal transition-all duration-300 ease-in-out font-roboto"
    >
      {{ currentLanguage === 'en' ? 'This page is under construction. Please come back later.' : 'Questa pagina è in costruzione. Torna più tardi.' }}
    </h3>
  </div>
</template>