<script setup lang="ts">
import { DocumentArrowDownIcon, EnvelopeIcon } from '@heroicons/vue/24/solid';
import { computed, onMounted, ref } from 'vue';
import ContactMeFormDialog from '@/pages/home-page/components/ContactMeFormDialog.vue';
import { BaseButton } from '@/components';
import { useTypingText } from '@/hooks';
import { useI18nStore, useStyleStore, useTitleStore } from '@/stores';
import { downloadCv } from '@/utils';

// Store Declarations
const styleStore = useStyleStore();
const i18nStore = useI18nStore();
const titleStore = useTitleStore();

// Feature 1: Page Title
titleStore.setTitleSuffix('Home');

// Feature 2: Machine Typing Effect
const texts = computed(() => i18nStore.homePageI18nContent.thirdHeading);

const { currentTxt } = useTypingText(texts);

// Feature 3: Manage effects
const show = ref(false);

onMounted(() => {
  show.value = true;
});

// Feature 4: Manage Contact Me Dialog Form

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
        styleStore.containerPadding,
        {
          'flex-col gap-y-12 justify-center items-center':
            styleStore.activeBreakpoint === 'xs' ||
            styleStore.activeBreakpoint === 'sm' ||
            styleStore.activeBreakpoint === 'md',
          'items-center justify-between':
            styleStore.activeBreakpoint !== 'xs' &&
            styleStore.activeBreakpoint !== 'sm' &&
            styleStore.activeBreakpoint !== 'md',
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
              styleStore.activeBreakpoint !== 'xs' &&
              styleStore.activeBreakpoint !== 'sm' &&
              styleStore.activeBreakpoint !== 'md',
            'text-center items-center':
              styleStore.activeBreakpoint === 'xs' ||
              styleStore.activeBreakpoint === 'sm' ||
              styleStore.activeBreakpoint === 'md',
          }"
        >
          <h2
            class="text-white whitespace-normal transition-sb-slow"
            :class="[styleStore.textSizeXL]"
          >
            {{ i18nStore.homePageI18nContent.firstHeading }}
          </h2>
          <h1
            class="text-black whitespace-normal bg-white transition-sb-slow rounded-xl w-fit rotate-3"
            :class="[
              styleStore.textSizeXXL,
              {
                'px-1 py-0.5':
                  styleStore.activeBreakpoint === 'xs' || styleStore.activeBreakpoint === 'sm',
                'px-2 py-1': styleStore.activeBreakpoint === 'md',
                'mx-auto':
                  styleStore.activeBreakpoint === 'xs' ||
                  styleStore.activeBreakpoint === 'sm' ||
                  styleStore.activeBreakpoint === 'md',
                'px-4 py-2':
                  styleStore.activeBreakpoint !== 'xs' &&
                  styleStore.activeBreakpoint !== 'sm' &&
                  styleStore.activeBreakpoint !== 'md',
              },
            ]"
          >
            {{ i18nStore.homePageI18nContent.secondHeading }}
          </h1>
          <h2
            class="text-white whitespace-normal transition-sb-slow"
            :class="[styleStore.textSizeXL]"
          >
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
              styleStore.activeBreakpoint !== 'xs' &&
              styleStore.activeBreakpoint !== 'sm' &&
              styleStore.activeBreakpoint !== 'md',
          }"
        >
          <BaseButton
            id="contactMeButton"
            name="contact_me_button"
            aria-label="click to open contact me form"
            class="w-full"
            :icon="EnvelopeIcon"
            @click.stop="() => openContactMeFormDialog()"
          >
            {{ i18nStore.homePageI18nContent.contactMeButton.text }}
          </BaseButton>

          <span
            class="block text-white transition-sb-slow font-bebas"
            :class="[styleStore.textSizeXL]"
          >
            {{ i18nStore.currentLanguage === 'en' ? 'Or' : 'Oppure' }}
          </span>

          <BaseButton
            id="downloadCvButton"
            name="download_cv_button"
            aria-label="click to download cv"
            class="w-full"
            :icon="DocumentArrowDownIcon"
            @click="downloadCv()"
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
