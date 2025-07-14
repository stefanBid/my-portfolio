/* eslint-disable no-console */

import type { Meta, StoryObj } from '@storybook/vue3';
import { BaseDropdownMenu } from '@/components';

const meta = {
  title: 'Components/Base/DropdownMenu',
  component: BaseDropdownMenu,
  tags: ['autodocs'],
  argTypes: {
    options: {
      description: 'The dropdownMenu options',
      control: {
        type: 'object',
      },
    },
    label: {
      description: 'The dropdownMenu label',
      control: {
        type: 'text',
      },
    },
    icon: {
      description: 'The dropdownMenu icon',
      control: {
        type: 'object',
      },
    },
    zIndex: {
      description: 'The dropdownMenu z-index',
      control: {
        type: 'select',
      },
      options: ['z-sb-base-5', 'z-sb-dropdown'],
    },
    menuStrategy: {
      description: 'The dropdownMenu menu strategy',
      control: {
        type: 'select',
      },
      options: ['absolute', 'fixed'],
    },
    ariaLabel: {
      description: 'The dropdownMenu aria-label attribute',
      control: {
        type: 'text',
      },
    },
  },
  args: {
    label: 'Menu',
    options: [
      {
        id: 'option1',
        label: 'Option 1',
        onClick: () => console.log('Option 1 clicked'),
      },
      {
        id: 'option2',
        label: 'Option 2',
        onClick: () => console.log('Option 2 clicked'),
      },
      {
        id: 'option3',
        label: 'Option 3',
        onClick: () => console.log('Option 3 clicked'),
      },
    ],
    ariaLabel: 'dropdown-button',
  },
} satisfies Meta<typeof BaseDropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultDropdownMenu: Story = {
  args: {
    ...meta.args,
  },
};

export const DropdownMenuWithIcon: Story = {
  args: {
    ...meta.args,
    icon: 'circle-flags:it',
  },
};

export const DropdownMenuWithIconAndWithoutLabel: Story = {
  args: {
    ...meta.args,
    icon: 'circle-flags:it',
    label: undefined,
  },
};

export const AbsoluteDropdownMenu: Story = {
  args: {
    ...meta.args,
    menuStrategy: 'absolute',
  },
};

export const FixedDropdownMenu: Story = {
  args: {
    ...meta.args,
    menuStrategy: 'fixed',
  },
};
