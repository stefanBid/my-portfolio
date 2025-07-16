<script setup lang="ts">
import SvgSpinnersRingResize from '~icons/svg-spinners/ring-resize';
</script>

<template>
  <div
    class="fixed inset-0 flex flex-col items-center justify-center w-full h-screen transition-all duration-300 ease-in-out z-sb-base-5 bg-sb-main"
    role="alert"
    aria-live="assertive"
  >
    <SvgSpinnersRingResize class="w-32 h-32 text-sb-tertiary-100 animate-pulse" />
  </div>
</template>
