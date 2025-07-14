<script setup lang="ts">
import { computed, h } from 'vue';
import { ICONS_MAP } from './iconsMap';

interface BaseIconProps {
  icon: string;
}

const props = defineProps<BaseIconProps>();

const iconComponent = computed(() => {
  if (props.icon in ICONS_MAP) return ICONS_MAP[props.icon as keyof typeof ICONS_MAP];

  console.warn(`[BaseIcon] Icon "${props.icon}" not found.`);

  // Fallback as render function
  return {
    render() {
      return h('span', { style: 'color: red' }, '!!!');
    },
  };
});
</script>

<template>
  <component :is="iconComponent" v-bind="$attrs" />
</template>
