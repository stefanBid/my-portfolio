import { type ComputedRef } from 'vue';
import { useHead } from '@unhead/vue';
import type { MetaDescription } from '@/types';

interface UsePageMetaOptions {
  meta: ComputedRef<MetaDescription>;
  currentLang: ComputedRef<string>;
  url?: string;
  image?: string;
}

export function usePageMeta({ meta, currentLang, url, image }: UsePageMetaOptions): void {
  useHead({
    title: () => meta.value.title,
    htmlAttrs: {
      lang: () => currentLang.value,
    },
    meta: [
      { name: 'description', content: () => meta.value.description },
      { name: 'keywords', content: () => meta.value.keywords.join(', ') },
      { name: 'author', content: meta.value.author },
      { name: 'robots', content: meta.value.robots },
      { name: 'copyright', content: meta.value.copyright },

      // Open Graph
      { property: 'og:title', content: meta.value.title },
      { property: 'og:description', content: meta.value.description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: () => url ?? 'https://www.stefano-biddau.com' },
      { property: 'og:image', content: () => image ?? 'URL_IMMAGINE_DEFAULT' },
      { property: 'og:locale', content: currentLang.value === 'it' ? 'it_IT' : 'en_US' },
      { property: 'og:locale:alternate', content: currentLang.value === 'it' ? 'en_US' : 'it_IT' },
    ],
  });
}
