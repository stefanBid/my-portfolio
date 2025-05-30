import type { Meta, StoryObj } from '@storybook/vue3';
import { BaseInput } from '@/components';
import { h } from 'vue';

const meta = {
  title: 'Components/Base/Input',
  component: BaseInput,
  tags: ['autodocs'],
  argTypes: {
    type: {
      description: 'The input type',
      control: { type: 'select' },
      options: ['text', 'search', 'email'],
    },
    placeholder: {
      description: 'The input placeholder',
      control: {
        type: 'text',
      },
    },
    mandatory: {
      description: 'The input mandatory state',
      control: {
        type: 'boolean',
      },
    },
    withMenu: {
      description: 'The input with menu state',
      control: {
        type: 'boolean',
      },
    },
    ariaLabel: {
      description: 'The input aria-label attribute',
      control: {
        type: 'text',
      },
    },
    id: {
      description: 'The input id attribute',
      control: {
        type: 'text',
      },
    },
    name: {
      description: 'The input name attribute',
      control: {
        type: 'text',
      },
    },
  },
  args: {
    inputValue: '',
    ariaLabel: 'input',
  },
} satisfies Meta<typeof BaseInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultInput: Story = {};

export const SearchInput: Story = {
  args: {
    ...meta.args,
    label: 'Search input',
    type: 'search',
  },
};

export const EmailInput: Story = {
  args: {
    ...meta.args,
    label: 'Email input',
    type: 'email',
  },
};

export const MandatoryInput: Story = {
  args: {
    ...meta.args,
    label: 'Mandatory input',
    mandatory: true,
  },
};

export const WithMenuInput: Story = {
  args: {
    ...meta.args,
    label: 'With menu input',
    withMenu: true,
    'input-menu-box': h('div', { class: 'h-[200px]' }, 'Menu content'),
  },
};

export const ValidationInput: Story = {
  args: {
    ...meta.args,
    label: 'Validation input',
    mandatory: true,
    validation: {
      show: true,
      message: 'This field is required',
    },
  },
};
