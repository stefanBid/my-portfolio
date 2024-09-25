<script setup lang="ts">
import { vIntersectionObserver } from '@vueuse/components';
import { computed, ref } from 'vue';

type DefaultEffect = 'fade' | 'slide' | 'fade-and-slide';
type Effect = DefaultEffect | { entry: string, leave: string };

interface BaseDivProps {
  intersectionObserverSettings: {root: HTMLElement | null, threshold: number | number[] | undefined, visibilityCss: Effect};
}

const props = defineProps<BaseDivProps>();

const isVisible = ref(false);

const VISIBILITY_EFFECTS_MAP: Record<DefaultEffect, {entry: string, leave: string}> = {
	'fade': { entry: 'opacity-100', leave: 'opacity-0' },
	'slide': { entry: 'w-full', leave: 'w-0' },
	'fade-and-slide': { entry: 'opacity-100 w-full', leave: 'opacity-0 w-0' },
};

const getVisibilityClass = computed(() => {
	if (typeof props.intersectionObserverSettings.visibilityCss === 'string') {
		return {
			entry: VISIBILITY_EFFECTS_MAP[props.intersectionObserverSettings.visibilityCss].entry,
			leave: VISIBILITY_EFFECTS_MAP[props.intersectionObserverSettings.visibilityCss].leave,
		};
	} else {
		return {
			entry: props.intersectionObserverSettings.visibilityCss.entry,
			leave: props.intersectionObserverSettings.visibilityCss.leave,
		};
	}
});

const onIntersectionObserver = ([{ isIntersecting }]: IntersectionObserverEntry[]) => {
	if (isIntersecting !== isVisible.value) {
		isVisible.value = isIntersecting;
	}
};
</script>

<template>
  <div
    v-intersection-observer="[onIntersectionObserver, { root: props.intersectionObserverSettings.root, threshold: props.intersectionObserverSettings.threshold }]"
    v-bind="$attrs"
    class="transition-all duration-500 ease-in-out"
    :class="[isVisible ? getVisibilityClass.entry : getVisibilityClass.leave]"
  >
    <slot></slot>
  </div>
</template>