// useIntersectionObserver.ts

import { vIntersectionObserver } from '@vueuse/components';
import type { Ref } from 'vue';
import { ref, watch, isRef } from 'vue';

export function useIntersectionObserver(htmlElementsLength: Ref<number> | number) {

	const root = ref(null);
	const length = isRef(htmlElementsLength) ? htmlElementsLength.value : htmlElementsLength;
	const isVisible = ref(new Array(length).fill(false));

	const onIntersectionObserver = (index: number) => ([{ isIntersecting }]: IntersectionObserverEntry[]) => {
		isVisible.value[index] = isIntersecting;
	};

	if (isRef(htmlElementsLength)) {
		watch(htmlElementsLength, (newLength) => {
			isVisible.value = new Array(newLength).fill(false);
		});
	}

	return { root, isVisible, onIntersectionObserver, vIntersectionObserver };

}