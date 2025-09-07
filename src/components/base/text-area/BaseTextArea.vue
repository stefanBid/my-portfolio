<script setup lang="ts">
import { computed, ref } from 'vue';
import { nanoid } from 'nanoid';

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

// Feature 1: Manage TextArea Properties
const uniqueId = nanoid();

const textAreaAttrs = computed(() => {
  return {
    id: props.id || `${uniqueId}-text-area-id`,
    name: props.name || `${uniqueId}-text-area-name`,
    'aria-label': props.ariaLabel,
  };
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
      :for="textAreaAttrs.id"
      :class="[
        {
          'text-white hover:text-shadow-luminous': !props.validation?.show,
          'text-sb-error hover:text-shadow-luminous-error': props.validation?.show,
        },
      ]"
      class="text-size-xs mb-1 font-medium transition-all duration-300 ease-in-out cursor-pointer font-roboto w-fit"
    >
      {{ textAreaLabel }}
    </label>

    <textarea
      :id="textAreaAttrs.id"
      ref="reference"
      v-model="inputValue"
      :name="textAreaAttrs.name"
      :aria-label="textAreaAttrs['aria-label']"
      :tabindex="0"
      :maxlength="props.maxlength"
      :class="[
        {
          'bg-sb-secondary-100/50': inputValue.length > 0,
          'bg-transparent': inputValue.length === 0,
          'border-white': inputValue.length === 0 && !props.validation?.show,
          'border-sb-secondary-100': inputValue.length > 0 && !props.validation?.show,
          'border-sb-error focus:border-sb-error focus:shadow-sb-error': props.validation?.show,
          'focus:border-white focus:shadow-white': !props.validation?.show,
        },
      ]"
      class="text-size-xs py-1.5 px-2 sm:py-2 sm:px-2.5 md:py-2 md:px-2.5 lg:py-2.5 lg:px-3 w-full h-32 overflow-y-auto text-white transition-all duration-300 ease-in-out border-2 rounded-lg outline-none resize-none scrollbar-gutter-stable ring-0 ring-offset-0 focus:bg-white focus:shadow-sb-ring-sm focus:text-black"
      :placeholder="props.placeholder"
    >
    </textarea>
    <div
      class="flex justify-end w-full mt-0.5 font-light text-white text-size-xs transition-all duration-300 ease-in-out"
    >
      {{ inputValue.length }} / {{ props.maxlength }}
    </div>
    <small
      v-if="props.validation?.show && props.validation.message"
      class="mt-1 text-right transition-all duration-300 ease-in-out text-sb-error font-roboto text-size-xs"
    >
      {{ props.validation.message }}
    </small>
  </div>
</template>
