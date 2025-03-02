import { ref } from 'vue';
import type { Meta, StoryFn } from '@storybook/vue3';
import { BaseInfiniteScroll } from '@/components';

export default {
  title: 'Components/Base/InfiniteScroll',
  component: BaseInfiniteScroll,
  tags: ['autodocs'],
  argTypes: {
    items: {
      description: 'The items to be displayed',
      control: {
        type: 'object',
      },
    },
    initialCount: {
      description: 'The initial count of items to be displayed',
      control: {
        type: 'number',
      },
    },
    batchSize: {
      description: 'The batch size of items to be displayed',
      control: {
        type: 'number',
      },
    },
    delayLoadTime: {
      description: 'The delay load time of items to be displayed',
      control: {
        type: 'number',
      },
    },
    noDataSettings: {
      description: 'The settings for no data',
      control: {
        type: 'object',
      },
    },
  },
} as Meta<typeof BaseInfiniteScroll>;

// Template per la storia
const Template: StoryFn<typeof BaseInfiniteScroll> = (args) => ({
  components: { BaseInfiniteScroll },
  setup() {
    const items = ref({});

    items.value = Array.from({ length: 1000 }, (_, i) => ({
      id: i,
      name: `Item ${i}`,
    }));

    return { items, args };
  },
  template: `
    <div
      style="height: 600px;"
      class="overflow-hidden flex flex-col">
      <BaseInfiniteScroll v-bind="args" :items="items">
        <template #default="{ item }">
          <div class="p-2 relative flex flex-col items-center justify-between overflow-hidden transition-all duration-300 ease-in-out border-2 rounded-lg outline-none cursor-pointer bg-sb-secondary-300 border-sb-secondary-200 ring-0">
            <p class="text-white font-roboto">
              Ea irure anim culpa minim. Eiusmod irure velit minim Lorem ad deserunt non culpa cupidatat exercitation quis. Cillum enim dolor qui ullamco ad. Laborum tempor eiusmod laboris ea nulla. Cillum aliqua eu et aliquip veniam.
            </p>
          </div>
        </template>
        <template #loading-section>
          <div class="flex items-center justify-center w-full h-20 animate-pulse">
            <p class="text-white font-roboto">Loading...</p>
          </div>
        </template>
      </BaseInfiniteScroll>
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {};
