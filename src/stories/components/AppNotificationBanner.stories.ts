import type { Meta, StoryObj } from '@storybook/vue3-vite';
import AppNotificationBanner from '@/components/layouts/notification-container/notification-banner/AppNotificationBanner.vue';

const meta = {
  title: 'Components/Layout/NotificationBanner',
  component: AppNotificationBanner,
  tags: ['autodocs'],
  argTypes: {
    notification: {
      description: 'The notification message',
      control: {
        type: 'object',
      },
    },
  },
  args: {},
} satisfies Meta<typeof AppNotificationBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InfoNotification: Story = {
  args: {
    notification: {
      id: 'info-notification',
      type: 'info',
      message: 'This is an info notification',
      visibilityDuration: 5000,
    },
  },
};

export const SuccessNotification: Story = {
  args: {
    notification: {
      id: 'success-notification',
      type: 'success',
      message: 'This is a success notification',
      visibilityDuration: 5000,
    },
  },
};

export const ErrorNotification: Story = {
  args: {
    notification: {
      id: 'error-notification',
      type: 'error',
      message: 'This is an error notification',
      visibilityDuration: 5000,
    },
  },
};
