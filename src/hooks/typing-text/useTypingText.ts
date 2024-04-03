// useTypingText.ts

import { onMounted, ref } from 'vue';

export function useTypingText(listOfWord: string[]) {

	const currentTxt = ref('');
	const currentTextIndex = ref(0);
	const addingText = ref(true);

	// Functon to create a typing effect
	const typeWriterEffect = () => {
	// If we are adding text
		if (addingText.value) {
			if (currentTxt.value.length < listOfWord[currentTextIndex.value].length) {
				currentTxt.value = listOfWord[currentTextIndex.value].substring(0, currentTxt.value.length + 1);
				setTimeout(typeWriterEffect, 70);
			} else {
			// If we have finished adding text
				addingText.value = false;
				setTimeout(typeWriterEffect, 700);
			}
		} else {
		// If we are removing text
			if (currentTxt.value.length > 0) {
				currentTxt.value = listOfWord[currentTextIndex.value].substring(0, currentTxt.value.length - 1);
				setTimeout(typeWriterEffect, 70);
			} else {
			// If we have finished removing text
				addingText.value = true;
				currentTextIndex.value = (currentTextIndex.value + 1) % listOfWord.length;
				setTimeout(typeWriterEffect, 300);
			}
		}
	};

	onMounted(() => {
		typeWriterEffect();
	});

	return { currentTxt };
}