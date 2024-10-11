<script setup lang="ts">
import { DocumentArrowDownIcon, ChatBubbleLeftRightIcon } from '@heroicons/vue/24/solid';
import { computed, onMounted, ref } from 'vue';

import { BaseButton } from '@/components';
import { useCommonStyleSingleton, useTypingText, useTypedI18nSingleton } from '@/hooks';
import HomePageCover from '@/pages/home-page/components/HomePageCover.vue';
import { downloadCv, openLink } from '@/utils';

// Feature 1: Manage Style Classes
const { activeBreakpoint, textSizeXXL, textSizeXL } = useCommonStyleSingleton();

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
  <HomePageCover
    background-type="clip"
    background-url="/video/cover-video.mp4"
    overlay-color="black"
  >
    <template #cover-content>
      <div
        id="homePageContent"
        :class="{
          'flex-col gap-y-20 justify-center': activeBreakpoint === 'xs' || activeBreakpoint === 'sm' || activeBreakpoint === 'md',
          'items-center justify-between gap-x-4': activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm' && activeBreakpoint !== 'md',

        }"
        class="flex w-full h-full"
      >
        <transition name="scale-and-fade-slow">
          <div
            v-if="show"
            class="flex flex-col justify-center transition-all duration-300 ease-in-out gap-y-4 font-bebas"
            :class="{
              'flex-1 h-full items-start': activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm' && activeBreakpoint !== 'md',
              'text-center items-center': activeBreakpoint === 'xs' || activeBreakpoint === 'sm' || activeBreakpoint === 'md',
            }"
          >
            <h2
              id="firstHeading"
              class="text-white whitespace-normal"
              :class="[textSizeXL]"
            >
              {{ homePageI18nContent.firstHeading }}
            </h2>
            <h1
              id="secondHeading"
              class="text-black whitespace-normal transition-all duration-300 ease-in-out bg-white rounded-xl w-fit rotate-3"
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
              class="text-white whitespace-normal transition-all duration-300 ease-in-out "
              :class="[textSizeXL]"
            >
              {{ currentLanguage === 'en' ? `And I'm a`: `E sono uno` }} {{ currentTxt }}_
            </h2>
          </div>
        </transition>
        <transition name="scale-and-fade-slow">
          <div
            v-if="show"
            class="flex flex-col items-center justify-center gap-y-4 "
            :class="{
              'h-full shrink-0': activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm' && activeBreakpoint !== 'md',

            }"
          >
            <BaseButton
              id="firstButton"
              class="w-60"
              :icon="ChatBubbleLeftRightIcon"
              @click="openLink(homePageI18nContent.firstButton.link)"
            >
              {{ homePageI18nContent.firstButton.text }}
            </BaseButton>

            <span
              class="block text-white transition-all duration-300 ease-in-out font-bebas"
              :class="[textSizeXL]"
            >
              {{ currentLanguage === 'en' ? 'Or' : 'Oppure' }}
            </span>

            <BaseButton
              id="secondButton"
              class="w-60"
              :icon="DocumentArrowDownIcon"
              @click="downloadCv(homePageI18nContent.secondButton.link)"
            >
              {{ homePageI18nContent.secondButton.text }}
            </BaseButton>
          </div>
        </transition>
      </div>
    </template>
  </HomePageCover>
</template>