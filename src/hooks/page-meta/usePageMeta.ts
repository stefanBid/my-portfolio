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
  const defaultUrl = 'https://www.stefano-biddau.com';
  const defaultImage = 'https://www.stefano-biddau.com/images/default-og.jpg';

  useHead({
    title: () => meta.value.title,
    htmlAttrs: {
      lang: () => currentLang.value,
    },
    meta: [
      // Standard SEO
      { name: 'description', content: () => meta.value.description },
      { name: 'keywords', content: () => meta.value.keywords?.join(', ') || '' },
      { name: 'author', content: () => meta.value.author },
      { name: 'robots', content: () => meta.value.robots ?? 'index, follow' },
      { name: 'copyright', content: () => meta.value.copyright },

      // Open Graph
      { property: 'og:title', content: () => meta.value.title },
      { property: 'og:description', content: () => meta.value.description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: () => url ?? defaultUrl },
      { property: 'og:image', content: () => image ?? defaultImage },
      { property: 'og:locale', content: () => (currentLang.value === 'it' ? 'it_IT' : 'en_US') },
      {
        property: 'og:locale:alternate',
        content: () => (currentLang.value === 'it' ? 'en_US' : 'it_IT'),
      },

      /* { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: () => meta.value.title },
      { name: 'twitter:description', content: () => meta.value.description },
      { name: 'twitter:image', content: () => image ?? defaultImage },
      */
    ],
  });
}
