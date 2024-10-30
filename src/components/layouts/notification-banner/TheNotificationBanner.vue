<script setup lang="ts">
import { useCommonStyleSingleton } from '@/hooks';
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

const { activeBreakpoint, iconSizeM, textSizeXS } = useCommonStyleSingleton();

// Feature 2: Manage Icons
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

// Feature 3: Manage Countdown
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
    class="flex gap-x-4 items-end justify-between px-4 py-1.5 border-2 rounded-lg shadow-2xl transition-sb-slow shadow-black bg-sb-secondary-100 border-sb-secondary-100"
    :class="{
      'w-72': activeBreakpoint === 'sm' || activeBreakpoint === 'xs',
      'w-80': activeBreakpoint === 'md',
      'w-96': activeBreakpoint !== 'md' && activeBreakpoint !== 'sm' && activeBreakpoint !== 'xs',
    }"
  >
    <div class="inline-flex items-center flex-1 gap-x-2">
      <component
        :is="notificationIcon"
        :class="[iconSizeM]"
        class="text-sb-tertiary-100 shrink-0"
      />
      <span :class="[textSizeXS]" class="text-left text-white text-sb-base font-roboto">
        {{ props.notification.message }}
      </span>
    </div>
    <span :class="[textSizeXS]" class="text-left text-white text-sb-base font-roboto">
      {{ countdown }}s
    </span>
  </div>
</template>
