<script setup lang="ts">
import { DocumentArrowDownIcon, ChatBubbleLeftRightIcon } from '@heroicons/vue/24/solid';
import { computed, onMounted, ref } from 'vue';

import { BaseButton } from '@/components';
import HomePageCover from '@/components/page-components/home/home-page-cover/HomePageCover.vue';
import { useCommonStyleSingleton, useTypingText, useTypedI18nSingleton } from '@/hooks';
import { downloadCv, openLink } from '@/utils';

// Feature 1: Manage Style Classes
const { xs, sm, md, h1Size, h2Size } = useCommonStyleSingleton();

const getButtonWidth = computed(() => {
	if (xs.value || sm.value) { return 'w-44'; }
	if (md.value) { return 'w-52'; }
	return 'w-56';
});

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
          'flex-col h-full gap-y-20 justify-center w-full': xs || sm || md,
          'items-center gap-x-4 h-full': !xs && !sm && !md,

        }"
        class="flex "
      >
        <transition name="scale-and-fade-slow">
          <div
            v-if="show"
            class="space-y-4 transition-all duration-300 ease-in-out font-bebas"
            :class="{
              'text-left w-[75%] my-auto': !xs && !sm && !md,
              'text-center mx-auto': xs || sm || md,
            }"
          >
            <h2
              id="firstHeading"
              class="text-white whitespace-normal"
              :class="[h2Size]"
            >
              {{ homePageI18nContent.firstHeading }}
            </h2>
            <h1
              id="secondHeading"
              class="text-black whitespace-normal transition-all duration-300 ease-in-out bg-white rounded-xl w-fit rotate-3"
              :class="[
                h1Size,
                {
                  'px-1 py-0.5': xs || sm,
                  'px-2 py-1': md,
                  'mx-auto': xs || sm || md,
                  'px-4 py-2': !xs && !sm && !md,
                }
              ]"
            >
              {{ homePageI18nContent.secondHeading }}
            </h1>
            <h2
              id="thirdHeading"
              class="text-white whitespace-normal transition-all duration-300 ease-in-out "
              :class="[h2Size]"
            >
              {{ currentLanguage === 'en' ? `And I'm a`: `E sono uno` }} {{ currentTxt }}_
            </h2>
          </div>
        </transition>
        <transition name="scale-and-fade-slow">
          <div
            v-if="show"
            class="space-y-4 text-center"
            :class="{
              'w-[25%] my-auto': !xs && !sm && !md,
              'mx-auto': xs || sm || md,
            }"
          >
            <BaseButton
              id="firstButton"
              :class="[getButtonWidth]"
              :icon="ChatBubbleLeftRightIcon"
              @click="openLink(homePageI18nContent.firstButton.link)"
            >
              {{ homePageI18nContent.firstButton.text }}
            </BaseButton>

            <span
              class="block text-white transition-all duration-300 ease-in-out font-bebas"
              :class="[h2Size]"
            >
              {{ currentLanguage === 'en' ? 'Or' : 'Oppure' }}
            </span>

            <BaseButton
              id="secondButton"
              :class="[getButtonWidth]"
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