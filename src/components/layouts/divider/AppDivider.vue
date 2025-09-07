<script setup lang="ts">
import { vIntersectionObserver } from '@vueuse/components';
import { computed, ref } from 'vue';

interface AppDividerProps {
  intersectionObserverSettings?: {
    rootElement: HTMLElement | null;
    rootMargin?: string;
    threshold?: number;
  };
  animation?: 'fade' | 'scaleAndFade' | 'none';
}

const props = withDefaults(defineProps<AppDividerProps>(), {
  intersectionObserverSettings: () => ({
    rootElement: null,
    rootMargin: '-80px 0px 0px 0px',
    threshold: 0.15,
  }),
  animation: 'none',
});

const isVisible = ref(false);

const onIntersectionObserver = (
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver,
): void => {
  const [{ isIntersecting }] = entries;
  if (isIntersecting !== isVisible.value && !isVisible.value) {
    isVisible.value = true;
    observer?.disconnect();
  }
};

const getAnimationClasses = computed(() => {
  switch (props.animation) {
    case 'fade':
      return {
        'opacity-0': !isVisible.value,
        'opacity-100': isVisible.value,
      };
    case 'scaleAndFade':
      return {
        'opacity-0': !isVisible.value,
        'scale-90': !isVisible.value,
        'opacity-100': isVisible.value,
        'scale-100': isVisible.value,
      };
    default:
      return {};
  }
});
</script>

<template>
  <div
    v-intersection-observer="[
      onIntersectionObserver,
      {
        root: props.intersectionObserverSettings.rootElement,
        threshold: props.intersectionObserverSettings.threshold,
        rootMargin: props.intersectionObserverSettings.rootMargin,
      },
    ]"
    v-bind="$attrs"
    class="transition-all duration-500 ease-in-out"
    :class="getAnimationClasses"
  >
    <slot :is-visible="isVisible"></slot>
  </div>
</template>
