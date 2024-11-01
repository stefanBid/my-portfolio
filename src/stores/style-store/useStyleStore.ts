import { defineStore } from 'pinia';
import { useBreakpoints } from '@vueuse/core';
import type { Breakpoint } from '@/types';
import { computed, ComputedRef } from 'vue';

export const useStyleStore = defineStore('style', () => {
  const breakpoints = useBreakpoints({
    xs: 0, // From 0 to 639px
    sm: 640, // From 640px to 767px
    md: 768, // From 768px to 1023px
    lg: 1024, // From 1024px to 1279px
    xl: 1280, // From 1280px to 1535px
    xxl: 1536, // From 1536px and up
  });

  // Reactive state for style
  const activeBreakpoint = breakpoints.active() as ComputedRef<Breakpoint | undefined>;

  const containerPadding = computed(() => {
    if (activeBreakpoint.value === 'xs' || activeBreakpoint.value === 'sm') {
      return 'px-[5%]';
    }
    if (activeBreakpoint.value === 'md') {
      return 'px-[6%]';
    }
    return 'px-[7%]';
  });

  const containerGapElements = computed(() => {
    if (activeBreakpoint.value === 'xs' || activeBreakpoint.value === 'sm') {
      return 'gap-y-16';
    }
    if (activeBreakpoint.value === 'md' || activeBreakpoint.value === 'lg') {
      return 'gap-y-20';
    }
    return ' gap-y-24';
  });

  // Common style for text elements
  const textSizeXXL = computed(() => {
    if (activeBreakpoint.value === 'xs' || activeBreakpoint.value === 'sm') {
      return 'text-sb-4xl';
    }
    if (activeBreakpoint.value === 'md') {
      return 'text-sb-6xl';
    }
    return 'text-sb-7xl';
  });

  const textSizeXL = computed(() => {
    if (activeBreakpoint.value === 'xs') {
      return 'text-sb-2xl';
    }
    if (activeBreakpoint.value === 'sm') {
      return 'text-sb-3xl';
    }
    if (activeBreakpoint.value === 'md') {
      return 'text-sb-4xl';
    }
    return 'text-sb-5xl';
  });

  const textSizeL = computed(() => {
    if (activeBreakpoint.value === 'xs' || activeBreakpoint.value === 'sm') {
      return 'text-sb-lg';
    }
    if (activeBreakpoint.value === 'md') {
      return 'text-sb-xl';
    }
    return 'text-sb-2xl';
  });

  const textSizeM = computed(() => {
    if (activeBreakpoint.value === 'xs' || activeBreakpoint.value === 'sm') {
      return 'text-sb-base';
    }
    if (activeBreakpoint.value === 'md') {
      return 'text-sb-lg';
    }
    return 'text-sb-xl';
  });

  const textSizeS = computed(() => {
    if (activeBreakpoint.value === 'xs' || activeBreakpoint.value === 'sm') {
      return 'text-sb-sm';
    }
    if (activeBreakpoint.value === 'md') {
      return 'text-sb-base';
    }
    return 'text-sb-lg';
  });

  const textSizeXS = computed(() => {
    if (
      activeBreakpoint.value === 'xs' ||
      activeBreakpoint.value === 'sm' ||
      activeBreakpoint.value === 'md'
    ) {
      return 'text-sb-xs';
    }
    return 'text-sb-sm';
  });

  // Common style for icons elements
  const iconSizeXXL = computed(() => {
    if (activeBreakpoint.value === 'xs' || activeBreakpoint.value === 'sm') {
      return 'size-16';
    }
    if (activeBreakpoint.value === 'md') {
      return 'size-20';
    }
    return 'size-32';
  });
  const iconSizeXL = computed(() => {
    if (activeBreakpoint.value === 'xs' || activeBreakpoint.value === 'sm') {
      return 'size-14';
    }
    if (activeBreakpoint.value === 'md') {
      return 'size-16';
    }
    return 'size-20';
  });

  const iconSizeL = computed(() => {
    if (activeBreakpoint.value === 'xs' || activeBreakpoint.value === 'sm') {
      return 'size-12';
    }
    if (activeBreakpoint.value === 'md') {
      return 'size-14';
    }
    return 'size-16';
  });

  const iconSizeM = computed(() => {
    if (activeBreakpoint.value === 'xs' || activeBreakpoint.value === 'sm') {
      return 'size-6';
    }
    if (activeBreakpoint.value === 'md') {
      return 'size-8';
    }
    return 'size-10';
  });

  const iconSizeS = computed(() => {
    if (activeBreakpoint.value === 'xs' || activeBreakpoint.value === 'sm') {
      return 'size-4';
    }
    if (activeBreakpoint.value === 'md') {
      return 'size-5';
    }
    return 'size-6';
  });

  const iconSizeXS = computed(() => {
    if (activeBreakpoint.value === 'xs' || activeBreakpoint.value === 'sm') {
      return 'size-3.5';
    }
    if (activeBreakpoint.value === 'md') {
      return 'size-4';
    }
    return 'size-5';
  });

  return {
    activeBreakpoint,
    containerPadding,
    containerGapElements,
    textSizeXXL,
    textSizeXL,
    textSizeL,
    textSizeM,
    textSizeS,
    textSizeXS,
    iconSizeXXL,
    iconSizeXL,
    iconSizeL,
    iconSizeM,
    iconSizeS,
    iconSizeXS,
  };
});
