import { defineStore } from 'pinia';
import type { Notification, NotificationCategory } from '@/types';
import { ref } from 'vue';
import { nanoid } from 'nanoid';

export const useNotificationStore = defineStore('notification', () => {
  // Reactive state for notification
  const notifications = ref<Notification[]>([]);

  const removeNotification = (notificationId: string): void => {
    notifications.value = notifications.value.filter((n) => n.id !== notificationId);
  };
  const pushNotification = (
    message: string,
    type: NotificationCategory,
    duration: number = 3000,
  ): void => {
    const notificationId = nanoid();

    notifications.value.push({
      id: notificationId,
      message,
      type,
      visibilityDuration: duration,
    });

    setTimeout(() => {
      removeNotification(notificationId);
    }, duration);
  };

  return {
    notifications,
    pushNotification,
  };
});
