<script setup lang="ts">
import { DocumentArrowDownIcon, ChatBubbleLeftRightIcon } from '@heroicons/vue/24/solid';
import { computed, onMounted, ref } from 'vue';

import { BaseButton } from '@/components';
import { useCommonStyleSingleton, useTypingText, useTypedI18nSingleton } from '@/hooks';
import { downloadCv, openLink } from '@/utils';

// Feature 1: Manage Style Classes
const { activeBreakpoint, containerPadding, textSizeXXL, textSizeXL } = useCommonStyleSingleton();

// Feature 2: Internationalization (i18n)
const { homePageI18nContent, currentLanguage } = useTypedI18nSingleton();

// Feature 3: Machine Typing Effect
const texts = computed(() => homePageI18nContent.value.thirdHeading);

const { currentTxt } = useTypingText(texts);

// Feature 4: Manage effects
const show = ref(false);

onMounted(() => {
	show.value = true;
});
</script>

<template>
  <div
    class="relative w-full h-screen overflow-x-hidden bg-sb-main"
  >
    <!-- Background -->
    <video
      src="/video/cover-video.mp4"
      class="absolute inset-0 object-cover object-center w-full h-full pointer-events-none "
      autoplay
      loop
      muted
      playsinline
    ></video>

    <!-- Overlay -->
    <div
      class="absolute inset-0 bg-black z-sb-base-1 opacity-30"
    ></div>

    <div
      id="homePageContent"
      :class="[containerPadding, {
        'flex-col gap-y-12 justify-center items-center': activeBreakpoint === 'xs' || activeBreakpoint === 'sm' || activeBreakpoint === 'md',
        'items-center justify-between': activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm' && activeBreakpoint !== 'md',

      }]"
      class="absolute inset-0 flex w-full h-full pt-20 z-sb-base-2"
    >
      <transition name="scale-and-fade-slow">
        <div
          v-if="show"
          class="flex flex-col justify-center w-full border-white transition-sb-slow gap-y-4 font-bebas"
          :class="{
            'h-full': activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm' && activeBreakpoint !== 'md',
            'text-center items-center': activeBreakpoint === 'xs' || activeBreakpoint === 'sm' || activeBreakpoint === 'md',
          }"
        >
          <h2
            id="firstHeading"
            class="text-white whitespace-normal transition-sb-slow "
            :class="[textSizeXL]"
          >
            {{ homePageI18nContent.firstHeading }}
          </h2>
          <h1
            id="secondHeading"
            class="text-black whitespace-normal bg-white transition-sb-slow rounded-xl w-fit rotate-3"
            :class="[
              textSizeXXL,
              {
                'px-1 py-0.5': activeBreakpoint === 'xs' || activeBreakpoint === 'sm',
                'px-2 py-1': activeBreakpoint === 'md',
                'mx-auto': activeBreakpoint === 'xs' || activeBreakpoint === 'sm' || activeBreakpoint === 'md',
                'px-4 py-2': activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm' && activeBreakpoint !== 'md',
              }
            ]"
          >
            {{ homePageI18nContent.secondHeading }}
          </h1>
          <h2
            id="thirdHeading"
            class="text-white whitespace-normal transition-sb-slow "
            :class="[textSizeXL]"
          >
            {{ currentLanguage === 'en' ? `And I'm a`: `E sono uno` }} {{ currentTxt }}_
          </h2>
        </div>
      </transition>
      <transition name="scale-and-fade-slow">
        <div
          v-if="show"
          class="flex flex-col items-center justify-center w-fit gap-y-4 "
          :class="{
            'h-full shrink-0': activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm' && activeBreakpoint !== 'md',

          }"
        >
          <BaseButton
            id="firstButton"
            class="w-full"
            :icon="ChatBubbleLeftRightIcon"
            @click="openLink(homePageI18nContent.firstButton.link)"
          >
            {{ homePageI18nContent.firstButton.text }}
          </BaseButton>

          <span
            class="block text-white transition-sb-slow font-bebas"
            :class="[textSizeXL]"
          >
            {{ currentLanguage === 'en' ? 'Or' : 'Oppure' }}
          </span>

          <BaseButton
            id="secondButton"
            class="max-w-60"
            :icon="DocumentArrowDownIcon"
            @click="downloadCv(homePageI18nContent.secondButton.link)"
          >
            {{ homePageI18nContent.secondButton.text }}
          </BaseButton>
        </div>
      </transition>
    </div>
  </div>
</template>