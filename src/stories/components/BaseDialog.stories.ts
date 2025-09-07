import { ref } from 'vue';
import type { Meta, StoryFn } from '@storybook/vue3-vite';

import BaseDialog from '@/components/base/dialog/BaseDialog.vue';
import BaseButton from '@/components/base/button/BaseButton.vue';

export default {
  title: 'Components/Base/Dialog',
  component: BaseDialog,
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      description: 'The dialog open state',
      control: {
        type: 'boolean',
      },
    },
    headerOrientation: {
      description: 'The dialog header orientation',
      control: {
        type: 'select',
      },
      options: ['left', 'center', 'right'],
    },
    dialogSize: {
      description: 'The dialog size',
      control: {
        type: 'select',
      },
      options: ['small', 'medium', 'large'],
    },
    blockDialogHeight: {
      description: 'The dialog height',
      control: {
        type: 'boolean',
      },
    },
    dialogTitle: {
      description: 'The dialog title',
      control: {
        type: 'text',
      },
    },

    'modal-content': {
      description: 'The dialog content',
      control: {
        type: 'text',
      },
    },
    onCloseDialog: {
      description: 'The dialog close event',
      action: 'close',
    },
  },
} as Meta<typeof BaseDialog>;

// Template per la storia
const Template: StoryFn<typeof BaseDialog> = (args) => ({
  components: { BaseDialog, BaseButton },
  setup() {
    const isOpen = ref(false);

    const openDialog = (): void => {
      isOpen.value = true;
    };

    const closeDialog = (falsyValue: boolean): void => {
      isOpen.value = falsyValue;
    };

    return { isOpen, openDialog, closeDialog, args };
  },
  template: `
    <div>
      <BaseButton content-size="small" spacing-size="small" @click="openDialog">Open Dialog</BaseButton>
      <BaseDialog v-bind="args" :is-open="isOpen" :on-close-dialog="falsyValue => closeDialog(falsyValue)">
        <template #modal-content>
          <div class="h-full w-full flex overflow-y-auto">
            <p class="text-white font-roboto">
              Ea irure anim culpa minim. Eiusmod irure velit minim Lorem ad deserunt non culpa cupidatat exercitation quis. Cillum enim dolor qui ullamco ad. Laborum tempor eiusmod laboris ea nulla. Cillum aliqua eu et aliquip veniam.
              Non incididunt anim quis nisi. Esse irure consequat voluptate dolor culpa voluptate irure. Ipsum cillum sit ut nisi eu nisi aute dolore consectetur. Culpa consectetur commodo voluptate culpa aliquip irure aliqua reprehenderit do cupidatat magna. Duis officia quis pariatur nisi officia amet amet qui mollit voluptate amet pariatur veniam excepteur. Nisi excepteur elit deserunt aliquip culpa anim. Eu magna quis quis adipisicing velit aliqua est duis occaecat anim quis irure nostrud incididunt.
              Consectetur dolor sint ut veniam eu adipisicing sit enim elit cillum laboris duis ut. Qui sit veniam minim ut sunt aliqua cupidatat voluptate laboris et voluptate. Elit laboris officia ut id sint non Lorem. Nisi pariatur eiusmod reprehenderit occaecat fugiat esse et ut aliquip cillum veniam minim nulla exercitation. Culpa nulla ut consequat nostrud deserunt Lorem nisi nostrud esse pariatur consectetur.
              Aliquip irure quis minim elit labore commodo adipisicing sunt aliqua laborum. Laborum proident ut tempor nisi elit proident culpa nostrud eu veniam occaecat nostrud amet. Id minim ex non aliqua qui ex nulla non anim magna exercitation. Nulla pariatur ex laboris enim.
              Ea irure anim culpa minim. Eiusmod irure velit minim Lorem ad deserunt non culpa cupidatat exercitation quis. Cillum enim dolor qui ullamco ad. Laborum tempor eiusmod laboris ea nulla. Cillum aliqua eu et aliquip veniam.
              Non incididunt anim quis nisi. Esse irure consequat voluptate dolor culpa voluptate irure. Ipsum cillum sit ut nisi eu nisi aute dolore consectetur. Culpa consectetur commodo voluptate culpa aliquip irure aliqua reprehenderit do cupidatat magna. Duis officia quis pariatur nisi officia amet amet qui mollit voluptate amet pariatur veniam excepteur. Nisi excepteur elit deserunt aliquip culpa anim. Eu magna quis quis adipisicing velit aliqua est duis occaecat anim quis irure nostrud incididunt.
              Consectetur dolor sint ut veniam eu adipisicing sit enim elit cillum laboris duis ut. Qui sit veniam minim ut sunt aliqua cupidatat voluptate laboris et voluptate. Elit laboris officia ut id sint non Lorem. Nisi pariatur eiusmod reprehenderit occaecat fugiat esse et ut aliquip cillum veniam minim nulla exercitation. Culpa nulla ut consequat nostrud deserunt Lorem nisi nostrud esse pariatur consectetur.
              Aliquip irure quis minim elit labore commodo adipisicing sunt aliqua laborum. Laborum proident ut tempor nisi elit proident culpa nostrud eu veniam occaecat nostrud amet. Id minim ex non aliqua qui ex nulla non anim magna exercitation. Nulla pariatur ex laboris enim.
            </p>
          </div>
        </template>
      </BaseDialog>
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  dialogTitle: 'Dialog Title',
};

export const CenterHeader = Template.bind({});
CenterHeader.args = {
  dialogTitle: 'Dialog Title',
  headerOrientation: 'center',
};

export const MediumDialog = Template.bind({});
MediumDialog.args = {
  dialogTitle: 'Dialog Title',
  dialogSize: 'medium',
};

export const SmallDialog = Template.bind({});
SmallDialog.args = {
  dialogTitle: 'Dialog Title',
  dialogSize: 'small',
};

export const BlockDialogHeight = Template.bind({});
BlockDialogHeight.args = {
  dialogTitle: 'Dialog Title',
  blockDialogHeight: true,
};
