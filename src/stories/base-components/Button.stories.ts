// import { fn } from '@storybook/test';
import { HomeIcon } from '@heroicons/vue/24/outline';
import type { Meta, StoryObj } from '@storybook/vue3';
import { BaseButton } from '@/components';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Components/Base/Button',
  component: BaseButton,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
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
      control: {
        type: 'select',
        options: ['button', 'submit', 'reset'],
      },
    },
    variant: {
      description: 'The button variant',
      control: {
        type: 'select',
        options: ['white', 'tertiary', 'custom'],
      },
    },
    contentSize: {
      description: 'The button size',
      control: {
        type: 'select',
        options: ['small', 'medium', 'custom'],
      },
    },
    spacingSize: {
      description: 'The button spacing',
      control: {
        type: 'select',
        options: ['small', 'medium', 'custom'],
      },
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
    dataTestid: {
      description: 'The button data-testid attribute',
      control: {
        type: 'text',
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
    default: 'Click me',
    dataTestid: 'button',
    ariaLabel: 'button',
  },
} satisfies Meta<typeof BaseButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TertiaryButton: Story = {
  args: {
    variant: 'tertiary',
  },
};

export const WhiteButton: Story = {
  args: {
    variant: 'white',
  },
};

export const SmallButton: Story = {
  args: {
    contentSize: 'small',
  },
};

export const MediumButton: Story = {
  args: {
    contentSize: 'medium',
  },
};

export const DisabledButton: Story = {
  args: {
    disabled: true,
  },
};

export const LoadingButton: Story = {
  args: {
    loading: true,
  },
};

export const IconButton: Story = {
  args: {
    default: '',
    icon: HomeIcon,
  },
};

export const CustomButton: Story = {
  args: {
    variant: 'custom',
    spacingSize: 'custom',
    contentSize: 'custom',
  },
};
