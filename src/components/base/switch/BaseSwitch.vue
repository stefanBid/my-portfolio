<script setup lang="ts">
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue';
import { useStyleStore } from '@/stores';

interface BaseSwitchProps {
  label?: string;
  ariaLabel?: string;
}

const props = withDefaults(defineProps<BaseSwitchProps>(), {
  label: undefined,
  ariaLabel: 'general switch',
});

const enabled = defineModel<boolean>('enabled', { default: false, required: true });

// Store Declarations
const styleStore = useStyleStore();
</script>

<template>
  <SwitchGroup>
    <div
      class="flex flex-row-reverse items-center rounded-full w-fit"
      @keypress.prevent.enter="enabled = !enabled"
    >
      <SwitchLabel
        v-if="props.label"
        class="ml-2 text-white transition-all duration-300 ease-in-out outline-none font-roboto hover:cursor-pointer hover:text-shadow-luminous"
        :class="[
          styleStore.textSizeXS,
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
        class="box-border relative inline-flex items-center transition-all duration-300 ease-in-out border-2 border-white rounded-full outline-none cursor-pointer shrink-0 hover:shadow-sb-ring-sm focus-visible:shadow-sb-ring-sm hover:shadow-white/80 focus-visible:shadow-white/80"
        :class="{
          'bg-sb-tertiary-100': enabled,
          'bg-sb-tertiary-100/50': !enabled,
          'h-5 w-9': styleStore.activeBreakpoint === 'xs' || styleStore.activeBreakpoint === 'sm',
          'h-6 w-11': styleStore.activeBreakpoint !== 'xs' && styleStore.activeBreakpoint !== 'sm',
        }"
      >
        <span
          :class="{
            ' translate-x-[22px]':
              enabled &&
              styleStore.activeBreakpoint !== 'xs' &&
              styleStore.activeBreakpoint !== 'sm',
            'translate-x-[18px]':
              enabled &&
              (styleStore.activeBreakpoint === 'xs' || styleStore.activeBreakpoint === 'sm'),
            'translate-x-0.5': !enabled,
            'size-3': styleStore.activeBreakpoint === 'xs' || styleStore.activeBreakpoint === 'sm',
            'size-4': styleStore.activeBreakpoint !== 'xs' && styleStore.activeBreakpoint !== 'sm',
          }"
          class="inline-block transition-all duration-300 ease-in-out transform bg-white rounded-full"
        ></span>
      </Switch>
    </div>
  </SwitchGroup>
</template>
