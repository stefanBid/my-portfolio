<script setup lang="ts">
import { TransitionRoot, TransitionChild, Dialog, DialogPanel } from '@headlessui/vue';
import { XMarkIcon } from '@heroicons/vue/24/outline';

import { BaseButton } from '@/components';
import { useCommonStyleSingleton } from '@/hooks';

interface DialogProps {
  isOpen: boolean;
  headerOrientation?: 'left' | 'center' | 'right';
  dialogSize?: 'small' | 'medium' | 'large';
  dialogTitle?: string;
  dialogSubtitle?: string;

  onCloseModal: (falsyValue: false) => void;
}

const props = withDefaults(defineProps<DialogProps>(), {
  dialogSize: 'large',
  dialogTitle: undefined,
  dialogSubtitle: undefined,
  headerOrientation: 'left',
});

// Feature 1: Manage Style Classes
const { activeBreakpoint, containerPadding, textSizeL, textSizeS } = useCommonStyleSingleton();

// Feature 2: Send Close Modal Event
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

      <div class="fixed inset-0 overflow-y-auto z-sb-dialog">
        <div :class="[containerPadding]" class="flex items-center justify-center h-screen py-8">
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
              :class="{
                'w-[45%]':
                  props.dialogSize === 'small' &&
                  activeBreakpoint !== 'xs' &&
                  activeBreakpoint !== 'sm',
                'w-[65%]':
                  props.dialogSize === 'medium' &&
                  activeBreakpoint !== 'xs' &&
                  activeBreakpoint !== 'sm',
                'w-[85%]':
                  props.dialogSize === 'large' &&
                  activeBreakpoint !== 'xs' &&
                  activeBreakpoint !== 'sm',
                'w-full': activeBreakpoint === 'xs' || activeBreakpoint === 'sm',
              }"
              class="flex max-h-[95%] h-fit flex-col p-6 overflow-hidden transform border-2 rounded-lg shadow-lg transition-sb-fast gap-y-6 shadow-sb-secondary-200 border-slate-700 border-sb-secondary-200 bg-sb-main"
            >
              <div
                id="modal-header"
                class="flex justify-between overflow-hidden cursor-default shrink-0 gap-x-6"
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
                    v-show="props.dialogTitle"
                    id="modal-title"
                    :class="[textSizeL]"
                    class="font-medium text-white truncate whitespace-normal transition-sb-slow font-roboto"
                  >
                    {{ props.dialogTitle }}
                  </h3>
                  <p
                    v-show="props.dialogSubtitle"
                    id="modal-subtitle"
                    :class="[textSizeS]"
                    class="mt-2 text-sm truncate transition-sb-slow text-white/60 font-roboto"
                  >
                    {{ props.dialogSubtitle }}
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
