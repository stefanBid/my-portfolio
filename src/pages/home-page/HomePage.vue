<script setup lang="ts">
import { DocumentArrowDownIcon, EnvelopeIcon } from '@heroicons/vue/24/solid';
import { computed, onMounted, ref } from 'vue';

import { BaseButton } from '@/components';
import ContactMeFormDialog from '@/pages/home-page/components/ContactMeFormDialog.vue';
import { useCommonStyleSingleton, useTypingText } from '@/hooks';
import { useI18nStore } from '@/stores';
import { downloadCv } from '@/utils';

// Feature 1: Common Style
const { activeBreakpoint, containerPadding, textSizeXXL, textSizeXL } = useCommonStyleSingleton();

// Feature 2: Internationalization (i18n)
const i18nStore = useI18nStore();

// Feature 3: Machine Typing Effect
const texts = computed(() => i18nStore.homePageI18nContent.thirdHeading);

const { currentTxt } = useTypingText(texts);

// Feature 4: Manage effects
const show = ref(false);

onMounted(() => {
  show.value = true;
});

// Feature 5: Manage Contact Me Dialog Form

const isModalOpen = ref(false);
const openContactMeFormDialog = (): void => {
  isModalOpen.value = true;
};

const changeVisibility = (falsyValue: boolean): void => {
  isModalOpen.value = falsyValue;
};
</script>

<template>
  <div class="relative w-full h-screen overflow-x-hidden bg-sb-main">
    <!-- Background -->
    <video
      src="/video/cover-video.mp4"
      class="absolute inset-0 object-cover object-center w-full h-full pointer-events-none"
      autoplay
      loop
      muted
      playsinline
    ></video>

    <!-- Overlay -->
    <div class="absolute inset-0 bg-black z-sb-base-1 opacity-30"></div>

    <div
      :class="[
        containerPadding,
        {
          'flex-col gap-y-12 justify-center items-center':
            activeBreakpoint === 'xs' || activeBreakpoint === 'sm' || activeBreakpoint === 'md',
          'items-center justify-between':
            activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm' && activeBreakpoint !== 'md',
        },
      ]"
      class="absolute inset-0 flex w-full h-full pt-20 z-sb-base-2"
    >
      <transition name="scale-and-fade-slow">
        <div
          v-if="show"
          class="flex flex-col justify-center w-full border-white transition-sb-slow gap-y-4 font-bebas"
          :class="{
            'h-full':
              activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm' && activeBreakpoint !== 'md',
            'text-center items-center':
              activeBreakpoint === 'xs' || activeBreakpoint === 'sm' || activeBreakpoint === 'md',
          }"
        >
          <h2 class="text-white whitespace-normal transition-sb-slow" :class="[textSizeXL]">
            {{ i18nStore.homePageI18nContent.firstHeading }}
          </h2>
          <h1
            class="text-black whitespace-normal bg-white transition-sb-slow rounded-xl w-fit rotate-3"
            :class="[
              textSizeXXL,
              {
                'px-1 py-0.5': activeBreakpoint === 'xs' || activeBreakpoint === 'sm',
                'px-2 py-1': activeBreakpoint === 'md',
                'mx-auto':
                  activeBreakpoint === 'xs' ||
                  activeBreakpoint === 'sm' ||
                  activeBreakpoint === 'md',
                'px-4 py-2':
                  activeBreakpoint !== 'xs' &&
                  activeBreakpoint !== 'sm' &&
                  activeBreakpoint !== 'md',
              },
            ]"
          >
            {{ i18nStore.homePageI18nContent.secondHeading }}
          </h1>
          <h2 class="text-white whitespace-normal transition-sb-slow" :class="[textSizeXL]">
            {{ i18nStore.currentLanguage === 'en' ? `And I'm a` : `E sono uno` }} {{ currentTxt }}_
          </h2>
        </div>
      </transition>
      <transition name="scale-and-fade-slow">
        <div
          v-if="show"
          class="flex flex-col items-center justify-center w-fit gap-y-4"
          :class="{
            'h-full shrink-0':
              activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm' && activeBreakpoint !== 'md',
          }"
        >
          <BaseButton
            id="contactMeButton"
            name="contact_me_button"
            class="w-full"
            :icon="EnvelopeIcon"
            @click.stop="() => openContactMeFormDialog()"
          >
            {{ i18nStore.homePageI18nContent.contactMeButton.text }}
          </BaseButton>

          <span class="block text-white transition-sb-slow font-bebas" :class="[textSizeXL]">
            {{ i18nStore.currentLanguage === 'en' ? 'Or' : 'Oppure' }}
          </span>

          <BaseButton
            id="downloadCvButton"
            name="download_cv_button"
            class="w-full"
            :icon="DocumentArrowDownIcon"
            @click="
              i18nStore.homePageI18nContent.downloadCvButton.link
                ? downloadCv(i18nStore.homePageI18nContent.downloadCvButton.link)
                : undefined
            "
          >
            {{ i18nStore.homePageI18nContent.downloadCvButton.text }}
          </BaseButton>
        </div>
      </transition>
    </div>
  </div>
  <ContactMeFormDialog
    :is-modal-open="isModalOpen"
    :handle-close-modal="(falsyValue) => changeVisibility(falsyValue)"
  />
</template>
