<script setup lang="ts">
import backgroundClip from '@/assets/media/coverVideo.mp4';
import { onMounted, ref } from 'vue';
import { DocumentArrowDownIcon, ChatBubbleLeftRightIcon } from '@heroicons/vue/24/solid';
import { PageCover, CustomButton } from '@/components';
import { downloadCv, openLink } from '@/utils';
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
    background-dimensions="quarter"
    overlay-color="black"
  >
    <template #cover-content>
      <div
        :class="{
          'flex-col gap-y-2 justify-start ': xs || sm || md,
          'flex-row gap-x-2': !xs && !sm && !md,

        }"
        class="flex items-center h-screen"
      >
        <div
          class="flex flex-col transition-all duration-300 ease-in-out gap-y-2 font-bebas"
          :class="{
            'justify-center items-start w-[75%] h-screen': !xs && !sm && !md,
            'justify-center items-center w-full h-[50%]': xs || sm || md,
          }"
        >
          <span
            class="leading-none text-white whitespace-normal"
            :class="{
              'text-[2rem] text-center': xs || sm,
              'text-[5rem] text-center': md,
              'text-[5.5rem] text-left': !xs && !sm && !md,
            }"
          >
            Hello Everyone!
          </span>
          <span
            class="leading-none text-black whitespace-normal transition-all duration-300 ease-in-out bg-white rounded-lg "
            :class="{
              'text-[3rem] text-center p-1': xs || sm,
              'text-[6rem] text-center p-2': md,
              'text-[6.5rem] text-left p-4': !xs && !sm && !md,

            }"
          >
            I'm Stefano Biddau

          </span>
          <span
            class="leading-none text-white whitespace-normal transition-all duration-300 ease-in-out"
            :class="{
              'text-[2rem] text-center': xs || sm,
              'text-[5rem] text-center': md,
              'text-[5.5rem] text-left': !xs && !sm && !md,
            }"
          >
            I'm a {{ currentTxt }}_
          </span>
        </div>
        <div
          class="flex flex-col items-center justify-center "
          :class="{
            'w-[25%] h-screen': !xs && !sm && !md,
            'w-full h-fit': xs || sm || md,
          }"
        >
          <CustomButton
            :class="{
              'w-60': !xs && !sm && !md,
              'w-48': xs || sm || md,
            }"
            @click="openLink('https://www.linkedin.com/in/stefano-biddau-669149214/')"
          >
            Contact Me
            <ChatBubbleLeftRightIcon class="size-6 shrink-0" />
          </CustomButton>

          <span
            class="text-white transition-all duration-300 ease-in-out font-bebas"
            :class="{
              'text-[2rem] text-center my-2': xs || sm,
              'text-[3rem] text-center my-2': md,
              'text-[6rem] text-left my-4': !xs && !sm && !md,
            }"
          >
            OR
          </span>

          <CustomButton
            :class="{
              'w-60': !xs && !sm && !md,
              'w-48': xs || sm || md,
            }"

            @click="downloadCv()"
          >
            Download my CV
            <DocumentArrowDownIcon class="size-6 shrink-0" />
          </CustomButton>
        </div>
      </div>
    </template>
  </PageCover>
</template>