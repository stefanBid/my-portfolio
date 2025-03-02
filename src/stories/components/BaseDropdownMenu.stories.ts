import { HomeIcon } from '@heroicons/vue/24/outline';
import type { Meta, StoryObj } from '@storybook/vue3';
import { BaseDropdownMenu } from '@/components';
import { h } from 'vue';

const meta = {
  title: 'Components/Base/DropdownMenu',
  component: BaseDropdownMenu,
  tags: ['autodocs'],
  argTypes: {
    'dropdown-section-content': {
      description: 'The default slot content',
      control: {
        type: 'text',
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
    ariaLabel: 'dropdown-button',
    'dropdown-section-content': h(
      'div',
      { class: 'p-2 text-roboto text-white text-sb-sm' },
      'Dropdown content',
    ),
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
    icon: HomeIcon,
  },
};

export const DropdownMenuWithIconAndWithoutLabel: Story = {
  args: {
    ...meta.args,
    icon: HomeIcon,
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

export const ZIndexDropdownMenu: Story = {
  args: {
    ...meta.args,
    zIndex: 'z-sb-dropdown',
  },
};

export const ZIndexBaseDropdownMenu: Story = {
  args: {
    ...meta.args,
    zIndex: 'z-sb-base-5',
  },
};
