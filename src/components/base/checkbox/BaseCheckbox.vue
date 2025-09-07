<script setup lang="ts">
import { nanoid } from 'nanoid';
import { computed } from 'vue';

interface BaseCheckboxProps {
  value?: string;
  id?: string;
  name?: string;
  ariaLabel?: string;
  validation?: { show: boolean };
}

const props = withDefaults(defineProps<BaseCheckboxProps>(), {
  value: undefined,
  id: undefined,
  name: undefined,
  ariaLabel: 'general checkbox',
  validation: undefined,
});

const checked = defineModel<string | string[] | boolean>('checked', { required: true });

// Feature 1: Manage Checkbox Properties
const uniqueId = nanoid();

const checkboxAttrs = computed(() => {
  return {
    id: props.id || `${uniqueId}-checkbox-id`,
    name: props.name || `${uniqueId}-checkbox-name`,
    'aria-label': props.ariaLabel,
  };
});

//Feature 2: Manage Checkbox State
const isCheckDisabled = computed<boolean>(() => {
  return (typeof checked.value === 'string' || Array.isArray(checked.value)) && !props.value;
});
const isChecked = computed<boolean>(() => {
  if (typeof checked.value === 'boolean') {
    return checked.value;
  }

  if (typeof checked.value === 'string' && props.value) {
    return checked.value === props.value;
  }

  if (Array.isArray(checked.value) && props.value) {
    return checked.value.includes(props.value);
  }

  return false;
});

const onCheckboxChange = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  // Boolean case
  if (typeof checked.value === 'boolean') {
    checked.value = target.checked;
    return;
  }

  //Other cases
  if (props.value !== undefined) {
    // String case
    if (typeof checked.value === 'string') {
      checked.value = target.checked ? props.value : '';
      return;
    }

    // Array case
    if (Array.isArray(checked.value)) {
      checked.value = target.checked
        ? [...checked.value, props.value]
        : checked.value.filter((value) => value !== props.value);
      return;
    }
  } else {
    target.checked = false;
  }
  return;
};
</script>

<template>
  <div class="inline-flex items-center w-full gap-2">
    <input
      :id="checkboxAttrs.id"
      :checked="isChecked"
      :value="props.value"
      :name="checkboxAttrs.name"
      type="checkbox"
      :aria-label="checkboxAttrs['aria-label']"
      :tabindex="0"
      :class="{
        'opacity-50 cursor-not-allowed': isCheckDisabled,
        'focus-visible:shadow-white ring-0': !validation?.show,
        'focus-visible:shadow-sb-error ring-sb-error ring-2': validation?.show,
      }"
      :style="{ transform: 'rotateY(180deg)' }"
      class="bg-white relative border border-white outline-none focus-visible:shadow-sb-ring-sm rounded appearance-none cursor-pointer shrink-0 checked:bg-sb-tertiary-100 checked:border-sb-tertiary-100 transition-all duration-300 ease-in-out checked:after:content-[''] checked:after:block checked:after:border-b-2 checked:after:border-r-2 checked:after:border-white checked:after:rotate-45 checked:after:absolute checked:after:left-0.5 checked:after:top-0.5 size-[17px] checked:after:w-[11px] checked:after:h-[7px] sm:size-4 sm:checked:after:w-2.5 sm:checked:after:h-1.5"
      @change.stop.prevent="($event) => onCheckboxChange($event)"
    />
    <slot name="label-content"></slot>
  </div>
</template>
