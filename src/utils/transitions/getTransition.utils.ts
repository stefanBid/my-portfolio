type Transition = 'fade' | 'scaleAndFade' | 'shutter' | 'stretch';

interface TransitionObject {
  enterActiveClass: string;
  enterFromClass: string;
  enterToClass: string;
  leaveActiveClass: string;
  leaveFromClass: string;
  leaveToClass: string;
}

const TRANSITION_MAP: Record<Transition, TransitionObject> = {
	fade: {
		enterActiveClass: 'transition duration-500 ease-out',
		enterFromClass: 'opacity-0',
		enterToClass: 'opacity-100',
		leaveActiveClass: 'transition duration-500 ease-in',
		leaveFromClass: 'opacity-100',
		leaveToClass: 'opacity-0',
	},
	scaleAndFade: {
		enterActiveClass: 'transition duration-700 ease-out',
		enterFromClass: 'transform scale-95 opacity-0',
		enterToClass: 'transform scale-100 opacity-100',
		leaveActiveClass: 'transition duration-700 ease-in',
		leaveFromClass: 'transform scale-100 opacity-100',
		leaveToClass: 'transform scale-95 opacity-0',
	},
	shutter: {
		enterActiveClass: 'transition-transform duration-700 ease-out',
		enterFromClass: 'transform translate-y-full',
		enterToClass: 'transform translate-y-0',
		leaveActiveClass: 'transition-transform duration-700 ease-in',
		leaveFromClass: 'transform translate-y-0',
		leaveToClass: 'transform -translate-y-full',
	},
	stretch: {
		enterActiveClass: 'transition-transform duration-500 ease-out',
		enterFromClass: 'scale-0',
		enterToClass: 'scale-100',
		leaveActiveClass: 'transition-transform duration-500 ease-in',
		leaveFromClass: 'scale-100',
		leaveToClass: 'scale-0',
	},
};

export const getTransition = (transition: Transition) => {

	return TRANSITION_MAP[transition];
};
