<script setup lang="ts">
import { TransitionRoot, TransitionChild, Dialog, DialogPanel } from '@headlessui/vue';
import { XMarkIcon } from '@heroicons/vue/24/outline';

import { BaseButton } from '@/components';
import { useStyleStore } from '@/stores';

interface DialogProps {
  dataTestid?: string;
  isOpen: boolean;
  headerOrientation?: 'left' | 'center' | 'right';
  dialogSize?: 'small' | 'medium' | 'large';
  blockDialogHeight?: boolean;
  dialogTitle?: string;
  onCloseModal: (falsyValue: false) => void;
}

const props = withDefaults(defineProps<DialogProps>(), {
  dataTestid: 'base-dialog',
  dialogSize: 'large',
  blockDialogHeight: false,
  dialogTitle: undefined,
  headerOrientation: 'left',
});

// Store Declarations
const styleStore = useStyleStore();

// Feature 1: Send Close Modal Event
const handleCloseModal = (): void => {
  props.onCloseModal(false);
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
        <div class="fixed inset-0 bg-black/95 z-sb-dialog-overlay"></div>
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto z-sb-dialog scrollbar-gutter-stable">
        <div
          :class="[
            styleStore.containerPadding,
            {
              'py-6':
                styleStore.activeBreakpoint !== 'xs' &&
                styleStore.activeBreakpoint !== 'sm' &&
                styleStore.activeBreakpoint !== 'md',
              'py-5': styleStore.activeBreakpoint === 'md',
              'py-4': styleStore.activeBreakpoint === 'sm' || styleStore.activeBreakpoint === 'xs',
            },
          ]"
          :data-testid="`${props.dataTestid}-overlay`"
          class="flex items-center justify-center h-screen"
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
              :data-testid="`${props.dataTestid}-panel`"
              :class="[
                styleStore.elementTotalPaddingM,
                styleStore.elementTotalGapM,
                {
                  'w-[45%]':
                    props.dialogSize === 'small' &&
                    styleStore.activeBreakpoint !== 'xs' &&
                    styleStore.activeBreakpoint !== 'sm',
                  'w-[65%]':
                    props.dialogSize === 'medium' &&
                    styleStore.activeBreakpoint !== 'xs' &&
                    styleStore.activeBreakpoint !== 'sm',
                  'w-[85%]':
                    props.dialogSize === 'large' &&
                    styleStore.activeBreakpoint !== 'xs' &&
                    styleStore.activeBreakpoint !== 'sm',
                  'w-full':
                    styleStore.activeBreakpoint === 'xs' || styleStore.activeBreakpoint === 'sm',
                  'h-fit max-h-full': !props.blockDialogHeight,
                  'h-full': props.blockDialogHeight,
                },
              ]"
              class="flex flex-col overflow-hidden transition-all duration-300 ease-in-out transform border-2 rounded-lg shadow-lg shadow-sb-secondary-200 border-sb-secondary-200 bg-sb-main"
            >
              <div
                :class="[styleStore.elementTotalGapM]"
                class="flex justify-between overflow-hidden cursor-default shrink-0"
              >
                <div
                  :data-testid="`${props.dataTestid}-header-title`"
                  :class="{
                    'text-left': props.headerOrientation === 'left',
                    'text-center': props.headerOrientation === 'center',
                    'text-right': props.headerOrientation === 'right',
                  }"
                  class="flex-1 overflow-x-hidden"
                >
                  <h3
                    v-show="props.dialogTitle"
                    id="modal-title"
                    :class="[styleStore.textSizeL]"
                    class="font-medium text-white truncate whitespace-normal transition-all duration-300 ease-in-out font-roboto"
                  >
                    {{ props.dialogTitle }}
                  </h3>
                </div>
                <BaseButton
                  :data-testid="`${props.dataTestid}-close-button`"
                  class="text-white border border-transparent rounded-md w-fit h-fit hover:rotate-90 focus-visible:border-white"
                  :aria-label="`close ${props.dialogTitle} modal`"
                  :icon="XMarkIcon"
                  variant="custom"
                  content-size="medium"
                  spacing-size="custom"
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
