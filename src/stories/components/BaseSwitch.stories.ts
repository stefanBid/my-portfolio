import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { BaseSwitch } from '@/components';

const meta = {
  title: 'Components/Base/Switch',
  component: BaseSwitch,
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: 'The switch label',
      control: {
        type: 'text',
      },
    },
    ariaLabel: {
      description: 'The switch aria-label attribute',
      control: {
        type: 'text',
      },
    },
    enabled: {
      description: 'The switch enabled state',
      control: {
        type: 'boolean',
      },
    },
  },
  args: {
    enabled: true,
    ariaLabel: 'switch',
  },
} satisfies Meta<typeof BaseSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultSwitch: Story = {
  args: {
    ...meta.args,
  },
};

export const DisabledSwitch: Story = {
  args: {
    ...meta.args,
    enabled: false,
  },
};

export const SwitchWithLabel: Story = {
  args: {
    ...meta.args,
    label: 'Switch',
  },
};
