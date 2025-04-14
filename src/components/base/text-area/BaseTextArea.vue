<script setup lang="ts">
import { computed, ref } from 'vue';
import { nanoid } from 'nanoid';
import { useStyleStore } from '@/stores';

interface TextAreaProps {
  label?: string;
  id?: string;
  name?: string;
  placeholder?: string;
  maxlength?: number;
  ariaLabel?: string;
  mandatory?: boolean;
  validation?: { show: boolean; message?: string };
}

const props = withDefaults(defineProps<TextAreaProps>(), {
  id: undefined,
  name: undefined,
  placeholder: 'Enter a text',
  maxlength: 300,
  label: undefined,
  ariaLabel: 'general text area',
  mandatory: false,
  validation: undefined,
});

const inputValue = defineModel<string>('inputValue', { required: true });

const reference = ref();

// Store Declarations
const styleStore = useStyleStore();

// Feature 1: Manage TextArea Properties
const uniqueId = nanoid();

const textAreaId = computed(() => {
  return props.id || `${uniqueId}-textarea-id`;
});

const textAreaName = computed(() => {
  return props.name || `${uniqueId}-textarea-name`;
});

const textAreaLabel = computed(() => {
  if (props.label) {
    if (props.mandatory) return `${props.label} *`;
    else return props.label;
  } else return undefined;
});
</script>

<template>
  <div class="flex flex-col w-full">
    <label
      v-if="props.label"
      :for="textAreaId"
      tabindex="0"
      :class="[
        styleStore.textSizeXS,
        {
          'text-white hover:text-shadow-luminous focus-visible:text-shadow-luminous':
            !props.validation?.show,
          'text-sb-error hover:text-shadow-luminous-error focus-visible:text-shadow-luminous-error':
            props.validation?.show,
        },
      ]"
      class="mb-1 font-medium transition-all duration-300 ease-in-out outline-none cursor-pointer font-roboto w-fit focus-visible:ring-0 ring-0"
      @keydown.enter.stop.prevent="() => reference?.focus()"
      @click.stop.prevent="() => reference?.focus()"
    >
      {{ textAreaLabel }}
    </label>

    <textarea
      :id="textAreaId"
      ref="reference"
      v-model="inputValue"
      :name="textAreaName"
      :aria-label="props.ariaLabel"
      tabindex="0"
      :maxlength="props.maxlength"
      :class="[
        styleStore.textSizeXS,
        {
          'bg-sb-secondary-100/50': inputValue.length > 0,
          'bg-transparent': inputValue.length === 0,
          'border-white': inputValue.length === 0 && !props.validation?.show,
          'border-sb-secondary-100': inputValue.length > 0 && !props.validation?.show,
          'border-sb-error focus:border-sb-error focus:shadow-sb-error': props.validation?.show,
          'focus:border-white focus:shadow-white': !props.validation?.show,
          'py-2.5 px-3':
            styleStore.activeBreakpoint !== 'xs' &&
            styleStore.activeBreakpoint !== 'sm' &&
            styleStore.activeBreakpoint !== 'md',
          'py-2 px-2.5': styleStore.activeBreakpoint === 'md',
          'py-1.5 px-2':
            styleStore.activeBreakpoint === 'sm' || styleStore.activeBreakpoint === 'xs',
        },
      ]"
      class="w-full h-32 overflow-y-auto text-white transition-all duration-300 ease-in-out border-2 rounded-lg outline-none resize-none scrollbar-gutter-stable focus:ring-0 focus:ring-offset-0 ring-0 ring-offset-0 focus:bg-white focus:shadow-sb-ring-sm focus:text-black"
      :placeholder="props.placeholder"
    >
    </textarea>
    <div
      :class="[styleStore.textSizeXS]"
      class="flex justify-end w-full mt-1 font-light text-white"
    >
      {{ inputValue.length }} / {{ props.maxlength }}
    </div>
    <small
      v-if="props.validation?.show && props.validation.message"
      :class="[styleStore.textSizeXS]"
      class="mt-1 transition-all duration-300 ease-in-out text-sb-error font-roboto"
    >
      {{ props.validation.message }}
    </small>
  </div>
</template>
