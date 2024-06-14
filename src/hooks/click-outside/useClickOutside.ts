// useClickOutside.ts
import { vOnClickOutside } from '@vueuse/components';
import { Ref } from 'vue';

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
export function useClickOutside(listOfIgnoredElementsRef: Ref<any>[], fuctionToInvoke: () => void) {
	return { vOnClickOutside, fuctionToInvoke, listOfIgnoredElementsRef };
}