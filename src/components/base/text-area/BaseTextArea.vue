<script setup lang="ts">
import { computed, ref } from 'vue';
import { nanoid } from 'nanoid';

import { useCommonStyleSingleton } from '@/hooks';

interface TextAreaProps {
  label?: string;
  id?: string;
  name?: string;
  placeholder?: string;
  maxlength?: number;
}

const props = withDefaults(defineProps<TextAreaProps>(), {
  id: undefined,
  name: undefined,
  placeholder: 'Enter a text',
  maxlength: 300,
  label: undefined,
});

const inputValue = defineModel<string>('inputValue', { required: true });

// Feature 0: Manage Style Classes
const { textSizeXS } = useCommonStyleSingleton();

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
      tabindex="0"
      :class="[textSizeXS]"
      class="font-medium text-white outline-none cursor-pointer font-roboto w-fit hover:text-shadow-luminous focus-visible:text-shadow-luminous focus-visible:ring-0 transition-sb-slow ring-0"
    >
      {{ props.label }}
    </label>

    <textarea
      :id="textAreaId"
      v-model="inputValue"
      :name="textAreaName"
      tabindex="0"
      :maxlength="props.maxlength"
      :class="[
        textSizeXS,
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
    <div :class="[textSizeXS]" class="flex justify-end w-full font-light text-white">
      {{ inputValue.length }} / {{ props.maxlength }}
    </div>
  </div>
</template>
