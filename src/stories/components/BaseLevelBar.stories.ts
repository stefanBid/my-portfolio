import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { BaseLevelBar } from '@/components';

const meta = {
  title: 'Components/Base/LevelBar',
  component: BaseLevelBar,
  tags: ['autodocs'],
  argTypes: {
    level: {
      description: 'The level of the bar',
      control: {
        type: 'number',
      },
    },
    scale: {
      description: 'The scale of the bar',
      control: {
        type: 'select',
      },
      options: ['decimal', 'percentage'],
    },
    label: {
      description: 'The label of the bar',
      control: {
        type: 'text',
      },
    },
  },
} satisfies Meta<typeof BaseLevelBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DecimalLevelBar: Story = {
  args: {
    level: 5,
    scale: 'decimal',
    label: 'Decimal Level Bar',
  },
};

export const PercentageLevelBar: Story = {
  args: {
    level: 50,
    scale: 'percentage',
    label: 'Percentage Level Bar',
  },
};

export const ZeroLevelBar: Story = {
  args: {
    level: 0,
    scale: 'percentage',
    label: 'Zero Level Bar',
  },
};

export const HundredLevelBar: Story = {
  args: {
    level: 100,
    scale: 'percentage',
    label: 'Hundred Level Bar',
  },
};
