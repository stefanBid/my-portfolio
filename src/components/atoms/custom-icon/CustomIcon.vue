<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

type IconName = 'AngularSBIcon' | 'ReactSBIcon' | 'VueSBIcon' | 'ItalyFlagSBIcon' | 'EnglandFlagSBIcon';

interface CustomIconProps {
  name: IconName;
}

const props = defineProps<CustomIconProps>();

const ICON_MAP = {
	AngularSBIcon: defineAsyncComponent(() => import('@/assets/icons/angular.svg')),
	ReactSBIcon: defineAsyncComponent(() => import('@/assets/icons/react.svg')),
	VueSBIcon: defineAsyncComponent(() => import('@/assets/icons/vue.svg')),
	ItalyFlagSBIcon: defineAsyncComponent(() => import('@/assets/icons/it-flag.svg')),
	EnglandFlagSBIcon: defineAsyncComponent(() => import('@/assets/icons/en-flag.svg')),
};
</script>

<template>
  <div
    class="inline-flex items-center"
    v-bind="$attrs"
  >
    <component
      :is="ICON_MAP[props.name]"
    />
  </div>
</template>