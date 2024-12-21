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
  dataTestid?: string;
  ariaLabel?: string;
  validation?: { show: boolean; message?: string };
}

const props = withDefaults(defineProps<TextAreaProps>(), {
  id: undefined,
  name: undefined,
  placeholder: 'Enter a text',
  maxlength: 300,
  label: undefined,
  dataTestid: 'base-text-area',
  ariaLabel: 'general text area',
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

// Feature 1: Manage Textarea Focus
const isTextareaFocused = ref(false);

const handleFocusBlur = (focused: boolean): void => {
  isTextareaFocused.value = focused;
};
</script>

<template>
  <div class="flex flex-col w-full">
    <label
      v-if="props.label"
      :for="textAreaId"
      :data-testid="`${props.dataTestid}-label`"
      tabindex="0"
      :class="[styleStore.textSizeXS]"
      class="mb-2 font-medium text-white outline-0 cursor-pointer font-roboto w-fit hover:text-shadow-luminous focus-visible:text-shadow-luminous focus-visible:ring-0 transition-all duration-300 ease-in-out ring-0"
      @keydown.enter.stop.prevent="reference?.focus()"
      @click.stop.prevent="reference?.focus()"
    >
      {{ props.label }}
    </label>

    <textarea
      :id="textAreaId"
      ref="reference"
      v-model="inputValue"
      :name="textAreaName"
      :data-testid="props.dataTestid"
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
        },
      ]"
      class="w-full h-32 px-3 py-2 overflow-y-auto text-white border-2 rounded-lg outline-0 resize-none transition-all duration-300 ease-in-out focus:ring-0 focus:ring-offset-0 ring-0 ring-offset-0 focus:bg-white focus:shadow-sb-ring-sm focus:text-black"
      :placeholder="props.placeholder"
      @focus="handleFocusBlur(true)"
      @blur="handleFocusBlur(false)"
    >
    </textarea>
    <div
      :data-testid="`${props.dataTestid}-counter`"
      :class="[styleStore.textSizeXS]"
      class="flex justify-end w-full mt-2 font-light text-white"
    >
      {{ inputValue.length }} / {{ props.maxlength }}
    </div>
    <p
      v-if="props.validation?.show && props.validation.message"
      :data-testid="`${props.dataTestid}-validation-message`"
      :class="[styleStore.textSizeXS]"
      class="mt-1 text-sb-error font-roboto transition-all duration-300 ease-in-out"
    >
      {{ props.validation.message }}
    </p>
  </div>
</template>
