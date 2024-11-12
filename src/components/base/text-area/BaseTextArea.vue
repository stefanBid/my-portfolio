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
}

const props = withDefaults(defineProps<TextAreaProps>(), {
  id: undefined,
  name: undefined,
  placeholder: 'Enter a text',
  maxlength: 300,
  label: undefined,
  dataTestid: 'base-text-area',
  ariaLabel: 'general text area',
});

const inputValue = defineModel<string>('inputValue', { required: true });

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
  <div class="flex flex-col w-full gap-y-2">
    <label
      v-if="props.label"
      :for="textAreaId"
      :data-testid="`${props.dataTestid}-label`"
      tabindex="0"
      :class="[styleStore.textSizeXS]"
      class="font-medium text-white outline-none cursor-pointer font-roboto w-fit hover:text-shadow-luminous focus-visible:text-shadow-luminous focus-visible:ring-0 transition-sb-slow ring-0"
    >
      {{ props.label }}
    </label>

    <textarea
      :id="textAreaId"
      v-model="inputValue"
      :name="textAreaName"
      :data-testid="props.dataTestid"
      :aria-label="props.ariaLabel"
      tabindex="0"
      :maxlength="props.maxlength"
      :class="[
        styleStore.textSizeXS,
        {
          'bg-sb-secondary-100/50 border-sb-secondary-100 ': inputValue.length > 0,
          'bg-transparent border-white': inputValue.length === 0,
        },
      ]"
      class="w-full h-32 px-3 py-2 overflow-y-auto text-white border-2 rounded-lg outline-none resize-none transition-sb-slow focus:ring-0 focus:ring-offset-0 ring-0 ring-offset-0 focus:border-white focus:bg-white focus:shadow-sb-ring-sm focus:shadow-white focus:text-black"
      :placeholder="props.placeholder"
      @focus="handleFocusBlur(true)"
      @blur="handleFocusBlur(false)"
    >
    </textarea>
    <div
      :data-testid="`${props.dataTestid}-counter`"
      :class="[styleStore.textSizeXS]"
      class="flex justify-end w-full font-light text-white"
    >
      {{ inputValue.length }} / {{ props.maxlength }}
    </div>
  </div>
</template>
