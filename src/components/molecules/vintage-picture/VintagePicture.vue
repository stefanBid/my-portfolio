<script setup lang="ts">
import { computed } from 'vue';

import { useGlobalBreakpoints } from '@/hooks';

interface VintagePictureProps {
  imageUrl: string;
  text?: string;
}

const props = withDefaults(defineProps<VintagePictureProps>(), {
	text: undefined
});

// Feature 0: Manage Style Classes
const { xs, sm, md } = useGlobalBreakpoints();

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

</script>

<template>
  <div
    v-bind="$attrs"
    id="picture-frame"
    :class="[getFrameDimension]"
    class="flex flex-col overflow-hidden transition-all duration-300 ease-in-out bg-white rounded gap-y-2"
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
      :class="[]"
      class="my-2 text-sm font-bold text-center truncate whitespace-normal text-secondary font-roboto h-fit"
    >
      {{ props.text }}
    </p>
  </div>
</template>