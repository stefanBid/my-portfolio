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
      class="flex flex-row-reverse items-center rounded-full w-fit"
      @keypress.prevent.enter="enabled = !enabled"
    >
      <SwitchLabel
        v-if="props.label"
        :tabindex="0"
        class="ml-4 text-white transition-all duration-200 ease-in-out outline-none font-roboto text-sb-2 focus:cursor-pointer focus:opacity-100 hover:cursor-pointer focus:underline ring-0 focus:ring-0 focus:outline-none"
        :class="[labelSize,{
          'opacity-50': !enabled,
          'opacity-100': enabled,
        }]"
      >
        {{ props.label }}
      </SwitchLabel>
      <Switch
        v-model="enabled"
        :tabindex="1"
        class="box-border relative inline-flex items-center transition-all duration-200 ease-in-out border-2 border-white rounded-full outline-none ring-0 focus:outline-none focus:ring-0 bg-slate-600"
        :class="{
          'opacity-50': !enabled,
          'opacity-100': enabled,
          'h-5 w-9': xs || sm,
          'h-6 w-11': !xs && !sm
        }"
      >
        <span
          :class="{
            ' translate-x-[22px]': enabled && (!xs || !sm || !md),
            'translate-x-[18px]': enabled && (xs || sm || md),
            'translate-x-0.5': !enabled,
            'size-3': xs || sm,
            'size-4': !xs && !sm
          }"
          class="inline-block transition-all duration-200 ease-in-out transform bg-white rounded-full"
        ></span>
      </Switch>
    </div>
  </SwitchGroup>
</template>