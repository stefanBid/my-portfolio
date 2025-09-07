// BaseDropdownMenu.stories.ts
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import BaseDropdownMenu from '@/components/base/dropdown-menu/BaseDropdownMenu.vue';

const meta = {
  title: 'Components/Base/DropdownMenu',
  component: BaseDropdownMenu,
  tags: ['autodocs'],
  argTypes: {
    text: {
      description: 'Testo visibile nel bottone del dropdown',
      control: { type: 'text' },
    },
    icon: {
      description:
        'Icona del bottone (può essere componente Vue, FunctionalComponent o stringa icona)',
      control: { type: 'object' },
    },
    zIndex: {
      description: 'z-index del pannello floating',
      control: { type: 'number' },
    },
    intersectionObserverSettings: {
      description:
        'Impostazioni dell’IntersectionObserver usato per chiudere il menu quando rientra in viewport',
      control: { type: 'object' },
    },
    ariaLabel: {
      description: 'Attributo aria-label del bottone',
      control: { type: 'text' },
    },
  },
  args: {
    text: 'Menu',
    ariaLabel: 'general dropdown menu',
    zIndex: 500,
    intersectionObserverSettings: {
      rootElement: null,
      rootMargin: '-80px 0px 0px 0px',
      threshold: 0.05,
    },
  },
} satisfies Meta<typeof BaseDropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => ({
    components: { BaseDropdownMenu },
    setup: () => ({ args }),
    template: `
      <BaseDropdownMenu v-bind="args">
        <template #options="{ closeMenu }">
          <div class="w-40 p-2 gap-2 bg-sb-secondary-200 flex flex-col rounded-lg">
            <button class="p-2 text-size-xs hover:bg-sb-secondary-100 rounded-lg" @click="closeMenu()">Opzione 1</button>
            <button class="p-2 text-size-xs hover:bg-sb-secondary-100 rounded-lg" @click="closeMenu()">Opzione 2</button>
          </div>
        </template>
      </BaseDropdownMenu>
    `,
  }),
};
