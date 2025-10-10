// useTypingText.ts
import { ref, watch, onUnmounted, type Ref, computed } from 'vue';

type Options = {
  typeSpeed?: number; // ms between letters while typing
  deleteSpeed?: number; // ms between letters while deleting (list mode)
  pauseEnd?: number; // ms pause when a word is fully typed (list mode)
  pauseBetween?: number; // ms pause between words after deletion (list mode)
};

export function useTypingText(source: Ref<string | string[]>): {
  currentTxt: Ref<string>;
  currentHtml: Ref<string>; // HTML progressively revealed (use with v-html)
  endTyping: Ref<boolean>;
  start: (options?: Options) => void;
} {
  const currentTxt = ref('');
  const currentHtml = ref(''); // HTML output for v-html
  let htmlCount = 0; // revealed char count (plain text length for HTML mode)

  // Cached values for HTML mode (avoid re-parsing on every tick)
  let htmlOriginal = '';
  let htmlPlain = '';
  let htmlTotal = 0;

  const isClient = typeof window !== 'undefined';
  const isArray = (v: unknown): v is string[] => Array.isArray(v);
  const isHtml = (s: string): boolean => /<\/?[a-z][\s\S]*>/i.test(s);

  // Strip HTML to plain text (DOM-based on client, regex fallback on SSR)
  const stripHtml = (html: string): string => {
    if (isClient) {
      const div = document.createElement('div');
      div.innerHTML = html;
      return div.textContent || '';
    }
    // Basic SSR-safe fallback (not perfect but good enough)
    return html.replace(/<[^>]*>/g, '');
  };

  // Build a partial HTML string revealing only the first `chars` plain-text characters
  const revealHtmlByChars = (html: string, chars: number): string => {
    if (!isClient) return ''; // no DOM on SSR
    const src = document.createElement('div');
    src.innerHTML = html;

    let remaining = Math.max(0, chars);

    const cloneWithLimit = (node: Node): Node => {
      if (node.nodeType === Node.TEXT_NODE) {
        const t = node.nodeValue ?? '';
        const slice = t.slice(0, remaining);
        remaining = Math.max(0, remaining - slice.length);
        return document.createTextNode(slice);
      }
      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        const copy = el.cloneNode(false) as HTMLElement; // copy tag + attributes (no children yet)
        for (const child of Array.from(el.childNodes)) {
          if (remaining <= 0) break;
          copy.appendChild(cloneWithLimit(child));
        }
        return copy;
      }
      // ignore other node types
      return document.createTextNode('');
    };

    const out = document.createElement('div');
    for (const child of Array.from(src.childNodes)) {
      if (remaining <= 0) break;
      out.appendChild(cloneWithLimit(child));
    }
    return out.innerHTML;
  };

  const endTyping = computed(() => {
    if (typeof source.value === 'string') {
      const s = source.value;
      if (isHtml(s)) {
        // When typing HTML, consider finished when plain text is fully revealed
        return currentTxt.value === stripHtml(s);
      }
      return currentTxt.value === s;
    }
    return (
      isArray(source.value) &&
      source.value.length > 0 &&
      currentTxt.value === source.value[source.value.length - 1]
    );
  });

  let running = false;
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  // internal state for list mode
  let wordIndex = 0;
  let adding = true;

  let options: Required<Options> = {
    typeSpeed: 70,
    deleteSpeed: 70,
    pauseEnd: 700,
    pauseBetween: 300,
  };

  const clearTimer = (): void => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = undefined;
    }
  };

  const stop = (): void => {
    running = false;
    clearTimer();
  };

  const resetState = (): void => {
    clearTimer();
    currentTxt.value = '';
    currentHtml.value = '';
    htmlCount = 0;
    htmlOriginal = '';
    htmlPlain = '';
    htmlTotal = 0;
    wordIndex = 0;
    adding = true;
  };

  /**
   * Runner for LIST mode (looping)
   * Types and deletes words in a loop from the provided array
   */
  const tickList = (words: string[]): void => {
    if (!running) return;
    if (!words.length) return;

    const word = words[wordIndex] ?? '';

    if (adding) {
      // typing
      if (currentTxt.value.length < word.length) {
        currentTxt.value = word.substring(0, currentTxt.value.length + 1);
        timeoutId = setTimeout(() => tickList(words), options.typeSpeed);
      } else {
        // finished typing → switch to deleting
        adding = false;
        timeoutId = setTimeout(() => tickList(words), options.pauseEnd);
      }
    } else {
      // deleting
      if (currentTxt.value.length > 0) {
        currentTxt.value = word.substring(0, currentTxt.value.length - 1);
        timeoutId = setTimeout(() => tickList(words), options.deleteSpeed);
      } else {
        // finished deleting → move to next word
        adding = true;
        wordIndex = (wordIndex + 1) % words.length;
        timeoutId = setTimeout(() => tickList(words), options.pauseBetween);
      }
    }
  };

  /**
   * Runner for SINGLE STRING mode (one-time)
   * Supports both plain text and HTML without breaking tags
   */
  const tickOnce = (text: string): void => {
    if (!running) return;

    const hasTags = isHtml(text);

    if (hasTags) {
      // HTML mode: reveal by plain-text character count
      if (htmlCount < htmlTotal) {
        htmlCount += 1;
        currentTxt.value = htmlPlain.slice(0, htmlCount); // plain text progress
        currentHtml.value = isClient ? revealHtmlByChars(htmlOriginal, htmlCount) : ''; // partial HTML for v-html
        timeoutId = setTimeout(() => tickOnce(text), options.typeSpeed);
      } else {
        // finished
        currentTxt.value = htmlPlain;
        currentHtml.value = htmlOriginal;
        stop();
      }
      return;
    }

    // Plain text mode (previous behavior)
    if (currentTxt.value.length < text.length) {
      currentTxt.value = text.substring(0, currentTxt.value.length + 1);
      timeoutId = setTimeout(() => tickOnce(text), options.typeSpeed);
    } else {
      stop();
    }
  };

  /**
   * Start the typing effect from the source (string or array)
   * Resets the state and restarts typing
   */
  const runFromSource = (): void => {
    resetState();
    const value = source.value;

    if (isArray(value)) {
      if (!value.length) return;
      // NOTE: list mode currently supports plain text only
      tickList(value);
    } else {
      if (!value) return;

      // Precompute HTML caches once (if needed)
      if (isHtml(value)) {
        htmlOriginal = value;
        htmlPlain = stripHtml(htmlOriginal);
        htmlTotal = htmlPlain.length;
      }

      tickOnce(value);
    }
  };

  // public API: start typing
  function start(local?: Options): void {
    options = {
      typeSpeed: local?.typeSpeed ?? options.typeSpeed,
      deleteSpeed: local?.deleteSpeed ?? options.deleteSpeed,
      pauseEnd: local?.pauseEnd ?? options.pauseEnd,
      pauseBetween: local?.pauseBetween ?? options.pauseBetween,
    };
    running = true;
    runFromSource();
  }

  // restart typing if the input (string or array) changes
  watch(
    source,
    () => {
      if (!running) return;
      runFromSource();
    },
    { deep: true }, // important for array changes
  );

  onUnmounted(() => {
    running = false;
    clearTimer();
  });

  return {
    currentTxt,
    currentHtml,
    endTyping,
    start,
  };
}
