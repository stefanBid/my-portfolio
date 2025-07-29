// useTypingText.ts

import { onMounted, onUnmounted, ref } from 'vue';
import type { Ref } from 'vue';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useTypingText(listOfWord: Ref<string[]>) {
  const currentTxt = ref('');
  const currentTextIndex = ref(0);
  const addingText = ref(true);
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  // Functon to create a typing effect
  const typeWriterEffect = (): void => {
    // If we are adding text
    if (addingText.value) {
      if (currentTxt.value.length < listOfWord.value[currentTextIndex.value].length) {
        currentTxt.value = listOfWord.value[currentTextIndex.value].substring(
          0,
          currentTxt.value.length + 1,
        );
        timeoutId = setTimeout(typeWriterEffect, 70);
      } else {
        // If we have finished adding text
        addingText.value = false;
        timeoutId = setTimeout(typeWriterEffect, 700);
      }
    } else {
      // If we are removing text
      if (currentTxt.value.length > 0) {
        currentTxt.value = listOfWord.value[currentTextIndex.value].substring(
          0,
          currentTxt.value.length - 1,
        );
        timeoutId = setTimeout(typeWriterEffect, 70);
      } else {
        // If we have finished removing text
        addingText.value = true;
        currentTextIndex.value = (currentTextIndex.value + 1) % listOfWord.value.length;
        timeoutId = setTimeout(typeWriterEffect, 300);
      }
    }
  };

  onMounted(() => {
    typeWriterEffect();
  });

  onUnmounted(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  });

  return { currentTxt };
}
