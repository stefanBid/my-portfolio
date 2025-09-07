<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import { useTypingText, usePageMeta } from '@/hooks';
import { useI18nStore } from '@/stores';
import { downloadCv } from '@/utils';

import BaseButton from '@/components/base/button/BaseButton.vue';
import ContactMeFormDialog from '@/pages/home-page/components/ContactMeFormDialog.vue';

import backgroundCover from '@/assets/videos/background-cover.mp4';

import MdiCloudDownload from '~icons/mdi/cloud-download';
import MdiEmailEdit from '~icons/mdi/email-edit';

// Store Declarations
const i18nStore = useI18nStore();

// SEO Feature Manage Meta Tags
usePageMeta({
  meta: computed(() => i18nStore.homePageI18nContent.metaDescription),
  currentLang: computed(() => i18nStore.currentLanguage),
  url: 'https://stefanobiddau.com/',
  image:
    'https://media.licdn.com/dms/image/v2/D4D03AQGvfHWN3w4Vyw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1674322166521?e=1749081600&v=beta&t=LGlVPU_6C_nOJY5QkpcWvebJvEZSdCihzcHWz-IpSb4',
});

// Feature 1: Machine Typing Effect
const texts = computed(() => i18nStore.homePageI18nContent.thirdHeading);

const { currentTxt } = useTypingText(texts);

// Feature 2: Manage effects
const show = ref(false);

onMounted(() => {
  show.value = true;
});

// Feature 3: Manage Contact Me Dialog Form
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
      :src="backgroundCover"
      poster="../../assets/videos/poster_video.png"
      class="absolute inset-0 object-cover object-center w-full h-full pointer-events-none"
      autoplay
      loop
      muted
      playsinline
    ></video>

    <!-- Overlay -->
    <div class="absolute inset-0 bg-black z-[100] opacity-30"></div>
    <transition name="scale-and-fade-slow">
      <div
        v-if="show"
        class="absolute inset-0 flex w-full h-full flex-col gap-y-12 justify-center items-center lg:flex-row lg:items-center lg:justify-between pt-14 sm:pt-[3.75rem] md:pt-16 lg:pt-20 z-[200] container-p"
      >
        <div
          class="flex flex-col justify-center text-center items-center lg:h-full lg:text-left lg:items-start w-full transition-all duration-300 ease-in-out border-white gap-y-4 font-bebas"
        >
          <h2
            class="text-white whitespace-normal transition-all duration-300 ease-in-out text-size-xl"
          >
            {{ i18nStore.homePageI18nContent.firstHeading }}
          </h2>
          <div
            class="rounded-xl rotate-3 bg-white inline-flex items-center justify-center p-0.5 w-fit h-fit"
          >
            <h1
              class="leading-none text-black whitespace-normal transition-all duration-300 ease-in-out text-sb-4xl sm:text-sb-5xl md:text-sb-6xl lg:text-sb-7xl leading-tight; px-2.5 py-0.5 mx-auto sm:px-3 sm:py-1 md:px-3 md:py-1 lg:px-4 lg:py-2 lg:mx-0"
            >
              {{ i18nStore.homePageI18nContent.secondHeading }}
            </h1>
          </div>
          <h2
            class="text-white whitespace-normal transition-all duration-300 ease-in-out text-size-xl"
          >
            {{ i18nStore.currentLanguage === 'en' ? `And I'm a` : `E sono uno` }} {{ currentTxt }}_
          </h2>
        </div>

        <div
          class="flex flex-col items-center justify-center transition-all duration-300 ease-in-out shrink-0 w-fit h-fit lg:h-full"
        >
          <BaseButton
            id="contactMeButton"
            name="contact_me_button"
            aria-label="click to open contact me form"
            class="w-full"
            :icon="MdiEmailEdit"
            @click.stop="openContactMeFormDialog"
          >
            {{ i18nStore.homePageI18nContent.contactMeButton.text }}
          </BaseButton>

          <span
            class="block text-white transition-all duration-300 ease-in-out font-bebas text-size-xl py-2 sm:py-4 md:py-4 lg:py-6"
          >
            {{ i18nStore.currentLanguage === 'en' ? 'Or' : 'Oppure' }}
          </span>

          <BaseButton
            id="downloadCvButton"
            name="download_cv_button"
            aria-label="click to download cv"
            class="w-full"
            :disabled="!i18nStore.homePageI18nContent.downloadCvButton.link"
            :icon="MdiCloudDownload"
            @click.stop="
              () =>
                i18nStore.homePageI18nContent.downloadCvButton.link
                  ? downloadCv(
                      i18nStore.homePageI18nContent.downloadCvButton.link,
                      'CV-Stefano-Biddau.pdf',
                    )
                  : undefined
            "
          >
            {{ i18nStore.homePageI18nContent.downloadCvButton.text }}
          </BaseButton>
        </div>
      </div>
    </transition>
  </div>
  <ContactMeFormDialog
    :is-modal-open="isModalOpen"
    :handle-close-modal="(falsyValue) => changeVisibility(falsyValue)"
  />
</template>
