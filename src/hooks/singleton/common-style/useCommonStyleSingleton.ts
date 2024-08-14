// useCommonSTyle.ts
import { useBreakpoints } from '@vueuse/core';
import { computed } from 'vue';

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

	const xs = breakpoints.smaller('sm');
	const sm = breakpoints.between('sm', 'md');
	const md = breakpoints.between('md', 'lg');
	const lg = breakpoints.between('lg', 'xl');
	const xl = breakpoints.between('xl', 'xxl');
	const xxl = breakpoints.greater('xxl');

	// Common style for website elements

	const containerPadding = computed(() => {
		if (xs.value || sm.value) { return 'p-sb-side-sm'; }
		if (md.value) { return 'p-sb-side-base'; }
		return 'p-sb-side-lg';
	});

	const containerGapElements = computed(() => {
		if (xs.value || sm.value) { return 'gap-y-16'; }
		if (md.value || lg.value) { return 'gap-y-20'; }
		return ' gap-y-24';
	});

	// Common style for text elements

	const h1Size = computed(() => {
		if (xs.value || sm.value) { return 'text-sb-4xl'; }
		if (md.value) { return 'text-sb-6xl'; }
		return 'text-sb-7xl';
	});

	const h2Size = computed(() => {
		if (xs.value) { return 'text-sb-2xl'; }
		if (sm.value) { return 'text-sb-3xl'; }
		if (md.value) { return 'text-sb-4xl'; }
		return 'text-sb-5xl';
	});

	const h3Size = computed(() => {
		if (xs.value || sm.value) { return 'text-sb-lg'; }
		if (md.value) { return 'text-sb-xl'; }
		return 'text-sb-2xl';
	});

	const pSize = computed(() => {
		if (xs.value || sm.value) { return 'text-sb-sm'; }
		if (md.value) { return 'text-sb-base'; }
		return 'text-sb-lg';
	});

	const labelSize = computed(() => {
		if (xs.value || sm.value) { return 'text-sb-xs'; }
		if (md.value) { return 'text-sb-sm'; }
		return 'text-sb-base';
	});

	return { xs, sm, md, lg, xl, xxl, containerPadding, containerGapElements, h1Size, h2Size, h3Size, pSize, labelSize };
}

export function useCommonStyleSingleton() {
	if (!instance) {
		instance = createCommonStyle();
	}
	return instance;
}