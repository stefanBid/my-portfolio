<script setup lang="ts">
import type { Notification } from '@/types';
import MdiErrorOutline from '~icons/mdi/error-outline';
import MdiSuccessBold from '~icons/mdi/success-bold';
import MdiInformationSlabCircleOutline from '~icons/mdi/information-slab-circle-outline';

import {
  type Component,
  computed,
  type FunctionalComponent,
  onMounted,
  onUnmounted,
  ref,
} from 'vue';

interface AppNotificationBannerProps {
  notification: Notification;
}

const props = defineProps<AppNotificationBannerProps>();

// Feature 1: Manage Nofitification Icon
const notificationIcon = computed<FunctionalComponent | Component | string>(() => {
  switch (props.notification.type) {
    case 'success':
      return MdiSuccessBold;
    case 'error':
      return MdiErrorOutline;
    case 'info':
      return MdiInformationSlabCircleOutline;
    default:
      return MdiInformationSlabCircleOutline;
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
    class="tot-gap-m flex items-end justify-between border-2 rounded-lg shadow-xl shadow-black bg-sb-secondary-100 border-sb-secondary-100 py-1.5 px-2 sm:px-2.5 md:px-3 w-72 sm:w-80 md:w-96 transition-all duration-300 ease-in-out"
  >
    <div class="inline-flex items-center flex-1 gap-2">
      <component :is="notificationIcon" class="text-sb-secondary-300 shrink-0 icon-size-m" />
      <span class="text-left text-white text-sb-base font-roboto text-size-xs">
        {{ props.notification.message }}
      </span>
    </div>
    <span class="text-left text-white text-sb-base font-roboto text-size-xs">
      {{ countdown }}s
    </span>
  </div>
</template>
