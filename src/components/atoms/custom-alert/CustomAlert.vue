<script setup lang="ts">
import { CodeIcon } from '@/assets';
import { useCommonStyle, useTypedI18n } from '@/hooks';

const { impactTitleTextSize, subtitleTextSize, containerPadding, xs, sm, md } = useCommonStyle();

const { currentLanguage } = useTypedI18n();

</script>

<template>
  <div
    :class="[containerPadding]"
    class="flex flex-col items-center justify-center h-screen text-center text-white gap-y-4"
  >
    <h1
      :class="[impactTitleTextSize]"
      class="whitespace-normal transition-all duration-300 ease-in-out font-bebas "
    >
      {{ currentLanguage === 'en' ? 'Work in progress!' : 'Lavori in corso!' }}
    </h1>
    <CodeIcon
      class="transition-all duration-300 ease-in-out"
      :class="{
        'size-80': !xs && !sm && !md,
        'size-60': md ,
        'size-40': sm || xs,
      }"
    />
    <p
      :class="[subtitleTextSize]"
      class="font-medium whitespace-normal transition-all duration-300 ease-in-out font-roboto"
    >
      {{ currentLanguage === 'en' ? 'This page is under construction. Please come back later.' : 'Questa pagina è in costruzione. Torna più tardi.' }}
    </p>
  </div>
</template>