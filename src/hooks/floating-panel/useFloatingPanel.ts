import { useFloating, flip, shift, autoUpdate, offset, arrow } from '@floating-ui/vue';
import type { Placement, Strategy } from '@floating-ui/vue';
import { ref } from 'vue';

type PopperType = 'dropdownMenu' | 'helpInfo' | 'inputSettings'

interface PopperSettings {
	placement: Placement;
	strategy: Strategy;
	offsetValue: number;
	hasArrow: boolean;
}

// This helper function is used to configure the popper settings for each popper type in complete security
const configurePopperSetting = (placement: Placement, strategy: Strategy, offsetValue: number, hasArrow?: boolean) : PopperSettings => ({
	placement,
	strategy,
	offsetValue,
	hasArrow: hasArrow ?? false,
});

// eslint-disable-next-line no-unused-vars
const popperSettings: { [key in PopperType]: PopperSettings } = {
	helpInfo: configurePopperSetting('top', 'absolute', 10, true),
	dropdownMenu: configurePopperSetting('bottom-end', 'absolute', 10),
	inputSettings: configurePopperSetting('bottom', 'absolute', 10),
};

export function useFloatingPanel(popperType: PopperType) {
	const anchor = ref();
	const popper = ref();
	const popperArrow = ref();
	const isOpen = ref();

	const { floatingStyles, placement, middlewareData } = useFloating(anchor, popper, {
		open: isOpen,
		placement: popperSettings[popperType].placement,
		strategy: popperSettings[popperType].strategy,
		transform: false,
		middleware: [
			offset(popperSettings[popperType].offsetValue),
			flip(),
			shift(),
			...popperSettings[popperType].hasArrow ? [arrow({ element: popperArrow })] : [],
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
