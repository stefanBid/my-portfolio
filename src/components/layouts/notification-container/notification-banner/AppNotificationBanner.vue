<script setup lang="ts">
import type { UINotification } from '@/types';
import MdiSkull from '~icons/mdi/skull';
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
  notification: UINotification;
}
// Input / Output (Props / Emits)
const props = defineProps<AppNotificationBannerProps>();

// State
const countdown = ref(Math.ceil(props.notification.visibilityDuration / 1000));
let interval: ReturnType<typeof setInterval> | null = null;

const notificationIcon = computed<FunctionalComponent | Component | string>(() => {
  switch (props.notification.type) {
    case 'success':
      return MdiSuccessBold;
    case 'error':
      return MdiSkull;
    case 'info':
      return MdiInformationSlabCircleOutline;
    default:
      return MdiInformationSlabCircleOutline;
  }
});

// Events
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
    :class="{
      'bg-sb-secondary-100/60 border-sb-secondary-100': props.notification.type === 'info',
      'bg-sb-success border-sb-success-light': props.notification.type === 'success',
      'bg-sb-error border-sb-error-light': props.notification.type === 'error',
    }"
    class="tot-gap-m flex items-center justify-between border-l-8 rounded-lg shadow-xl shadow-black min-h-12 md:min-h-14 lg:min-h-16 py-1.5 px-2 sm:px-2.5 md:px-3 w-72 md:w-80 lg:w-96 transition-all duration-300 ease-in-out"
  >
    <div class="inline-flex items-center flex-1 gap-2">
      <component :is="notificationIcon" class="shrink-0 icon-size-m text-white" />
      <span
        class="text-left text-white text-sb-base font-roboto text-size-xs transition-all duration-300 ease-in-out"
      >
        {{ props.notification.message }}
      </span>
    </div>
    <span class="text-left text-white text-sb-base font-roboto text-size-xs">
      {{ countdown }}s
    </span>
  </div>
</template>
