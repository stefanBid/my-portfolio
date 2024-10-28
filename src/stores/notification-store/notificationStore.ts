import { defineStore } from 'pinia';
import type { NotificationCategory } from '@/types';

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    isNotificationVisible: false,
    notificationMessage: '',
    notificationType: 'info' as NotificationCategory,
  }),

  actions: {
    showNotification(message: string, type: 'info' | 'success' | 'warning' | 'error') {
      this.isNotificationVisible = true;
      this.notificationMessage = message;
      this.notificationType = type;

      setTimeout(() => {
        this.isNotificationVisible = false;
      }, 3000);
    },
  },
});
