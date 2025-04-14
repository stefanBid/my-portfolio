import { computed, type ComputedRef } from 'vue';
import { useHead } from '@unhead/vue';
import type { MetaDescription } from '@/types';

interface UsePageMetaOptions {
  meta: ComputedRef<MetaDescription>;
  currentLang: ComputedRef<string>;
  url?: string;
  image?: string;
}

export function usePageMeta({ meta, currentLang, url, image }: UsePageMetaOptions): void {
  const defaultAuthor = 'Stefano Biddau';
  const defaultRobots = 'index, follow';
  const defaultUrl = 'https://www.stefano-biddau.com';
  const defaultImage =
    'https://media.licdn.com/dms/image/v2/D4D03AQGvfHWN3w4Vyw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1674322166521?e=1749081600&v=beta&t=LGlVPU_6C_nOJY5QkpcWvebJvEZSdCihzcHWz-IpSb4';

  const metaTags = computed(() => {
    const tags = [
      meta.value.description !== undefined
        ? { name: 'description', content: meta.value.description }
        : undefined,
      meta.value.keywords?.length
        ? { name: 'keywords', content: meta.value.keywords.join(', ') }
        : undefined,
      { name: 'author', content: meta.value.author || defaultAuthor },
      { name: 'robots', content: meta.value.robots || defaultRobots },
      meta.value.copyright !== undefined
        ? { name: 'copyright', content: meta.value.copyright }
        : undefined,
      { property: 'og:title', content: meta.value.title },
      meta.value.description !== undefined
        ? { property: 'og:description', content: meta.value.description }
        : undefined,
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: url ?? defaultUrl },
      { property: 'og:image', content: image ?? defaultImage },
      {
        property: 'og:locale',
        content: currentLang.value === 'it' ? 'it_IT' : 'en_US',
      },
      {
        property: 'og:locale:alternate',
        content: currentLang.value === 'it' ? 'en_US' : 'it_IT',
      },
      /* { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: () => meta.value.title },
      { name: 'twitter:description', content: () => meta.value.description },
      { name: 'twitter:image', content: () => image ?? defaultImage },
      */
    ].filter((tag) => tag !== undefined);
    console.log('metaTags', tags);
    return tags;
  });

  useHead({
    title: () => meta.value.title,
    htmlAttrs: {
      lang: () => currentLang.value,
    },
    meta: metaTags,
  });
}
