<script setup lang="ts">
import { computed, ref } from 'vue';

import { useCommonStyleSingleton } from '@/hooks';

interface VintagePictureProps {
  imageUrl: string;
  text?: string;
}

const props = withDefaults(defineProps<VintagePictureProps>(), {
	text: undefined
});

// Feature 0: Manage Style Classes
const { activeBreakpoint, textSizeS } = useCommonStyleSingleton();

const getFrameDimension = computed(() => {
	if (activeBreakpoint.value === 'xs') {
		return 'w-[280px] h-[340px] px-[15px] pt-[15px]';
	} else if (activeBreakpoint.value === 'sm') {
		return 'w-[320px] h-[388px] px-[20px] pt-[20px]';
	} else if (activeBreakpoint.value === 'md') {
		return 'w-[360px] h-[436px] px-[24px] pt-[24px]';
	}
	return 'w-[400px] h-[484px] px-[28px] pt-[28px]';
});

const getPictureDimension = computed(() => {
	if (activeBreakpoint.value === 'xs') {
		return 'h-[236px]';
	} else if (activeBreakpoint.value === 'sm') {
		return 'h-[284px]';
	} else if (activeBreakpoint.value === 'md') {
		return 'h-[332px]';
	}
	return 'h-[380px]';
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

const flipPicture = () => {
	if (!flip.value) {
		flip.value = true;
		setTimeout(() => {
			delayedFlip.value = true;
		}, 100);
	} else {
		flip.value = false;
		setTimeout(() => {
			delayedFlip.value = false;
		}, 100);
	}
};

</script>

<template>
  <div class="relative flex items-center justify-center">
    <div
      v-for="(style, index) in stackStyles"
      :key="index"
      :style="style"
      :class="[getFrameDimension]"
      class="absolute w-full h-full bg-white rounded shadow-md shadow-black "
    ></div>
    <div
      v-bind="$attrs"
      :class="[getFrameDimension]"
      class="relative flex flex-col overflow-hidden bg-white rounded shadow-md transition-sb-slow shadow-black gap-y-2 "
      :style="flip ? 'transform: rotateY(180deg)' : 'transform: rotateY(0deg)'"
      @click.prevent="flipPicture"
    >
      <img
        v-show="!delayedFlip"
        id="picture"
        :src="props.imageUrl"
        :alt="`${props.text} picture`"
        :class="[getPictureDimension]"
        class="object-cover object-center w-full rounded transition-sb-slow"
        :style="{ transform: 'rotateY(0deg)' }"
      />
      <div
        v-show="delayedFlip"
        id="picture-description"
        :class="[getPictureDimension]"
        class="flex items-center justify-center w-full p-2 rounded transition-sb-slow bg-sb-secondary-100"
        :style="{ transform: 'rotateY(180deg)' }"
      >
        <p
          class="text-center text-white font-roboto"
          :class="[textSizeS]"
        >
          {{ props.text }}
        </p>
      </div>
    </div>
  </div>
</template>