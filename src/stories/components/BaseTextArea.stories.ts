import type { Meta, StoryObj } from '@storybook/vue3-vite';

import BaseTextArea from '@/components/base/text-area/BaseTextArea.vue';

const meta = {
  title: 'Components/Base/TextArea',
  component: BaseTextArea,
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      description: 'The textarea placeholder',
      control: {
        type: 'text',
      },
    },
    mandatory: {
      description: 'The textarea mandatory state',
      control: {
        type: 'boolean',
      },
    },
    maxlength: {
      description: 'The textarea maxlength attribute',
      control: {
        type: 'number',
      },
    },
    ariaLabel: {
      description: 'The textarea aria-label attribute',
      control: {
        type: 'text',
      },
    },
    id: {
      description: 'The textarea id attribute',
      control: {
        type: 'text',
      },
    },
    name: {
      description: 'The textarea name attribute',
      control: {
        type: 'text',
      },
    },
  },
  args: {
    inputValue: '',
    ariaLabel: 'textarea',
  },
} satisfies Meta<typeof BaseTextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultTextArea: Story = {};

export const PlaceholderTextArea: Story = {
  args: {
    ...meta.args,
    label: 'Placeholder textArea',
    placeholder: 'Placeholder text',
  },
};

export const MandatoryTextArea: Story = {
  args: {
    ...meta.args,
    label: 'Mandatory textArea',
    mandatory: true,
  },
};

export const MaxLengthTextArea: Story = {
  args: {
    ...meta.args,
    label: 'Max length textArea',
    maxlength: 10,
  },
};

export const ValidationTextArea: Story = {
  args: {
    ...meta.args,
    label: 'Validation textArea',
    mandatory: true,
    validation: {
      show: true,
      message: 'This field is required',
    },
  },
};
