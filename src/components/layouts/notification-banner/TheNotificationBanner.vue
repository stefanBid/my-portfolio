<script setup lang="ts">
import { useStyleStore } from '@/stores';
import type { Notification } from '@/types';
import { InformationCircleIcon, FaceFrownIcon, FaceSmileIcon } from '@heroicons/vue/24/solid';
import {
  type Component,
  computed,
  type FunctionalComponent,
  onMounted,
  onUnmounted,
  ref,
} from 'vue';

interface TheNotificationBannerProps {
  notification: Notification;
}

const props = defineProps<TheNotificationBannerProps>();

// Store Declarations
const styleStore = useStyleStore();

// Feature 1: Manage Nofitification Icon
const notificationIcon = computed<FunctionalComponent | Component | string>(() => {
  switch (props.notification.type) {
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

// Feature 2: Manage Countdown
const countdown = ref(Math.ceil(props.notification.visibilityDuration / 1000));
let interval: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  interval = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value -= 1;
    } else {
      clearInterval(interval!);
    }
  }, 1000);
});

onUnmounted(() => {
  if (interval) clearInterval(interval);
});
</script>

<template>
  <div
    class="flex items-end justify-between py-1.5 border-2 rounded-lg shadow-2xl transition-all duration-300 ease-in-out shadow-black bg-sb-secondary-100 border-sb-secondary-100"
    :class="[
      styleStore.elementTotalPaddingS,
      styleStore.elementTotalGapS,
      {
        'w-72 px-2.5': styleStore.activeBreakpoint === 'sm' || styleStore.activeBreakpoint === 'xs',
        'w-80 px-3': styleStore.activeBreakpoint === 'md',
        'w-96 px-4':
          styleStore.activeBreakpoint !== 'md' &&
          styleStore.activeBreakpoint !== 'sm' &&
          styleStore.activeBreakpoint !== 'xs',
      },
    ]"
  >
    <div class="inline-flex items-center flex-1 gap-2">
      <component
        :is="notificationIcon"
        :class="[styleStore.iconSizeM]"
        class="text-sb-tertiary-100 shrink-0"
      />
      <span :class="[styleStore.textSizeXS]" class="text-left text-white text-sb-base font-roboto">
        {{ props.notification.message }}
      </span>
    </div>
    <span :class="[styleStore.textSizeXS]" class="text-left text-white text-sb-base font-roboto">
      {{ countdown }}s
    </span>
  </div>
</template>
