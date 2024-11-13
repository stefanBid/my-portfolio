<script setup lang="ts">
import { inject, Ref } from 'vue';
import { RouterView } from 'vue-router';
import { useNotificationStore, useStyleStore } from '@/stores';

import { TheHeader, ThePageLoader, TheNotificationBanner } from '@/components';

// Store Declarations
const styleStore = useStyleStore();
const notificationStore = useNotificationStore();

const isLoading = inject<Ref<boolean>>('isLoading');
</script>

<template>
  <TheHeader />

  <ThePageLoader v-if="isLoading" />
  <div v-if="!isLoading" class="min-h-screen">
    <RouterView />
  </div>

  <div
    :class="{
      'right-[5%]': styleStore.activeBreakpoint === 'sm',
      'right-[6%]': styleStore.activeBreakpoint === 'md',
      'right-[7%]':
        styleStore.activeBreakpoint !== 'xs' &&
        styleStore.activeBreakpoint !== 'sm' &&
        styleStore.activeBreakpoint !== 'md',
      'left-1/2 transform -translate-x-1/2': styleStore.activeBreakpoint === 'xs',
    }"
    class="fixed flex flex-col items-center z-sb-notification w-fit gap-y-6 bottom-5"
  >
    <transition-group name="scale-and-fade-fast">
      <TheNotificationBanner
        v-for="notification in notificationStore.notifications"
        :key="notification.id"
        :notification="notification"
      />
    </transition-group>
  </div>
</template>
