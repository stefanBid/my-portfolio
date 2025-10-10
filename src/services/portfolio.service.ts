import { api } from '@/lib/api';
import type { StrapiV5Single, Lang } from '@/types';
import type { Portfolio } from '@/types/entity.types';

export function buildPortfolioParams(locale: Lang): Record<string, unknown> {
  return {
    locale,
    populate: {
      routes: true,
      footer: {
        populate: {
          fields: ['title', 'description'],
          quickLinks: true,
          social: true,
          contacts: true,
          helpAndSupport: true,
        },
      },
      pages: {
        on: {
          'page-elements.home': {
            fields: ['firstHeading', 'secondHeading', 'thirdHeading'],
            populate: {
              pageMeta: true,
              contactCta: true,
              downloadCvCta: true,
              backgroundVideo: true,
              backgroundVideoCover: true,
              contactForm: {
                populate: {
                  fields: true,
                  resetBtn: true,
                  submitBtn: true,
                },
              },
            },
          },
          'page-elements.about-me': {
            fields: ['startTitle'],
            populate: {
              pageMeta: true,
              // bio è un array di componenti con quei campi -> niente "on"
              bio: {
                fields: ['title', 'subtitle', 'paragraph'],
                populate: {
                  cover: true,
                },
              },
            },
          },
          'page-elements.my-skills': {
            fields: ['startTitle'],
            populate: {
              pageMeta: true,
              skillsInfoPanel: true,
              skillsModal: {
                fields: ['title', 'info', 'icon', 'extra'],
              },
              skillsBio: {
                fields: ['title', 'subtitle', 'paragraph', 'extraInfo'],
                populate: {
                  cover: false,
                },
              },
            },
          },
          'page-elements.my-projects': {
            fields: ['startTitle'],
            populate: {
              pageMeta: true,
              presentation: true,
            },
          },
          'page-elements.privacy-policy': {
            fields: ['startTitle', 'title', 'lastUpdate', 'description', 'policy'],
            populate: {
              pageMeta: true,
            },
          },
          'page-elements.terms-and-conditions': {
            fields: ['startTitle', 'title', 'lastUpdate', 'description', 'terms'],
            populate: {
              pageMeta: true,
            },
          },
        },
      },
    },
  } as const;
}

export async function getPortfolio(locale: Lang): Promise<StrapiV5Single<Portfolio>> {
  const params = buildPortfolioParams(locale);
  const { data } = await api.get<StrapiV5Single<Portfolio>>('/portfolio', { params });
  return data;
}
