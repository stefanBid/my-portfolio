<script setup lang="ts">
import { computed } from 'vue';

import { useGlobalBreakpoints } from '@/hooks';
interface PageCoverProps {
  backgroundType: 'image' | 'clip' ;
  backgroundUrl: string;
  overlayColor: 'black' | 'white';
}

const props = defineProps<PageCoverProps>();

// Feature 0: Manage Style Classes
const { xs, sm, md } = useGlobalBreakpoints();

const coverPadding = computed(() => {
	if (xs.value || sm.value) { return 'p-sb-side-sm'; }
	if (md.value) { return 'p-sb-side-base'; }
	return 'p-sb-side-lg';
});

</script>

<template>
  <div
    :class="[coverPadding]"
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
      playsinline
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
    <div class="relative z-10 p-sb-side">
      <slot name="cover-content"></slot>
    </div>
  </div>
</template>
