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
      'bottom-5 right-[5%] w-fit': styleStore.activeBreakpoint !== 'xs',
      'bottom-5 right-[6%] w-fit': styleStore.activeBreakpoint === 'md',
      'bottom-5 right-[7%] w-fit':
        styleStore.activeBreakpoint !== 'xs' &&
        styleStore.activeBreakpoint !== 'sm' &&
        styleStore.activeBreakpoint !== 'md',
      'bottom-5 left-1/2 transform -translate-x-1/2 w-fit': styleStore.activeBreakpoint === 'xs',
    }"
    class="fixed flex flex-col items-center z-sb-notification w-fit gap-y-6"
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
