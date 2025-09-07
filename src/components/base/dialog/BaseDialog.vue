<script setup lang="ts">
import { TransitionRoot, TransitionChild, Dialog, DialogPanel } from '@headlessui/vue';

import BaseButton from '@/components/base/button/BaseButton.vue';

import MdiCloseThick from '~icons/mdi/close-thick';

interface DialogProps {
  isOpen: boolean;
  headerOrientation?: 'left' | 'center';
  dialogSize?: 'small' | 'medium' | 'large';
  blockDialogHeight?: boolean;
  dialogTitle?: string;
  onCloseDialog: (falsyValue: false) => void;
}

const props = withDefaults(defineProps<DialogProps>(), {
  dialogSize: 'large',
  blockDialogHeight: false,
  dialogTitle: undefined,
  headerOrientation: 'left',
});

// Feature 1: Send Close Modal Event
const handleCloseModal = (): void => {
  props.onCloseDialog(false);
};
</script>

<template>
  <TransitionRoot appear :show="props.isOpen" as="template">
    <Dialog as="div" class="relative overflow-hidden" @close="handleCloseModal">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/95 z-[1050]"></div>
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto z-[1100]">
        <div
          class="flex items-center justify-center h-screen scrollbar-gutter-stable container-p py-4 sm:py-5 md:py-5 lg:py-6 transition-all duration-300 ease-in-out"
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
              :class="[
                {
                  'dialog-panel-small': props.dialogSize === 'small',
                  'dialog-panel-medium': props.dialogSize === 'medium',
                  'dialog-panel-large': props.dialogSize === 'large',
                  'h-fit max-h-full': !props.blockDialogHeight,
                  'h-full': props.blockDialogHeight,
                },
              ]"
              class="tot-pad-m tot-gap-m flex flex-col overflow-hidden transition-all duration-300 ease-in-out transform border-2 rounded-lg shadow-lg shadow-sb-secondary-200 border-sb-secondary-200 bg-sb-main"
            >
              <div
                class="flex justify-between overflow-hidden cursor-default shrink-0 tot-gap-m transition-all duration-300 ease-in-out"
              >
                <div
                  :class="{
                    'text-left': props.headerOrientation === 'left',
                    'text-center': props.headerOrientation === 'center',
                  }"
                  class="flex-1 overflow-x-hidden"
                >
                  <h3
                    v-show="props.dialogTitle"
                    id="modal-title"
                    class="text-size-l font-medium text-white truncate whitespace-normal transition-all duration-300 ease-in-out font-roboto"
                  >
                    {{ props.dialogTitle }}
                  </h3>
                </div>
                <BaseButton
                  class="text-white border border-transparent rounded-md w-fit h-fit hover:rotate-90 focus-visible:border-white"
                  :aria-label="`close ${props.dialogTitle} modal`"
                  variant="custom"
                  size="custom"
                  @click.stop="handleCloseModal"
                >
                  <MdiCloseThick class="stroke-[2.5px] icon-size-s" />
                </BaseButton>
              </div>
              <slot name="modal-content"></slot>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style scoped>
@reference "@/style/index.css";

.dialog-panel-small {
  @apply w-full sm:w-[45%];
}

.dialog-panel-medium {
  @apply w-full sm:w-[65%];
}

.dialog-panel-large {
  @apply w-full sm:w-[85%];
}
</style>
