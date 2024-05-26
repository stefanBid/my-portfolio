<script setup lang="ts">
import { computed } from 'vue';

import { useCommonStyleSingleton } from '@/hooks';

interface VintagePictureProps {
  imageUrl: string;
  text?: string;
}

const props = withDefaults(defineProps<VintagePictureProps>(), {
	text: undefined
});

// Feature 0: Manage Style Classes
const { xs, sm, md } = useCommonStyleSingleton();

const getFrameDimension = computed(() => {
	if (xs.value) {
		return 'w-[280px] h-[340px] px-[15px] pt-[15px]';
	} else if (sm.value) {
		return 'w-[320px] h-[388px] px-[20px] pt-[20px]';
	} else if (md.value) {
		return 'w-[360px] h-[436px] px-[24px] pt-[24px]';
	}
	return 'w-[400px] h-[484px] px-[28px] pt-[28px]';
});

const getPictureDimension = computed(() => {
	if (xs.value) {
		return 'h-[236px]';
	} else if (sm.value) {
		return 'h-[284px]';
	} else if (md.value) {
		return 'h-[332px]';
	}
	return 'h-[380px]';
});

const stackSize = 5;

const getStackStyle = (index: number) => {
	const rotation = Math.random() * 10 - 5; // Rotazione casuale tra -5 e 5 gradi
	const translationX = Math.random() * 10 - 5; // Traslazione casuale sull'asse X
	const translationY = Math.random() * 10 - 5; // Traslazione casuale sull'asse Y
	const zIndex = -index; // Decresce lo zIndex per far apparire i div sotto

	return {
		transform: `rotate(${rotation}deg) translate(${translationX}px, ${translationY}px)`,
		zIndex: zIndex,
	};
};

</script>

<template>
  <div class="relative flex items-center justify-center">
    <div
      v-for="index in stackSize"
      :key="index"
      :style="getStackStyle(index)"
      :class="[getFrameDimension]"
      class="absolute w-full h-full border border-gray-400 rounded shadow-md bg-slate-100"
    ></div>
    <div
      v-bind="$attrs"
      :class="[getFrameDimension]"
      class="flex flex-col overflow-hidden transition-all duration-300 ease-in-out bg-white border border-gray-400 rounded shadow-md hover:-translate-y-6 gap-y-2 "
    >
      <img
        id="picture"
        :src="props.imageUrl"
        :alt="`${props.text} picture`"
        :class="[getPictureDimension]"
        class="object-cover object-center w-full transition-all duration-300 ease-in-out "
      />
      <p
        id="picture-description"
        :class="[ {
          'text-sb-xs': xs || sm,
          'text-sb-sm': md,
          'text-sb-base': !xs && !sm && !md,
        }]"
        class="my-2 text-sm font-bold text-center truncate whitespace-normal text-secondary font-roboto h-fit"
      >
        {{ props.text }}
      </p>
    </div>
  </div>
</template>