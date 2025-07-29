import { defineStore } from 'pinia';
import type { Notification, NotificationCategory } from '@/types';
import { ref } from 'vue';
import { nanoid } from 'nanoid';

export const useNotificationStore = defineStore('notification', () => {
  // Reactive state for notification
  const notifications = ref<Notification[]>([]);
  const timeoutIds = new Map<string, ReturnType<typeof setTimeout>>();

  const removeNotification = (notificationId: string): void => {
    const timeout = timeoutIds.get(notificationId);
    if (timeout) {
      clearTimeout(timeout);
      timeoutIds.delete(notificationId);
    }
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

    const timeout = setTimeout(() => {
      removeNotification(notificationId);
    }, duration);

    timeoutIds.set(notificationId, timeout);
  };

  return {
    notifications,
    pushNotification,
  };
});
