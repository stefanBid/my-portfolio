<script setup lang="ts">
import { DocumentArrowDownIcon, EnvelopeIcon } from '@heroicons/vue/24/solid';
import { computed, onMounted, ref } from 'vue';
import ContactMeFormDialog from '@/pages/home-page/components/ContactMeFormDialog.vue';
import { DOCS, VIDEOS } from '@/constants';
import { BaseButton } from '@/components';
import { useTypingText, usePageMeta } from '@/hooks';
import { useI18nStore, useStyleStore } from '@/stores';
import { downloadCv } from '@/utils';

// Store Declarations
const styleStore = useStyleStore();
const i18nStore = useI18nStore();

// SEO Feature Manage Meta Tags
usePageMeta({
  meta: computed(() => i18nStore.homePageI18nContent.metaDescription),
  currentLang: computed(() => i18nStore.currentLanguage),
  url: 'https://www.stefano-biddau.com',
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
      :src="VIDEOS.backgroundCoverVideo"
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
          class="flex flex-col justify-center w-full transition-all duration-300 ease-in-out border-white gap-y-4 font-bebas"
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
            class="text-white whitespace-normal transition-all duration-300 ease-in-out"
            :class="[styleStore.textSizeXL]"
          >
            {{ i18nStore.homePageI18nContent.firstHeading }}
          </h2>
          <div
            class="rounded-xl rotate-3 bg-white inline-flex items-center justify-center p-0.5 w-fit h-fit"
          >
            <h1
              class="leading-none text-black whitespace-normal transition-all duration-300 ease-in-out"
              :class="[
                styleStore.textSizeXXL,
                {
                  'px-2.5 py-0.5':
                    styleStore.activeBreakpoint === 'xs' || styleStore.activeBreakpoint === 'sm',
                  'px-3 py-1': styleStore.activeBreakpoint === 'md',
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
          </div>
          <h2
            class="text-white whitespace-normal transition-all duration-300 ease-in-out"
            :class="[styleStore.textSizeXL]"
          >
            {{ i18nStore.currentLanguage === 'en' ? `And I'm a` : `E sono uno` }} {{ currentTxt }}_
          </h2>
        </div>
      </transition>
      <transition name="scale-and-fade-slow">
        <div
          v-if="show"
          class="flex flex-col items-center justify-center transition-all duration-300 ease-in-out shrink-0 w-fit"
          :class="[
            styleStore.elementTotalGapS,
            {
              'h-full':
                styleStore.activeBreakpoint !== 'xs' &&
                styleStore.activeBreakpoint !== 'sm' &&
                styleStore.activeBreakpoint !== 'md',
            },
          ]"
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
            class="block text-white transition-all duration-300 ease-in-out font-bebas"
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
            @click.stop="downloadCv(DOCS.cvDoc, 'CV-Stefano-Biddau.pdf')"
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
