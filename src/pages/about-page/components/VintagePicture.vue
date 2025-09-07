<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue';
import type { Image } from '@/types';

interface VintagePictureProps {
  imagePath: Image;
  text?: string;
  isVisible?: boolean;
}

const props = withDefaults(defineProps<VintagePictureProps>(), {
  text: undefined,
  isVisible: undefined,
});

const stackSize = 5;

const stackStyles = computed(() => {
  const styles = [];
  for (let index = 0; index < stackSize; index++) {
    const rotation = Math.random() * 10 - 5; // Rotazione casuale tra -5 e 5 gradi
    const translationX = Math.random() * 10 - 5; // Traslazione casuale sull'asse X
    const translationY = Math.random() * 10 - 5; // Traslazione casuale sull'asse Y
    const zIndex = -index; // Decresce lo zIndex per far apparire i div sotto

    styles.push({
      transform: `rotate(${rotation}deg) translate(${translationX}px, ${translationY}px)`,
      zIndex: zIndex,
    });
  }
  return styles;
});

const flip = ref(false);
const delayedFlip = ref(false);
let timeoutId: ReturnType<typeof setTimeout> | undefined;

const flipPicture = (): void => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  if (!flip.value) {
    flip.value = true;
    timeoutId = setTimeout(() => {
      delayedFlip.value = true;
    }, 100);
  } else {
    flip.value = false;
    timeoutId = setTimeout(() => {
      delayedFlip.value = false;
    }, 100);
  }
};

watch(
  () => props.isVisible,
  (newValue) => {
    if (newValue && flip.value) {
      flipPicture();
    }
  },
);

onUnmounted(() => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
});
</script>

<template>
  <div class="relative flex items-center justify-center">
    <div
      v-for="(style, index) in stackStyles"
      :key="index"
      :style="style"
      class="absolute transition-all duration-300 ease-in-out bg-white rounded shadow-md shadow-black w-[280px] h-[340px] px-[15px] pt-[14px] pb-[28px] sm:w-[360px] sm:h-[436px] sm:px-[24px] sm:pt-[18px] sm:pb-[32px] md:w-[360px] md:h-[436px] md:px-[24px] md:pt-[18px] md:pb-[32px] lg:w-[400px] lg:h-[484px] lg:px-[28px] lg:pt-[20px] lg:pb-[36px]"
    ></div>
    <div
      v-bind="$attrs"
      class="relative flex flex-col overflow-hidden transition-all duration-300 ease-in-out bg-white rounded shadow-md cursor-pointer shadow-black gap-y-2 w-[280px] h-[340px] px-[15px] pt-[14px] pb-[28px] sm:w-[360px] sm:h-[436px] sm:px-[24px] sm:pt-[18px] sm:pb-[32px] md:w-[360px] md:h-[436px] md:px-[24px] md:pt-[18px] md:pb-[32px] lg:w-[400px] lg:h-[484px] lg:px-[28px] lg:pt-[20px] lg:pb-[36px]"
      :style="flip ? 'transform: rotateY(180deg)' : 'transform: rotateY(0deg)'"
      @click.prevent="flipPicture"
    >
      <picture class="transition-all duration-300 ease-in-out">
        <source :srcset="props.imagePath.webp || undefined" type="image/webp" />
        <img
          v-show="!delayedFlip"
          :src="props.imagePath.jpg"
          :alt="`${props.text} picture`"
          class="object-cover object-center w-full transition-all duration-300 ease-in-out rounded h-[236px] sm:h-[332px] md:h-[332px] lg:h-[380px]"
          :style="{ transform: 'rotateY(0deg)' }"
        />
      </picture>
      <div
        v-show="delayedFlip"
        class="flex items-center justify-center w-full p-2 transition-all duration-300 ease-in-out rounded bg-sb-secondary-100 h-[236px] sm:h-[332px] md:h-[332px] lg:h-[380px]"
        :style="{ transform: 'rotateY(180deg)' }"
      >
        <p class="text-center text-white font-roboto text-size-s">
          {{ props.text }}
        </p>
      </div>
    </div>
  </div>
</template>
