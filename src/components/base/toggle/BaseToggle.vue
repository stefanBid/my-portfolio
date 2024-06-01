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
const { xs, sm, md, labelSize } = useCommonStyleSingleton();
</script>

<template>
  <SwitchGroup>
    <div
      :tabindex="0"
      class="flex flex-row-reverse items-center rounded-full w-fit"
      @keypress.prevent.enter="enabled = !enabled"
    >
      <SwitchLabel
        v-if="props.label"
        class="ml-4 text-white transition-all duration-200 ease-in-out font-roboto text-sb-2 focus:cursor-pointer focus:opacity-100 hover:cursor-pointer"
        :class="[labelSize,{
          'opacity-50': !enabled,
          'opacity-100': enabled,
        }]"
      >
        {{ props.label }}
      </SwitchLabel>
      <Switch
        v-model="enabled"
        class="relative inline-flex items-center transition-all duration-200 ease-in-out rounded-full ring-1 ring-white ring-offset-2 focus:outline-none bg-slate-600"
        :class="{
          'opacity-50': !enabled,
          'opacity-100': enabled,
          'h-5 w-9': xs || sm || md,
          'h-6 w-11': !xs && !sm && !md,
        }"
      >
        <span
          :class="{
            'translate-x-6': enabled && (!xs || !sm || !md),
            'translate-x-5': enabled && (xs || sm || md),
            'translate-x-1': !enabled,
            'size-3': xs || sm || md,
            'size-4': !xs && !sm && !md,
          }"
          class="inline-block transition-all duration-200 ease-in-out transform bg-white rounded-full"
        ></span>
      </Switch>
    </div>
  </SwitchGroup>
</template>