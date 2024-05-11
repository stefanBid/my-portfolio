// useCommonSTyle.ts
import { useBreakpoints } from '@vueuse/core';
import { computed } from 'vue';
import type { StyleValue } from 'vue';
export function useCommonStyle() {
	const breakpoints = useBreakpoints({
		xs: 0, // From 0 to 639px
		sm: 640, // From 640px to 767px
		md: 768, // From 768px to 1023px
		lg: 1024, // From 1024px to 1279px
		xl: 1280, // From 1280px to 1535px
		xxl: 1536, // From 1536px and up
	});

	const xs = breakpoints.smaller('sm');
	const sm = breakpoints.between('sm', 'md');
	const md = breakpoints.between('md', 'lg');
	const lg = breakpoints.between('lg', 'xl');
	const xl = breakpoints.between('xl', 'xxl');
	const xxl = breakpoints.greater('xxl');

	// Common style for website elements

	const containerStyle: StyleValue = { 'overflow-y': 'hidden' };

	const containerPadding = computed(() => {
		if (xs.value || sm.value) { return 'p-sb-side-sm'; }
		if (md.value) { return 'p-sb-side-base'; }
		return 'p-sb-side-lg';
	});

	const containerGapElements = computed(() => {
		if (xs.value || sm.value) { return 'gap-y-16'; }
		if (md.value) { return 'gap-y-20'; }
		return ' gap-y-24';
	});

	const impactTitleTextSize = computed(() => {
		if (xs.value || sm.value) { return 'text-sb-4xl'; }
		if (md.value) { return 'text-sb-6xl'; }
		return 'text-sb-7xl';
	});

	const subtitleTextSize = computed(() => {
		if (xs.value || sm.value) { return 'text-sb-lg'; }
		if (md.value) { return 'text-sb-xl'; }
		return 'text-sb-2xl';
	});

	return { xs, sm, md, lg, xl, xxl, containerStyle, containerPadding, containerGapElements, impactTitleTextSize, subtitleTextSize };
}