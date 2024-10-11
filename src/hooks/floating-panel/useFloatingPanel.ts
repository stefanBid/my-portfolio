import { useFloating, flip, shift, autoUpdate, offset, arrow } from '@floating-ui/vue';
import type { Placement, Strategy } from '@floating-ui/vue';
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue';

interface FloatingSettings {
	placement: Placement;
	strategy: Strategy;
	offsetValue: number;
	hasArrow?: boolean;
	hasResize?: boolean;
}

export function useFloatingPanel(settings: FloatingSettings) {
	const anchor = ref<HTMLElement | null>(null);
	const popper = ref<HTMLElement | null>(null);
	const popperArrow = ref<HTMLElement | null>(null);
	const isOpen = ref(false);
	const resizeObserver = ref<ResizeObserver | null>(null);
	let isObserving = false;

	const { floatingStyles, placement, middlewareData } = useFloating(anchor, popper, {
		open: isOpen,
		placement: settings.placement,
		strategy: settings.strategy,
		transform: false,
		middleware: [
			offset(settings.offsetValue),
			flip(),
			shift(),
			...settings.hasArrow ? [arrow({ element: popperArrow })] : []
		],
		whileElementsMounted: autoUpdate,
	});

	const changeToolTipVisibility = (state: 'open' | 'close') => {
		if (state === 'open') {
			isOpen.value = true;
		} else {
			isOpen.value = false;
		}
	};

	const syncPopperWidthWithAnchor = () => {
		if (popper.value && anchor.value) {
			popper.value.style.width = `${anchor.value.offsetWidth * 0.95}px`;
		}
	};

	watch(isOpen, async (newVal) => {
		if (newVal) {
			await nextTick();
			syncPopperWidthWithAnchor();
		}
	});

	watch(anchor, (newAnchor) => {
		if (newAnchor && settings.hasResize && !isObserving) {
			isObserving = true;
			resizeObserver.value = new ResizeObserver(syncPopperWidthWithAnchor);
			resizeObserver.value.observe(newAnchor);
		}
	});

	onMounted(() => {
		if (settings.hasResize && anchor.value) {
			isObserving = true;
			resizeObserver.value = new ResizeObserver(syncPopperWidthWithAnchor);
			resizeObserver.value.observe(anchor.value);
		}
	});

	onUnmounted(() => {
		if (settings.hasResize) {
			resizeObserver.value?.disconnect();
		}
	});

	return {
		anchor,
		popper,
		popperArrow,
		isOpen,
		popperPosition: placement,
		popperStyle: floatingStyles,
		popperArrowStyle: middlewareData,
		changeToolTipVisibility,
	};
}
