<script setup lang="ts">
import { onMounted, toRef } from 'vue';

import { useLocaleStore } from '@/stores';
import { useTypingText } from '@/hooks';
import { openLink, stringPurifier } from '@/utils';

import { Icon } from '@iconify/vue';
import BaseButton from '@/components/base/button/BaseButton.vue';
import MdiRocket from '~icons/mdi/rocket';
import MdiSkull from '~icons/mdi/skull';
import avatar from '@/assets/my-avatar.png';

// Input / Output (Props / Emits)
const props = withDefaults(
  defineProps<{
    dataFetched: boolean;
    error: string | null;
  }>(),
  {
    dataFetched: false,
    error: null,
  },
);

const lStore = useLocaleStore();

const { start, currentHtml, endTyping } = useTypingText(
  toRef(stringPurifier(lStore.t('welcomeGate.description'))),
);

const emit = defineEmits<{
  (e: 'change'): void;
}>();

onMounted(() => {
  start({
    typeSpeed: 10,
  });
});

// Template Data
const SOCIAL_BADGE_LINKS = [
  { icon: 'mdi:github', link: 'https://github.com/stefanBid' },
  {
    icon: 'fa6-brands:linkedin',
    link: 'https://www.linkedin.com/in/stefano-biddau/',
  },
  {
    icon: 'fa6-brands:instagram',
    link: 'https://www.instagram.com/stefano_bid/',
  },
];
</script>

<template>
  <!-- Layout Fullscreen FIXED -->
  <div
    class="fixed inset-0 z-[1300] flex h-dvh flex-col tot-gap-l bg-sb-main text-white container-tot-p overflow-y-auto"
  >
    <!-- Titolo -->
    <header class="shrink-0">
      <h1
        class="mx-auto max-w-6xl p-4 text-center font-bebas text-size-xl animate-scale-in-small transition-all duration-300 ease-in-out"
      >
        {{ lStore.t('welcomeGate.title') }}
      </h1>
    </header>

    <!-- Content -->
    <main
      class="flex grow flex-col lg:flex-row lg:items-start tot-gap-l transition-all duration-300 ease-in-out"
    >
      <!-- Text + Social + Button -->
      <section class="order-2 lg:order-1 w-full lg:flex-1 h-full">
        <div class="mx-auto flex h-full w-full">
          <div class="flex-1 overflow-auto pb-8">
            <p
              class="leading-relaxed text-center lg:text-left text-size-s font-roboto animate-scale-in-small transition-all duration-300 ease-in-out"
              v-html="currentHtml"
            ></p>

            <!-- Socials -->
            <transition name="scale-and-fade-fast">
              <div
                v-if="endTyping"
                id="social-media"
                class="flex w-full justify-center lg:justify-end tot-gap-s mt-6"
              >
                <BaseButton
                  v-for="(social, index) in SOCIAL_BADGE_LINKS"
                  :key="index"
                  size="small"
                  variant="tertiary"
                >
                  <Icon
                    :icon="social.icon"
                    class="icon-size-xs"
                    @click.stop="openLink(social.link)"
                    @keydown.enter.stop="openLink(social.link)"
                  />
                </BaseButton>
              </div>
            </transition>

            <!-- Explore Button -->
            <transition name="scale-and-fade-fast">
              <div
                v-if="endTyping"
                id="exploreWebsiteButton"
                class="flex mt-6 justify-center w-full"
              >
                <BaseButton
                  variant="white"
                  :disabled="props.error ? true : false"
                  :is-loading="!props.dataFetched"
                  :icon="props.error ? MdiSkull : MdiRocket"
                  @click="emit('change')"
                >
                  {{ props.error ? '' : lStore.t('welcomeGate.cta') }}
                </BaseButton>
              </div>
            </transition>
          </div>
        </div>
      </section>

      <!-- Photo -->
      <section
        class="order-1 lg:order-2 flex justify-center w-full lg:w-fit animate-scale-in-small transition-all duration-300 ease-in-out"
      >
        <img
          :src="avatar"
          alt="Welcome Cover"
          class="block mx-auto h-auto w-auto max-w-[80vw] max-h-[50vh] lg:max-h-[70vh] lg:max-w-[420px] object-contain transition-all duration-300 ease-in-out"
        />
      </section>
    </main>
  </div>
</template>
