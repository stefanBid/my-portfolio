<script setup lang="ts">
import { PageCover } from '@/components';
import backgroundClip from '@/assets/coverVideo.mp4';
import { onMounted, ref } from 'vue';

import { useGlobalBreakpoints } from '@/hooks';

const { xs, sm, md } = useGlobalBreakpoints();

// Feature 1: Machine Typing Effect
const texts: string[] = [
	'Front-End Developer',
	'Back-End Developer',
	'Content Creator',
];
let currentTxt = ref('');
let currentTextIndex = ref(0);
let addingText = ref(true);

// Functon to create a typing effect
const typeWriterEffect = () => {
	// If we are adding text
	if (addingText.value) {
		if (currentTxt.value.length < texts[currentTextIndex.value].length) {
			currentTxt.value = texts[currentTextIndex.value].substring(0, currentTxt.value.length + 1);
			setTimeout(typeWriterEffect, 70);
		} else {
			// If we have finished adding text
			addingText.value = false;
			setTimeout(typeWriterEffect, 700);
		}
	} else {
		// If we are removing text
		if (currentTxt.value.length > 0) {
			currentTxt.value = texts[currentTextIndex.value].substring(0, currentTxt.value.length - 1);
			setTimeout(typeWriterEffect, 70);
		} else {
			// If we have finished removing text
			addingText.value = true;
			currentTextIndex.value = (currentTextIndex.value + 1) % texts.length;
			setTimeout(typeWriterEffect, 300);
		}
	}
};

onMounted(() => {
	typeWriterEffect();
});
</script>

<template>
  <PageCover
    background-type="clip"
    :background-url="backgroundClip"
    overlay-color="black"
  >
    <template #cover-content>
      <div
        class="flex flex-col h-screen transition-all duration-300 ease-in-out"
        :class="{
          'justify-center items-start': !xs && !sm && !md,
          'justify-center items-center': xs || sm || md,
        }"
      >
        <span
          class="leading-none text-white whitespace-normal font-bebas"
          :class="{
            'text-[2.5rem] text-center': xs || sm,
            'text-[5rem] text-center': md,
            'text-[6rem] text-left': !xs && !sm && !md,
          }"
        >
          Hello Everyone!
        </span>
        <span
          class="font-bebas text-[8rem] text-white leading-tight transition-all duration-300 ease-in-out whitespace-normal"
          :class="{
            'text-[3.5rem] text-center': xs || sm,
            'text-[6rem] text-center': md,
            'text-[7rem] text-left': !xs && !sm && !md,

          }"
        >
          I'm Stefano Biddau
        </span>
        <span
          class="font-bebas text-[6rem] text-white leading-none transition-all duration-300 ease-in-out whitespace-normal "
          :class="{
            'text-[2.5rem] text-center': xs || sm,
            'text-[5rem] text-center': md,
            'text-[6rem] text-left': !xs && !sm && !md,
          }"
        >
          I'm a {{ currentTxt }}_
        </span>
      </div>
    </template>
  </PageCover>
</template>