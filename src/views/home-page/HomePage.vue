<script setup lang="ts">
import { DocumentArrowDownIcon, ChatBubbleLeftRightIcon } from '@heroicons/vue/24/solid';
import { computed, onMounted, ref } from 'vue';

import { PageCover, CustomButton } from '@/components';
import { useGlobalBreakpoints, useTypingText, useTypedI18n } from '@/hooks';
import { downloadCv, openLink } from '@/utils';

// Feature 0: Manage Style Classes
const { xs, sm, md } = useGlobalBreakpoints();

const getButtonWidth = computed(() => {
	if (xs.value || sm.value) { return 'w-44'; }
	if (md.value) { return 'w-52'; }
	return 'w-56';
});

const getMainTitleSize = computed(() => {
	if (xs.value || sm.value) { return 'text-sb-4xl px-1 py-0.5 mx-auto'; }
	if (md.value) { return 'text-sb-6xl px-2 py-1 mx-auto'; }
	return 'text-sb-7xl px-4 py-2';
});

const getSubTitleSize = computed(() => {
	if (xs.value || sm.value) { return 'text-sb-3xl'; }
	if (md.value) { return 'text-sb-4xl'; }
	return 'text-sb-5xl';
});

// Feature 1: Internationalization (i18n)
const { homepageI18nContent, currentLanguage } = useTypedI18n();

// Feature 2: Machine Typing Effect
const texts = computed(() => homepageI18nContent.value.generalSkills);

const { currentTxt } = useTypingText(texts);

// Feature 3: Manage effects
const show = ref(false);

onMounted(() => {
	show.value = true;
});
</script>

<template>
  <PageCover
    background-type="clip"
    background-url="/video/cover-video.mp4"
    overlay-color="black"
  >
    <template #cover-content>
      <div
        :class="{
          'flex-col gap-y-4 pt-40 ': xs || sm || md,
          'flex-row gap-x-4': !xs && !sm && !md,

        }"
        class="flex h-screen"
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
              class="text-white whitespace-normal"
              :class="[getSubTitleSize]"
            >
              {{ homepageI18nContent.welcomeText }}
            </h2>
            <h1
              class="text-black whitespace-normal transition-all duration-300 ease-in-out bg-white rounded-xl w-fit rotate-3"
              :class="[getMainTitleSize]"
            >
              {{ homepageI18nContent.presentationText }}
            </h1>
            <h2
              class="text-white whitespace-normal transition-all duration-300 ease-in-out "
              :class="[getSubTitleSize]"
            >
              {{ homepageI18nContent.presentationText2 }} {{ currentTxt }}_
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
            <CustomButton
              :class="[getButtonWidth]"
              :icon="ChatBubbleLeftRightIcon"
              @click="openLink(homepageI18nContent.callToAction1.link)"
            >
              {{ homepageI18nContent.callToAction1.text }}
            </CustomButton>

            <span
              class="block text-white transition-all duration-300 ease-in-out font-bebas"
              :class="[getSubTitleSize]"
            >
              {{ currentLanguage === 'en' ? 'Or' : 'Oppure' }}
            </span>

            <CustomButton
              :class="[getButtonWidth]"
              :icon="DocumentArrowDownIcon"
              @click="downloadCv(homepageI18nContent.callToAction2.link)"
            >
              {{ homepageI18nContent.callToAction2.text }}
            </CustomButton>
          </div>
        </transition>
      </div>
    </template>
  </PageCover>
</template>