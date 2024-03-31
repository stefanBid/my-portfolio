<script setup lang="ts">

interface PageCoverProps {
  backgroundType: 'image' | 'clip' ;
  backgroundUrl: string;
  overlayColor: 'black' | 'white';
}

const props = defineProps<PageCoverProps>();

</script>

<template>
  <div
    class="relative w-full h-screen pt-20 overflow-hidden bg-black"
  >
    <!-- Background -->
    <img
      v-if="props.backgroundType === 'image'"
      :src="props.backgroundUrl "
      alt="Background"
      class="absolute inset-0 object-cover object-center w-full h-full"
    />
    <video
      v-if="props.backgroundType === 'clip'"
      :src="props.backgroundUrl"
      class="absolute inset-0 object-cover object-center w-full h-full pointer-events-none grayscale"
      autoplay
      loop
      muted
    ></video>

    <!-- Overlay -->
    <div
      :class="{
        'bg-black': props.overlayColor === 'black',
        'bg-white': props.overlayColor === 'white'
      }"
      class="absolute inset-0 opacity-60"
    ></div>

    <!-- Cover Content -->
    <div class="relative z-10 px-8">
      <slot name="cover-content"></slot>
    </div>
  </div>
</template>
