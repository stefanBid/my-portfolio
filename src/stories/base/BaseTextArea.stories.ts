// import { fn } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/vue3';
import { BaseTextArea } from '@/components';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Components/Base/TextArea',
  component: BaseTextArea,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
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
    dataTestid: {
      description: 'The textarea data-testid attribute',
      control: {
        type: 'text',
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
    dataTestid: 'textarea',
    ariaLabel: 'textarea',
  },
} satisfies Meta<typeof BaseTextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultTextArea: Story = {};

export const PlaceholderTextArea: Story = {
  args: {
    label: 'Placeholder textArea',
    placeholder: 'Placeholder text',
  },
};

export const MandatoryTextArea: Story = {
  args: {
    label: 'Mandatory textArea',
    mandatory: true,
  },
};

export const MaxLengthTextArea: Story = {
  args: {
    label: 'Max length textArea',
    maxlength: 10,
  },
};

export const ValidationTextArea: Story = {
  args: {
    label: 'Validation textArea',
    mandatory: true,
    validation: {
      show: true,
      message: 'This field is required',
    },
  },
};
