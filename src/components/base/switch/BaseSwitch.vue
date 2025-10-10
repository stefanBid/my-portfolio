<script setup lang="ts">
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue';

interface BaseSwitchProps {
  label?: string;
  ariaLabel?: string;
}

// Input / Output (Props / Emits)
const props = withDefaults(defineProps<BaseSwitchProps>(), {
  label: undefined,
  ariaLabel: 'general switch',
});

const enabled = defineModel<boolean>('enabled', { default: false, required: true });
</script>

<template>
  <SwitchGroup>
    <div
      class="flex flex-row-reverse items-center rounded-full w-fit"
      @keypress.prevent.enter="enabled = !enabled"
    >
      <SwitchLabel
        v-if="props.label"
        class="text-size-xs ml-2 text-white transition-all duration-300 ease-in-out outline-none font-roboto hover:cursor-pointer"
        :class="[
          {
            'opacity-50': !enabled,
            'opacity-100': enabled,
          },
        ]"
      >
        {{ props.label }}
      </SwitchLabel>
      <Switch
        v-model="enabled"
        :tabindex="0"
        :aria-label="props.ariaLabel"
        class="h-5 w-9 sm:h-6 sm:w-11 box-border relative inline-flex items-center transition-all duration-300 ease-in-out border-2 border-white rounded-full outline-none cursor-pointer shrink-0 hover:shadow-sb-ring-sm focus-visible:shadow-sb-ring-sm hover:shadow-white/80 focus-visible:shadow-white/80"
        :class="{
          'bg-sb-tertiary-100': enabled,
          'bg-sb-tertiary-100/50': !enabled,
        }"
      >
        <span
          :class="{
            'translate-x-[18px] sm:translate-x-[22px]': enabled,
            'translate-x-0.5': !enabled,
          }"
          class="size-3 sm:size-4 inline-block transition-all duration-300 ease-in-out transform bg-white rounded-full"
        ></span>
      </Switch>
    </div>
  </SwitchGroup>
</template>
