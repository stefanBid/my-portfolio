<script setup lang="ts">
import { computed, onMounted, ref, h } from 'vue';
import { storeToRefs } from 'pinia';
import { useHead } from '@unhead/vue';

import { useTypingText } from '@/hooks';
import { useLocaleStore, usePortfolioStore } from '@/stores';
import { downloadCv } from '@/utils';

import { Icon } from '@iconify/vue';

import BaseButton from '@/components/base/button/BaseButton.vue';
import ContactMeFormDialog from '@/pages/home-page/components/ContactMeFormDialog.vue';

// Dependencies
const { homeData } = storeToRefs(usePortfolioStore());
const lStore = useLocaleStore();

// State
const texts = computed(() => homeData.value.thirdHeading || []);
const isModalOpen = ref(false);

const { start, currentTxt } = useTypingText(texts);

useHead({
  title: computed(() => homeData.value.pageMeta.title),
  meta: computed(() => [
    {
      name: 'description',
      content: homeData.value.pageMeta.description,
    },
  ]),
});

// Events
const onOpenContactMeForm = (): void => {
  isModalOpen.value = true;
};

const onCloseContactMeForm = (falsyValue: false): void => {
  isModalOpen.value = falsyValue;
};

onMounted(() => {
  start();
});
</script>

<template>
  <div class="relative w-full h-screen overflow-x-hidden bg-sb-main">
    <!-- Background -->
    <video
      :src="homeData.backgroundVideo.url || ''"
      :poster="homeData.backgroundVideoCover?.formats?.large.url || ''"
      class="absolute inset-0 object-cover object-center w-full h-full pointer-events-none"
      autoplay
      loop
      muted
      playsinline
    ></video>

    <!-- Overlay -->
    <div class="absolute inset-0 bg-black z-[100] opacity-30"></div>
    <div
      class="absolute inset-0 flex w-full h-full flex-col gap-y-12 justify-center items-center lg:flex-row lg:items-center lg:justify-between pt-14 sm:pt-[3.75rem] md:pt-16 lg:pt-20 z-[200] container-p animate-scale-in-small"
    >
      <div
        class="flex flex-col justify-center text-center items-center lg:h-full lg:text-left lg:items-start w-full transition-all duration-300 ease-in-out border-white gap-y-4 font-bebas"
      >
        <h2
          class="text-white whitespace-normal transition-all duration-300 ease-in-out text-size-xl"
        >
          {{ homeData.firstHeading }}
        </h2>
        <div
          class="rounded-xl rotate-3 bg-white inline-flex items-center justify-center p-0.5 w-fit h-fit"
        >
          <h1
            class="leading-none text-black whitespace-normal transition-all duration-300 ease-in-out text-sb-4xl sm:text-sb-5xl md:text-sb-6xl lg:text-sb-7xl leading-tight; px-2.5 py-0.5 mx-auto sm:px-3 sm:py-1 md:px-3 md:py-1 lg:px-4 lg:py-2 lg:mx-0"
          >
            {{ homeData.secondHeading }}
          </h1>
        </div>
        <h2
          class="text-white whitespace-normal transition-all duration-300 ease-in-out text-size-xl"
        >
          {{ lStore.t('homePage.presentationTitle') }} {{ currentTxt }}_
        </h2>
      </div>

      <div
        class="flex flex-col items-center justify-center transition-all duration-300 ease-in-out shrink-0 w-fit md:min-w-52 h-fit lg:h-full"
      >
        <BaseButton
          id="contactMeButton"
          name="contact_me_button"
          aria-label="click to open contact me form"
          class="w-full"
          :icon="h(Icon, { icon: homeData.contactCta.icon || '' })"
          @click.stop="onOpenContactMeForm"
        >
          {{ homeData.contactCta.text }}
        </BaseButton>

        <span
          class="block text-white transition-all duration-300 ease-in-out font-bebas text-size-xl py-2 sm:py-4 md:py-4 lg:py-6"
        >
          {{ lStore.t('homePage.buttonsDivider') }}
        </span>

        <BaseButton
          id="downloadCvButton"
          name="download_cv_button"
          aria-label="click to download cv"
          class="w-full"
          :disabled="!homeData.downloadCvCta.link"
          :icon="h(Icon, { icon: homeData.downloadCvCta.icon || '' })"
          @click.stop="
            () =>
              homeData.downloadCvCta.link
                ? downloadCv(homeData.downloadCvCta.link, 'CV-Stefano-Biddau.pdf')
                : undefined
          "
        >
          {{ homeData.downloadCvCta.text }}
        </BaseButton>
      </div>
    </div>
  </div>
  <ContactMeFormDialog :is-modal-open="isModalOpen" :handle-close-modal="onCloseContactMeForm" />
</template>
