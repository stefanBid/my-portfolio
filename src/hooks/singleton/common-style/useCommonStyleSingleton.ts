// useCommonSTyle.ts
import { useBreakpoints } from '@vueuse/core';
import { computed, ComputedRef } from 'vue';
type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

let instance: ReturnType<typeof createCommonStyle> | undefined;

function createCommonStyle() {
	const breakpoints = useBreakpoints({
		xs: 0, // From 0 to 639px
		sm: 640, // From 640px to 767px
		md: 768, // From 768px to 1023px
		lg: 1024, // From 1024px to 1279px
		xl: 1280, // From 1280px to 1535px
		xxl: 1536, // From 1536px and up
	});

	/**
	 * Returns the active breakpoint
	 *
	 * Breakpoints Range:
	 * xs: 0 - 639px
	 * sm: 640 - 767px
	 * md: 768 - 1023px
	 * lg: 1024 - 1279px
	 * xl: 1280 - 1535px
	 * xxl: 1536px and up
	 */
	const activeBreakpoint = breakpoints.active() as ComputedRef<Breakpoint | undefined>;

	// Common style for website elements

	const containerPadding = computed(() => {
		if (activeBreakpoint.value === 'xs' || activeBreakpoint.value === 'sm') { return 'p-sb-side-sm'; }
		if (activeBreakpoint.value === 'md') { return 'p-sb-side-base'; }
		return 'p-sb-side-lg';
	});

	const containerGapElements = computed(() => {
		if (activeBreakpoint.value === 'xs' || activeBreakpoint.value === 'sm') { return 'gap-y-16'; }
		if (activeBreakpoint.value === 'md' || activeBreakpoint.value === 'lg') { return 'gap-y-20'; }
		return ' gap-y-24';
	});

	// Common style for text elements

	const h1Size = computed(() => {
		if (activeBreakpoint.value === 'xs' || activeBreakpoint.value === 'sm') { return 'text-sb-4xl'; }
		if (activeBreakpoint.value === 'md') { return 'text-sb-6xl'; }
		return 'text-sb-7xl';
	});

	const h2Size = computed(() => {
		if (activeBreakpoint.value === 'xs') { return 'text-sb-2xl'; }
		if (activeBreakpoint.value === 'sm') { return 'text-sb-3xl'; }
		if (activeBreakpoint.value === 'md') { return 'text-sb-4xl'; }
		return 'text-sb-5xl';
	});

	const h3Size = computed(() => {
		if (activeBreakpoint.value === 'xs' || activeBreakpoint.value === 'sm') { return 'text-sb-lg'; }
		if (activeBreakpoint.value === 'md') { return 'text-sb-xl'; }
		return 'text-sb-2xl';
	});

	const pSize = computed(() => {
		if (activeBreakpoint.value === 'xs' || activeBreakpoint.value === 'sm') { return 'text-sb-sm'; }
		if (activeBreakpoint.value === 'md') { return 'text-sb-base'; }
		return 'text-sb-lg';
	});

	const labelSize = computed(() => {
		if (activeBreakpoint.value === 'xs' || activeBreakpoint.value === 'sm') { return 'text-sb-xs'; }
		if (activeBreakpoint.value === 'md') { return 'text-sb-sm'; }
		return 'text-sb-base';
	});

	return { activeBreakpoint, containerPadding, containerGapElements, h1Size, h2Size, h3Size, pSize, labelSize };
}

export function useCommonStyleSingleton() {
	if (!instance) {
		instance = createCommonStyle();
	}
	return instance;
}