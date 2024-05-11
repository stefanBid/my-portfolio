<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const ICON_MAP = {
	AngularIcon: defineAsyncComponent(() => import('@/assets/icons/angular.svg')),
	CodingIcon: defineAsyncComponent(() => import('@/assets/icons/coding.svg')),
	CssIcon: defineAsyncComponent(() => import('@/assets/icons/css.svg')),
	HtmlIcon: defineAsyncComponent(() => import('@/assets/icons/html.svg')),
	ItalyFlagIcon: defineAsyncComponent(() => import('@/assets/icons/it-flag.svg')),
	JavaScriptIcon: defineAsyncComponent(() => import('@/assets/icons/java-script.svg')),
	ReactIcon: defineAsyncComponent(() => import('@/assets/icons/react.svg')),
	TypeScriptIcon: defineAsyncComponent(() => import('@/assets/icons/type-script.svg')),
	UkFlagIcon: defineAsyncComponent(() => import('@/assets/icons/uk-flag.svg')),
	VueIcon: defineAsyncComponent(() => import('@/assets/icons/vue.svg')),
};

interface CustomIconProps {
  name: keyof typeof ICON_MAP;
}

const props = defineProps<CustomIconProps>();
</script>

<template>
  <component
    v-bind="$attrs"
    :is="ICON_MAP[props.name]"
  />
</template>