<script setup lang="ts">
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue';

import { useCommonStyleSingleton } from '@/hooks';

interface BaseToggleProps {
  label?: string
}

const props = withDefaults(defineProps<BaseToggleProps>(), {
	label: undefined
});

const enabled = defineModel<boolean>('enabled', { default: false, required: true });

// Feature 0: Manage Breakpoints and Style Classes
const { activeBreakpoint, labelSize } = useCommonStyleSingleton();
</script>

<template>
  <SwitchGroup>
    <div
      class="flex flex-row-reverse items-center rounded-full "
      @keypress.prevent.enter="enabled = !enabled"
    >
      <SwitchLabel
        v-if="props.label"
        class="ml-3 text-white transition-all duration-200 ease-in-out outline-none font-roboto hover:cursor-pointer hover:text-shadow-luminous"
        :class="[labelSize,{
          'opacity-50': !enabled,
          'opacity-100': enabled,
        }]"
      >
        {{ props.label }}
      </SwitchLabel>
      <Switch
        v-model="enabled"
        tabindex="0"
        class="box-border relative inline-flex items-center transition-all duration-200 ease-in-out border-2 border-white rounded-full outline-none shrink-0 focus-visible:ring-4 ring-slate-600 bg-slate-600"
        :class="{
          'opacity-50': !enabled,
          'opacity-100': enabled,
          'h-5 w-9': activeBreakpoint === 'xs' || activeBreakpoint === 'sm',
          'h-6 w-11': activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm',
        }"
      >
        <span
          :class="{
            ' translate-x-[22px]': enabled && (activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm'),
            'translate-x-[18px]': enabled && (activeBreakpoint === 'xs' || activeBreakpoint === 'sm' ),
            'translate-x-0.5': !enabled,
            'size-3': activeBreakpoint === 'xs' || activeBreakpoint === 'sm',
            'size-4': activeBreakpoint !== 'xs' && activeBreakpoint !== 'sm',
          }"
          class="inline-block transition-all duration-200 ease-in-out transform bg-white rounded-full"
        ></span>
      </Switch>
    </div>
  </SwitchGroup>
</template>