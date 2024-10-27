<script setup lang="ts">
import { useCommonStyleSingleton } from '@/hooks';
import type { NotificationType } from '@/types';
import { InformationCircleIcon, FaceFrownIcon, FaceSmileIcon } from '@heroicons/vue/24/solid';
import { type Component, computed, type FunctionalComponent } from 'vue';

interface TheNotificationBannerProps {
  message: string;
  type: NotificationType;
  show: boolean;
}

const props = defineProps<TheNotificationBannerProps>();

const { activeBreakpoint, containerPadding, iconSizeM, textSizeXS } = useCommonStyleSingleton();

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
</script>

<template>
  <transition name="stretch-fast">
    <div
      v-if="props.show"
      :class="[
        containerPadding,
        {
          'justify-start w-fit': activeBreakpoint !== 'xs',
          'justify-center w-full': activeBreakpoint === 'xs',
        },
      ]"
      class="fixed flex z-sb-notification bottom-5"
    >
      <div
        class="flex items-center px-4 py-1.5 overflow-hidden border-2 rounded-lg shadow-2xl transition-sb-slow shadow-black gap-x-3 z-sb-notification bg-sb-secondary-100 border-sb-secondary-100"
        :class="{
          'w-56': activeBreakpoint === 'sm' || activeBreakpoint === 'xs',
          'w-72': activeBreakpoint === 'md',
          'w-80':
            activeBreakpoint !== 'md' && activeBreakpoint !== 'sm' && activeBreakpoint !== 'xs',
        }"
      >
        <component
          :is="notificationIcon"
          :class="[iconSizeM]"
          class="text-sb-tertiary-100 shrink-0"
        />
        <span :class="[textSizeXS]" class="flex-1 text-left text-white text-sb-base font-roboto">
          {{ props.message }}
        </span>
      </div>
    </div>
  </transition>
</template>
