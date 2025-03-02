import type { Meta, StoryObj } from '@storybook/vue3';
import { BaseSection } from '@/components';

const meta = {
  title: 'Components/Base/Section',
  component: BaseSection,
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'The section title',
      control: {
        type: 'text',
      },
    },
    subtitle: {
      description: 'The section subtitle',
      control: {
        type: 'text',
      },
    },
    paragraph: {
      description: 'The section paragraph',
      control: {
        type: 'text',
      },
    },
    inverted: {
      description: 'The section inverted state',
      control: {
        type: 'boolean',
      },
    },
  },
  args: {
    title: 'Lorem Ipsum',
    subtitle: 'Lorem Ipsum Dolor Sit Amet',
    paragraph:
      'Non Lorem elit ad aliquip ipsum excepteur consequat ad consequat. Ad pariatur exercitation nostrud nisi. Laborum consequat sit veniam veniam ad laboris et elit excepteur tempor dolore. Sunt officia adipisicing qui aliqua laborum incididunt exercitation do. Ullamco sit quis reprehenderit ut esse esse eu aliqua nulla. Occaecat elit est est minim fugiat duis officia enim aliquip velit. Sint culpa dolore consequat sint laborum commodo dolor cupidatat sunt eu ad culpa.',
  },
} satisfies Meta<typeof BaseSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultSection: Story = {};

export const InvertedSection: Story = {
  args: {
    inverted: true,
  },
};
