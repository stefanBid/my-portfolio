<script setup lang="ts">
import { computed, ref } from 'vue';

import { useCommonStyleSingleton } from '@/hooks';

interface TextAreaProps {
  placeholder?: string;
}

const props = withDefaults(defineProps<TextAreaProps>(), {
  placeholder: 'Enter text',
});

const inputValue = defineModel<string>('inputValue', { required: true });

// Feature 0: Manage Style Classes
const { activeBreakpoint } = useCommonStyleSingleton();

const getPlaceholder = computed(() => {
  return props.placeholder.concat(' (max 300 characters)');
});

// Feature 1: Manage Textarea Focus
const isTextareaFocused = ref(false);

const handleFocusBlur = (focused: boolean): void => {
  isTextareaFocused.value = focused;
};
</script>

<template>
  <textarea
    v-bind="$attrs"
    v-model="inputValue"
    tabindex="0"
    :rows="10"
    :maxlength="300"
    :class="{
      'text-sb-sm':
        activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm' && activeBreakpoint !== 'md',
      'text-sb-xs':
        activeBreakpoint === 'xs' || activeBreakpoint === 'sm' || activeBreakpoint === 'md',
    }"
    class="w-full h-auto px-4 py-2 overflow-y-auto text-white bg-transparent border-2 border-white rounded-lg outline-none transition-sb-slow focus:ring-0 focus:ring-offset-0 ring-0 ring-offset-0 hover:bg-slate-700 focus:bg-white focus:shadow-sb-ring-sm focus:shadow-white focus:text-black"
    :placeholder="getPlaceholder"
    @focus="handleFocusBlur(true)"
    @blur="handleFocusBlur(false)"
  ></textarea>
</template>
