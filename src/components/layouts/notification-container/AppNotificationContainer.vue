<script setup lang="ts">
import { useNotificationStore } from '@/stores';
import AppNotificationContainer from '@/components/layouts/notification-container/notification-banner/AppNotificationBanner.vue';

const notificationStore = useNotificationStore();
</script>

<template>
  <div
    class="fixed z-[1400] w-fit tot-gap-m flex flex-col items-center transition-all duration-300 ease-in-out left-1/2 -translate-x-1/2 bottom-4 sm:left-auto sm:translate-x-0 sm:right-4 md:right-5 md:bottom-5 lg:right-8 lg:bottom-8"
  >
    <transition-group name="scale-and-fade-fast">
      <AppNotificationContainer
        v-for="notification in notificationStore.notifications"
        :key="notification.id"
        :notification="notification"
      />
    </transition-group>
  </div>
</template>
