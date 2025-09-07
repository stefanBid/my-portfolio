import type { Meta, StoryObj } from '@storybook/vue3-vite';

import BaseCheckbox from '@/components/base/checkbox/BaseCheckbox.vue';

const meta = {
  title: 'Components/Base/Checkbox',
  component: BaseCheckbox,
  tags: ['autodocs'],
  argTypes: {
    'label-content': {
      description: 'The checkbox label content',
      control: {
        type: 'text',
      },
    },
    value: {
      description: 'The checkbox value',
      control: {
        type: 'text',
      },
    },
    validation: {
      description: 'The checkbox validation state',
      control: {
        type: 'object',
      },
    },
    ariaLabel: {
      description: 'The checkbox aria-label attribute',
      control: {
        type: 'text',
      },
    },
    id: {
      description: 'The checkbox id attribute',
      control: {
        type: 'text',
      },
    },
    name: {
      description: 'The checkbox name attribute',
      control: {
        type: 'text',
      },
    },
  },
  args: {
    'label-content':
      'Est pariatur sint occaecat eiusmod nostrud exercitation aute ad voluptate incididunt. Magna sunt irure sunt excepteur fugiat excepteur irure aute dolore cillum ea ex cillum. Sit anim commodo do velit ea et cupidatat pariatur nisi dolor laboris eiusmod in consequat. Pariatur id veniam esse excepteur elit irure elit dolor veniam magna. Quis et voluptate ad ut voluptate mollit deserunt mollit aliquip ipsum consequat eiusmod consectetur do. Nisi aute veniam nulla deserunt officia. Excepteur anim elit labore cillum Lorem laborum deserunt pariatur aliqua minim officia ad.',
    ariaLabel: 'input',
  },
} satisfies Meta<typeof BaseCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CheckedCheckbox: Story = {
  args: {
    class: 'bg-[#0F0F20] text-white',
    ...meta.args,
    checked: true,
  },
};

export const UncheckedCheckbox: Story = {
  args: {
    class: 'bg-[#0F0F20] text-white',
    ...meta.args,
    checked: false,
  },
};

export const ValidationCheckbox: Story = {
  args: {
    class: 'bg-[#0F0F20] text-white',
    ...meta.args,
    checked: false,
    validation: {
      show: true,
    },
  },
};
