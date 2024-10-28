<script setup lang="ts">
import { useCommonStyleSingleton } from '@/hooks';
import type { NotificationCategory } from '@/types';
import { InformationCircleIcon, FaceFrownIcon, FaceSmileIcon } from '@heroicons/vue/24/solid';
import { type Component, computed, type FunctionalComponent, ref, watch } from 'vue';

interface TheNotificationBannerProps {
  message: string;
  type: NotificationCategory;
  show: boolean;
}

const props = defineProps<TheNotificationBannerProps>();

const { activeBreakpoint, containerPadding, iconSizeM, textSizeXS } = useCommonStyleSingleton();

// Feature 2: Manage Icons
const notificationIcon = computed<FunctionalComponent | Component | string>(() => {
  switch (props.type) {
    case 'success':
      return FaceSmileIcon;
    case 'error':
      return FaceFrownIcon;
    case 'info':
      return InformationCircleIcon;
    default:
      return InformationCircleIcon;
  }
});

// Feature 3: Manage Countdown
const countdown = ref(3);
let interval: ReturnType<typeof setInterval> | null = null;

const startCountdown = (): void => {
  stopCountdown();
  interval = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--;
    } else {
      stopCountdown();
    }
  }, 1000);
};

const stopCountdown = (): void => {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
};

watch(
  () => props.show,
  (newValue) => {
    if (newValue) {
      countdown.value = 3;
      startCountdown();
    } else {
      stopCountdown();
    }
  },
);
</script>

<template>
  <transition name="stretch-fast">
    <div
      v-if="props.show"
      :class="[
        containerPadding,
        {
          'w-fit justify-start': activeBreakpoint !== 'xs',
          'w-full justify-center': activeBreakpoint === 'xs',
        },
      ]"
      class="fixed flex z-sb-notification bottom-5"
    >
      <div
        class="flex gap-x-4 items-end justify-between px-4 py-1.5 border-2 rounded-lg shadow-2xl transition-sb-slow shadow-black z-sb-notification bg-sb-secondary-100 border-sb-secondary-100"
        :class="{
          'w-72': activeBreakpoint === 'sm' || activeBreakpoint === 'xs',
          'w-80': activeBreakpoint === 'md',
          'w-96':
            activeBreakpoint !== 'md' && activeBreakpoint !== 'sm' && activeBreakpoint !== 'xs',
        }"
      >
        <div class="inline-flex items-center flex-1 gap-x-2">
          <component
            :is="notificationIcon"
            :class="[iconSizeM]"
            class="text-sb-tertiary-100 shrink-0"
          />
          <span :class="[textSizeXS]" class="text-left text-white text-sb-base font-roboto">
            {{ props.message }}
          </span>
        </div>
        <span :class="[textSizeXS]" class="text-left text-white text-sb-base font-roboto">
          {{ countdown }}s
        </span>
      </div>
    </div>
  </transition>
</template>
