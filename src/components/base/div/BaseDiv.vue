<script setup lang="ts">
import { vIntersectionObserver } from '@vueuse/components';
import { computed, ref } from 'vue';

interface BaseDivProps {
  intersectionObserverSettings: {root:HTMLElement | null, threshold: number | number[] | undefined, cssVisibilityClassExtra?: string, cssNotVisibilityClassExtra?: string};
}

const props = defineProps<BaseDivProps>();

const isVisible = ref(false);

const getExtraCssClasses = computed(() => {
	return isVisible.value ? props.intersectionObserverSettings.cssVisibilityClassExtra ?? '' : props.intersectionObserverSettings.cssNotVisibilityClassExtra ?? '';
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
    class="transition-all duration-500 ease-in-out"
    :class="[getExtraCssClasses, {
      'opacity-0': !isVisible,
      'opacity-100': isVisible,
    }]"
  >
    <slot></slot>
  </div>
</template>