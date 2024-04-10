<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { DocumentArrowDownIcon, ChatBubbleLeftRightIcon } from '@heroicons/vue/24/solid';
import { PageCover, CustomButton } from '@/components';
import { downloadCv, openLink, getTransition } from '@/utils';
import { useGlobalBreakpoints, useTypingText } from '@/hooks';

const { xs, sm, md } = useGlobalBreakpoints();

// Feature 1: Machine Typing Effect
const texts: string[] = [
	'Front-End Developer',
	'Back-End Developer',
	'Content Creator',
];

const { currentTxt } = useTypingText(texts);

// Feature 2: Manage effects
const transitionObj = getTransition('scaleAndFade');
const show = ref(false);

onMounted(() => {
	show.value = true;
});
</script>

<template>
  <PageCover
    background-type="clip"
    background-url="/public/media/coverVideo.mp4"
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
        <transition
          :enter-active-class="transitionObj.enterActiveClass"
          :enter-from-class="transitionObj.enterFromClass"
          :enter-to-class="transitionObj.enterToClass"
          :leave-active-class="transitionObj.leaveActiveClass"
          :leave-from-class="transitionObj.leaveFromClass"
          :leave-to-class="transitionObj.leaveToClass"
        >
          <div
            v-if="show"
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
        </transition>
        <transition
          :enter-active-class="transitionObj.enterActiveClass"
          :enter-from-class="transitionObj.enterFromClass"
          :enter-to-class="transitionObj.enterToClass"
          :leave-active-class="transitionObj.leaveActiveClass"
          :leave-from-class="transitionObj.leaveFromClass"
          :leave-to-class="transitionObj.leaveToClass"
        >
          <div
            v-if="show"
            class="flex flex-col items-center justify-center "
            :class="{
              'w-[25%] h-screen': !xs && !sm && !md,
              'w-full h-fit': xs || sm || md,
            }"
          >
            <CustomButton
              :class="{
                'w-64': !xs && !sm && !md,
                'w-52': xs || sm || md,
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
                'w-64': !xs && !sm && !md,
                'w-52': xs || sm || md,
              }"

              @click="downloadCv()"
            >
              Download my CV
              <DocumentArrowDownIcon class="size-6 shrink-0" />
            </CustomButton>
          </div>
        </transition>
      </div>
    </template>
  </PageCover>
</template>