<script setup lang="ts">
import {
	TransitionRoot,
	TransitionChild,
	Dialog,
	DialogPanel,
} from '@headlessui/vue';
import { XMarkIcon } from '@heroicons/vue/24/outline';
import { computed } from 'vue';

import { BaseButton } from '@/components';
import { useCommonStyleSingleton } from '@/hooks';

interface ModalProps {
  isOpen: boolean;
  customZIndex?: number;
  headerOrientation?: 'left' | 'center' | 'right';
  modalSize?: 'small' | 'medium' | 'large';
  modalTitle?: string;
  modalSubtitle?: string;
}

interface ModalEmits {
  // eslint-disable-next-line no-unused-vars
  (e: 'closeModal'): void;
}

const props = withDefaults(defineProps<ModalProps>(), {
	modalSize: undefined,
	modalTitle: undefined,
	modalSubtitle: undefined,
	headerOrientation: 'left',
	customZIndex: 50,
});

const emits = defineEmits <ModalEmits>();

// Feature 1: Manage Style Classes
const { containerPadding, h3Size, pSize } = useCommonStyleSingleton();

const getSizeClass = computed(() => {
	switch (props.modalSize) {
		case 'small':
			return 'w-3/6 h-3/6';
		case 'medium':
			return 'w-4/6 h-4/6';
		case 'large':
			return 'w-5/6 h-5/6';
		default:
			return 'w-full h-full';
	}
});

// Feature 2: Send Close Modal Event
const handleCloseModal = () => {
	emits('closeModal');
};

</script>

<template>
  <TransitionRoot
    appear
    :show="props.isOpen"
    as="template"
  >
    <Dialog
      as="div"
      class="relative overflow-hidden"
      :style="{ zIndex: props.customZIndex }"
      @close="handleCloseModal"
    >
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-main/95"></div>
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          :class="[containerPadding]"
          class="flex items-center justify-center h-screen py-8"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              :class="[getSizeClass]"
              class="flex flex-col p-6 overflow-hidden transition-all transform border-2 rounded-lg gap-y-6 shadow-sb-light border-slate-700 bg-secondary"
            >
              <div
                id="modal-header"
                class="flex justify-between overflow-hidden border border-white shrink-0 gap-x-4"
              >
                <div
                  :class="{
                    'text-left': props.headerOrientation === 'left',
                    'text-center': props.headerOrientation === 'center',
                    'text-right': props.headerOrientation === 'right',
                  }"
                  class="flex-1 overflow-x-hidden"
                >
                  <h3
                    v-show="props.modalTitle"
                    id="modal-title"
                    :class="[h3Size]"
                    class="font-medium text-white truncate whitespace-normal transition-all duration-300 ease-in-out font-roboto"
                  >
                    {{ props.modalTitle }}
                  </h3>
                  <p
                    v-show="props.modalSubtitle"
                    id="modal-subtitle"
                    :class="[ pSize]"
                    class="mt-2 text-sm text-gray-500 truncate whitespace-normal transition-all duration-300 ease-in-out font-roboto"
                  >
                    {{ props.modalSubtitle }}
                  </p>
                </div>
                <BaseButton
                  no-style
                  class="text-white w-fit h-fit hover:rotate-90"
                  :icon="XMarkIcon"
                  @click.stop="handleCloseModal"
                  @keydown.enter.stop="handleCloseModal"
                />
              </div>
              <slot name="modal-content"></slot>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>