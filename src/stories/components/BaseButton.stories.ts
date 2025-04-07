import { HomeIcon } from '@heroicons/vue/24/outline';
import type { Meta, StoryObj } from '@storybook/vue3';
import { BaseButton } from '@/components';

const meta = {
  title: 'Components/Base/Button',
  component: BaseButton,
  tags: ['autodocs'],
  argTypes: {
    default: {
      description: 'The default slot content',
      control: {
        type: 'text',
      },
    },
    type: {
      description: 'The button type',
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
    },
    variant: {
      description: 'The button variant',
      control: { type: 'select' },
      options: ['white', 'tertiary', 'custom'],
    },
    size: {
      description: 'The button size',
      control: { type: 'select' },
      options: ['small', 'medium', 'custom'],
    },
    disabled: {
      description: 'The button disabled state',
      control: {
        type: 'boolean',
      },
    },
    loading: {
      description: 'The button loading state',
      control: {
        type: 'boolean',
      },
    },
    ariaLabel: {
      description: 'The button aria-label attribute',
      control: {
        type: 'text',
      },
    },
  },
  args: {
    ariaLabel: 'button',
  },
} satisfies Meta<typeof BaseButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TertiaryButton: Story = {
  args: {
    ...meta.args,
    default: 'Tertiary Button',
    variant: 'tertiary',
  },
};

export const WhiteButton: Story = {
  args: {
    ...meta.args,
    default: 'White Button',
    variant: 'white',
  },
};

export const SmallButton: Story = {
  args: {
    ...meta.args,
    default: 'Small Button',
    size: 'small',
  },
};

export const MediumButton: Story = {
  args: {
    ...meta.args,
    default: 'Medium Button',
    size: 'medium',
  },
};

export const DisabledButton: Story = {
  args: {
    ...meta.args,
    default: 'Disabled Button',
    disabled: true,
  },
};

export const LoadingButton: Story = {
  args: {
    ...meta.args,
    default: 'Loading Button',
    loading: true,
  },
};

export const IconButton: Story = {
  args: {
    ...meta.args,
    icon: HomeIcon,
  },
};

export const CustomButton: Story = {
  args: {
    ...meta.args,
    default: 'Custom Button',
    variant: 'custom',
    size: 'custom',
  },
};
