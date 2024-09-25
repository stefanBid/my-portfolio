<script setup lang="ts">

import { useCommonStyleSingleton } from '@/hooks';

interface PageCoverProps {
  backgroundType: 'image' | 'clip' ;
  backgroundUrl: string;
  overlayColor: 'black' | 'white';
}

const props = defineProps<PageCoverProps>();

// Feature 0: Manage Style Classes
const { containerPadding } = useCommonStyleSingleton();

</script>

<template>
  <div
    class="relative w-full h-screen overflow-x-hidden bg-black"
  >
    <!-- Background -->
    <img
      v-if="props.backgroundType === 'image'"
      :src="props.backgroundUrl "
      alt="Background"
      class="absolute inset-0 object-cover object-center w-full h-full pt-20"
    />
    <video
      v-if="props.backgroundType === 'clip'"
      :src="props.backgroundUrl"
      class="absolute inset-0 object-cover object-center w-full h-full pointer-events-none "
      autoplay
      loop
      muted
      playsinline
    ></video>

    <!-- Overlay -->
    <div
      :class="{
        'bg-black': props.overlayColor === 'black',
        'bg-white': props.overlayColor === 'white'
      }"
      class="absolute inset-0 pt-20 opacity-30"
    ></div>

    <!-- Cover Content -->
    <div
      :class="[containerPadding]"
      class="absolute inset-0 z-10 w-full h-full pt-20 "
    >
      <slot name="cover-content"></slot>
    </div>
  </div>
</template>
